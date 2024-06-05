let colors = ['#00bb55','#1ABDE6','#2688c9', '#d83372', '#d8c733', '#f38e54','#00FF66','#FF0033'];

document.addEventListener("DOMContentLoaded", function () {
    let randomTexts = ["520精品游戏资源中心?!", "欢迎你的到来!!"];
    const randomText = document.getElementById('randomText');
    let randomNum = Math.floor(Math.random() * randomTexts.length);
    console.log(randomNum);
    let curNum = 0;
    let testCurNum = randomTexts[randomNum].length;
    let showText = '';
    let luanma = '';


    let daziId;
    const startdazi = () => {
        daziId = setInterval(() => {
            if (curNum <= randomTexts[randomNum].length) {
                showText = randomTexts[randomNum].substring(0, curNum);
                luanma = getRandLuanma(testCurNum - curNum);
                randomText.innerHTML = showText + luanma;
                curNum++;
            } else {
                startluanma();
            }
        }, 100);
    }
    let luanmaId;
    const startluanma = () => {
        clearInterval(daziId);
        setTimeout(() => {
            luanmaId = setInterval(() => {
                showText = randomTexts[randomNum].substring(0, testCurNum);
                luanma = getRandLuanma(curNum - testCurNum);
                randomText.innerHTML = showText + luanma;
                testCurNum--;
                if (testCurNum < 0) {
                    randomNum = Math.floor(Math.random() * randomTexts.length);
                    curNum = 0;
                    testCurNum = randomTexts[randomNum].length;
                    luanma = '';
                    clearInterval(luanmaId);
                    startdazi();
                }
            }, 100)
        }, 600);
    }

    const getRandLuanma = (n) => {
        let luanma = '';
        let characters = 'ABC|DEFGHIJKLMNOPQRSTU{}!@#$%&()VWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < n; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            luanma += `<span style='color:${randomColor}'>${characters[randomIndex]}</span>`;
        }
        return luanma;
    }

    // 获取网站访问量
    var webUserVisit = document.getElementById('busuanzi_value_site_uv'); 
    var observer = new MutationObserver(function (mutationsList) { 
        for (var mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.target.id === 'busuanzi_value_site_uv') {
                var newPageViews = mutation.target.innerHTML; 
                randomTexts.push('您是本站第'+newPageViews+'个访客?!');
                randomTexts.push('本站共计被访问'+newPageViews+'次?!');
                observer.disconnect(); 
            } 
        } 
    }); 
    var config = { childList: true }; 
    observer.observe(webUserVisit, config); 

    // 开始打字
    startdazi();
});

const showTextSByS = (toShowTexts,element,isRandom) => {
    let toSNum = 0;
    if(isRandom){
        toSNum = Math.floor(Math.random() * toShowTexts.length);
    }
    let curNum = 0;
    let testCurNum = toShowTexts[toSNum].length;
    let showText = '';
    let luanma = '';


    let daziId;
    const startdazi = () => {
        daziId = setInterval(() => {
            if (curNum <= toShowTexts[toSNum].length) {
                showText = toShowTexts[toSNum].substring(0, curNum);
                luanma = getRandLuanma(testCurNum - curNum);
                element.innerHTML = showText + luanma;
                curNum++;
            } else {
                startluanma();
            }
        }, 100);
    }
    let luanmaId;
    const startluanma = () => {
        clearInterval(daziId);
        setTimeout(() => {
            luanmaId = setInterval(() => {
                showText = toShowTexts[toSNum].substring(0, testCurNum);
                luanma = getRandLuanma(curNum - testCurNum);
                element.innerHTML = showText + luanma;
                testCurNum--;
                if (testCurNum < 0) {
                    if(isRandom){
                        toSNum = Math.floor(Math.random() * toShowTexts.length);
                    }else{
                        toSNum = (toSNum+1)%toShowTexts.length;
                    }
                    curNum = 0;
                    testCurNum = toShowTexts[toSNum].length;
                    luanma = '';
                    clearInterval(luanmaId);
                    startdazi();
                }
            }, 100)
        }, 600);
    }

    const getRandLuanma = (n) => {
        let luanma = '';
        let characters = 'ABC|DEFGHIJK就发送警告肉帕文几个破防福你我他着王小蛮宝好MNOPQRSTU{}!@#$%&()VWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < n; i++) {
            var randomIndex = Math.floor(Math.random() * characters.length);
            let randomColor = colors[Math.floor(Math.random() * colors.length)];
            luanma += `<span style='color:${randomColor}'>${characters[randomIndex]}</span>`;
        }
        return luanma;
    }

    // 开始打字
    startdazi();
}

let homeDes = document.getElementById('homeDes');
if(homeDes != undefined){
    showTextSByS(["免费的热门游戏网站!","你想要的这里都有!"],homeDes,false);
}
