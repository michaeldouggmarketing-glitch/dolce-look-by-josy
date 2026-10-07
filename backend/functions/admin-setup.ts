import { createClient } from "npm:@supabase/supabase-js@2.99.1";
const cors={"Access-Control-Allow-Origin":"https://dolce-look-by-josy.vercel.app","Access-Control-Allow-Headers":"authorization, x-client-info, apikey, content-type","Content-Type":"application/json"};
Deno.serve(async(req)=>{
 const headers={...cors};
 if(req.headers.get('origin')==='http://localhost:4173')headers['Access-Control-Allow-Origin']='http://localhost:4173';
 const reply=(status:number,message:string)=>new Response(JSON.stringify({message}),{status,headers});
 if(req.method==='OPTIONS')return new Response('ok',{headers});
 if(req.method!=='POST')return reply(405,'Método inválido.');
 let hash='',userId='';
 const db=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
 try{
  const {token,password}=await req.json();
  if(typeof token!=='string'||token.length<40||typeof password!=='string'||password.length<12||password.length>128)return reply(400,'Use o link privado e uma senha de pelo menos 12 caracteres.');
  hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(token)))).map(b=>b.toString(16).padStart(2,'0')).join('');
  const claim=await db.rpc('dolce_claim_setup',{p_hash:hash});
  if(claim.error||!claim.data)return reply(403,'Link utilizado ou expirado. Entre com sua senha.');
  const created=await db.auth.admin.createUser({email:claim.data,password,email_confirm:true});
  if(created.error||!created.data.user){await db.rpc('dolce_retry_setup',{p_hash:hash});return reply(400,'Não foi possível criar o acesso. Confira se a conta já existe.');}
  userId=created.data.user.id;
  const membership=await db.rpc('dolce_finish_setup',{p_user:userId});
  if(membership.error){await db.auth.admin.deleteUser(userId);await db.rpc('dolce_retry_setup',{p_hash:hash});return reply(500,'Não foi possível liberar o acesso. Tente novamente.');}
  return reply(200,'Acesso criado. Entre com seu e-mail e sua senha.');
 }catch{if(userId)await db.auth.admin.deleteUser(userId);if(hash)await db.rpc('dolce_retry_setup',{p_hash:hash});return reply(500,'Não foi possível concluir. Tente novamente.');}
});
