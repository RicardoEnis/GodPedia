// search-bar.js
document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const searchInput = document.getElementById('search');

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const searchTerm = searchInput.value.trim();
        console.log('Search Term:', searchTerm);

        if (searchTerm) {
            sessionStorage.setItem('searchTerm', searchTerm);
            window.location.href = '../results.html?q=' + searchTerm;
        } else {
            console.error('Nenhum termo de pesquisa encontrado.');
        }
    });
});
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.menu-btn');
    const menuContainer = document.getElementById('menu-container');

    menuBtn.addEventListener('click', function () {
        menuContainer.classList.toggle('hide');
    });
});
