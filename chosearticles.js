// Função para buscar o JSON por meio de fetch
async function fetchJson(url) {
  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData;
}

// Função para buscar o HTML por meio de fetch
async function fetchHtml(url) {
  const response = await fetch(url);
  const htmlData = await response.text();
  return htmlData;
}

// Função para extrair o conteúdo da mainArticle de um HTML
async function extractMainArticleContent(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const mainArticle = doc.querySelector('.mainArticle');
  return mainArticle ? mainArticle.innerHTML : '';
}

// Função para escolher aleatoriamente 4 objetos do array
function chooseRandomArticles(articles) {
  const shuffledArticles = articles.sort(() => Math.random() - 0.5);
  return shuffledArticles.slice(0, 4);
}

// Função para ajustar caminho da URL da imagem
function ajustarCaminhoImagem(src) {
  if (src.startsWith('../assets/')) {
    return src.replace('../assets/', 'assets/');
  }
  return src;
}

// Função para ajustar caminho do link <a> que traz texto
function ajustarCaminhoLinkTexto(href) {
  if (href.startsWith('./')) {
    return href.replace('./', 'pages/');
  }
  return href;
}

// Função para ajustar caminho do link <a> que traz o link de uma imagem
function ajustarCaminhoLinkImagem(href) {
  if (href.startsWith('../assets/')) {
    return href.replace('../assets/', 'assets/');
  }
  return href;
}

// Função para ajustar caminhos no HTML
function ajustarCaminhosHTML(html) {
  var tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  var imageElements = tempDiv.querySelectorAll('figure img');
  var textLinkElements = tempDiv.querySelectorAll('figure a:not([target="_blank"])');
  var imageLinkElements = tempDiv.querySelectorAll('figure a[target="_blank"]');

  // Ajustar caminho da URL da imagem
  imageElements.forEach(function (element) {
    var currentSrc = element.getAttribute('src');
    var newSrc = ajustarCaminhoImagem(currentSrc);
    element.setAttribute('src', newSrc);
  });

  // Ajustar caminho do link <a> que traz texto
  textLinkElements.forEach(function (element) {
    var currentHref = element.getAttribute('href');
    var newHref = ajustarCaminhoLinkTexto(currentHref);
    element.setAttribute('href', newHref);
  });

  // Ajustar caminho do link <a> que traz o link de uma imagem
  imageLinkElements.forEach(function (element) {
    var currentHref = element.getAttribute('href');
    var newHref = ajustarCaminhoLinkImagem(currentHref);
    element.setAttribute('href', newHref);
  });

  return tempDiv.innerHTML;
}
// Função para atualizar as mainArticles no DOM
async function updateMainArticles() {
  const jsonUrl = './articles.json';

  try {
    const jsonData = await fetchJson(jsonUrl);
    const chosenItems = chooseRandomArticles(jsonData);
    const articleWrapper = document.querySelector('.article-wrapper');

    for (let i = 0; i < chosenItems.length; i++) {
      const url = chosenItems[i].url;
      const htmlData = await fetchHtml(url);
      const mainArticleContent = await extractMainArticleContent(htmlData);

      // Ajustar caminhos no HTML antes de adicioná-lo ao DOM
      const adjustedHtml = ajustarCaminhosHTML(mainArticleContent);

      // Substituir o conteúdo atual pela nova mainArticle
      const mainArticleDiv = document.createElement('div');
      mainArticleDiv.classList.add('mainArticle');
      mainArticleDiv.innerHTML = adjustedHtml;

      articleWrapper.appendChild(mainArticleDiv);
    }
  } catch (error) {
    console.error('Erro ao buscar ou processar o JSON:', error);
  }
}

// Chama a função para atualizar as mainArticles
updateMainArticles();