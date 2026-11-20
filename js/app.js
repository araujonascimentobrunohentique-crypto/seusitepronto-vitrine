/* Seu Site Pronto · vitrine
   Este arquivo lê o produtos.json e monta os cards na página. */

(function () {
  "use strict";

  // Onde os cards vão aparecer (o <div id="cards"> do index.html)
  var areaCards = document.getElementById("cards");

  // Pequena ajuda para criar um elemento: tag, classe e texto opcional.
  // Usamos textContent (e não innerHTML) para o texto entrar sempre como texto puro.
  function criar(tag, classe, texto) {
    var el = document.createElement(tag);
    if (classe) el.className = classe;
    if (texto !== undefined) el.textContent = texto;
    return el;
  }

  // Formata o preço: 47 -> "R$ 47", 47.5 -> "R$ 47,50"
  function formatarPreco(valor) {
    var n = Number(valor);
    var inteiro = Number.isInteger(n);
    return "R$ " + n.toLocaleString("pt-BR", {
      minimumFractionDigits: inteiro ? 0 : 2,
      maximumFractionDigits: 2
    });
  }

  // Fundo de planta com o nome do modelo (usado quando a imagem não existe)
  function criarPlanta(nome) {
    return criar("div", "card__planta", nome);
  }

  // Cria o espaço da imagem. Se a imagem falhar, troca pelo fundo de planta.
  function criarImagem(produto) {
    var caixa = criar("div", "card__imagem");

    if (produto.imagem) {
      var img = document.createElement("img");
      img.alt = "Prévia do site modelo " + produto.nome;
      img.loading = "lazy";
      // O "error" precisa ser ligado ANTES de definir o src
      img.addEventListener("error", function () {
        img.replaceWith(criarPlanta(produto.nome));
      });
      img.src = produto.imagem;
      caixa.appendChild(img);
    } else {
      caixa.appendChild(criarPlanta(produto.nome));
    }

    if (produto.status === "em-breve") {
      // Produto ainda não à venda: placa "Em breve" no lugar do preço
      caixa.appendChild(criar("span", "placa card__placa", "Em breve"));
    } else {
      // Etiqueta de preço vermelha, no canto de baixo
      caixa.appendChild(criar("span", "preco", formatarPreco(produto.preco)));
    }
    return caixa;
  }

  // Carimbo 2x2: MODELO / FOLHA / ENTREGA / FUNCIONA
  function criarCarimbo(produto) {
    var dl = criar("dl", "carimbo");
    var itens = [
      ["Modelo", produto.nicho || produto.nome],
      ["Folha", produto.folha],
      ["Entrega", produto.entrega],
      ["Funciona", "Celular e PC"]
    ];
    itens.forEach(function (par) {
      var celula = document.createElement("div");
      celula.appendChild(criar("dt", "", par[0]));
      celula.appendChild(criar("dd", "", par[1] || "-"));
      dl.appendChild(celula);
    });
    return dl;
  }

  // Botão/link que abre em nova aba
  function criarLink(texto, url, classe) {
    var a = criar("a", "botao " + classe, texto);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    return a;
  }

  // Monta um card completo
  function criarCard(produto) {
    var card = criar("article", "card");
    card.appendChild(criarImagem(produto));

    var corpo = criar("div", "card__corpo");
    corpo.appendChild(criar("h3", "card__nome", produto.nome));
    corpo.appendChild(criar("p", "card__descricao", produto.descricao));
    corpo.appendChild(criarCarimbo(produto));

    // Só mostra os botões se o produto está disponível
    if (produto.status !== "em-breve") {
      var acoes = criar("div", "card__acoes");
      if (produto.demo) {
        acoes.appendChild(criarLink("Ver a demo", produto.demo, "botao--contorno"));
      }
      if (produto.compra) {
        acoes.appendChild(criarLink("Quero esse modelo", produto.compra, "botao--amarelo"));
      }
      corpo.appendChild(acoes);
    }

    card.appendChild(corpo);
    return card;
  }

  // Mensagem amigável quando algo dá errado
  function mostrarErro() {
    areaCards.textContent = "";
    areaCards.appendChild(criar(
      "p",
      "aviso-cards",
      "Não consegui carregar os modelos agora. Se você abriu o arquivo com dois cliques, " +
      "use o Live Server (veja o README). Se o site já está no ar, atualize a página."
    ));
  }

  // Busca o produtos.json e monta os cards
  function carregarProdutos() {
    if (!areaCards) return;

    fetch("produtos.json")
      .then(function (resposta) {
        if (!resposta.ok) throw new Error("Erro " + resposta.status);
        return resposta.json();
      })
      .then(function (produtos) {
        if (!Array.isArray(produtos)) throw new Error("Formato inesperado");
        areaCards.textContent = ""; // limpa o "Carregando..."
        produtos.forEach(function (produto) {
          areaCards.appendChild(criarCard(produto));
        });
      })
      .catch(mostrarErro);
  }

  // Ano do rodapé, sempre atualizado
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();

  carregarProdutos();
})();
