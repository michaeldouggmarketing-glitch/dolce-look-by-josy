import previewLooks from '../preview-looks.json' with {type:'json'};
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (!['GET','HEAD'].includes(req.method)) {
    res.setHeader('Allow', 'GET, HEAD');
    return res.status(405).end();
  }
  const id = String(req.query?.id ?? '');
  if (!/^[1-9]\d{0,8}$/.test(id)) return res.status(400).end('Peça inválida.');
  const host = String(req.headers.host ?? '');
  if (!/^[a-zA-Z0-9.-]+(?::\d+)?$/.test(host)) return res.status(400).end();
  const origin = `https://${host}`;
  try {
    const url = new URL('/rest/v1/dolce_products', process.env.VITE_SUPABASE_URL);
    url.search = new URLSearchParams({select:'id,name,desc,img',id:`eq.${id}`,status:'eq.available',limit:'1'}).toString();
    const response = await fetch(url, {headers:{apikey:process.env.VITE_SUPABASE_PUBLISHABLE_KEY},signal:AbortSignal.timeout(6000)});
    if (!response.ok) throw new Error('Inventory unavailable');
    const rows = await response.json();
    const look = rows[0] || (process.env.VERCEL_ENV === 'preview' ? previewLooks.find(p => String(p.id) === id) : null);
    if (!look) return res.status(404).end('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Dolce Look</title><p>Essa peça já seguiu seu caminho.</p><a href="/colecao">Descobrir a coleção</a></html>');
    const image = new URL(look.img, origin);
    if (!['https:','http:'].includes(image.protocol)) throw new Error('Invalid image');
    const destination = `/look/${id}`;
    const title = `${look.name} · Dolce Look by Josy`;
    const description = look.desc || 'Uma escolha exclusiva da Dolce Look. Converse com a Josy sobre esta peça.';
    const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)}</title><meta name="description" content="${escape(description)}"><meta property="og:type" content="website"><meta property="og:site_name" content="Dolce Look by Josy"><meta property="og:title" content="${escape(title)}"><meta property="og:description" content="${escape(description)}"><meta property="og:image" content="${escape(image.href)}"><meta property="og:image:alt" content="${escape(look.name)}"><meta property="og:url" content="${escape(origin)}/peca/${id}"><meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${escape(origin)}${destination}"></head><body><h1>${escape(look.name)}</h1><p>${escape(description)}</p><a href="${destination}"><img src="${escape(image.href)}" alt="${escape(look.name)}" style="max-width:100%;width:360px"><br>Conhecer a peça</a><script>location.replace(${JSON.stringify(destination)})</script></body></html>`;
    return res.status(200).end(req.method === 'HEAD' ? '' : html);
  } catch {
    return res.status(503).end('<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Dolce Look</title><p>Vamos abrir a coleção?</p><a href="/colecao">Ver as peças</a></html>');
  }
}