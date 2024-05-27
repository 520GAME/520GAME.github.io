const containerCards = document.getElementById('containerCards');
const searchInput = document.getElementById('searchInput');
const searchForm = document.getElementById('searchForm');

searchForm.addEventListener('submit',(e) => {
    document.location.href = '/search.html?text='+searchInput.value;
    e.preventDefault();
})

// 所有内容
let allCards = [];
// 当前分类的内容
let currentClassifyCards = [];
// 当前页面展示的内容
let currentShowCards = [];
// 每页最多展示个数
const perPageNum = 16;
// 当前是第几页
let currentPageNum = 1;
// 总共多少页
let totalPages;
let currentClassifyText = '全部'

var url = "../data/data.json";
// 申明一个XMLHttpRequest
var request = new XMLHttpRequest();
// 设置请求方法与路径
request.open("get", url);
// 不发送数据到服务器
request.send(null);
//XHR对象获取到返回信息后执行
request.onload = function () {
    var cards1 = JSON.parse(request.responseText);
    var cards = [];
    cards1.forEach(item=>{
        if(item!=null){
            cards.push(item)
        }
    })
    allCards = cards;


    // 解析 URL 中的参数
    var urlParams = new URLSearchParams(window.location.search);
    var searchText = urlParams.get('text');
    if(searchText!=null && searchText != ''){
        searchInput.value = searchText;
        getCurrentCards(searchText)
        currentPageNum = 1
        showThis(getCurrentShowCards(currentPageNum))

        // 获取最近搜索存储
        let search_recentTags = localStorage.getItem('520GameRCTSerchTags');
        let temp_tags = [];
        console.log('search_recentTags:',typeof search_recentTags);
        if(search_recentTags!=null){
            temp_tags = JSON.parse(search_recentTags);
            let index = temp_tags.indexOf(searchText);
            if(index != -1){
                temp_tags.splice(index,1);
            }
        }
        temp_tags.unshift(searchText);
        if(temp_tags.length > 30){
            let tagz = [];
            for(let i = 0; i < 30; i++){
                tagz.push(temp_tags[i]);
            }
            temp_tags = tagz;
        }
        console.log('temp_tags:',temp_tags);
        localStorage.setItem('520GameRCTSerchTags',JSON.stringify(temp_tags));
        
    }else{
    }
}

function formatDate(str) {
    var today = new Date(+str);
    var year = today.getFullYear();
    var month = today.getMonth() + 1;
    var day = today.getDate();
 
    // 将月份和日期格式化为两位数
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
 
    var formattedDate = year + '-' + month + '-' + day;
    return formattedDate;
 };

const showThis = (cards) => {
    let showCards = ''
    cards.forEach((card,index) => {
        showCards += `<div class="container-card">
            <a class="con-card-img" a itemprop="url" rel="bookmark" href="/articles/${card.id}.html"
                title="${card.detail}" target="_blank"
                style="background-image: url('${card.img}');"></a>
            <div class="con-card-classify"><a href="#">${card.classify.split('|')[0]}</a></div>
            <h3 itemprop="name headline"><a itemprop="url" rel="bookmark" href="/articles/${card.id}.html"
                    title="${card.detail}"
                    target="_blank">${card.detail}</a></h3>
            <div class="time-row">
                <div class="time-contain"><a href="/articles/${card.id}.html">${formatDate(card.time)}</a></div>
                <div class="capacity-contain"><a href="/articles/${card.id}.html">${card.capacity}</a></div>
                </div>
            <div class="card-free">免费</div>
        </div>`
    
    });
    containerCards.innerHTML = showCards;
}

// 根据分类名获取当前分类所有card
const getCurrentCards = (text) => {
    let cur = [];
    if(text == undefined){
        // 无参
    }else{
        allCards.forEach(card=>{
            if(card.detail.includes(text)){
                cur.push(card)
            }
        })
        // 计算总页数
        totalPages = Math.ceil(cur.length / perPageNum);
    }
    currentClassifyCards = cur;
}

// 根据目标页面获取当前应展示card
const getCurrentShowCards = (toPage) => {
    
    // 确保页数在有效范围内
    if (toPage < 1 || toPage > totalPages) {
        return [];
    }
    currentPageNum = toPage
    // 根据当前页面生成分页栏
    showPageBar(toPage)

    // 计算起始索引和结束索引
    const startIndex = (toPage - 1) * perPageNum;
    const endIndex = Math.min(startIndex + perPageNum, currentClassifyCards.length);

    // 获取指定页的数据并返回
    const pageData = currentClassifyCards.slice(startIndex, endIndex);
    
    // 滚动到页面顶部
    window.scrollTo(0, 0);
    return pageData;
}

// 根据目标页码生成分页栏
const showPageBar = (toPage) => {
    // 清空分页条 pageBar
    pageBar.innerHTML = ''
// 加载 上一页 按钮
    const upPage = document.createElement('div')
    upPage.className = 'pageItem'
    upPage.id = 'upPage'
    upPage.innerHTML = '上一页'
    // 添加点击事件
    upPage.addEventListener('click',() => {
        if(currentPageNum > 1){
            showThis(getCurrentShowCards(currentPageNum-1))
        }
    })
    // 添加到 分页条
    pageBar.appendChild(upPage)
    // 判断
    if(toPage <= 3){
    // 加载 前5页 按钮
        for(let i = 1; i <= Math.min(5,totalPages); i++){
            const firstPage = document.createElement('div')
            firstPage.className = 'pageItem'
            if(i == toPage){
                firstPage.className = 'pageItem pageItemActive'
            }
            firstPage.innerHTML = ''+i
            // 添加点击事件
            firstPage.addEventListener('click',() => {
                if(i == currentPageNum)return
                showThis(getCurrentShowCards(i))
            })
            // 添加到 分页条
            pageBar.appendChild(firstPage)
        }
        if(totalPages > 5){
            if(totalPages != 6){
            // 添加省略号
                const page = document.createElement('div')
                page.className = 'pageItem'
                page.innerHTML = '...'
                // 添加到 分页条
                pageBar.appendChild(page)
            }
        // 添加最后一列
            const LastPage = document.createElement('div')
            LastPage.className = 'pageItem'
            LastPage.innerHTML = ''+totalPages
            // 添加点击事件
            LastPage.addEventListener('click',() => {
                if(totalPages == currentPageNum)return
                showThis(getCurrentShowCards(totalPages))
            })
            // 添加到 分页条
            pageBar.appendChild(LastPage)
        }

    }else if(toPage >= totalPages - 2){
    // 加载 第一页 按钮
        const firstPage = document.createElement('div')
        firstPage.className = 'pageItem'
        firstPage.innerHTML = '1'
        // 添加点击事件
        firstPage.addEventListener('click',() => {
            if(1 == currentPageNum)return
            showThis(getCurrentShowCards(1))
        })
        // 添加到 分页条
        pageBar.appendChild(firstPage)
    // 添加省略号
        if(toPage - 5 > 1){
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 加载 末5页 按钮
        for(let i = Math.max(1,totalPages-4); i <= totalPages; i++){
            const thePage = document.createElement('div')
            thePage.className = 'pageItem'
            if(i == toPage){
                thePage.className = 'pageItem pageItemActive'
            }
            thePage.innerHTML = ''+i
            // 添加点击事件
            thePage.addEventListener('click',() => {
                if(i == currentPageNum)return
                showThis(getCurrentShowCards(i))
            })
            // 添加到 分页条
            pageBar.appendChild(thePage)
        }
    }else{
    // 加载 第一页 按钮
        const firstPage = document.createElement('div')
        firstPage.className = 'pageItem'
        firstPage.innerHTML = '1'
        // 添加点击事件
        firstPage.addEventListener('click',() => {
            if(1 == currentPageNum)return
            showThis(getCurrentShowCards(1))

        })
        // 添加到 分页条
        pageBar.appendChild(firstPage)
        if(toPage != 4){
        // 添加省略号
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 加载 中间五页 按钮
        for(let i = toPage-2; i <= toPage + 2; i++){
            const thePage = document.createElement('div')
            thePage.className = 'pageItem'
            if(i == toPage){
                thePage.className = 'pageItem pageItemActive'
            }
            console.log('添加第 '+ i + " 个,toPage为："+(i <= toPage));
            // 添加点击事件
            thePage.addEventListener('click',() => {
                if(i == currentPageNum)return
                showThis(getCurrentShowCards(i))
            })
            thePage.innerHTML = ''+i
            // 添加到 分页条
            pageBar.appendChild(thePage)
        }
        if(toPage != totalPages-3){
        // 添加省略号
            const page = document.createElement('div')
            page.className = 'pageItem'
            page.innerHTML = '...'
            // 添加到 分页条
            pageBar.appendChild(page)
        }
    // 添加最后一列
        const LastPage = document.createElement('div')
        LastPage.className = 'pageItem'
        LastPage.innerHTML = ''+totalPages
        // 添加点击事件
        LastPage.addEventListener('click',() => {
            if(totalPages == currentPageNum)return
            showThis(getCurrentShowCards(totalPages))
        })
        // 添加到 分页条
        pageBar.appendChild(LastPage)
    }


    
    // 加载 下一页 按钮
    const downPage = document.createElement('div')
    downPage.className = 'pageItem'
    downPage.id = 'downPage'
    downPage.innerHTML = '下一页'
    // 添加点击事件
    downPage.addEventListener('click',() => {
        if(currentPageNum < totalPages){
            showThis(getCurrentShowCards(currentPageNum+1))
        }
    })
    // 添加到 分页条
    pageBar.appendChild(downPage)
// 加载 页码 输入框
    const pageInput = document.createElement('input')
    pageInput.id = 'pageInput'
    pageInput.placeholder = '页码'
    // 添加到 分页条
    pageBar.appendChild(pageInput)
// 加载 跳转 按钮
    const toPageBtn = document.createElement('div')
    toPageBtn.id = 'toPageBtn'
    toPageBtn.innerHTML = '跳转'
    // 添加点击事件
    toPageBtn.addEventListener('click',() => {
        const toPage = document.getElementById('pageInput').value
        showThis(getCurrentShowCards(+toPage))
    })
    // 添加到 分页条
    pageBar.appendChild(toPageBtn)
}