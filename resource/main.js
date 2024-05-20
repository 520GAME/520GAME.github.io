let body = document.body;
let navBar = document.getElementById('navBar');
window.addEventListener('scroll', function() {
    var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollDistance >= 20) {
        navBar.style.backgroundColor = '#232323';
    }else{
        navBar.style.backgroundColor = '#23232300';
    }
});