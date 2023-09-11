


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
// Delay
// ------------------------

// 創造容器
var delayContainer = []
for (let i = 0; i < 20; i++) {
    delayContainer.push({ id: null })
}
//delay fuction
delay = (doSomething, delayTime, num = 0) => {
    console.log("delay start", num)
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
            console.log("delay over", num)
        }, delayTime);
    }
}






//  -------------------------------------------------------------------
//
//  創立控制單體
// 
//  -------------------------------------------------------------------




var media = function (object, type = "img", muted = true, stop = true) {

    // define
    this.object = object

    if (type == "video") {
        this.object.muted = muted;
    }

    // on, Opacity
    this.onTag = 1
    this.on = () => {
        this.object.style.opacity = 1
        this.onTag = 1
        if (type == "video") {
            this.object.style.display = "block"
            this.object.play()
        }
    }
    this.off = () => {
        this.object.style.opacity = 0
        this.onTag = 0
        if (type == "video") {
            if (stop) {
                this.object.currentTime = 0
            }
            this.object.style.display = "none"
            this.object.pause()
        }
    }


    this.coverHight = () => {
        this.object.classList.add("hight")
    }

    this.addCss = (style) => {
        this.object.classList.add(style)
    }
    this.removeCss = (style) => {
        this.object.classList.remove(style)
    }
}


var imgs = []
imgs[0] = new media($tag("img")[0], "img")
imgs[1] = new media($tag("img")[1], "img")
imgs[2] = new media($tag("img")[2], "img")
imgs[3] = new media($tag("img")[3], "img")
imgs[4] = new media($tag("img")[4], "img")
imgs[5] = new media($tag("img")[5], "img")


var videos = []
videos[0] = new media($tag("video")[0], "video", true, false)
videos[1] = new media($tag("video")[1], "video", false, true)
videos[2] = new media($tag("video")[2], "video", false, true)
videos[3] = new media($tag("video")[3], "video", false, true)
videos[4] = new media($tag("video")[4], "video", false, false)
videos[5] = new media($tag("video")[5], "video", false, true)


var uppers = []
uppers[0] = new media($css("uBoxs")[0], "upper")
uppers[1] = new media($css("uBoxs")[1], "upper")
uppers[2] = new media($css("uBoxs")[2], "upper")
uppers[3] = new media($css("uBoxs")[3], "upper")





var offAll = () => {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].off()
        videos[i].off()
        imgs[0].addCss("off")
    }
}




var offAllUpper = () => {
    for (let i = 0; i < uppers.length; i++) {
        uppers[i].off()
    }
}


var upperTo = (upperNum = null, time = 4500) => {
    delay(() => {
        offAllUpper()
        if (upperNum != null) {
            uppers[upperNum].on()
        }
    }, time, 0)
}








//  -------------------------------------------------------------------
//
//  進場
// 
//  -------------------------------------------------------------------







offAllUpper()
offAll()
imgs[0].on()
imgs[0].removeCss("off")



// 鍵盤快捷鍵
window.addEventListener("keydown", keyboardListener, false);

function keyboardListener(e) {
    var keyID = e.code;
    if (keyID === 'Numpad0') {
        offAll()
        imgs[0].on()
        imgs[0].removeCss("off")

    }
    if (keyID === 'Numpad1') {
        offAll()
        imgs[1].on()

    }
    if (keyID === 'Numpad2') {
        offAll()
        imgs[2].on()
    }
    if (keyID === 'Numpad3') {
        offAll()
        imgs[3].on()
    }
    if (keyID === 'Numpad4') {
        offAll()
        imgs[4].on()
    }

    if (keyID === 'Numpad5') {
        offAll()
        videos[4].on()
    }

    if (keyID === 'Numpad6') {
        offAll()
        videos[0].on()
    }

    if (keyID === 'Numpad7') {
        offAll()
        videos[1].on()
    }

    if (keyID === 'Numpad8') {
        offAll()
        videos[2].on()
    }
    if (keyID === 'Numpad9') {
        offAll()
        videos[3].on()
    }





    if (keyID === 'Digit1') {
        upperTo()
    }
    if (keyID === 'Digit2') {
        upperTo(0)
    }
    if (keyID === 'Digit3') {
        upperTo(1)
    }
    if (keyID === 'Digit4') {
        upperTo(2)
    }
    if (keyID === 'Digit5') {
        upperTo(3)
    }


    if (keyID === 'KeyQ') {
        upperTo(null, 0)
    }
    if (keyID === 'KeyW') {
        upperTo(0, 0)
    }
    if (keyID === 'KeyE') {
        upperTo(1, 0)
    }
    if (keyID === 'KeyR') {
        upperTo(2, 0)
    }
    if (keyID === 'KeyT') {
        upperTo(3, 0)
    }



}







//要不要 loop
//播完要轉回主視覺 功能
//每次出現需重播
//控制面板 快捷鍵顯示 Loop or not?
//重播 or not?
//image 淡入淡出 左右換 放大縮小