// Função para exibir os resultados na página
function displayResults(results) {
    const searchResults = document.getElementById('searchResults');

    // Limpe o conteúdo existente
    searchResults.innerHTML = '';

    if (results.length === 0) {
        // Se nenhum resultado for encontrado, exiba uma mensagem apropriada
        searchResults.innerHTML = `<p>Nenhum resultado encontrado.</p>`;
    } else {
        // Se houver resultados, construa a exibição na página
        results.forEach(item => {
            const article = document.createElement('div');
            article.classList.add('mainArticle');

            // Adicionando a imagem como um link para item.url
            const imageURL = item.imageURL ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer"><img src="${item.imageURL}" alt="Imagem"></a>` : '';

            article.innerHTML = `
                <figure>
                    ${imageURL}
                </figure>
            `;
            searchResults.appendChild(article);
        });
    }
}

// Função principal para carregar dados e exibir resultados
async function loadData() {
    try {
        // Carregar o arquivo JSON
        const jsonData = await loadExternalJSON('finder.json');

        // Recupere o termo de pesquisa armazenado no sessionStorage
        const searchTerm = sessionStorage.getItem('searchTerm');

        // Se o termo de pesquisa existir, realize a lógica de pesquisa
        if (searchTerm) {
            // Realizar a lógica de pesquisa
            const results = jsonData.filter(item =>
                (typeof item.title === 'string' && item.title.toLowerCase() === searchTerm.toLowerCase()) ||
                (Array.isArray(item.title) && item.title.some(title => title.toLowerCase() === searchTerm.toLowerCase())) ||
                item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (item.categories && item.categories.some(category => category.toLowerCase().includes(searchTerm.toLowerCase())))
            );

            // Exiba os resultados na página
            displayResults(results);
        } else {
            // Se não houver termo de pesquisa, exiba uma mensagem de erro ou faça o que for apropriado para o seu caso
            console.error('Nenhum termo de pesquisa encontrado.');
        }
    } catch (error) {
        // Trate o erro aqui, se necessário
        console.error('Erro ao carregar ou processar os dados:', error);
    }
}

// Chame a função para iniciar o processo
document.addEventListener('DOMContentLoaded', loadData);