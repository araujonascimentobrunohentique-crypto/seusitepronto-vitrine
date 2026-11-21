# Seu Site Pronto · Vitrine

Site de uma página que mostra os modelos à venda. Feito só com HTML, CSS e JavaScript puro, sem instalar nada.

## Como ver no seu computador

Se você abrir o `index.html` com dois cliques, a página abre, mas **os cards não aparecem**. O navegador bloqueia a leitura do `produtos.json` quando o endereço começa com `file://`. Isso é normal.

Para testar direito:

1. No VS Code, instale a extensão **Live Server** (de Ritwick Dey).
2. Clique com o botão direito no `index.html` e escolha **Open with Live Server**.
3. A página abre no navegador com tudo funcionando.

Na Netlify funciona normalmente, porque lá o endereço é `https://`.

## Como adicionar um produto novo

1. Salve o print da demo em `img/produtos/` (por exemplo `psicologo.jpg`).
2. Abra o `produtos.json` e copie o bloco de um produto inteiro (de `{` até `}`).
3. Cole depois do último produto, **colocando uma vírgula** entre os blocos.
4. Troque os dados:

```json
{
  "id": "psicologo",
  "nome": "Psicólogo",
  "nicho": "Psicólogo",
  "descricao": "Uma frase curta sobre o modelo.",
  "preco": 47,
  "imagem": "img/produtos/psicologo.jpg",
  "demo": "https://link-da-demo",
  "compra": "https://link-da-kiwify",
  "entrega": "Arquivo .zip",
  "folha": "02 / 03",
  "status": "disponivel"
}
```

- `status` pode ser `"disponivel"` (mostra os botões) ou `"em-breve"` (mostra a placa "Em breve", sem compra).
- `preco` é só o número, sem "R$".
- Se a imagem ainda não existir, o card mostra o fundo de planta com o nome do modelo.
- Cuidado com as vírgulas e aspas: o último item da lista **não** leva vírgula no final.

## Anotações

- Página de vendas do modelo Personal Trainer (na Kiwify): https://kiwify.app/LjNysET. O app não usa esse link, fica aqui só como referência.
- O Personal Trainer ainda não tem demo publicada. Quando tiver, preencha o campo `demo` dele no `produtos.json` e o botão "Ver a demo" aparece sozinho.

## Antes de publicar

No `index.html`, procure o comentário `TROCAR DEPOIS DE PUBLICAR` e coloque o endereço completo do seu site no `og:image`. Assim a imagem aparece certinho quando alguém compartilha o link.
