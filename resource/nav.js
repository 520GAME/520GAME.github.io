const navSearcherBtn = document.getElementById('nav-searcher-btn');
const navjs_navBar = document.getElementById('navBar');
const navjs_navSearchWin = document.getElementById('nav-search-win');
const navjs_toastClose = document.getElementById('toastClose');
const recentSearchTags = document.getElementById('recentSearchTags');
const navjs_toastInput = document.getElementById('toastInput');


// 划到顶部导航栏变透明
let body = document.body;
let navBar = document.getElementById('navBar');
window.addEventListener('scroll', function() {
    var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollDistance >= 20) {
        navBar.style.backgroundColor = '#232323';
    }else{
        if(!navjs_navSearchFlag)
        navBar.style.backgroundColor = '#23232300';
    }
});

let navjs_navSearchFlag = false;
navSearcherBtn.addEventListener('click',() => {
    if(navjs_navSearchFlag){
        navjs_navBar.style.backgroundColor = '#23232300';
        navjs_navSearchWin.style.transform = 'translateY(calc(-100% - 61px))';
        navjs_navSearchFlag = false;
    }else{
        navjs_navBar.style.backgroundColor = '#232323';
        navjs_navSearchWin.style.transform = 'translateY(0)';
        navjs_navSearchFlag = true;
    }
    // 获取最近搜索存储
    let recentTags = localStorage.getItem('520GameRCTSerchTags');
    recentSearchTags.innerHTML = '';
    if(recentTags!=null){
        const recentTagss = JSON.parse(recentTags);
        recentTagss.forEach(tag => {
            let nav_searchToastTag = document.createElement('div');
            nav_searchToastTag.className = 'searchToastTag';
            nav_searchToastTag.innerHTML = tag;
            
            recentSearchTags.appendChild(nav_searchToastTag);
        });

        recentSearchTags.innerHTML  += `<div id="searchToastClearTag">清空历史记录</div>`;
    }

    // 点击清空历史记录
    const searchToastClearTag = document.getElementById('searchToastClearTag');
    if(searchToastClearTag != null){
        searchToastClearTag.addEventListener('click',() => {
            localStorage.removeItem('520GameRCTSerchTags');
            recentSearchTags.innerHTML = '';
        })
    }
})
navjs_toastClose.addEventListener('click',() => {
    navjs_navBar.style.backgroundColor = '#23232300';
    navjs_navSearchWin.style.transform = 'translateY(calc(-100% - 61px))';
    navjs_navSearchFlag = false;
})

recentSearchTags.addEventListener('click', function(event) {
    if (event.target.classList.contains('searchToastTag')) {
        navjs_toastInput.focus();
        navjs_toastInput.value = event.target.innerHTML;
    }
  });


// 点击搜索框聚焦事件
const searchPlaceHolder = document.getElementById('searchPlaceHolder');
const inputDiv = document.getElementById('inputDiv')
const underLine = document.getElementById('underLine')
if(navjs_toastInput != undefined){
    let isFo = false;
    navjs_toastInput.addEventListener('focus',() => {
        if(searchPlaceHolder != undefined){
            searchPlaceHolder.style.transform = 'translateY(-12px)';
            searchPlaceHolder.style.top = '0'
            searchPlaceHolder.style.color = '#ff53a9'
            searchPlaceHolder.style.fontSize = '12px'
            underLine.style.width = '100%'
        }
        isFo = true;
    })
    navjs_toastInput.addEventListener('blur',() => {
        if(searchPlaceHolder != undefined && navjs_toastInput.value == ''){
            searchPlaceHolder.style.transform = 'translateY(-50%)';
            searchPlaceHolder.style.top = '50%'
            searchPlaceHolder.style.color = '#555659'
            searchPlaceHolder.style.fontSize = '16px'
            underLine.style.width = '0'
        }
        isFo = false;
    })
    navjs_toastInput.addEventListener("mouseover",() => {
        underLine.style.width = '100%'
    })
    navjs_toastInput.addEventListener("mouseleave",() => {
        if(!isFo){
            underLine.style.width = '0'
        }
    })
}

// 点击 searchToastTag 填充输入框
 // 使用 document.getElementsByClassName() 获取类名为 "example" 的所有元素
 var elements = document.getElementsByClassName('searchToastTag');

 // 遍历这些元素
 for (var i = 0; i < elements.length; i++) {
     (function(element) {
         // 在闭包中为每个元素添加事件监听器
         element.addEventListener('click', function() {
             if (navjs_toastInput !== undefined) {
                navjs_toastInput.focus();
                navjs_toastInput.value = element.innerHTML;
             }
         });
     })(elements[i]);
    }


// 阻止提交
const navSearchForm = document.getElementById('nav-search-form');
navSearchForm.addEventListener('submit',(event) => {
    document.location.href = '/search.html?text='+navjs_toastInput.value;
    event.preventDefault();
})


