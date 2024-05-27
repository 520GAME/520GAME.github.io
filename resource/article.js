const articlePage = document.getElementById('articlePage')
const articleRight = document.getElementById('articleRight')
const myGod = document.getElementById('myGod')

let maxMyGodH = articlePage.clientHeight - articleRight.clientHeight;
window.onload =() => {
    maxMyGodH = articlePage.clientHeight - articleRight.clientHeight;
    // console.log('articlePage.clientHeight',articlePage.clientHeight);
    // console.log('articleRight.clientHeight',articleRight.clientHeight);
    // console.log('maxMyGodH::',maxMyGodH);

    if(maxMyGodH > 0){
        // 根据滚动判断是否固定页面
        window.addEventListener('scroll', function() {
            if(window.innerWidth >= 1000){
                var scrollDistance = window.pageYOffset || document.documentElement.scrollTop;
                if(scrollDistance >= articleRight.offsetTop-70){
                    let myGodHeight = scrollDistance+70-articleRight.offsetTop
                    if(myGodHeight >= maxMyGodH){
                        myGodHeight = maxMyGodH;
                    }
                    console.log('myGodHeight',myGodHeight);
                    myGod.style.height = myGodHeight +'px'
                    console.log('myGod',myGod.offsetHeight);
                }else{
                    myGod.style.height = '0px'
                    console.log('回到顶部，myGod置为0');
                }
                console.log('scrollDistance',scrollDistance);
                // console.log(articlePage.offsetTop,articlePage.clientHeight);
                // console.log(articleRight.offsetTop,articleRight.clientHeight);
            }
        });
    }
}

window.addEventListener('resize',() => {
    maxMyGodH = articlePage.clientHeight - articleRight.clientHeight + myGod.offsetHeight;
     console.log('maxMyGodH',maxMyGodH);
})



// 获取标题 前往下载 gotoDown
const gotoDown = document.getElementById('gotoDown')


if(gotoDown != null){
    gotoDown.addEventListener('click',() => {
        const downLoad = document.getElementById('downLoad')
        downLoad.scrollIntoView({behavior:'smooth'})
    })
}


function goLink(link){
    document.location.href = link
}

const articleTags = document.getElementById('articleTags')
if(articleTags != undefined){
    const tags = articleTags.children;
    for(let i = 0; i < tags.length; i++){
        tags[i].addEventListener('click',() => {
            // 搜索标签
            let ref = '../../index.html?search='+tags[i].innerHTML
            window.location.href = ref
        })
    }
}

const articleTagTus = document.getElementById('articleTagTus')
if(articleTagTus != undefined){
    const tagTus = articleTagTus.children;
    for(let i = 0; i < tagTus.length; i++){
        tagTus[i].addEventListener('click',() => {
            // 搜索标签
            let ref = '../../html/18tu.html?text='+tagTus[i].innerHTML
            window.location.href = ref
        })
    }
}



// 删除第三方标志
let vpower = document.getElementsByClassName('vpower')[0];
vpower.innerHTML = ''