export function pieceMessage(look:{id:number;name:string},size?:string){
 const link=new URL(`/peca/${look.id}`,window.location.origin).href;
 return `Olá, Josy! Gostei desta peça da Dolce Look:\n\n${look.name}\n${size?`Tamanho escolhido: ${size}\n`:''}\nPode confirmar medidas, valor e disponibilidade?\n\n${link}`;
}
