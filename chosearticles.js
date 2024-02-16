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

// Função para atualizar as mainArticles no DOM
async function updateMainArticles() {
  // URL do seu JSON (substitua pela sua URL real)
  const jsonUrl = './finder.json';
  
  try {
    // Buscar o JSON por meio de fetch
    const jsonData = await fetchJson(jsonUrl);

    // Escolher aleatoriamente 4 objetos do JSON
    const chosenItems = chooseRandomArticles(jsonData);

    // Atualizar as mainArticles no DOM
    const articleWrapper = document.querySelector('.article-wrapper');
    
    for (let i = 0; i < chosenItems.length; i++) {
      const url = chosenItems[i].url;
      const htmlData = await fetchHtml(url);
      const mainArticleContent = await extractMainArticleContent(htmlData);

      // Substituir o conteúdo atual pela nova mainArticle
      const mainArticleDiv = document.createElement('div');
      mainArticleDiv.classList.add('mainArticle');
      mainArticleDiv.innerHTML = mainArticleContent;

      articleWrapper.appendChild(mainArticleDiv);
    }
  } catch (error) {
    console.error('Erro ao buscar ou processar o JSON:', error);
  }
}

// Chama a função para atualizar as mainArticles
updateMainArticles();