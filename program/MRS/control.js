
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
delay = (doSomething, delayTime, num = 0) => {
    //如 delay 執行中則取消此 delay 後不動作
    if (delayContainer[num].id !== null) {
        clearTimeout(delayContainer[num].id);
        delayContainer[num].id = null
        console.log("clear delay", num)
    }
    //執行 delay 動作
    else {
        delayContainer[num].id = setTimeout(() => {
            doSomething()
            delayContainer[num].id = null
        }, delayTime);
    }
}




// ------------------------
// 開關燈功能，預設關燈
// ------------------------

var lightTag = 0
lightOn = () => {
    space.classList.remove("dark")
    $css("container")[0].classList.add("on")
    lightTag = 1
}
lightOff = () => {
    space.classList.add("dark")
    $css("container")[0].classList.remove("on")
    lightTag = 0
}





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
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------

var vkObject = function (object) {

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



    this.input = (link) => {
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
        this.sourceContainer = document.createElement("div");
        this.sourceContainer.classList = "content";
        this.object.replaceChild(this.sourceContainer, this.object.firstChild);
        this.sourceContainer.appendChild(this.source)
    }

    this.sourceControl = () => {

    }
}








//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//
// 電腦桌控制
//
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------


var bgVideo = $css("bgVideo")[1]
var bgVideo_d = $css("bgVideo")[0]
var bgVideoTag = 0
var bgVideoIngTag = 0

bgVideo.addEventListener('timeupdate', function () {
    if (bgVideoTag == 0) {
        if (bgVideo.currentTime >= 4 && bgVideo.currentTime <= 5) {
            bgVideo.pause();
            bgVideo_d.pause();
            bgVideoIngTag = 0
            bgVideoTag = 1
            // 打開螢幕
            screenT01.appear()
            screenT02.appear()
            screenT03.appear()
            screenT04.appear()
            screenT05.appear()
            screenTMain.appear()
        }
    }
    if (bgVideoTag == 1) {
        if (bgVideo.currentTime >= 8) {
            bgVideo.pause();
            bgVideo_d.pause();
            bgVideoIngTag = 0
            bgVideoTag = 0
        }
    }
});




var bgVideoUp = () => {
    bgVideo.currentTime = 0
    bgVideo.play()
    bgVideo_d.currentTime = 0
    bgVideo_d.play()
    bgVideoIngTag = 1
}

var bgVideoDown = () => {
    bgVideo.currentTime = 4
    bgVideo.play()
    bgVideo_d.currentTime = 4
    bgVideo_d.play()
    bgVideoIngTag = 1
    screenT01.disappear()
    screenT02.disappear()
    screenT03.disappear()
    screenT04.disappear()
    screenT05.disappear()
    screenTMain.disappear()
}

var bgVideoUpingToDown = () => {

    bgVideoTag = 1
    bgVideo.currentTime = 8 - bgVideo.currentTime
    bgVideo_d.currentTime = 8 - bgVideo_d.currentTime
}

var bgVideoDowningToUp = () => {
    bgVideoTag = 0
    bgVideo.currentTime = 8 - bgVideo_d.currentTime
    bgVideo_d.currentTime = 8 - bgVideo_d.currentTime
}


var bgVideoUpAnyway = () => {
    if (bgVideoIngTag == 0 && bgVideoTag == 0) {
        bgVideoUp()
    }
    if (bgVideoIngTag == 1 && bgVideoTag == 1) {
        bgVideoDowningToUp()
    }
}

var bgVideoDownAnyway = () => {
    if (bgVideoIngTag == 0 && bgVideoTag == 1) {
        bgVideoDown()
    }
    if (bgVideoIngTag == 1 && bgVideoTag == 0) {
        bgVideoUpingToDown()
    }
}





var bgVideoToggle = () => {
    if (bgVideoIngTag == 0) {
        toggle(bgVideoTag, bgVideoUp, bgVideoDown)
    } else if ((bgVideoIngTag == 1)) {
        toggle(bgVideoTag, bgVideoUpingToDown, bgVideoDowningToUp)
    }
}







//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//
//  互動訊息
//
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------


var message = function (content = "Light On", style = "messageBox") {
    this.message = document.createElement("div");
    this.message.classList = style;
    this.message.innerText = content;

    this.add = (fadeTime = 1000, time = 5000) => {
        $id("messageContainer").appendChild(this.message);
        this.message.style.animationName = "fadein"
        this.message.style.animationDuration = String(fadeTime) + "ms"

        //創造後 X 秒淡出, 創造後 X 秒淡出刪除
        setTimeout(() => {
            this.message.style.animationName = "fadeout"
        }, time);
        setTimeout(() => {
            this.message.remove();
        }, time + fadeTime);
    }
}





//  ----------------------------------------------------------------------------------------------------------
//  ----------------------------------------------------------------------------------------------------------
//  ----------------------------------------------------------------------------------------------------------
//  ----------------------------------------------------------------------------------------------------------
//  ----------------------------------------------------------------------------------------------------------
//  ----------------------------------------------------------------------------------------------------------






//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//
//  環境架設
//
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------


var space = $css("space")[0]


// 建立keypad
var keypad = new vkObject($css("keypad")[0])

var keypadBtnElements = $css("keypadBtn")
var keypadBtns = []
for (let i = 0; i < keypadBtnElements.length; i++) {
    keypadBtns.push(new vkObject(keypadBtnElements[i]))
}


// 建立 螢幕和訊源
var screen01 = new vkObject($css("screen")[0])
var screen02 = new vkObject($css("screen")[1])
var screen03 = new vkObject($css("screen")[2])


var vp = new vkObject($css("vp")[0])
var screenVp01 = new vkObject($css("screen")[3])
var screenVp02 = new vkObject($css("screen")[4])
var screenVp03 = new vkObject($css("screen")[5])
var screenVp04 = new vkObject($css("screen")[6])
var screenVps = [screenVp01, screenVp02, screenVp03, screenVp04]



var screenT01 = new vkObject($css("screen")[7])
var screenT02 = new vkObject($css("screen")[8])
var screenT03 = new vkObject($css("screen")[9])
var screenT04 = new vkObject($css("screen")[10])
var screenT05 = new vkObject($css("screen")[11])
var screenTMain = new vkObject($css("screen")[12])


var whiteBoard = new vkObject($css("wb")[0])
var screenW01 = new vkObject($css("screen")[13])
var screenForA301 = new vkObject($css("screen")[19])
var screenForA302 = new vkObject($css("screen")[20])

var screenBYOD01 = new vkObject($css("screen")[14])
var screenBYOD02 = new vkObject($css("screen")[15])
var screenBYOD03 = new vkObject($css("screen")[16])
var screenBYOD04 = new vkObject($css("screen")[17])
var screenBYOD05 = new vkObject($css("screen")[18])



var shareImage = "element/06.png"

var source00 = "element/00.png"


var source01 = "element/01.png"
var source02 = "element/02.png"
var source03 = "element/03.png"
var source04 = "element/04.png"
var source05 = "element/05.png"
var source06 = "element/06.png"

var source07 = "element/07.png"
var source07 = "element/video.mp4"

var source08 = "element/08.png"
var source09 = "element/09.png"
var source10 = "element/10.png"
var source11 = "element/11.png"
var source12 = "element/12.png"
var source13 = "element/13.png"
var source14 = "element/14.png"

var source15 = "element/15.png"
var source16 = "element/16.png"
var source17 = "element/17.png"
var source18 = "element/18.png"
var source19 = "element/19.png"
var source20 = "element/20.png"
var source21 = "element/21.png"





//  ----------------------- 
//
//  入場
//
//  -----------------------


screen01.input(source00)
screen02.input(source00)
screen03.input(source00)


screenVp01.input(source01)
screenVp02.input(source02)
screenVp03.input(source03)
screenVp04.input(source04)


screenT01.input(source00)
screenT02.input(source00)
screenT03.input(source00)
screenT04.input(source00)
screenT05.input(source00)
screenTMain.input(source00)



screenT01.disappear()
screenT02.disappear()
screenT03.disappear()
screenT04.disappear()
screenT05.disappear()
screenTMain.disappear()


screenBYOD01.input(source00)
screenBYOD02.input(source00)
screenBYOD03.input(source00)
screenBYOD04.input(source00)
screenBYOD05.input(source00)

screenW01.input(source00)
// whiteBoard.disappear()
screenForA301.input(source00)
screenForA302.input(source00)




window.onload = () => {
    delay(() => { $css("loadingMask")[0].classList.add("off") }, 1000, 15)
    delay(() => { $css("loadingMask")[0].classList.add("z0") }, 3000, 16)
}




//  -------------------------------------------------------------------------
//  -------------------------------------------------------------------------
//
//
//  buttom
//
//
//  -------------------------------------------------------------------------
//  -------------------------------------------------------------------------
//  ----------------------- 
//
//  share   Connection Diagram
//
//  -----------------------

var sharebtn = $css("sharebtn")[0]
var shareContainer = $css("shareContainer")[0]
var openQrcord = $css("openQrcord")[0]
var closeQrcord = $css("closeQrcord")[0]
var qrcord = $css("qrcord")[0]
var shareContent = $css("shareContent")[0]
var shareBlack = $css("shareBlack")[0]


sharebtn.addEventListener("click", () => {
    shareContainer.classList.add("on")
})

shareBlack.addEventListener("click", () => {
    shareContainer.classList.remove("on")
})

openQrcord.addEventListener("click", () => {
    qrcord.classList.add("on")
})



closeQrcord.addEventListener("click", () => {
    qrcord.classList.remove("on")
})

//  ----------------------- 
//
//  上方按鈕
//
//  -----------------------


var flowMenu = $css("flowMenu")
var actionBoxs = $css("actionMenuBoxs")
var actionMenu = $css("actionMenu")

var flowMenuLen = flowMenu.length
var actionBoxsLen = actionBoxs.length
var actionMenuLen = actionMenu.length





//  總關閉功能 -------------------------------


var flowMenuAllOff = () => {
    for (let i = 0; i < flowMenuLen; i++) {
        flowMenu[i].classList.remove("active")
    }
}

var actionBoxsAllOff = () => {
    for (let i = 0; i < actionBoxsLen; i++) {
        actionBoxs[i].classList.remove("active")
    }
}
var actionMenuAllOff = () => {
    for (let i = 0; i < actionMenuLen; i++) {
        actionMenu[i].classList.remove("active")
    }
}

var actionAreaAllOff = () => {

    //a1    
    $css("actionContainer")[0].classList.remove("active")
    $css("vp")[0].classList.remove("active")

    //a2
    $css("action02Container")[0].classList.remove("active")

    //a3
    $css("action03Container")[0].classList.remove("active")
    screenForA3reset()

    //a7
    $css("actionContainer")[1].classList.remove("active")
    screenForA7reset()

    //a4 a5 a6
    ipad[0].classList.remove("active")
    ipad[1].classList.remove("active")
    ipad[2].classList.remove("active")
}


//  上方 flowMenu 按鈕 狀態改變&功能

var flowMenuAction = (i) => {
    flowMenuAllOff()
    actionBoxsAllOff()
    actionMenuAllOff()
    actionAreaAllOff()
    flowMenu[i].classList.add("active")
    actionBoxs[i].classList.add("active")
    if (i == 0) {
        j = 0
    } else if (i == 1) {
        j = 1
    } else if (i == 2) {
        j = 5
    } else if (i == 3) {
        j = 8
    }
    action[j]()
    actionMenu[j].classList.add("active")
}

for (let i = 0; i < flowMenuLen; i++) {
    flowMenu[i].addEventListener("click", () => {
        flowMenuAction(i)
    })
}




//  左側按鈕 狀態改變

for (let i = 0; i < actionMenuLen; i++) {
    actionMenu[i].addEventListener("click", () => {
        actionMenuAllOff()
        actionAreaAllOff()
        actionMenu[i].classList.add("active")
        action[i]()
    })
}


//-----------------------
//
//  左側 Ation 按鈕 客製功能
//
//-----------------------


var action = []


action[0] = () => {

    delay(lightOn, 0, 10)
    bgVideoDownAnyway()
    screen01.input(source01)
    screen02.input(source00)
    screenT02.input(source00)
    screenT03.input(source00)
    screenT04.input(source00)
    screenT05.input(source00)
    screenTMain.input(source00)
    screenBYOD01.input(source00)
    screenBYOD02.input(source00)
    screenBYOD03.input(source00)
    screenBYOD04.input(source00)
    screenBYOD05.input(source00)
    screenW01.input(source00)
}




action[1] = () => {
    $css("actionContainer")[0].classList.add("active")
    $css("vp")[0].classList.add("active")

    delay(lightOn, 0, 10)
    bgVideoDownAnyway()
    screen01.input(source01)
    screen02.input(source00)
    screenBYOD01.input(source05)
    screenBYOD02.input(source04)
    screenBYOD03.input(source03)
    screenBYOD04.input(source02)
    screenBYOD05.input(source01)
    screenW01.input(source00)
}

action[2] = () => {
    $css("action02Container")[0].classList.add("active")
    delay(lightOn, 0, 10)
    bgVideoDownAnyway()
    screen01.input(source01)
    screen02.input(source07)
    screenBYOD01.input(source00)
    screenBYOD02.input(source00)
    screenBYOD03.input(source00)
    screenBYOD04.input(source00)
    screenBYOD05.input(source00)
    screenW01.input(source00)
}




action[3] = () => {
    $css("action03Container")[0].classList.add("active")


    delay(lightOn, 0, 10)
    bgVideoDownAnyway()
    screen01.input(source01)
    screen02.input(source07)
    screenT02.input(source00)
    screenT03.input(source00)
    screenT04.input(source00)
    screenT05.input(source00)
    screenTMain.input(source00)
    screenBYOD01.input(source09)
    screenBYOD02.input(source00)
    screenBYOD03.input(source00)
    screenBYOD04.input(source00)
    screenBYOD05.input(source00)
    screenW01.input(source09)
    screenForA301.input(source09)
    screenForA302.input(source09)
}


action[4] = () => {
    ipad[0].classList.add("active")
    ipadBtns[0].style.backgroundImage = "url(element/actionIpadBtn_img" + 0 + "_on.png)"


    delay(lightOn, 0, 10)
    bgVideoUpAnyway()
    screen01.input(source01)
    screen02.input(source07)
    screenT02.input(source12)
    screenT03.input(source12)
    screenT04.input(source12)
    screenT05.input(source12)
    screenTMain.input(source00)
    screenBYOD01.input(source00)
    screenBYOD02.input(source00)
    screenBYOD03.input(source00)
    screenBYOD04.input(source00)
    screenBYOD05.input(source00)
    screenW01.input(source09)
}



action[5] = () => {
    ipad[1].classList.add("active")
    ipadBtns[3].style.backgroundImage = "url(element/actionIpadBtn_img" + 3 + "_on.png)"

    delay(lightOn, 0, 10)
    bgVideoDownAnyway()
    screen01.input(source17)
    screen02.input(source18)
    screenBYOD01.input(source00)
    screenBYOD02.input(source00)
    screenBYOD03.input(source00)
    screenBYOD04.input(source00)
    screenBYOD05.input(source00)
    screenW01.input(source14)


}

action[6] = () => {
    ipad[2].classList.add("active")
    ipadBtns[6].style.backgroundImage = "url(element/actionIpadBtn_img" + 6 + "_on.png)"


    delay(lightOn, 0, 10)
    bgVideoDownAnyway()
    screen01.input(source17)
    screen02.input(source18)
    screenBYOD01.input(source00)
    screenBYOD02.input(source00)
    screenBYOD03.input(source00)
    screenBYOD04.input(source00)
    screenBYOD05.input(source00)
    screenW01.input(source14)
}

action[7] = () => {
    $css("actionContainer")[1].classList.add("active")

    delay(lightOn, 0, 10)
    bgVideoDownAnyway()
    screen01.input(source17)
    screen02.input(source18)
    screenBYOD01.input(source00)
    screenBYOD02.input(source00)
    screenBYOD03.input(source00)
    screenBYOD04.input(source00)
    screenBYOD05.input(source00)
    screenW01.input(source21)
}






action[8] = () => {
    delay(lightOff, 1500, 10)

    bgVideoDownAnyway()
    screen01.input(source00)
    screen02.input(source00)
    screenT02.input(source00)
    screenT03.input(source00)
    screenT04.input(source00)
    screenT05.input(source00)
    screenTMain.input(source00)
    screenBYOD01.input(source00)
    screenBYOD02.input(source00)
    screenBYOD03.input(source00)
    screenBYOD04.input(source00)
    screenBYOD05.input(source00)
    screenW01.input(source00)
}






//  ----------------------- 
//
//  Action area 功能
//
//  -----------------------
//  -----------------------
//
// Action area  1
//
//  -----------------------


var act01obj = $css("act01obj")
var vpLayout = 0

screenVp01.object.remove()
screenVp02.object.remove()
screenVp03.object.remove()
screenVp04.object.remove()


for (let i = 0; i < act01obj.length; i++) {
    act01obj[i].addEventListener("click", () => {
        let j = i + 1
        toggle(screenVps[i].tag, () => {
            vp.object.appendChild(screenVps[i].object)
            screenVps[i].tag = 1
            vpLayout = vpLayout + 1
            act01obj[i].src = "element/action01_img0" + j + "_off.png"
        }, () => {
            screenVps[i].object.remove()
            screenVps[i].tag = 0
            vpLayout = vpLayout - 1
            act01obj[i].src = "element/action01_img0" + j + ".png"
        })
        if (vpLayout > 1) {
            vp.removeCss("l0")
        } else {
            vp.addCss("l0")
        }
    })
}

//  -----------------------
//
// Action area  2
//
//  -----------------------

var act02C02 = $css("action02Co2")
var act02Slider = $id("action02Slider")
var action02Air = $css("action02Air")[0]
var action02Air02 = $css("action02Air")[1]

act02Slider.addEventListener("change", (e) => {
    let value = e.target.value
    if (value == 0) {
        act02C02[1].style.opacity = 0
        act02C02[2].style.opacity = 0
        act02C02[3].style.opacity = 0
        act02C02[4].style.opacity = 0
        action02Air.style.opacity = 0.5
        action02Air.style.height = "30%"
        action02Air.style.animationDuration = "15s"
        action02Air02.style.opacity = 0.1
    } else if (value == 1) {
        act02C02[1].style.opacity = 1
        act02C02[2].style.opacity = 0
        act02C02[3].style.opacity = 0
        act02C02[4].style.opacity = 0
        action02Air.style.opacity = 0.5
        action02Air.style.height = "40%"
        action02Air.style.animationDuration = "10s"
        action02Air02.style.opacity = 0.2
    } else if (value == 2) {
        act02C02[1].style.opacity = 1
        act02C02[2].style.opacity = 1
        act02C02[3].style.opacity = 0
        act02C02[4].style.opacity = 0
        action02Air.style.opacity = 0.6
        action02Air.style.height = "60%"
        action02Air.style.animationDuration = "8s"
        action02Air02.style.opacity = 0.4
    } else if (value == 3) {
        act02C02[1].style.opacity = 1
        act02C02[2].style.opacity = 1
        act02C02[3].style.opacity = 1
        act02C02[4].style.opacity = 0
        action02Air.style.opacity = 0.8
        action02Air.style.height = "70%"
        action02Air.style.animationDuration = "5s"
        action02Air02.style.opacity = 0.5
    } else if (value == 4) {
        act02C02[1].style.opacity = 1
        act02C02[2].style.opacity = 1
        act02C02[3].style.opacity = 1
        act02C02[4].style.opacity = 1
        action02Air.style.opacity = 1
        action02Air.style.height = "85%"
        action02Air.style.animationDuration = "2.5s"
        action02Air02.style.opacity = 0.7
    }

})




//  -----------------------
//
// Action area  3
//
//  -----------------------

var act03obj = $css("act03obj")

var A3ScreenSize = 1
act03obj[0].addEventListener("click", () => {
    if (A3ScreenSize < 3) {
        A3ScreenSize = A3ScreenSize + 0.1
        screenForA301.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
        screenForA302.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
        screenW01.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
        screenBYOD01.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
        act03obj[1].style.opacity = 1
    }
})
act03obj[1].addEventListener("click", () => {
    if (A3ScreenSize > 1.1) {
        A3ScreenSize = A3ScreenSize - 0.1
        screenForA301.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
        screenForA302.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
        screenW01.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
        screenBYOD01.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
        if (A3ScreenSize < 1.15) {
            act03obj[1].style.opacity = 0
        }
    }
})

var screenForA3reset = () => {
    A3ScreenSize = 1
    screenForA301.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
    screenForA302.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
    screenW01.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
    screenBYOD01.source.style.transform = 'translate(-50%,-50%) scale(' + A3ScreenSize + ')'
}



var act03slideNum = 1
var act03slide = [source09, source10, source11, source08]

act03obj[2].addEventListener("click", () => {
    act03slideNum = act03slideNum - 1
    if (act03slideNum == -1) { act03slideNum = act03slide.length - 1 }
    screenForA301.input(act03slide[act03slideNum])
    screenForA302.input(act03slide[act03slideNum])
    screenW01.input(act03slide[act03slideNum])
    screenBYOD01.input(act03slide[act03slideNum])

})

act03obj[3].addEventListener("click", () => {
    act03slideNum = act03slideNum + 1
    if (act03slideNum == act03slide.length) { act03slideNum = 0 }
    screenForA301.input(act03slide[act03slideNum])
    screenForA302.input(act03slide[act03slideNum])
    screenW01.input(act03slide[act03slideNum])
    screenBYOD01.input(act03slide[act03slideNum])
})



//  -----------------------
//
// Action area  4 5 6
//
//  -----------------------


var ipadBtns = $css("ipadBtn")
var ipadBtnsAlloff = () => {
    for (let i = 0; i < ipadBtns.length; i++) {
        ipadBtns[i].style.backgroundImage = "url(element/actionIpadBtn_img" + i + ".png)"
    }
}

for (let i = 0; i < ipadBtns.length; i++) {
    ipadBtns[i].addEventListener("click", () => {
        ipadBtnsAlloff()
        ipadBtns[i].style.backgroundImage = "url(element/actionIpadBtn_img" + i + "_on.png)"
        ipadBtnsAction[i]()
    })
}


var ipadBtnsAction = []




ipadBtnsAction[0] = () => {
    bgVideoUpAnyway()
    screenT02.input(source12)
    screenT03.input(source12)
    screenT04.input(source12)
    screenT05.input(source12)
}
ipadBtnsAction[1] = () => {
    bgVideoUpAnyway()
    screenT02.input(source12)
    screenT03.input(source13)
    screenT04.input(source12)
    screenT05.input(source13)
}
ipadBtnsAction[2] = () => {
    bgVideoDownAnyway()
}




ipadBtnsAction[3] = () => {
    screen01.input(source17)
    screen02.input(source18)
    screenW01.input(source14)
}

ipadBtnsAction[4] = () => {
    screen01.input(source17)
    screen02.input(source18)
    screenW01.input(source15)
}

ipadBtnsAction[5] = () => {
    screen01.input(source17)
    screen02.input(source18)
    screenW01.input(source16)
}



ipadBtnsAction[6] = () => {
    screen01.input(source17)
    screen02.input(source18)
    screenW01.input(source14)
}
ipadBtnsAction[7] = () => {
    screen01.input(source19)
    screen02.input(source20)
    screenW01.input(source16)
}







var act07obj = $css("act07obj")
var act07objTag = [0, 0, 0]
var act07CameraP = [
    'translate(-42%,-20%) scale(' + 3.5 + ')',
    'translate(-100%,-40%) scale(' + 4 + ')',
    'translate(-120%,-80%) scale(' + 4 + ')']


for (let i = 0; i < act07obj.length; i++) {
    act07obj[i].addEventListener("click", () => {

        toggle(act07objTag[i], () => {

            for (let j = 0; j < act07obj.length; j++) {
                act07obj[j].src = "element/action07_img0" + j + ".png"
                act07objTag[j] = 0
            }
            act07obj[i].src = "element/action07_img0" + i + "_off.png"
            act07objTag[i] = 1

            screenW01.source.style.transform = act07CameraP[i]
        }, () => {
            act07obj[i].src = "element/action07_img0" + i + ".png"
            screenW01.source.style.transform = 'translate(-50%,-50%) scale(' + 1 + ')'
            act07objTag[i] = 0
        })

    })
}

var screenForA7reset = () => {
    for (let j = 0; j < act07obj.length; j++) {
        act07obj[j].src = "element/action07_img0" + j + ".png"
        act07objTag[j] = 0
    }
    screenW01.source.style.transform = 'translate(-50%,-50%) scale(' + 1 + ')'
}


//  ----------------------- 
//
//  /iPad
//
//  -----------------------
var ipad = $css("ipad")
var ipadBtns = $css("ipadBtn")

//  ----------------------- 
//
//  /keypad
//
//  -----------------------



keypadBtns[0].object.addEventListener("click", () => {
    keypadBtns[0].onToggle()
    keypad.off()
    $css("flowMenuBoxs")[0].classList.remove("off")
    flowMenuAction(0)
})
keypadBtns[1].object.addEventListener("click", () => {
    keypadBtns[1].press()
    keypad.off()
    $css("flowMenuBoxs")[0].classList.remove("off")
    flowMenuAction(1)
})
keypadBtns[2].object.addEventListener("click", () => {
    keypadBtns[2].press()
    keypad.off()
    $css("flowMenuBoxs")[0].classList.remove("off")
    flowMenuAction(2)
})






//  -------------------------------------------------------------------------
//  -------------------------------------------------------------------------
//
//
//  鍵盤快捷鍵
//
//
//  -------------------------------------------------------------------------
//  -------------------------------------------------------------------------

window.addEventListener("keydown", keyboardListener, false);

function keyboardListener(e) {
    var keyID = e.code;
    if (keyID === 'KeyQ') {
        toggle(lightTag, () => {
            lightOn()
        }, () => {
            lightOff()
        })
        toggle(lightTag, new message("Light Off").add, new message("Light On").add)
    }

    if (keyID === 'KeyW') {
        bgvideoToggle()
    }



    if (keyID === 'KeyA') {
        screen02.appearToggle()
        toggle(screen02.appearTag, new message("Screen Off").add, new message("Screen On").add)
    }

    if (keyID === 'KeyZ') {
        projector.upCloseToggle()
        toggle(screen.upCloseTag, new message("Projector Off").add, new message("Projector On").add)
    }

    // content switch
    if (keyID === 'KeyS') {
        toggle(screenContent00.appearTag,
            () => {
                // screenContent00.appear()
                // screenContent01.disappear()
                // new message("Show Slide").add()
            },
            () => {
                // screenContent00.disappear()
                // screenContent01.appear()
                // new message("Show Video").add()
            })
    }


    // video mode
    if (keyID === 'KeyE') {
        people.appear()
        lightOn()
        projector.disUpClose()
        delay(screen.appear, 1200)
        screenContent00.disappear()
        screenContent01.appear()
        new message("Video mode").add()
    }

    // meeting mode
    if (keyID === 'KeyR') {
        people.appear()
        lightOn()
        projector.disUpClose()
        delay(screen.appear, 1200)
        screenContent00.appear()
        screenContent01.disappear()
        new message("Meeting mode").add()
    }

    // nobody mode
    if (keyID === 'KeyT') {
        people.disappear()
        lightOff()
        projector.upClose()

        delay(screen.disappear, 0)
        screen.disappear()
        new message("Leave mode").add()
    }
}




