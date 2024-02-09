
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//  
//  基礎 Function
//  
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------



// ------------------------
// toggle
// ------------------------

toggle = (tagObj, do1, do0, autoSwitchTag = true) => {
    if (tagObj.tag === 0) {
        do1()
        if (autoSwitchTag) {
            tagObj.tag = 1
        }
    } else {
        do0()
        if (autoSwitchTag) {
            tagObj.tag = 0
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
//  控制單體 VkObject
//  - 包含一些動作以及狀態
//  - 包含常用 Toggle 功能
//
//  --- 顯示 (透明度)
//  --- 高度
//  --- 開關 (自由樣式)
//  --- 自動樣式與標籤*3
//  --- 訊源導入
//  --- 
//
//  媒體訊源 Media
//  -
//  -
//
//
//  畫面處理器 VP
//  - source 前置作業
//  - 切換 layout 功能
//
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------












var VkObject = function (object, sizeRatio = [10, 1.77], position = [50, 50, 50], rotate = [0, 0, 0], deviceType = "VkObject", thick = [0, "#000"], videoWall = false, borderSize = 1) {

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
    this.x = position[0]
    this.y = position[1]
    this.z = position[2] * spaceW * 0.01
    this.xR = rotate[0]
    this.yR = rotate[1]
    this.zR = rotate[2]
    this.move = ([x, y, z] = [0, 0, 0], [xR, yR, zR] = [0, 0, 0]) => {
        this.x = this.x + x
        this.y = this.y + y
        this.z = this.z + z
        this.xR = this.xR + xR
        this.yR = this.yR + yR
        this.zR = this.zR + zR

        this.object.style.left = this.x + "%"
        this.object.style.top = this.y + "%"
        this.object.style.transform = "translate3d(-50%, -50%, " + this.z +
            "px) rotateX(" + this.xR +
            "deg) rotateY(" + this.yR +
            "deg) rotateZ(" + this.zR + "deg)"
    }
    this.move()



    // defaut value
    // defaut Tag
    this.tag = [{ tag: 0 }, { tag: 0 }, { tag: 0 }]





    // -----------------
    //
    // 物件動作
    //
    // -----------------


    // Appear, Opacity
    this.appearTag = { tag: 0 }
    this.appear = () => {
        this.object.style.opacity = 1
        this.appearTag.tag = 1
    }
    this.disappear = () => {
        this.object.style.opacity = 0
        this.appearTag.tag = 0
    }
    this.appearToggle = () => {
        toggle(this.appearTag, this.appear, this.disappear)
    }
    this.customOpacity = (opacity) => {
        this.object.style.opacity = opacity
        this.appearTag.tag = opacity
    }


    // hidden
    this.hiddenTag = { tag: 0 }
    this.hidden = () => {
        this.object.style.display = "none"
        this.hiddenTag.tag = 1
    }
    this.disHidden = () => {
        this.object.style.display = ""
        this.hiddenTag.tag = 0
    }
    this.hiddenToggle = () => {
        toggle(this.hiddenTag, this.hidden, this.disHidden)
    }



    // On and Off
    this.onTag = { tag: 0 }
    this.on = (style = "on") => {
        this.object.classList.add(style)
        this.onTag.tag = 1
    }
    this.off = (style = "on") => {
        this.object.classList.remove(style)
        this.onTag.tag = 0
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
        this.object.style.border = this.displayBorder + "px solid #22222200"
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
                this.videoWallLineH[i].style.backgroundColor = "#111"
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


        // 新增螢幕厚度
        if (thick[0] > 0) {
            this.displayThick = []
            for (let i = 0; i < 4; i++) {
                this.displayThick[i] = document.createElement("div")
                this.displayThick[i].style.left = "50%"
                this.displayThick[i].style.top = "50%"
                this.displayThick[i].style.width = "100%"
                this.displayThick[i].style.height = "100%"
                this.displayThick[i].style.border = this.displayBorder + "px solid " + thick[1]
                this.displayThick[i].style.borderRadius = this.displayBorder + "px"
                this.displayThick[i].style.backgroundColor = thick[1]
                this.displayThick[i].style.boxSizing = "content-box"
                this.displayThick[i].style.transform = "translate3d(-50%, -50%, " + position[2] * thick[0] * (i + 0.5) + "px)"
                this.object.appendChild(this.displayThick[i])
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


//--------------------------------------------------------------------------
//
// Media
//
//--------------------------------------------------------------------------


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



//--------------------------------------------------------------------------
//
// VP
//
//--------------------------------------------------------------------------


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
    this.changeLayout = (outputDisplay, viewLayout = "single", sNum = [0, 1, 2, 3, 4, 5, 6], vwCell = []) => {

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
            try {
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
            } catch {
                console.log("VW 參數設置錯誤")
            }

        }
        else {
            this.output.appendChild(this.vpBox[sNum[0]])
        }

        //-----------------
        //  輸出到哪一個display
        //-----------------
        try {
            outputDisplay.input(this)
        } catch {
            console.log(outputDisplay, "VP 無可輸出螢幕")
        }
    }

    // 此VP預設輸出
    this.output.appendChild(this.vpBox[0])
}






//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//
//  頁面控制 UI iPad
//  - 
//  - 
//  
//  頁面控制 UI KeyPad
//  - 
//  - 
// 
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------

var controller = function (type, elementAtr) {

    if (type == "ipad") {
        this.ipad = new VkObject(document.createElement("div"), [], [], [], type)
        container.appendChild(this.ipad.object)
        this.ipad.object.classList = type
        this.width = this.ipad.object.clientWidth

        this.on = () => { this.ipad.on() }
        this.off = () => { this.ipad.off() }
        this.onToggle = () => { this.ipad.onToggle() }

        //加入頁面
        this.page = []
        for (let i = 0; i < elementAtr.length; i++) {
            this.page[i] = document.createElement("div")
            this.page[i].classList = "page"
            this.page[i].style.backgroundColor = elementAtr[i].bgColor
            this.page[i].style.backgroundImage = "url(" + elementAtr[i].bgScr + ")"

            //加入按鈕
            this.page[i].btn = []
            for (let j = 0; j < elementAtr[i].btns.length; j++) {
                this.page[i].btn[j] = document.createElement("div")
                this.page[i].btn[j].classList = "btn"
                this.page[i].btn[j].style.left = elementAtr[i].btns[j].xy[0] + "%"
                this.page[i].btn[j].style.top = elementAtr[i].btns[j].xy[1] + "%"
                this.page[i].btn[j].style.width = elementAtr[i].btns[j].size[0] + "%"
                this.page[i].btn[j].style.paddingTop = elementAtr[i].btns[j].size[1] + "%"
                this.page[i].btn[j].style.borderRadius = elementAtr[i].btns[j].radius * this.width / 500 + "px"

                this.page[i].btn[j].text = document.createElement("div")
                this.page[i].btn[j].text.textContent = elementAtr[i].btns[j].text
                this.page[i].btn[j].text.style.color = elementAtr[i].btns[j].textColor
                this.page[i].btn[j].text.style.fontSize = elementAtr[i].btns[j].textSize * this.width / 500 + "px"

                //狀態
                this.page[i].btn[j].goState = []
                this.page[i].btn[j].goState[0] = () => {
                    this.page[i].btn[j].style.backgroundColor = elementAtr[i].btns[j].bgColor[1]
                    this.page[i].btn[j].style.backgroundImage = elementAtr[i].btns[j].bgScr[1]
                    this.page[i].btn[j].style.border = elementAtr[i].btns[j].border * this.width / 500 + "px solid" + elementAtr[i].btns[j].borderColor[1]
                }

                this.page[i].btn[j].goState[1] = () => {
                    this.page[i].btn[j].style.backgroundColor = elementAtr[i].btns[j].bgColor[0]
                    this.page[i].btn[j].style.backgroundImage = elementAtr[i].btns[j].bgScr[0]
                    this.page[i].btn[j].style.border = elementAtr[i].btns[j].border * this.width / 500 + "px solid" + elementAtr[i].btns[j].borderColor[0]
                }

                this.page[i].btn[j].goState[1]()

                //按鈕功能，切換狀態功能, toggle 或 press
                if (elementAtr[i].btns[j].act != "none") {
                    this.page[i].btn[j].style.cursor = "pointer"
                    this.page[i].btn[j].classList.add("hover")
                    if (elementAtr[i].btns[j].toggle) {
                        this.page[i].btn[j].stateTag = { tag: 1 }
                        this.page[i].btn[j].addEventListener("click", () => {
                            toggle(this.page[i].btn[j].stateTag,
                                () => {
                                    this.page[i].btn[j].goState[1]()
                                    try { elementAtr[i].btns[j].act[0]() } catch { }
                                }, () => {
                                    this.page[i].btn[j].goState[0]()
                                    try { elementAtr[i].btns[j].act[1]() } catch { }
                                })
                        })
                    } else {
                        this.page[i].btn[j].addEventListener("click", () => {
                            this.page[i].btn[j].goState[0]()
                            try { elementAtr[i].btns[j].act() } catch { }
                            setTimeout(this.page[i].btn[j].goState[1], 200)
                        })
                    }
                }

                //換字功能
                this.page[i].btn[j].changeText = (text = elementAtr[i].btns[j].text, color = elementAtr[i].btns[j].textColor) => {
                    this.page[i].btn[j].text.textContent = text
                    this.page[i].btn[j].text.color = color
                }

                // 按鈕物件入場
                this.page[i].btn[j].appendChild(this.page[i].btn[j].text)
                this.page[i].appendChild(this.page[i].btn[j])
            }
            //加入sliders
            this.page[i].slider = []
            for (let j = 0; j < elementAtr[i].sliders.length; j++) {

                this.page[i].slider[j] = document.createElement("div")
                this.page[i].slider[j].classList = "slider"

                this.page[i].slider[j].slider = document.createElement("input")
                this.page[i].slider[j].slider.type = "range"
                this.page[i].slider[j].slider.classList = "real"
                this.page[i].slider[j].slider.value = elementAtr[i].sliders[j].value


                this.page[i].slider[j].style.left = elementAtr[i].sliders[j].xy[0] + "%"
                this.page[i].slider[j].style.top = elementAtr[i].sliders[j].xy[1] + "%"
                this.page[i].slider[j].style.width = elementAtr[i].sliders[j].size + "%"
                this.page[i].slider[j].style.height = "4%"
                this.page[i].slider[j].style.backgroundColor = elementAtr[i].sliders[j].bgColor + "66"

                this.page[i].slider[j].bar = document.createElement("div")
                this.page[i].slider[j].bar.classList = "bar"

                this.page[i].slider[j].activeBar = document.createElement("div")
                this.page[i].slider[j].activeBar.classList = "activeBar"
                this.page[i].slider[j].activeBar.style.backgroundColor = elementAtr[i].sliders[j].activeColor
                this.page[i].slider[j].activeBar.style.width = this.page[i].slider[j].slider.value + "%"

                this.page[i].slider[j].navBar = document.createElement("div")
                this.page[i].slider[j].navBar.classList = "navBar"
                this.page[i].slider[j].navBar.style.backgroundColor = elementAtr[i].sliders[j].bgColor

                if (elementAtr[i].sliders[j].dir == "row") {
                    this.page[i].slider[j].style.transform = "translate(-50%, -50%) rotate(-90deg)"
                }

                // Slider 物件入場
                this.page[i].slider[j].appendChild(this.page[i].slider[j].bar)
                this.page[i].slider[j].bar.appendChild(this.page[i].slider[j].navBar)
                this.page[i].slider[j].bar.appendChild(this.page[i].slider[j].activeBar)
                this.page[i].slider[j].appendChild(this.page[i].slider[j].slider)
                this.page[i].appendChild(this.page[i].slider[j])


                // 物件功能
                this.page[i].slider[j].slider.addEventListener("change", () => { this.page[i].slider[j].valueChange() })

                this.page[i].slider[j].valueChange = () => {
                    this.page[i].slider[j].activeBar.style.width = this.page[i].slider[j].slider.value + "%"
                    try {
                        this.page[i].slider[j].e = this.page[i].slider[j].slider.value
                        elementAtr[i].sliders[j].act(this.page[i].slider[j].e)
                    } catch { }
                }
            }
        }


        //換頁面功能
        this.ipad.object.appendChild(document.createElement("span"))
        this.goTo = (num) => {
            this.ipad.object.replaceChild(this.page[num], this.ipad.object.firstChild);
        }
        this.goTo(0)
    }

}




//上方欄生成
//側邊主功能欄生成
// 物件3D
// 螢幕 厚度

//視訊裁切
//功能 ACTION
//     主元素: ipad keypad 右側說明欄
//     互動元素 中間小物、環境、溫溼度




//環境參數
// 溫度
// 濕度
// CO2
// 時間


// 本體樣式
//     位置
//     大小
//     旋轉
//     導入頁面

// 頁面
//     背景圖


// 按鈕
//     位置 大小
//     action
//     Press or active

// 數字/文字
//     位置
//     大小??
//     內容
//     顏色

// Slider
//     位置 大小
//     左右互動

// 圖片
//     位置 大小
//     狀態



// 聲音
//     播放 暫停
//     音量 調整 Bar
//     音量顯示 當下頻譜顯示

// 特殊影片互動







//---------------------------------
//
//      選單生成與控制功能
//
//---------------------------------

var flowMenu = $css("flowMenuBoxs")[0]

var createMenu = function (num) {

    this.flow = document.createElement("div")
    this.flow.classList = "flowMenu"
    this.flow.appendChild(document.createTextNode(featureMenuContent[num].flow))
    this.featureMenu = document.createElement("div")
    this.featureMenu.classList = "featureMenu"

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

        //放入featureMenu
        this.featureMenu.appendChild(this.feature[i])
        this.feature[i].appendChild(this.namebox[i])
        this.feature[i].appendChild(this.describe[i])
        this.namebox[i].appendChild(this.icon[i])
        this.namebox[i].appendChild(this.name[i])

        //feature 開啟功能
        this.feature[i].open = () => {
            featureAllOff()
            // actionAreaAllOff()
            this.feature[i].classList.add("active")
            // action[i]()
        }
        this.feature[i].addEventListener("click", this.feature[i].open)
    }


    //flow 開啟功能
    this.flow.open = () => {
        flowAllOff()
        featureAllOff()
        // actionAreaAllOff()
        this.featureMenu.classList.add("active")
        this.flow.classList.add("active")
        this.feature[0].classList.add("active")
        // action[0]()
    }
    this.flow.addEventListener("click", this.flow.open)


    //flow 進場
    flowMenu.appendChild(this.flow)
    container.appendChild(this.featureMenu)
}


//全選單 feature 關閉功能
var featureAllOff = () => {
    menu.forEach(menu => {
        menu.feature.forEach(feature => {
            feature.classList.remove("active")
        })
    })
}
//全選單 flow 關閉功能
var flowAllOff = () => {
    menu.forEach(menu => {
        menu.flow.classList.remove("active")
        menu.featureMenu.classList.remove("active")
    })
}



///---------------------------------
//
//
//      - 環境生成功能
//      
//     
//
///---------------------------------


// 基本環境
const container = $css("container")[0]
const spaceW = container.clientWidth
const spaceR = 0.5
const spaceH = spaceW / spaceR

// 功能:創立空間與相機
var space = function (num, spaceAtr) {
    this.space = document.createElement("div")
    this.space.classList = "space"
    this.camera = document.createElement("div")
    this.camera.classList = "camera"

    // 攝影機照射方向
    this.camera.style.transform = "translate3d(" + spaceAtr[num].cameraLen[0] + "px ," + spaceAtr[num].cameraLen[1] + "px," + spaceW / 2 + "px) rotateX(" + spaceAtr[num].cameraLen[2] + "deg) rotateY(" + spaceAtr[num].cameraLen[3] + "deg)"
    // 攝影機透視程度
    this.spacePerspectRate = spaceAtr[num].spacePerspectRate
    this.space.style.perspective = spaceW * this.spacePerspectRate + "px"

    // 設定背景
    this.spaceBgObj = []
    this.spaceBg = []
    for (let i = 0; i < spaceAtr[num].spaceBg.length; i++) {
        if (spaceAtr[num].spaceBg[i].includes("jpg") || spaceAtr[num].spaceBg[i].includes("png")) {
            this.spaceBgObj[i] = document.createElement("img")
        } else if (spaceAtr[num].spaceBg[i].includes("mp4")) {
            this.spaceBgObj[i] = document.createElement("video")
        }
        this.spaceBgObj[i].src = spaceAtr[num].spaceBg[i]
        this.spaceBg[i] = new VkObject(this.spaceBgObj[i],
            [100, 50],
            [50, 50, 0],
            [0, 0, 0],
            "spaceBg")
        this.space.appendChild(this.spaceBg[i].object)
    }

    this.space.appendChild(this.camera)
    container.appendChild(this.space)
    createWall(spaceAtr[num].wallCount, this.camera, spaceAtr[num])
}


// 功能:創立牆壁
var createWall = (wallcount = 11, intoCamera, atr) => {
    var spaceWallAttr = [
        { size: [atr.sW, atr.sW / atr.sH], xyz: [atr.sDWallx, atr.sDWally, atr.sDWallD], xyzR: [0, 0, 0], main: true },
        //垂直牆面
        { size: [atr.sD, atr.sD / atr.sH], xyz: [atr.sDWallx - atr.sW / 2, atr.sDWally, 0], xyzR: [0, 90, 0], main: true },
        { size: [atr.sD, atr.sD / atr.sH], xyz: [atr.sDWallx + atr.sW / 2, atr.sDWally, 0], xyzR: [0, 90, 0], main: true },
        //平行牆面
        { size: [atr.sW, atr.sW / atr.sD], xyz: [atr.sDWallx, atr.sDWally - atr.sH * spaceR / 2, 0], xyzR: [90, 0, 0], main: true },
        { size: [atr.sW, atr.sW / atr.sD], xyz: [atr.sDWallx, atr.sDWally + atr.sH * spaceR / 2, 0], xyzR: [90, 0, 0], main: true },
        //垂直中間牆面
        { size: [atr.sD, atr.sD / atr.sH], xyz: [atr.sDWallx - atr.sW / 4, atr.sDWally, 0], xyzR: [0, 90, 0], main: false },
        { size: [atr.sD, atr.sD / atr.sH], xyz: [atr.sDWallx, atr.sDWally, 0], xyzR: [0, 90, 0], main: false },
        { size: [atr.sD, atr.sD / atr.sH], xyz: [atr.sDWallx + atr.sW / 4, atr.sDWally, 0], xyzR: [0, 90, 0], main: false },
        //平行中間牆面
        { size: [atr.sW, atr.sW / atr.sD], xyz: [atr.sDWallx, atr.sDWally - atr.sH * spaceR / 4, 0], xyzR: [90, 0, 0], main: false },
        { size: [atr.sW, atr.sW / atr.sD], xyz: [atr.sDWallx, atr.sDWally, 0], xyzR: [90, 0, 0], main: false },
        { size: [atr.sW, atr.sW / atr.sD], xyz: [atr.sDWallx, atr.sDWally + atr.sH * spaceR / 4, 0], xyzR: [90, 0, 0], main: false },
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
        intoCamera.appendChild(spaceWall[i].object)
    }
}





///---------------------------------
//
//      環境架設
//      設備架設
//
///---------------------------------


// 創立 空間
var spaces = Array.from({ length: spaceAtr.length }, (_, i) => new space(i, spaceAtr));

// 創立 選單
var menu = Array.from({ length: featureMenuContent.length }, (_, i) => new createMenu(i));

// 創立 controller 
var ipad = Array.from({ length: ipadElementAtr.length }, (_, i) => new controller("ipad", ipadElementAtr[i]));

// 創立 media 
var media = Array.from({ length: mediaList.length }, (_, i) => new Media(mediaList[i]))

// 創立 長音樂
var bgm = bgmList.map((item) => {
    let musicInstance = new music(item.voice);
    musicInstance.drawColor = "#ffffff88";
    musicInstance.inputCanvas(container, item.w, item.h, item.x, item.y);
    musicInstance.draw();
    return musicInstance;
});

// 創立 短音效
var sound = new sounds(audioList)




//創立 display 
var display = displayAttr.map((attr) => {
    let vkObject = new VkObject(
        document.createElement("div"),
        attr.size,
        attr.xyz,
        attr.xyzR,
        "display",
        attr.thick,
        attr.videoWall,
        attr.border
    );
    vkObject.object.classList = "display " + attr.addClass;
    spaces[0].camera.appendChild(vkObject.object);
    return vkObject;
});

//創立 VP
var vp = new VP([
    media[0], media[1],
    media[1], media[0],
    media[1],
    media[0], media[0]
])

var vw = new VP([
    media[2], media[1],
    media[1], media[0],
    // media[1],
    // media[0], media[0]
])







///---------------------------------
//
//
//      進場
//
//
///---------------------------------

// ipad[0].on()
// ipad[0].goTo(2)

var ipadBtn = $css("ipadBtn")[0]
ipadBtn.addEventListener("click", () => {
    ipad[0].onToggle()
})





// 選單開關
flowMenu.classList.add("active")



vp.changeLayout(display[1], "VW", [0, 1, 2, 3, 4, 5], [
    { w: 18, h: 18, x: 10, y: 10, cropTo: [12] },
    { w: 32, h: 18, x: 50, y: 20, cropTo: [10] }
])

// 預設 Source
display[0].input(vp)
display[1].input(media[1])
display[2].input(media[0])

display[3].input(vw)
display[4].input(media[1])
display[5].input(media[1])


display[3].hidden()


// bgm[1].play()
// bgm[0].draw()
// bgm[1].draw()
// bgm[1].volumeNum()


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
        toggle(display[1].tag[1],
            () => { display[1].input(media[0]) },
            () => { display[1].input(media[1]) })
    }
    if (keyID === 'KeyA') {
        display[0].hiddenToggle()
        display[1].hiddenToggle()
        display[2].hiddenToggle()
    }
    if (keyID === 'KeyZ') {
        display[3].hiddenToggle()
    }
    if (keyID === 'KeyW') {
        toggle(display[0].tag[0],
            () => { vp.changeLayout(display[0], "pip") },
            () => { vp.changeLayout(display[0], "pop") })
    }
    if (keyID === 'KeyS') {
        toggle(display[1].tag[0],
            () => { display[0].input(media[0]) },
            () => { vp.changeLayout(display[0], [2, 2]) })
    }

    if (keyID === 'KeyE') {
        toggle(display[2].tag[1],
            () => {
                display[0].move([-6, 0, 0], [0, 0, 0])
                display[2].move([6, 0, 0], [0, 0, 0])
            },
            () => {
                display[0].move([6, 0, 0], [0, 0, 0])
                display[2].move([-6, 0, 0], [0, 0, 0])
            })
    }
    if (keyID === 'KeyD') {
        ipad[0].onToggle()
    }
    if (keyID === 'KeyC') {
        toggle(display[0].tag[2],
            () => { ipad[0].goTo(1) },
            () => { ipad[0].goTo(0) })
    }

    if (keyID === 'KeyR') {

        spaces[0].spaceBg[1].appearToggle()

    }






    if (keyID === 'KeyL') {
        toggle(bgm[0].tag[0], bgm[0].play, bgm[0].fadeStop)

    }

    if (keyID === 'KeyO') {
        toggle(bgm[0].muteTag, () => { bgm[0].fadeMute() }, () => { bgm[0].fadeUnmute() })
    }
    if (keyID === 'KeyI') {
        toggle(bgm[0].tag[1], () => { bgm[0].fadeLowPass(100) }, () => { bgm[0].fadeLowPass(22050) })
    }
    if (keyID === 'KeyP') {
        toggle(bgm[0].tag[2], bgm[0].draw, bgm[0].stopDraw)

    }

    if (keyID === 'KeyK') {
        musicAllStop(0.1)
    }
    ctx.resume().then(() => {
        console.log('AudioContext 已啟動');
    });
}


// window.addEventListener("mousemove", (e) => {
//     let x = (e.x - spaceW / 2) / spaceW * 90 / 3
//     let y = (e.y - spaceH / 2) / spaceH * 90 / 3 * 0
//     // camera.style.transform = "rotate3d(" + -y + ", " + x + ", 0, 10deg)"
//     space3.camera.style.transform = "translateZ(" + spaceW / 2 + "px) rotateX(" + -y + "deg) rotateY(" + x + "deg)"
// })