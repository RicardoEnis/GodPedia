document.addEventListener('DOMContentLoaded', function () {
    // Recupere o termo de pesquisa digitado na barra de pesquisa
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('search');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtenha o termo de pesquisa
        const searchTerm = searchInput.value.trim();
        console.log('Search Term:', searchTerm);

        // Se o termo de pesquisa existir, realize a lógica de pesquisa
        if (searchTerm) {
            // Armazene o termo de pesquisa no sessionStorage
            sessionStorage.setItem('searchTerm', searchTerm);

            // Redirecione para a página de resultados
            window.location.href = '/results.html?q=' + searchTerm;
        } else {
            // Se não houver termo de pesquisa, exiba uma mensagem de erro ou faça o que for apropriado para o seu caso
            console.error('Nenhum termo de pesquisa encontrado.');
        }
    });
});

