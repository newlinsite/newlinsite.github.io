
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

toggle = (tag, do1, do0) => {
    if (tag === 0) {
        do1()
    } else {
        do0()
    }
}


// ------------------------
// Delay
// ------------------------

// 創造容器
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

var videoTime = 0
function executeSeconds() {
    if (videoTime < 140) {
        videoTime = videoTime + 0.01
    } else {
        videoTime = 0
    }
    // console.log(videoTime)
}

// 啟動影片計時器
var timer = setInterval(executeSeconds, 10);


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

    // Up and Down
    this.upCloseTag = 0
    this.upClose = (position = "0.8%") => {
        this.object.style.paddingTop = position
        this.upCloseTag = 1
    }
    this.disUpClose = (position = "14.5%") => {
        this.object.style.paddingTop = position
        this.upCloseTag = 0
    }
    this.upCloseToggle = () => {
        toggle(this.upCloseTag, this.upClose, this.disUpClose)
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


    this.input = (source) => {
        this.object.replaceChild(source, this.object.firstChild);
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
    this.source.currentTime = videoTime
}


var VM = function () {
    this.source = []
    this.input = (source) => {
        this.source.push(source)
    }

    this.out = []
    this.output = (oNum, iNum) => {
        this.out[oNum] = this.source[iNum].cloneNode(true);
    }
}


























var s01 = new Media("element/01.png")
var s02 = new Media("element/video.mp4")

var VM01 = new VM()

VM01.input(s01.source)
VM01.input(s02.source)
VM01.output(0, 0)
VM01.output(1, 1)

test(VM01.out)

var display = []
display[0] = new VkObject($css("display")[0])
display[1] = new VkObject($css("display")[1])





// display[0].input(VM01.out[0])
display[1].input(VM01.out[1])




window.addEventListener("keydown", keyboardListener, false);

function keyboardListener(e) {
    var keyID = e.code;
    if (keyID === 'KeyQ') {
        VM01.output(0, 0)
        display[0].input(VM01.out[0])
        test("Q")
    }
    if (keyID === 'KeyA') {
        VM01.output(0, 1)
        display[0].input(VM01.out[0])
        test("A")
    }
}