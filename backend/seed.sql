-- Owner confirmed all nine pieces are available on 2026-10-07.
insert into public.dolce_products(id,name,type,"desc",img,status) values
(1,'Vermelho em cena','Camisas','Camisa vermelha com jeans de aplicações.','/media/look-1.webp','available'),
(2,'Um toque de verde','Camisas','Camisa verde e calça azul em uma composição de cor.','/media/look-2.webp','available'),
(3,'Renda & denim','Blusas','Blusa de renda preta e jeans de corte amplo.','/media/look-3.webp','available'),
(4,'Leveza em branco','Blusas','Renda branca sobreposta ao jeans claro.','/media/look-4.webp','available'),
(5,'Detalhes que encantam','Blusas','Top branco com detalhes e jeans claro.','/media/look-5.webp','available'),
(6,'Tons de chocolate','Conjuntos','Conjunto marrom com cinto e botas.','/media/look-6.webp','available'),
(7,'Presença em cada passo','Vestidos','Vestido longo estampado em tons escuros e dourados.','/media/look-7.webp','available'),
(8,'Elegância natural','Camisas','Camisa marrom com cinto marcando a cintura.','/media/look-8.webp','available'),
(9,'Renda em chocolate','Blusas','Top de renda marrom com saia longa jeans e cinto.','/media/look-9.webp','available');
select setval('public.dolce_products_id_seq',(select max(id) from public.dolce_products));
