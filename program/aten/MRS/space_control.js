
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

var VkObject = function (object, sizeRatio = [10, 1.77], position = [50, 50, 50], rotate = [0, 0, 0], deviceType = "VkObject", videoWall = false, borderSize = 1) {


    this.object = object


    // -----------------
    //
    // object define
    //
    // -----------------

    this.deviceType = deviceType

    // 長寬 Size
    this.width = sizeRatio[0]
    this.height = sizeRatio[0] / sizeRatio[1]
    this.object.style.width = this.width + "%"
    this.object.style.paddingTop = this.height + "%"


    // 位置與旋轉

    this.object.style.left = position[0] + "%"
    this.object.style.top = position[1] + "%"
    this.z = position[2] * spaceW / 100
    this.object.style.transform = "translate3d(-50%, -50%, " + this.z +
        "px) rotateX(" + rotate[0] +
        "deg) rotateY(" + rotate[1] +
        "deg) rotateZ(" + rotate[2] + "deg)"



    // defaut value

    this.tag01 = 0
    this.tag02 = 0
    this.tag03 = 0




    // -----------------
    //
    // 物件動作
    //
    // -----------------


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


    // -----------------
    //
    // display define
    //
    // -----------------

    if (this.deviceType == "display") {

        this.displayBorder = this.width / 6 * borderSize
        this.object.style.border = this.displayBorder + "px solid #000"
        this.object.style.borderRadius = this.displayBorder + "px"
        this.object.appendChild(document.createElement("span"))

        // 加入電視牆隔線 ex: display[2].videoWall 3*3 = [ 3,3 ]
        if (videoWall != false) {
            // 直線
            this.videoWallLineH = []
            for (let i = 0; i < videoWall[0] - 1; i++) {
                this.videoWallLineH[i] = document.createElement("div")
                this.videoWallLineH[i].style.height = "100%"
                this.videoWallLineH[i].style.width = 0.6 * this.displayBorder + "px"
                this.videoWallLineH[i].style.backgroundColor = "#000"
                this.videoWallLineH[i].style.top = 0
                this.videoWallLineHP = 100 / videoWall[0] * (i + 1)
                this.videoWallLineH[i].style.left = this.videoWallLineHP + "%"
                this.object.appendChild(this.videoWallLineH[i])
            }
            // 橫線
            this.videoWallLineW = []
            for (let i = 0; i < videoWall[1] - 1; i++) {
                this.videoWallLineW[i] = document.createElement("div")
                this.videoWallLineW[i].style.width = "100%"
                this.videoWallLineW[i].style.height = 0.6 * this.displayBorder + "px"
                this.videoWallLineW[i].style.backgroundColor = "#000"
                this.videoWallLineW[i].style.left = 0
                this.videoWallLineWP = 100 / videoWall[1] * (i + 1)
                this.videoWallLineW[i].style.top = this.videoWallLineWP + "%"
                this.object.appendChild(this.videoWallLineW[i])
            }
        }

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
    this.output.muted = true;
    this.output.defaultMuted = true;
    this.output.autoplay = true;
    this.output.loop = true;
}





var VP = function (source = []) {

    this.deviceType = "vp"

    // 新增輸出用物件 
    this.output = document.createElement("div")
    this.output.classList = "vpOutput"


    //------------------------------------------------------
    //
    // source 前置作業
    //
    //------------------------------------------------------


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

    //最後新增 10 個黑畫面物件，用於 Source 不夠補畫面用
    this.inLen = this.input.length
    for (let i = 0; i < 11; i++) {
        this.vpBox[this.inLen + i] = document.createElement("div")
        this.vpBox[this.inLen + i].style.backgroundColor = "#111"
        this.vpBox[i].classList = "vpBox"
    }


    //------------------------------------------------------
    //
    // 把 vpbox 根據 layout 設定丟進 輸出用物件
    //
    //------------------------------------------------------


    // 切換 layout 功能
    this.changeLayout = (viewLayout = "single", sNum = [0, 1, 2, 3, 4, 5, 6], vwCell = []) => {

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

        // -----------------------------------------
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
        } else if (Array.isArray(viewLayout)) { //多分割 [2,2] => 2x2分割

            // 設定各視窗大小
            this.cellW = 100 / viewLayout[0]
            this.cellH = 100 / viewLayout[1]
            for (let i = 0; i < 6; i++) {
                this.output.appendChild(this.vpBox[sNum[i]])
                this.vpBox[sNum[i]].style.width = this.cellW + "%"
                this.vpBox[sNum[i]].style.height = this.cellH + "%"
            }

            // 設定各視窗位置
            this.cellX = 0
            this.cellY = this.cellH * -1
            for (let i = 0; i < 6; i++) {
                // 設定 X
                if (i % (viewLayout[0]) == 0) {
                    this.cellX = 0
                } else {
                    this.cellX = this.cellX + this.cellW
                }
                // 設定 Y
                if (i % viewLayout[0] == 0) {
                    this.cellY = this.cellY + this.cellH
                }
                this.vpBox[sNum[i]].style.left = this.cellX + "%"
                this.vpBox[sNum[i]].style.top = this.cellY + "%"
            }
        } else if (viewLayout == "2x3ssm") {
            for (let i = 0; i < 3; i++) {
                this.output.appendChild(this.vpBox[sNum[i]])
                this.vpBox[sNum[i]].style.width = "33.3%"
                this.vpBox[sNum[i]].style.height = "50%"
                this.vpBox[sNum[i]].style.left = "0"
            }
            this.vpBox[sNum[1]].style.top = "50%"
            this.vpBox[sNum[2]].style.width = "66.67%"
            this.vpBox[sNum[2]].style.height = "100%"
            this.vpBox[sNum[2]].style.top = "0"
            this.vpBox[sNum[2]].style.left = "33.33%"
        } else if (viewLayout == "2x3mss") {
            for (let i = 0; i < 3; i++) {
                this.output.appendChild(this.vpBox[sNum[i]])
                this.vpBox[sNum[i]].style.width = "33.3%"
                this.vpBox[sNum[i]].style.height = "50%"
                this.vpBox[sNum[i]].style.left = "66.67%"
            }
            this.vpBox[sNum[1]].style.top = "50%"
            this.vpBox[sNum[2]].style.width = "66.67%"
            this.vpBox[sNum[2]].style.height = "100%"
            this.vpBox[sNum[2]].style.top = "0"
            this.vpBox[sNum[2]].style.left = "0"
        } else if (viewLayout == "VW") {

            for (let i = vwCell.length + 1; i > 0; i--) {
                this.output.appendChild(this.vpBox[sNum[i]])
            }

            for (let i = 1; i < vwCell.length + 1; i++) {
                this.vpBox[sNum[i]].style.width = vwCell[i - 1].w + "%"
                this.vpBox[sNum[i]].style.height = "auto"
                this.vpBox[sNum[i]].style.paddingTop = vwCell[i - 1].h + "%"
                this.vpBox[sNum[i]].style.left = vwCell[i - 1].x + "%"
                this.vpBox[sNum[i]].style.top = vwCell[i - 1].y + "%"

                //裁切功能晚點做...
                // this.input[sNum[i]].style.width = vwCell[i - 1].cropTo[0] * 10 + "%"
                // this.input[sNum[i]].style.top = 0
                // this.input[sNum[i]].style.left = 0
                // this.input[sNum[i]].style.hight = "auto"
                // this.input[sNum[i]].style.transform = "translate(0, 0)"

                //跑馬燈
                //時鐘

            }
        }
        else {
            this.output.appendChild(this.vpBox[sNum[0]])
        }
    }

    // 預設輸出
    this.output.appendChild(this.vpBox[0])
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
//物件3D



//---------------------------------
//
//      選單生成
//
//---------------------------------

var flowMenu = $css("flowMenuBoxs")[0]

var featureMenu = function (num) {

    this.flow = document.createElement("div")
    this.flow.classList = "flowMenu"
    this.flow.appendChild(document.createTextNode(featureMenuContent[num].flow))
    this.featurMenu = document.createElement("div")
    this.featurMenu.classList = "featureMenu"

    this.feature = []
    this.namebox = []
    this.icon = []
    this.name = []
    this.describe = []

    // 創立各 feature 功能按鈕，並填入功能
    for (let i = 0; i < featureMenuContent[num].feature.length; i++) {

        this.feature[i] = document.createElement("div")
        this.namebox[i] = document.createElement("div")
        this.icon[i] = document.createElement("img")
        this.name[i] = document.createElement("p")
        this.describe[i] = document.createElement("div")

        this.namebox[i].classList = "namebox"
        this.describe[i].classList = "describe"

        //填入內容
        if (featureMenuContent[num].feature[i][0] == null) {
            featureMenuContent[num].feature[i][0] = "element/icon_share.png"
        }
        this.icon[i].src = featureMenuContent[num].feature[i][0]
        this.name[i].appendChild(document.createTextNode(featureMenuContent[num].feature[i][1]))
        this.describe[i].appendChild(document.createTextNode(featureMenuContent[num].feature[i][2]))

        //放入featureMunu
        this.featurMenu.appendChild(this.feature[i])
        this.feature[i].appendChild(this.namebox[i])
        this.feature[i].appendChild(this.describe[i])
        this.namebox[i].appendChild(this.icon[i])
        this.namebox[i].appendChild(this.name[i])
    }
    flowMenu.appendChild(this.flow)
    container.appendChild(this.featurMenu)
}



var featureMenuContent = []



featureMenuContent[0] = {
    flow: "Turn on",
    feature: [[
        "element/icon_share.png",
        "Local Content Sharing",
        "All attendees are allow to quickly share content with their personal devices."
    ], [
        "element/icon_share.png",
        "Enviromental Control",
        "By detecting meeting environment factors, environmental equipment can be automatically turned on or off to allow the meeting to proceed smoothly."
    ], [
        "element/icon_controls.png",
        "",
        ""
    ], [
        // "element/icon_.png",
        // "",
        // ""
    ], [
        // "element/icon_.png",
        // "",
        // ""
    ]]
}


featureMenuContent[1] = {
    flow: "Round Table",
    feature: [[
        "element/icon_share.png",
        "Local Content Sharing",
        "All attendees are allow to quickly share content with their personal devices."
    ], [
        "element/icon_share.png",
        "Enviromental Control",
        "By detecting meeting environment factors, environmental equipment can be automatically turned on or off to allow the meeting to proceed smoothly."
    ], [
        "element/icon_controls.png",
        "",
        ""
    ], [
        // "element/icon_.png",
        // "",
        // ""
    ], [
        // "element/icon_.png",
        // "",
        // ""
    ]]
}










///---------------------------------
//
//
//      環境架設
//
//
///---------------------------------

const container = $css("container")[0]
const space = $css("space")[0]
const camera = $css("camera")[0]
const spaceW = space.clientWidth
const spaceH = space.clientHeight
const spaceR = spaceW / spaceH

//創立 spaceWall 並入場
//[空間寬度,空間高度,空間深度,空間底部平面]
var spaceSize = [60, 27.5, 100, -50]

// 定義透視程度
var spacePerspectRate = 1
space.style.perspective = spaceW * spacePerspectRate + "px"


// 創立牆壁功能
var createWall = (wallcount = 11) => {
    var spaceWallAttr = [
        { size: [spaceSize[0], spaceSize[0] / spaceSize[1]], xyz: [50, 50, spaceSize[3]], xyzR: [0, 0, 0], main: true },
        //垂直牆面
        { size: [spaceSize[2], spaceSize[2] / spaceSize[1]], xyz: [50 - spaceSize[0] / 2, 50, 0], xyzR: [0, 90, 0], main: true },
        { size: [spaceSize[2], spaceSize[2] / spaceSize[1]], xyz: [50 + spaceSize[0] / 2, 50, 0], xyzR: [0, 90, 0], main: true },
        //平行牆面
        { size: [spaceSize[0], spaceSize[0] / spaceSize[2]], xyz: [50, 50 - spaceSize[1] * spaceR / 2, 0], xyzR: [90, 0, 0], main: true },
        { size: [spaceSize[0], spaceSize[0] / spaceSize[2]], xyz: [50, 50 + spaceSize[1] * spaceR / 2, 0], xyzR: [90, 0, 0], main: true },
        //垂直中間牆面
        { size: [spaceSize[2], spaceSize[2] / spaceSize[1]], xyz: [50 - spaceSize[0] / 4, 50, 0], xyzR: [0, 90, 0], main: false },
        { size: [spaceSize[2], spaceSize[2] / spaceSize[1]], xyz: [50, 50, 0], xyzR: [0, 90, 0], main: false },
        { size: [spaceSize[2], spaceSize[2] / spaceSize[1]], xyz: [50 + spaceSize[0] / 4, 50, 0], xyzR: [0, 90, 0], main: false },
        //平行中間牆面
        { size: [spaceSize[0], spaceSize[0] / spaceSize[2]], xyz: [50, 50 - spaceSize[1] * spaceR / 4, 0], xyzR: [90, 0, 0], main: false },
        { size: [spaceSize[0], spaceSize[0] / spaceSize[2]], xyz: [50, 50, 0], xyzR: [90, 0, 0], main: false },
        { size: [spaceSize[0], spaceSize[0] / spaceSize[2]], xyz: [50, 50 + spaceSize[1] * spaceR / 4, 0], xyzR: [90, 0, 0], main: false },
        //自訂牆面
    ]

    var spaceWall = []
    for (let i = 0; i < wallcount; i++) {
        spaceWall[i] = new VkObject(document.createElement("div"),
            spaceWallAttr[i].size,
            spaceWallAttr[i].xyz,
            spaceWallAttr[i].xyzR,
            "spaceWall")
        spaceWall[i].object.classList = "spaceWall"
        if (spaceWallAttr[i].main) {
            spaceWall[i].object.classList.add("main")
        }
        camera.appendChild(spaceWall[i].object)
    }
}



// 開始創立牆壁
// createWall()
createWall(5) //只創立四邊的牆壁


// 開始創立選單
var menu = []
for (let i = 0; i < featureMenuContent.length; i++) {
    menu[i] = new featureMenu(i)
}





///---------------------------------
//
//
//      設備架設
//
//
///---------------------------------


//-----------------------------
// Media
//-----------------------------


var media = []
media[0] = new Media("element/01.png")
media[1] = new Media("element/video.mp4")



//-----------------------------
// Display
//-----------------------------

//設定所有 display 屬性
var displayAttr = [
    { size: [20, 16 / 9], xyz: [30.0, 50.0, -50], xyzR: [0.00, 45.0, 0.00], videoWall: [0, 0], border: 1, name: "" },
    { size: [20, 16 / 9], xyz: [50.0, 50.0, -50], xyzR: [0.00, 0.00, 0.00], videoWall: [2, 2], border: 1, name: "" },
    { size: [20, 16 / 9], xyz: [70.0, 50.0, -50], xyzR: [0.00, -45.0, 0.00], videoWall: [3, 3], border: 1, name: "" },
    { size: [20, 16 / 9], xyz: [80.0, 50.0, -10], xyzR: [0.00, -90.0, 0.00], videoWall: [0, 0], border: 1, name: "" },
    { size: [20, 16 / 9], xyz: [80.0, 50.0, -32], xyzR: [0.00, -90.0, 0.00], videoWall: [0, 0], border: 1, name: "" }
]

//創立 display 並入場
var display = []
for (let i = 0; i < displayAttr.length; i++) {
    display[i] = new VkObject(document.createElement("div"),
        displayAttr[i].size,
        displayAttr[i].xyz,
        displayAttr[i].xyzR,
        "display",
        displayAttr[i].videoWall,
        displayAttr[i].border)
    display[i].object.classList = "display"
    camera.appendChild(display[i].object)
}

//創立 VP
var vp = new VP([
    media[0],
    media[1],
    media[1],
    // media[0],
    // media[1],
    //-------------------
    // media[0],
    media[0]])















///---------------------------------
//
//
//      進場
//
//
///---------------------------------


vp.changeLayout("VW", [0, 1, 2, 3, 4, 5], [
    { w: 18, h: 18, x: 10, y: 10, cropTo: [12] },
    { w: 32, h: 18, x: 50, y: 20, cropTo: [10] }
])

display[0].input(vp)
display[1].input(media[1])
display[2].input(media[0])
display[3].input(media[0])








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
                vp.changeLayout("2x3mss")
                display[0].input(vp)
            },
            () => {
                vp.changeLayout("2x3ssm")
                display[0].input(vp)
            })

    }
    if (keyID === 'KeyS') {
        vp.changeLayout([3, 2])
        display[0].input(vp)
    }
}


window.addEventListener("mousemove", (e) => {
    let x = (e.x - spaceW / 2) / spaceW * 90 / 3
    let y = (e.y - spaceH / 2) / spaceH * 90 / 3 * 0
    // camera.style.transform = "rotate3d(" + -y + ", " + x + ", 0, 10deg)"
    camera.style.transform = "translateZ(" + spaceW / 2 + "px) rotateX(" + -y + "deg) rotateY(" + x + "deg)"
})