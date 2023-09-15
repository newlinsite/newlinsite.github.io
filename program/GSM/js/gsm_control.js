






//  -------------------------------------------------------------------
//
//  功能
// 
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
// Delay
// ------------------------

// 創造容器
var delayContainer = []
for (let i = 0; i < 30; i++) {
    delayContainer.push({ id: null })
}
//delay fuction
delay = (doSomething, delayTime, num = 0) => {
    // console.log("delay start", num)
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
            // console.log("delay over", num)
        }, delayTime);
    }
}


//  -------------------------------------------------------------------
//
//  創立控制單體功能
// 
//  -------------------------------------------------------------------




var media = function (object, type = "img", delayContainer = 10, muted = true, stop = true, loop = false) {

    // define
    this.object = object

    if (type == "video") {
        this.object.muted = muted;
        this.object.loop = loop;
    }

    // on, Opacity
    this.onTag = 1
    this.on = () => {
        this.object.style.opacity = 1
        this.onTag = 1

        if (type == "video") {
            delay(() => { console.log("stop") }, 0, delayContainer)
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
            this.object.pause()
            delay(() => {
                this.object.style.display = "none"
            }, 500, delayContainer)
        }
    }

    if (type == "video") {
        if (loop == false) {
            this.object.addEventListener('ended', () => {
                this.object.style.opacity = 0
                delay(() => {
                    offAll()
                    imgs[0].on()
                    imgs[0].removeCss("off")
                }, 400, 1)

            });
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





// ------------------------
// 讀取擷取卡
// ------------------------


// 設備檢查
console.log(navigator.mediaDevices.enumerateDevices())

var stream = new media($css('video')[0], "img")


// 內容資訊
var streamContent = {
    // video: true,
    video: {
        // facingMode:"",
        deviceId: "211e90fa43a235fd801c6e6fb78739d773272e171dd0d7c307ed5b9189ce20a8",
        // deviceId: "f73bf817f735b26605625c2c16852e304c8c383400a10be14829242e32eb8a72",
        frameRate: 30,
        // width: 640,
        // height: 360
    },
    audio: false
    // audio: {
    //     noiseSuppression: false,
    //     autoGainControl: false
    // }
};

function gotStream(streamContent) {

    // Older browsers may not have srcObject.
    if ("srcObject" in stream.object) {
        stream.object.srcObject = streamContent;
    } else {
        // Avoid using this in new browsers, as it is going away.
        stream.object.src = window.URL.createObjectURL(streamContent);
    }
}

navigator.mediaDevices
    .getUserMedia(streamContent)
    .then(gotStream)
    .catch(() => { console.log('input error: ', "error"); })





//  -------------------------------------------------------------------
//
//  創立單體
// 
//  -------------------------------------------------------------------



var imgs = []
imgs[0] = new media($tag("img")[0], "img")
imgs[1] = new media($tag("img")[1], "img")
imgs[2] = new media($tag("img")[2], "img")
imgs[3] = new media($tag("img")[3], "img")
imgs[4] = new media($tag("img")[4], "img")
imgs[5] = new media($tag("img")[5], "img")
imgs[6] = new media($tag("img")[6], "img")

var videos = []
videos[0] = new media($tag("video")[0], "video", 11, false, true)
videos[1] = new media($tag("video")[1], "video", 12, false, true)
videos[2] = new media($tag("video")[2], "video", 13, false, true)
videos[3] = new media($tag("video")[3], "video", 14, false, true)
videos[4] = new media($tag("video")[4], "video", 15, false, true)
videos[5] = new media($tag("video")[5], "video", 16, false, true)
videos[6] = new media($tag("video")[6], "video", 17, false, true)
videos[7] = new media($tag("video")[7], "video", 18, false, true)
videos[8] = new media($tag("video")[8], "video", 19, false, true)
videos[9] = new media($tag("video")[9], "video", 20, false, true)
videos[10] = new media($tag("video")[10], "video", 21, false, true)

var uppers = []
uppers[0] = new media($css("uBoxs")[0], "upper")
uppers[1] = new media($css("uBoxs")[1], "upper")
uppers[2] = new media($css("uBoxs")[2], "upper")
uppers[3] = new media($css("uBoxs")[3], "upper")
uppers[4] = new media($css("uBoxs")[4], "upper")




//單體功能

var offAll = () => {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].off()
        imgs[0].addCss("off")
    }
    for (let i = 0; i < videos.length; i++) {
        videos[i].off()
    }
}


var offAllUpper = () => {
    for (let i = 0; i < uppers.length; i++) {
        uppers[i].addCss("off")
        uppers[i].addCss("quick")
    }

}

var upperTo = (upperNum = null, time = 0) => {
    delay(() => {
        offAllUpper()
        if (upperNum != null) {
            uppers[upperNum].removeCss("quick")
            uppers[upperNum].removeCss("off")
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
    if (keyID === 'KeyZ') {
        offAll()
        imgs[0].on()
        imgs[0].removeCss("off")

    }
    if (keyID === 'KeyX') {
        offAll()
        imgs[1].on()

    }
    if (keyID === 'KeyC') {
        offAll()
        imgs[2].on()
    }
    if (keyID === 'KeyV') {
        offAll()
        imgs[3].on()
    }
    if (keyID === 'KeyB') {
        offAll()
        imgs[4].on()
    }
    if (keyID === 'KeyN') {
        offAll()
        imgs[5].on()
    }
    if (keyID === 'KeyM') {
        offAll()
        imgs[6].on()
    }






    if (keyID === 'KeyQ') {
        offAll()
        videos[0].on()
    }





    if (keyID === 'Digit1') {
        offAll()
        videos[1].on()
    }
    if (keyID === 'Digit2') {
        offAll()
        videos[2].on()
    }
    if (keyID === 'Digit3') {
        offAll()
        videos[3].on()
    }
    if (keyID === 'Digit4') {
        offAll()
        videos[4].on()
    }
    if (keyID === 'Digit5') {
        offAll()
        videos[5].on()
    }


    if (keyID === 'Digit6') {
        offAll()
        videos[6].on()
    }
    if (keyID === 'Digit7') {
        offAll()
        videos[7].on()
    }
    if (keyID === 'Digit8') {
        offAll()
        videos[8].on()
    }
    if (keyID === 'Digit9') {
        offAll()
        videos[9].on()
    }
    if (keyID === 'Digit0') {
        offAll()
        videos[10].on()
    }






    //Upper

    if (keyID === 'Numpad2') {
        upperTo()
    }
    if (keyID === 'Numpad3') {
        upperTo(0)
    }
    if (keyID === 'Numpad4') {
        upperTo(1)
    }
    if (keyID === 'Numpad5') {
        upperTo(2)
    }
    if (keyID === 'Numpad6') {
        upperTo(3)
    }
    if (keyID === 'Numpad7') {
        upperTo(4)
    }
    if (keyID === 'Numpad8') {
        upperTo()
    }





    //stream

    if (keyID === 'KeyP') {
        if (streamShow == 0) {
            stream.addCss("show")
            streamShow = 1
        } else {
            stream.removeCss("show")
            streamShow = 0
        }

    }


    if (keyID === 'ArrowRight') {
        streamLeft = streamLeft + 1
        stream.object.style.left = streamLeft + "%"
        videoMoBox.style.left = streamLeft + "%"
    }
    if (keyID === 'ArrowLeft') {
        streamLeft = streamLeft - 1
        stream.object.style.left = streamLeft + "%"
        videoMoBox.style.left = streamLeft + "%"
    }

    if (keyID === 'ArrowUp') {
        streamTop = streamTop - 1
        stream.object.style.top = streamTop + "%"
        videoMoBox.style.top = streamTop + "%"
    }

    if (keyID === 'ArrowDown') {
        streamTop = streamTop + 1
        stream.object.style.top = streamTop + "%"
        videoMoBox.style.top = streamTop + "%"
    }

    if (keyID === 'Equal') {
        streamH = streamH + 1
        stream.object.style.height = streamH + "%"
        videoMoBox.style.height = streamH + "%"
    }

    if (keyID === 'Minus') {
        streamH = streamH - 1
        stream.object.style.height = streamH + "%"
        videoMoBox.style.height = streamH + "%"
    }

    if (keyID === 'BracketRight') {
        streamLeft = 88
        stream.object.style.left = streamLeft + "%"
        videoMoBox.style.left = streamLeft + "%"
    }

    if (keyID === 'BracketLeft') {
        streamLeft = 12
        stream.object.style.left = streamLeft + "%"
        videoMoBox.style.left = streamLeft + "%"
    }


}


var videoMoBox = $css("videoMoBox")[0]
var streamLeft = 80
var streamTop = 50
var streamH = 70

var streamShow = 0

