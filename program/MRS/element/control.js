
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
    lightTag = 1
}
lightOff = () => {
    space.classList.add("dark")
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


var bgVideo = $css("bgImage")[0]
var bgVideo_d = $css("bgImage")[1]
var bgVideoTag = 0
var bgVideoIngTag = 0

bgVideo.addEventListener('timeupdate', function () {
    if (bgVideoTag == 0) {
        if (bgVideo.currentTime >= 4) {
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



var shareImage = "element/Share default.png"
var source01 = "element/video.mp4"
var source02 = "element/slide01.png"
var source03 = "element/slide02.png"
var source04 = "element/slide03.png"







//  ----------------------- 
//
//  入場
//
//  -----------------------


screen01.input(source02)
screen02.input(source01)
screen03.input(source03)


screenVp01.input(source03)
screenVp02.input(source02)
screenVp03.input(source04)
screenVp04.input(source04)


screenT01.input(source02)
screenT02.input(source02)
screenT03.input(source02)
screenT04.input(source02)
screenT05.input(source02)
screenTMain.input(source02)



screenT01.disappear()
screenT02.disappear()
screenT03.disappear()
screenT04.disappear()
screenT05.disappear()
screenTMain.disappear()


screenBYOD01.input(source02)
screenBYOD02.input(source02)
screenBYOD03.input(source02)
screenBYOD04.input(source02)
screenBYOD05.input(source02)

screenW01.input(source02)
// whiteBoard.disappear()
screenForA301.input(source02)
screenForA302.input(source02)




lightOn()










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
    $css("action03Container")[0].classList.remove("active")

}


//  上方按鈕 狀態改變

for (let i = 0; i < flowMenuLen; i++) {
    flowMenu[i].addEventListener("click", () => {
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
            j = 9
        }
        action[j]()
        actionMenu[j].classList.add("active")
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



//  左側按鈕 功能

var action = []


for (let i = 0; i < actionMenuLen; i++) {
    action[i] = () => {
        actionMenu[i].classList.add("active")
        test(i)
    }
}

action[0] = () => {
    bgVideoUpAnyway()
}




action[1] = () => {
    screenVp04.input(shareImage)

}

action[2] = () => {

}




action[3] = () => {
    $css("action03Container")[0].classList.add("active")
}


action[4] = () => {

}



action[5] = () => {

}

action[6] = () => {

}

action[7] = () => {

}

action[8] = () => {

}



action[9] = () => {

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

var vpLayoutTag = 0
var vpLoyoutOrder = [0, 0, 0, 0]






var vpSourceBox = [source01, source02, source03, source04]

var vpLayoutSwitchUp = (sourceNum) => {
    if (vpLayoutTag == 0) {
        screenVp01.input(vpSourceBox[sourceNum])
        vp.removeCss("x0")
        vp.addCss("x1")
        vpLayoutTag = 1
    } else if (vpLayoutTag == 1) {
        screenVp02.input(vpSourceBox[sourceNum])
        vp.removeCss("x1")
        vp.addCss("x2")
        vpLayoutTag = 2
    } else if (vpLayoutTag == 2) {
        screenVp03.input(vpSourceBox[sourceNum])
        vp.removeCss("x2")
        vp.addCss("x3")
        vpLayoutTag = 3
    } else if (vpLayoutTag == 3) {
        screenVp04.input(vpSourceBox[sourceNum])
        vp.removeCss("x3")
        vp.addCss("x4")
        vpLayoutTag = 4
    }
}

var vpLayoutSwitchDown = (sourceNum) => {
    if (vpLayoutTag == 4) {
        screenVp01.input(vpSourceBox[sourceNum])
        vp.removeCss("x4")
        vp.addCss("x3")
        vpLayoutTag = 3
    } else if (vpLayoutTag == 3) {
        screenVp02.input(vpSourceBox[sourceNum])
        vp.removeCss("x3")
        vp.addCss("x2")
        vpLayoutTag = 2
    } else if (vpLayoutTag == 2) {
        screenVp03.input(vpSourceBox[sourceNum])
        vp.removeCss("x2")
        vp.addCss("x1")
        vpLayoutTag = 1
    } else if (vpLayoutTag == 1) {

    }
}





act01obj[0].addEventListener("click", () => {
    vpLayoutSwitchUp(0)
})

act01obj[1].addEventListener("click", () => {
    vpLayoutSwitchUp(1)
})

act01obj[2].addEventListener("click", () => {
    vpLayoutSwitchUp(2)
})

act01obj[3].addEventListener("click", () => {
    vpLayoutSwitchDown(2)
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

var act03slide = [source02, source03, source04]
var act03slideNum = 1

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
//  /keypad
//
//  -----------------------


keypadBtns[0].object.addEventListener("click", () => {
    keypadBtns[0].onToggle()
    toggle(lightTag, lightOn, lightOff)
})
keypadBtns[1].object.addEventListener("click", () => {
    keypadBtns[1].press()
    screen01.input(source01)
    vp01.input(source01)
})
keypadBtns[2].object.addEventListener("click", () => {
    keypadBtns[2].press()
    screen01.input(source02)
    vp01.input(source02)
})
keypadBtns[3].object.addEventListener("click", () => {
    keypadBtns[3].press()
    screen01.input(source03)
    vp01.input(source03)
})
keypadBtns[4].object.addEventListener("click", () => {
    keypadBtns[4].onToggle()
    bgVideoToggle()
})
keypadBtns[5].object.addEventListener("click", () => {
    keypadBtns[5].press()
    screenW01.input(source01)
})
keypadBtns[6].object.addEventListener("click", () => {
    keypadBtns[6].press()
    screenW01.input(source03)
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




