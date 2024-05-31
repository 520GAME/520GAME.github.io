const cate_tagNew = document.getElementById('tag-new');
const cate_tagNew_input = document.getElementById('tagNew');
const cate_tagRandom = document.getElementById('tag-random');
const cate_tagRandom_input = document.getElementById('tagRand');
const cate_tagCapacity = document.getElementById('tag-capacity');
const cate_tagCapacity_input = document.getElementById('tagCapacity');
const cate_tagFire = document.getElementById('tag-fire');
const cate_tagFire_input = document.getElementById('tagFire');
const pageBar = document.getElementById('pageBar');
const containerCards = document.getElementById('container-cards');
const categoryTagsUl = document.getElementById('category-tags-ul');

cate_tagNew.addEventListener('click',() => {
    if(currentClassifyText == '全部'){
        getCurrentClassifyCards();
        console.log('全部',currentClassifyCards);
        showThis(getCurrentShowCards(1));
    }else{
        getCurrentClassifyCards(currentClassifyText);
        showThis(getCurrentShowCards(1));
    }
})
cate_tagRandom.addEventListener('click',() => {
    currentClassifyCards.sort(() => Math.random() - 0.5);
    showThis(getCurrentShowCards(1));
})
cate_tagCapacity.addEventListener('click',() => {
    currentClassifyCards.sort((a,b) => parseFloat(b.capacity) - parseFloat(a.capacity));
    showThis(getCurrentShowCards(1));
})
cate_tagFire.addEventListener('click',() => {
    currentClassifyCards.sort((a,b) => parseFloat(b.grade) - parseFloat(a.grade));
    showThis(getCurrentShowCards(1));
})

const cate_tag = document.getElementsByClassName('tag');
for(let i = 0; i < cate_tag.length; i++){
    cate_tag[i].addEventListener('click',() => {
        currentClassifyText = cate_tag[i].innerHTML;
        if(cate_tag[i].innerHTML == '全部'){
            getCurrentClassifyCards();
            showThis(getCurrentShowCards(1));
        }else{
            getCurrentClassifyCards(cate_tag[i].innerHTML);
            showThis(getCurrentShowCards(1));
        }
        cate_tagNew_input.checked = true;
        cate_tagRandom_input.checked = false;
    })
}


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
    getCurrentClassifyCards();
    showThis(getCurrentShowCards(1));

    // 解析 URL 中的参数
    var urlParams = new URLSearchParams(window.location.search);
    var categoryText = urlParams.get('text');
    if(categoryText!=null && categoryText != ''){
        let exsits = false;
        for(let i = 0; i < cate_tag.length; i++){
            if(cate_tag[i].innerHTML == categoryText){
                exsits = true;
                
                getCurrentClassifyCards(cate_tag[i].innerHTML);
                showThis(getCurrentShowCards(1));
                 // 创建鼠标点击事件
                var clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });

                // 模拟触发点击事件
                cate_tag[i].dispatchEvent(clickEvent);
            }
        }
        if(!exsits){
            // 创建li元素
            var li = document.createElement('li');

            // 创建a元素
            var a = document.createElement('a');
            a.setAttribute('href', '#');

            // 创建input元素
            var input = document.createElement('input');
            input.setAttribute('type', 'radio');
            input.setAttribute('name', 'tags');
            input.setAttribute('id', 'tag999');

            // 创建label元素
            var label = document.createElement('label');
            label.setAttribute('id', 'tag999');
            label.setAttribute('class', 'tag');
            label.setAttribute('for', 'tag999');
            label.textContent = categoryText;
            label.addEventListener('click',() => {
                currentClassifyText = label.innerHTML;
                if(label.innerHTML == '全部'){
                    getCurrentClassifyCards();
                    showThis(getCurrentShowCards(1));
                }else{
                    getCurrentClassifyCards(label.innerHTML);
                    showThis(getCurrentShowCards(1));
                }
                input.checked = true;
            })

            // 将input和label添加到a元素中
            a.appendChild(input);
            a.appendChild(label);

            // 将a添加到li元素中
            li.appendChild(a);

            // 将li元素添加到页面中的某个元素中，例如id为"list"的ul或ol元素
            categoryTagsUl.appendChild(li);

             // 创建鼠标点击事件
             var clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });

            // 模拟触发点击事件
            label.dispatchEvent(clickEvent);
        }
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
        let classifyList = card.classify.split('|');
        let showClassify = '';
        let showClassify2 = '';
        if(currentClassifyText == '全部'){
            showClassify = classifyList[0];
        }else{
            showClassify = currentClassifyText;
        }
        showClassify2 = (showClassify == classifyList[0]) ? classifyList[1] : classifyList[0];
        showCards += `<div class="container-card">
            <a class="con-card-img" a itemprop="url" rel="bookmark" href="/articles/${card.id}.html"
                title="${card.detail}" target="_blank"
                style="background-image: url('${card.img}');"></a>
            <div class="con-card-classifyList">
                <div class="con-card-classify"><a href="/category.html?text=${showClassify}">${showClassify}</a></div>
                <div class="con-card-classify2"><a href="/category.html?text=${showClassify2}">${showClassify2}</a></div>
            </div>
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
const getCurrentClassifyCards = (classify) => {
    let cur = [];
    if(classify == undefined){
        // 计算总页数
        totalPages = Math.ceil(allCards.length / perPageNum);
        allCards.forEach(card=>{
            cur.push(card);
        })
    }else{
        allCards.forEach(card=>{
            if(card.classify != undefined && card.classify.includes(classify)){
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