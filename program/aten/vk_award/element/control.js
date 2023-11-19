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


//開關燈功能，預設關燈
var lightTag = 0
lightOn = () => {
    space.classList.remove("dark")
    lightTag = 1
}
lightOff = () => {
    space.classList.add("dark")
    lightTag = 0
}



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
//  功能架設
//
//  -----------------------

var space = $css("space")[0]
var people = new vkObject($css("people")[0])
var projector = new vkObject($css("projector")[0])


var screen = new vkObject($css("screen")[0])
var screenContent00 = new vkObject($css("content")[0])
var screenContent01 = new vkObject($css("content")[1])




//  ----------------------- 
//
//  互動設定
//
//  -----------------------


// 先把影片關掉
screenContent01.disappear()

lightOn()

// 鍵盤快捷鍵
window.addEventListener("keydown", keyboardListener, false);

function keyboardListener(e) {
    var keyID = e.code;
    if (keyID === 'KeyQ') {
        toggle(lightTag, () => { lightOn() }, () => { lightOff() })
    }

    // open projector
    if (keyID === 'KeyW') {
        toggle(projector.upCloseTag,
            () => {
                projector.upClose()
                delay(screen.disappear, 0)
            },
            () => {
                projector.disUpClose()
                delay(screen.appear, 1200)
            })
    }

    if (keyID === 'KeyA') {
        screen.appearToggle()

    }

    if (keyID === 'KeyZ') {
        projector.upCloseToggle()
    }

    // content switch
    if (keyID === 'KeyS') {
        toggle(screenContent00.appearTag,
            () => {
                screenContent00.appear()
                screenContent01.disappear()
            },
            () => {
                screenContent00.disappear()
                screenContent01.appear()
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
    }

    // meeting mode
    if (keyID === 'KeyR') {
        people.appear()
        lightOn()
        projector.disUpClose()
        delay(screen.appear, 1200)
        screenContent00.appear()
        screenContent01.disappear()
    }

    // nobody mode
    if (keyID === 'KeyT') {
        people.disappear()
        lightOff()
        projector.upClose()
        delay(screen.disappear, 0)
        screen.disappear()
    }
}




