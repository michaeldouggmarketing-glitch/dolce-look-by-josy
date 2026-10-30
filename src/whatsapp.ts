export function pieceMessage(look:{id:number;name:string},size?:string,color?:string){
 const link=new URL(`/peca/${look.id}`,window.location.origin).href;
 return `Olá! Gostei desta peça da Dolce Look:\n\n${look.name}\n${size?`Tamanho escolhido: ${size}\n`:''}${color?`Cor escolhida: ${color}\n`:''}\nPode confirmar medidas, valor e disponibilidade?\n\n${link}`;
}
