
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//  
//  基礎 Function
//  
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------


var $id = function (name) {
    return document.getElementById(name)
}
var $css = function (name) {
    return document.getElementsByClassName(name)
}
var $tag = function (name) {
    return document.getElementsByTagName(name)
}

var test = function (print = "test") {
    console.log(print)
}




// ------------------------
// toggle
// ------------------------

toggle = (tag, do1, do0, autoSwitchTag = true) => {
    if (tag === 0) {
        do1()
        if (autoSwitchTag) {
            return 1;
        }
    } else {
        do0()
        if (autoSwitchTag) {
            return 0;
        }
    }
}


// ------------------------
// Delay
// ------------------------

// 創造 Delay 容器
var delayContainer = []
for (let i = 0; i < 20; i++) {
    delayContainer.push({ id: null })
}
//delay fuction
delay = (doSomething, delayTime, num = 0, cancelDalay = true) => {

    if (delayContainer[num].id !== null) {
        //如 delay 執行中則取消此 delay 後不動作
        if (cancelDalay) {
            clearTimeout(delayContainer[num].id);
            delayContainer[num].id = null
            console.log("clear delay", num)
        }
        //如 cancelDalay =/= true ，則 delay 執行中不動作
    }
    //執行 delay 動作
    else {
        delayContainer[num].id = setTimeout(() => {
            doSomething()
            delayContainer[num].id = null
        }, delayTime);
    }
}

//delay 紀錄
//


// ------------------------
// 影片計時器
// ------------------------

var videoTimeFull = 120
var videoTimeRefresh = 0.01
var videoTime = 0

function executeSeconds() {
    if (videoTime < videoTimeFull + videoTimeRefresh) {
        videoTime = videoTime + videoTimeRefresh
    } else {
        videoTime = 0
    }
    // console.log(videoTime)
}

// 啟動影片計時器
var timer = setInterval(executeSeconds, videoTimeRefresh * 1000);


//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//
//  創立控制單體
//  - 包含一些動作以及狀態
//  - 包含常用 Toggle 功能
//  
//  --- 顯示 (透明度)
//  --- 高度
//  --- 開關 (自由樣式)
//  --- 自動樣式與標籤*3
//  --- 訊源導入
//  --- 


//  -------------------------------------------------------------------
//  -------------------------------------------------------------------

var VkObject = function (object) {

    // define
    this.object = object
    this.tag = 0


    // Appear, Opacity
    this.appearTag = 1
    this.appear = () => {
        this.object.style.opacity = 1
        this.appearTag = 1
    }
    this.disappear = () => {
        this.object.style.opacity = 0
        this.appearTag = 0
    }
    this.appearToggle = () => {
        toggle(this.appearTag, this.appear, this.disappear)
    }
    this.customOpacity = (opacity) => {
        this.object.style.opacity = opacity
        this.appearTag = opacity
    }


    // hidden
    this.hiddenTag = 0
    this.hidden = () => {
        this.object.style.display = "none"
        this.hiddenTag = 1
    }
    this.disHidden = () => {
        this.object.style.display = ""
        this.hiddenTag = 0
    }
    this.hiddenToggle = () => {
        toggle(this.hiddenTag, this.hidden, this.disHidden)
    }



    // On and Off
    this.onTag = 0
    this.on = (style = "on") => {
        this.object.classList.add(style)
        this.onTag = 1
    }
    this.off = (style = "on") => {
        this.object.classList.remove(style)
        this.onTag = 0
    }
    this.onToggle = () => {
        toggle(this.onTag, this.on, this.off)
    }

    // press
    this.press = (style = "press", time = 200) => {
        this.object.classList.add(style)
        setTimeout(() => {
            this.object.classList.remove(style)
        }, time);
    }


    // 新增css
    this.addCss = (style) => {
        this.object.classList.add(style)
    }
    this.removeCss = (style) => {
        this.object.classList.remove(style)
    }

    this.tag01 = 0
    this.tag02 = 0
    this.tag03 = 0


    // 新增視訊
    this.input = (source) => {
        try {
            this.source = source.cloneNode(true);
            this.object.replaceChild(this.source, this.object.firstChild);
            this.source.currentTime = videoTime
        } catch {
            test("input error")
        }

    }


}



var Media = function (link) {
    if (link.includes(".png") || link.includes(".jpg") || link.includes(".gif")) {
        type = "img"
    } else if (link.includes(".mp4") || link.includes(".mov")) {
        type = "video"
    } else {
        type = "div"
    }
    this.source = document.createElement(type);
    this.source.src = link
    this.source.autoplay = true;
    this.source.loop = true;
    this.source.muted = true;
}


var VP01 = function (source = []) {
    // source 換
    // layput
}

var VP02 = function (source = []) {
    //
    //
}

var VW = function (source = []) {
    // 跑馬燈 文字 位置 顏色 跑速度 Marquee
    // 背景
    // Source
    // 各 Source 大小 位置 裁切
}





///---------------------------------
//
//
//      環境架設
//
//
///---------------------------------


var media = []
media[0] = new Media("element/01.png")
media[1] = new Media("element/video.mp4")


var display = []
display[0] = new VkObject($css("display")[0])
display[1] = new VkObject($css("display")[1])





///---------------------------------
//
//
//      進場
//
//
///---------------------------------


display[1].input(media[1].source)



///---------------------------------
//
//
//      互動
//
//
///---------------------------------

window.addEventListener("keydown", keyboardListener, false);

function keyboardListener(e) {
    var keyID = e.code;
    if (keyID === 'KeyQ') {

        display[1].tag01 = toggle(display[1].tag01,
            () => { display[1].input(media[0].source) },
            () => { display[1].input(media[1].source) })

    }
    if (keyID === 'KeyA') {
        display[1].hiddenToggle()
    }

    if (keyID === 'KeyW') {
        display[0].input(media[0].source)

    }
    if (keyID === 'KeyS') {
        display[0].input(media[1].source)

    }
}