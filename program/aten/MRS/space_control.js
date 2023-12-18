
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

        if (source.deviceType == "media") {

            this.source = source.output.cloneNode(true);
            this.source.currentTime = videoTime
            this.object.replaceChild(this.source, this.object.firstChild);
        }


        if (source.deviceType == "vp") {
            this.source = source.output.cloneNode(true);
            this.object.replaceChild(this.source, this.object.firstChild);

            // 嘗試尋找物件裡面有 影片物件 的話將其時間同步
            try {
                this.vpVideos = this.object.querySelectorAll("video")
                for (let i = 0; i < source.input.length; i++) {
                    this.vpVideos[i].currentTime = videoTime
                }
            } catch {
                // test("no image in vp")
            }
        }

    }
}



var Media = function (link) {

    this.deviceType = "media"

    if (link.includes(".png") || link.includes(".jpg") || link.includes(".gif")) {
        type = "img"
    } else if (link.includes(".mp4") || link.includes(".mov")) {
        type = "video"
    } else {
        type = "div"
    }
    this.output = document.createElement(type);
    this.output.src = link
    this.output.autoplay = true;
    this.output.loop = true;
    this.output.muted = true;
}




var VP01 = function (source = []) {

    this.deviceType = "vp"


    //把所有 source 複製進來
    this.input = []
    source.forEach(s => this.input.push(s.output.cloneNode(true)))

    //把所有 source 外面套上 box
    this.vpBox = []
    for (let i = 0; i < this.input.length; i++) {
        this.vpBox.push(document.createElement("div"))
        this.vpBox[i].classList = "vpBox"
        this.vpBox[i].appendChild(this.input[i])
    }

    //最後新增8個黑畫面物件
    this.inLen = this.input.length
    for (let i = 0; i < 8; i++) {
        this.vpBox[this.inLen + i] = document.createElement("div")
        this.vpBox[this.inLen + i].style.backgroundColor = "#000"
        this.vpBox[this.inLen + i].style.width, this.vpBox[this.inLen].style.height = "100%"
    }



    //創造 輸出用物件 ---------------------------------------------------------
    this.output = document.createElement("div")
    this.output.classList = "vpOutput"


    // 把 box 根據 layout 設定丟進 輸出用物件
    this.changeLayout = (viewLayout = "single", sNum = [0, 1, 2, 3]) => {

        // 清空 div 元素中的所有子元素
        while (this.output.firstChild) {
            this.output.removeChild(this.output.firstChild);
        }

        //避免少填物件預設填入 黑畫面 vpBox[最後] 8次
        for (let i = 0; i < 8; i++) {
            sNum.push(this.inLen + i)
        }

        // 所有 layout 歸零
        for (let i = 0; i < this.vpBox.length; i++) {
            this.vpBox[i].style.width = "100%"
            this.vpBox[i].style.height = "100%"
            this.vpBox[i].style.top = "0"
            this.vpBox[i].style.left = "0"
            this.vpBox[i].classList.remove("coverH")
        }

        // 開始換 view layout
        if (viewLayout == "pip") {
            this.output.appendChild(this.vpBox[sNum[0]])
            this.output.appendChild(this.vpBox[sNum[1]])
            this.vpBox[sNum[1]].style.width = "45%"
            this.vpBox[sNum[1]].style.height = "45%"
            this.vpBox[sNum[1]].style.top = "50%"
            this.vpBox[sNum[1]].style.left = "52%"
        } else if (viewLayout == "pbp") {
            this.output.appendChild(this.vpBox[sNum[0]])
            this.output.appendChild(this.vpBox[sNum[1]])
            this.vpBox[sNum[0]].style.width = "50%"
            this.vpBox[sNum[0]].classList.add("coverH")
            this.vpBox[sNum[1]].style.width = "50%"
            this.vpBox[sNum[1]].style.left = "50%"
            this.vpBox[sNum[1]].classList.add("coverH")
        } else if (viewLayout == "pop") {
            this.output.appendChild(this.vpBox[sNum[0]])
            this.output.appendChild(this.vpBox[sNum[1]])
            this.vpBox[sNum[0]].style.width = "50%"
            this.vpBox[sNum[0]].style.height = "50%"
            this.vpBox[sNum[0]].style.top = "25%"
            this.vpBox[sNum[1]].style.width = "50%"
            this.vpBox[sNum[1]].style.height = "50%"
            this.vpBox[sNum[1]].style.top = "25%"
            this.vpBox[sNum[1]].style.left = "50%"
        } else if (viewLayout == "4x") {
            for (let i = 0; i < 4; i++) {
                this.output.appendChild(this.vpBox[sNum[i]])
                this.vpBox[sNum[i]].style.width = "50%"
                this.vpBox[sNum[i]].style.height = "50%"
            }
            this.vpBox[sNum[1]].style.top = "0"
            this.vpBox[sNum[1]].style.left = "50%"
            this.vpBox[sNum[2]].style.top = "50%"
            this.vpBox[sNum[2]].style.left = "0"
            this.vpBox[sNum[3]].style.top = "50%"
            this.vpBox[sNum[3]].style.left = "50%"
        }
        else {
            this.output.appendChild(this.vpBox[sNum[0]])
        }

    }

    this.output.appendChild(this.vpBox[0])

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

//上方欄生成
//側邊主功能欄生成
//功能 ACTION
//     主元素: ipad keypad 右側說明欄
//     互動元素 中間小物、環境、溫溼度



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


var vp = new VP01([media[0], media[1], media[1], media[0]])



///---------------------------------
//
//
//      進場
//
//
///---------------------------------


display[1].input(media[1])

display[0].input(vp)


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
            () => { display[1].input(media[0]) },
            () => { display[1].input(media[1]) })

    }
    if (keyID === 'KeyA') {
        display[1].hiddenToggle()
    }

    if (keyID === 'KeyW') {

        display[0].tag02 = toggle(display[0].tag02,
            () => {
                vp.changeLayout("4x")
                display[0].input(vp)
            },
            () => {
                vp.changeLayout("pbp", [0, 1])
                display[0].input(vp)
            })


    }
    if (keyID === 'KeyS') {
        vp.changeLayout("pop", [0, 1])
        display[0].input(vp)
    }
}