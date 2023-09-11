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





//電視桌控制

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






//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//
// 電腦桌控制
//
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------


var bgvideoToggle = () => {
    if (bgVideoIngTag == 0) {
        toggle(bgVideoTag, () => {
            bgVideo.currentTime = 0
            bgVideo.play()
            bgVideo_d.currentTime = 0
            bgVideo_d.play()
            bgVideoIngTag = 1
        }, () => {
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
        })
    } else if ((bgVideoIngTag == 1)) {
        if (bgVideoTag == 0) {
            bgVideoTag = 1
            bgVideo.currentTime = 8 - bgVideo.currentTime
            bgVideo.play()
            bgVideo_d.currentTime = 8 - bgVideo_d.currentTime
            bgVideo_d.play()
        } else if (bgVideoTag == 1) {
            bgVideoTag = 0
            bgVideo.currentTime = 8 - bgVideo_d.currentTime
            bgVideo.play()
            bgVideo_d.currentTime = 8 - bgVideo_d.currentTime
            bgVideo_d.play()

        }
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






//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//
//  互動
//
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------


//  ----------------------- 
//
//  環境架設
//
//  -----------------------

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
var screenLEDbg = new vkObject($css("screen")[3])
var screenLED01 = new vkObject($css("screen")[4])
var screenLED02 = new vkObject($css("screen")[5])
var screenLED03 = new vkObject($css("screen")[6])

var screenT01 = new vkObject($css("screen")[7])
var screenT02 = new vkObject($css("screen")[8])
var screenT03 = new vkObject($css("screen")[9])
var screenT04 = new vkObject($css("screen")[10])
var screenT05 = new vkObject($css("screen")[11])

var whiteBoard = new vkObject($css("wb")[0])
var screenW01 = new vkObject($css("screen")[12])


var source01 = "element/video.mp4"
var source02 = "element/slide01.png"
var source03 = "element/slide02.png"



//  ----------------------- 
//
//  篩選器
//
//  -----------------------



$css("q1")[0].addEventListener("click", () => {
    space.classList.add("displayCount2")
    space.classList.remove("led")
})
$css("q1")[1].addEventListener("click", () => {
    space.classList.remove("displayCount2")
    space.classList.remove("led")
})
$css("q1")[2].addEventListener("click", () => {
    space.classList.remove("displayCount2")
    space.classList.add("led")
})




$css("q2")[0].addEventListener("click", () => {
    whiteBoard.appear()
})
$css("q2")[1].addEventListener("click", () => {
    whiteBoard.disappear()
})




//  ----------------------- 
//
//  互動
//
//  -----------------------

//入場

screen01.input(source02)
screen02.input(source01)
screen03.input(source03)

screenLEDbg.input(source01)
screenLED01.input(source01)
screenLED02.input(source02)
screenLED03.input(source03)


screenT01.input(source02)
screenT02.input(source02)
screenT03.input(source02)
screenT04.input(source02)
screenT05.input(source02)

screenT01.disappear()
screenT02.disappear()
screenT03.disappear()
screenT04.disappear()
screenT05.disappear()


screenW01.input(source02)
whiteBoard.disappear()


lightOn()




//buttom
keypadBtns[0].object.addEventListener("click", () => {
    keypadBtns[0].onToggle()
    toggle(lightTag, lightOn, lightOff)
})
keypadBtns[1].object.addEventListener("click", () => {
    keypadBtns[1].press()
    screen01.input(source01)
    screenLED01.input(source01)
})
keypadBtns[2].object.addEventListener("click", () => {
    keypadBtns[2].press()
    screen01.input(source02)
    screenLED01.input(source02)
})
keypadBtns[3].object.addEventListener("click", () => {
    keypadBtns[3].press()
    screen01.input(source03)
    screenLED01.input(source03)
})
keypadBtns[4].object.addEventListener("click", () => {
    keypadBtns[4].onToggle()
    bgvideoToggle()
})
keypadBtns[5].object.addEventListener("click", () => {
    keypadBtns[5].press()
    screenW01.input(source01)
})
keypadBtns[6].object.addEventListener("click", () => {
    keypadBtns[6].press()
    screenW01.input(source03)
})





// 鍵盤快捷鍵
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
                screenContent00.appear()
                screenContent01.disappear()
                new message("Show Slide").add()
            },
            () => {
                screenContent00.disappear()
                screenContent01.appear()
                new message("Show Video").add()
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




