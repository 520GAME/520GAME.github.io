const index_searchInput = document.getElementById('index_searchInput');
// 阻止提交
const siteForm = document.getElementById('siteForm');
siteForm.addEventListener('submit', (event) => {
    document.location.href = '/search.html?text=' + index_searchInput.value;
    event.preventDefault();
})


   





