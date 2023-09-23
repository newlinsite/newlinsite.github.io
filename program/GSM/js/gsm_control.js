

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

// 創造延遲容器
var delayContainer = []
//0~9 給功能用
//10~24給影片轉場用
//25~29 自由使用
for (let i = 0; i < 30; i++) {
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




//  -------------------------------------------------------------------
//
//  創立控制單體功能
// 
//  -------------------------------------------------------------------

var media = function (object, type = "img", videoWidth = 100, delayContainer = 10, muted = "muted", stop = "stop", loop = "unloop") {

    // define
    this.object = object

    this.object.addEventListener('error', () => {
        console.log(this.object.src, 'Can not this media', "turn to default");
        if (type == "video") {
            this.object.src = "element/vbg.mp4"
        } else {
            this.object.src = "element/ibg.jpg"
        }
    });


    //新增 CSS
    this.cssTag = 0
    this.addCss = (style) => {
        this.object.classList.add(style)
    }
    this.removeCss = (style) => {
        this.object.classList.remove(style)
    }

    // 開關
    this.onTag = 1
    this.on = () => {
        this.object.style.opacity = 1
        this.onTag = 1
        if (type == "video") {
            delay(() => { console.log("stop display None") }, 0, delayContainer)
            this.object.style.display = "block"
            this.object.play()
        }
    }
    this.off = () => {
        this.object.style.opacity = 0
        this.onTag = 0
        if (type == "video") {
            if (stop == "stop") {
                this.object.currentTime = 0
            }
            this.object.pause()
            delay(() => {
                this.object.style.display = "none"
            }, 1000, delayContainer)
        }
    }

    //影片屬性
    if (type == "video") {
        if (muted == "muted") {
            this.object.muted = muted;
        }
        if (loop == "loop") {
            this.object.loop = loop;
        }
        if (videoWidth == "height100") {
            this.object.style.height = "100%"
            this.object.style.width = "auto"
        } else {
            this.object.style.width = videoWidth + "%"
        }
    }

    //影片播放結束接圖片功能
    if (type == "video") {
        if (loop == false) {
            this.object.addEventListener('ended', () => {
                this.object.style.opacity = 0
                delay(() => {
                    offAll()
                    imgs[videoStopTo].on()
                    imgs[videoStopTo].removeCss("off")
                }, 400, 1)
            });
        }
    }
}




// ------------------------
// 讀取擷取卡
// ------------------------


// 設備檢查
try {
    console.log(navigator.mediaDevices.enumerateDevices())
} catch {
    console.log("error Find Stream Desive")
}



// 導入Stream容器
var stream = $css('deviceStream')

var streamBox = []
streamBox[0] = new media($css('deviceStreamBox')[0])
streamBox[1] = new media($css('deviceStreamBox')[1])
streamBox[2] = new media($css('deviceStreamBox')[2])
var streamScaleTag = 0

// 內容資訊
var streamContent = {
    video: {
        deviceId: "f73bf817f735b26605625c2c16852e304c8c383400a10be14829242e32eb8a72",
        frameRate: 30,
    },
    audio: false
};

try {
    function gotStream(streamContent) {
        // Older browsers may not have srcObject.
        if ("srcObject" in stream[0]) {
            stream[0].srcObject = streamContent;
            stream[1].srcObject = streamContent;
            stream[2].srcObject = streamContent;
        } else {
            // Avoid using this in new browsers, as it is going away.
            stream[0].src = window.URL.createObjectURL(streamContent);
            stream[1].src = window.URL.createObjectURL(streamContent);
            stream[2].src = window.URL.createObjectURL(streamContent);
        }
    }

    navigator.mediaDevices
        .getUserMedia(streamContent)
        .then(gotStream)
        .catch(() => { console.log('input error: ', "error"); })

} catch {
    console.log("error Got Stream")
}

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
videos[0] = new media($tag("video")[0], "video", 100, 11, "muted", "stop", "unloop")
videos[1] = new media($tag("video")[1], "video", 100, 12, "muted", "stop", "unloop")
videos[2] = new media($tag("video")[2], "video", 100, 13, "muted", "stop", "unloop")
videos[3] = new media($tag("video")[3], "video", 100, 14, "muted", "stop", "unloop")
videos[4] = new media($tag("video")[4], "video", 100, 15, "muted", "stop", "unloop")
videos[5] = new media($tag("video")[5], "video", 100, 16, "muted", "stop", "unloop")
videos[6] = new media($tag("video")[6], "video", 100, 17, "muted", "stop", "unloop")
videos[7] = new media($tag("video")[7], "video", 100, 18, "muted", "stop", "unloop")
videos[8] = new media($tag("video")[8], "video", 100, 19, "muted", "stop", "unloop")
videos[9] = new media($tag("video")[9], "video", 100, 20, "muted", "stop", "unloop")
videos[10] = new media($tag("video")[10], "video", "height100", 21, "muted", "stop", "unloop")





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
var videoStopTo = 0


// 鍵盤快捷鍵
window.addEventListener("keydown", keyboardListener, false);

function keyboardListener(e) {
    var keyID = e.code;

    // 影片結尾視覺圖切換
    if (keyID === 'KeyA') {
        videoStopTo = 0
    }
    if (keyID === 'KeyS') {
        videoStopTo = 1
    }
    if (keyID === 'KeyD') {
        videoStopTo = 2
    }
    if (keyID === 'KeyF') {
        videoStopTo = 3
    }
    if (keyID === 'KeyG') {
        videoStopTo = 4
    }
    if (keyID === 'KeyH') {
        videoStopTo = 5
    }
    if (keyID === 'KeyJ') {
        videoStopTo = 6
    }



    // 圖片


    if (keyID === 'Space') {
        offAll()
        imgs[0].on()
        imgs[0].removeCss("off")
    }


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




    // 影片

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
    if (keyID === 'Numpad0') {
        upperTo()
    }
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
        if (streamBox[0].cssTag == 0) {
            streamBox[0].addCss("show")
            streamBox[0].cssTag = 1
        } else {
            streamBox[0].removeCss("show")
            streamBox[0].cssTag = 0
        }
    }


    if (keyID === 'BracketLeft') {
        if (streamBox[1].cssTag == 0) {
            streamBox[1].addCss("show")
            streamBox[1].cssTag = 1
        } else {
            streamBox[1].removeCss("show")
            streamBox[1].cssTag = 0
        }
    }

    if (keyID === 'BracketRight') {
        if (streamBox[2].cssTag == 0) {
            streamBox[2].addCss("show")
            streamBox[2].cssTag = 1
        } else {
            streamBox[2].removeCss("show")
            streamBox[2].cssTag = 0
        }
    }





    //---------------------

    if (keyID === 'KeyL') {
        if (streamScaleTag == 0) {
            for (let i = 0; i < stream.length; i++) {
                stream[i].style.width = "132%"
                stream[i].style.top = "39%"
                stream[i].style.left = "43%"
            }


            streamScaleTag = 1
        } else {
            for (let i = 0; i < stream.length; i++) {
                stream[i].style.width = ""
                stream[i].style.top = ""
                stream[i].style.left = ""
            }

            streamScaleTag = 0
        }
    }
}



