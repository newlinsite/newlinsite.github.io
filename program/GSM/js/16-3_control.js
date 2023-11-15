

// 代辦
// PPT頁面名稱變數化 => Test
// Stream 開關
// Upper  開關
// 聲優人臉
// 影片讀取錯誤有兩種



// ******************************
// 
//      功能
//      - 
//      - 
//
// ******************************

var $id = function (name) {
    return document.getElementById(name)
}
var $css = function (name) {
    return document.getElementsByClassName(name)
}
var $tag = function (name) {
    return document.getElementsByTagName(name)
}
var t = function (test) {
    console.log(test)
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
delay = (doSomething, delayTime, num = 0, cancelDalay = true) => {

    if (delayContainer[num].id !== null) {
        if (cancelDalay) {   //如 delay 執行中則取消此 delay 後不動作
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




// ******************************
// 
//      創立控制單體功能
//      - 
//      - 
//
// ******************************




var media = function (object, type = "img", videoWidth = 100, delayContainer = 10, muted = "muted", stop = "stop", loop = "unloop") {

    // define
    this.object = object

    this.object.addEventListener('error', () => {
        console.log(this.object.src.slice(-7), 'Cant find this media', "turn to default");
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
            //一秒之後在淡出，為了讓影片有淡出效果
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

        if (loop != "loop") {
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


// ******************************
// 
//      讀取擷取卡
//      - 
//      - 
//
// ******************************




// // 設備檢查
// try {
//     console.log(navigator.mediaDevices.enumerateDevices())
// } catch {
//     console.log("error Find Stream Desive")
// }



// // 導入Stream容器
// var stream = $css('deviceStream')

// var streamBox = []
// streamBox[0] = new media($css('deviceStreamBox')[0])
// streamBox[1] = new media($css('deviceStreamBox')[1])
// streamBox[2] = new media($css('deviceStreamBox')[2])
// var streamScaleTag = 0

// // 內容資訊
// var streamContent = {
//     video: {
//         deviceId: "f73bf817f735b26605625c2c16852e304c8c383400a10be14829242e32eb8a72",
//         frameRate: 30,
//     },
//     audio: false
// };

// try {
//     function gotStream(streamContent) {
//         // Older browsers may not have srcObject.
//         if ("srcObject" in stream[0]) {
//             stream[0].srcObject = streamContent;
//             stream[1].srcObject = streamContent;
//             stream[2].srcObject = streamContent;
//         } else {
//             // Avoid using this in new browsers, as it is going away.
//             stream[0].src = window.URL.createObjectURL(streamContent);
//             stream[1].src = window.URL.createObjectURL(streamContent);
//             stream[2].src = window.URL.createObjectURL(streamContent);
//         }
//     }

//     navigator.mediaDevices
//         .getUserMedia(streamContent)
//         .then(gotStream)
//         .catch(() => { console.log('input error: ', "error"); })

// } catch {
//     console.log("error Got Stream")
// }








// ******************************
// 
//      創立 PPT 功能
//      - 
//      - 
//
// ******************************




var pptContainers = $css("ppt")

var ppt = function (pptNum, pageLen = 20, name = "Slide") {

    //讀取簡報圖片
    this.pptNum = pptNum
    this.pagesName = []
    this.pages = []
    this.name = name
    for (let i = 1; i < pageLen + 1; i++) {
        this.pagesName[i] = this.name + i
        this.pages[i] = new Image();
        this.pages[i].src = 'element/ppt-' + pptNum + '/' + this.pagesName[i] + ".jpg"

        this.pages[i].onerror = () => {
            //找不到jpg改找png
            this.pages[i].src = 'element/ppt-' + pptNum + '/' + this.pagesName[i] + ".png"
            this.pages[i].onerror = () => {
                //找不到jpg改找mp4
                this.pages[i] = document.createElement("video")
                this.pages[i].src = 'element/ppt-' + pptNum + '/' + this.pagesName[i] + ".mp4"
                this.pages[i].onloadeddata = () => {
                    pptContainers[0].appendChild(this.pages[i])
                    this.pages[i].classList.add("ppt" + pptNum)
                    this.pages[i].style.display = "none"
                }
                this.pages[i].onerror = () => {
                    this.pages[i] = null
                }
            }
        };
        this.pages[i].onload = () => {
            pptContainers[0].appendChild(this.pages[i])
            this.pages[i].classList.add("ppt" + pptNum)
            this.pages[i].style.display = "none"

        }
    }

    //簡報控制

    this.firstPage = 0
    this.nowPage = 0
    // this.pagesOK = $css("ppt" + this.pptNum)
    this.openTag = 0


    this.pagesOKCreate = () => {
        this.pagesOK = this.pages.filter(item => item !== null);
    }



    this.videoPlay = (video) => {
        if (video.tagName == "VIDEO") {
            video.play()
        }
    }
    this.videoStop = (video) => {
        if (video.tagName == "VIDEO") {
            video.pause();
            video.currentTime = 0
        }
    }


    this.open = () => {
        this.pagesOK[this.nowPage].style.display = "block"
        this.videoPlay(this.pagesOK[this.nowPage])
        this.openTag = 1
    }

    this.openHidden = () => {
        this.pagesOK[this.nowPage].style.display = "none"
        this.videoStop(this.pagesOK[this.nowPage])
        this.openTag = 0
    }


    this.close = () => {
        this.videoStop(this.pagesOK[this.nowPage])
        this.pagesOK[this.nowPage].style.display = "none"
        this.nowPage = this.firstPage
        this.openTag = 0
    }


    this.next = () => {
        if (this.nowPage < this.pagesOK.length - 1 && this.openTag == 1) {
            this.pagesOK[this.nowPage].style.display = "none"
            this.videoStop(this.pagesOK[this.nowPage])
            this.nowPage = this.nowPage + 1
            this.pagesOK[this.nowPage].style.display = "block"
            this.videoPlay(this.pagesOK[this.nowPage])
        }
    }
    this.last = () => {
        if (this.nowPage > 0 && this.openTag == 1) {
            this.pagesOK[this.nowPage].style.display = "none"
            this.videoStop(this.pagesOK[this.nowPage])
            this.nowPage = this.nowPage - 1
            this.pagesOK[this.nowPage].style.display = "block"
            this.videoPlay(this.pagesOK[this.nowPage])
        }
    }


}








// ******************************
// 
//      音樂撥放器
//      - 
//      - 
//
// ******************************




// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();


// 用戶點擊播放區域時啟動 AudioContext 對象
$tag("body")[0].addEventListener('click', function () {
    ctx.resume().then(() => {
        console.log('AudioContext 已啟動');
    });
});
var freqCanvasBox = $id("freqCanvasBox")

// BGM 長音樂
var music = function (num) {
    this.source = ctx.createMediaElementSource(bgmSource[num]);
    this.gainCode = ctx.createGain();
    this.gainFadeCode = ctx.createGain();
    this.lowPassCode = ctx.createBiquadFilter();
    this.analyser = ctx.createAnalyser();
    this.source.connect(this.gainCode).connect(this.gainFadeCode).connect(this.lowPassCode).connect(this.analyser).connect(ctx.destination);

    // option
    this.playingTag = 0
    this.lowPassCode.type = 'lowpass';
    this.lowPassCode.frequency.value = 22050;


    this.play = function (isLoop = "noloop", afterStopFunction = nothing) {
        if (this.playingTag === 0) { // 如果尚未在播放
            this.playingTag = 1
            bgmSource[num].play()
            // 播放完後的動作
            bgmSource[num].addEventListener('ended', this.playerEndListener = function () { this.playEened(isLoop, afterStopFunction) }.bind(this));
        }
    }
    this.playEened = function (isLoop, afterStopFunction) {
        if (isLoop == "loop") {   // 如果設定為重複播放
            bgmSource[num].play()
        } else {                 // 沒有設定重複播放，則停止播放，並執行播放停止後的其他功能，並去除播放結束監聽器
            this.stop();
            afterStopFunction()
            bgmSource[num].removeEventListener('ended', this.playerEndListener)
        }
    }.bind(this)


    this.fadePlay = function (gain = 1, fadeTime = 1, startGain = 0) {
        this.play();
        this.gainFadeCode.gain.value = startGain
        this.gainFadeCode.gain.linearRampToValueAtTime(gain, ctx.currentTime + fadeTime);
    }
    this.stop = function () {
        this.playingTag = 0
        bgmSource[num].pause()
        bgmSource[num].currentTime = 0;
    }
    this.fadeStop = function (fadeTime = 1) {
        if (this.playingTag == 1) {
            this.playingTag = 0
            this.gainFadeCode.gain.setValueAtTime(1, ctx.currentTime);
            this.gainFadeCode.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
            //如果在漸弱中再次 Play > 等漸弱後判斷是否 play 有則在0.5秒後回復音量
            setTimeout(() => {
                if (this.playingTag == 1) {
                    this.gainFadeCode.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.5);
                    console.log("replay")
                }
                else {
                    this.stop()
                    this.gainFadeCode.gain.value = 1
                }
            }, fadeTime * 1000 + 100);

        }
    }


    this.fadeMute = function (fadeTime = 1) {
        this.gainFadeCode.gain.setValueAtTime(1, ctx.currentTime);
        this.gainFadeCode.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
    }
    this.fadeUnmute = function (fadeTime = 1) {
        this.gainFadeCode.gain.setValueAtTime(0, ctx.currentTime);
        this.gainFadeCode.gain.linearRampToValueAtTime(1, ctx.currentTime + fadeTime);
    }


    this.fadeLowPass = function (frequency = 22050, gain = -40, fadeTime = 1) {
        this.lowPassCode.frequency.linearRampToValueAtTime(frequency, ctx.currentTime + fadeTime);
    }


    // 產生聲波圖
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.freqCanvas = document.createElement('canvas');
    this.freqContext = this.freqCanvas.getContext('2d');
    this.freqCanvas.className = "freqCanvas"
    this.freqCanvas.height = 300
    this.freqCanvas.width = 1000
    this.inputCanvas = function () {
        freqCanvasBox.appendChild(this.freqCanvas);
    }

    this.draw = function () {
        this.drawing = requestAnimationFrame(this.draw.bind(this));
        this.analyser.getByteFrequencyData(this.dataArray);

        // 使用dataArray来更新視覺元素
        this.freqContext.fillStyle = this.drawColor;
        this.freqContext.clearRect(0, 0, this.freqCanvas.width, this.freqCanvas.height); // clear the canvas
        for (let i = 0; i < this.dataArray.length; i++) {
            this.freqContext.fillRect(i + this.freqCanvas.width / 2, this.freqCanvas.height / 2, 1, this.dataArray[i] / 2);
            this.freqContext.fillRect(i + this.freqCanvas.width / 2, this.freqCanvas.height / 2, 1, -this.dataArray[i] / 2);
            this.freqContext.fillRect(-i + this.freqCanvas.width / 2 - 1, this.freqCanvas.height / 2, 1, this.dataArray[i] / 2);
            this.freqContext.fillRect(-i + this.freqCanvas.width / 2 - 1, this.freqCanvas.height / 2, 1, -this.dataArray[i] / 2);
        }
    }

    this.stopDraw = function () {
        cancelAnimationFrame(this.drawing);
    }

    // 獲取音量數值
    this.dataArrayVol = new Uint8Array(this.analyser.frequencyBinCount);
    this.volumeNum = function () {
        this.volumeNuming = requestAnimationFrame(this.volumeNum.bind(this));
        this.analyser.getByteTimeDomainData(this.dataArrayVol);
        this.volumeNow = this.dataArrayVol[0]
        // console.log(this.volumeNow)
        // this.freqContext.fillStyle = this.drawColor;
        // this.freqContext.clearRect(0, 0, this.freqCanvas.width, this.freqCanvas.height); // clear the canvas
        // for (let i = 0; i < this.dataArray.length; i++) {
        //     let y = this.dataArray[i] / 128.0 * (this.freqCanvas.height / 2);
        //     this.freqContext.fillRect(i, this.freqCanvas.height / 2 - y, 1, 2 * y);
        // }
    }


}



// 全部停止
function musicAllStop(fadeTime = 1) {
    for (let i = 0; i < bgmSource.length; i++) {
        bgm[i].fadeStop(fadeTime)
    }
}


// 載入全部聲音
bgmSource = document.getElementsByClassName("bgm");
var bgm = []
for (let i = 0; i < bgmSource.length; i++) {
    bgm[i] = new music(i)
    bgm[i].inputCanvas()
    bgm[i].draw()
    bgm[i].drawColor = "#ffffff88"
}



var playingNowNum = 0
var playingConNum = 0


// 回到播影片
var offPlayingMask = function () {
    console.log("stop", playingNowNum)
    playingMask.classList.add("op0");
    playingNowNum = 0
}



var playingMask = $css("playing_mask")[0]
var speaker = $css("speaker")[0]

playingMask.style.left = playingMaskLeft + "%"

// 如果沒有設置照片則不顯示頭像語音波
speaker.addEventListener('error', function () {
    playingMask.classList.add("op0");
})


// 播放聲音與停止
function toPlayAudio() {
    console.log("play", playingConNum)
    bgm[playingConNum].play("noloop", offPlayingMask)
    playingMask.classList.remove("op0");
    speaker.src = "element/voice/00" + playingConNum + ".png"
}
function toStopAudio() {
    console.log("stop", playingConNum)
    bgm[playingNowNum].fadeStop(0.5)
    playingMask.classList.add("op0");
}


// 鍵盤快捷鍵
window.addEventListener("keydown", voiceControl, false);
function voiceControl(e) {
    var keyID = e.code;
    isNumpad = 0
    for (let i = 1; i < 10; i++) {
        if (keyID === 'Numpad' + i) {
            playingConNum = i
            isNumpad = 1

            ctx.resume().then(() => {
                console.log('AudioContext 已啟動');
            });
        }
    }
    if (isNumpad === 1) {
        if (playingNowNum === 0) {                                // 沒播放 > 播放
            toPlayAudio()
            playingNowNum = playingConNum
        } else if (playingConNum === playingNowNum) {             // 播放 > 按下同語音 > 停止播放
            toStopAudio()
            playingNowNum = 0
        }
        else {                                            // 播放 > 按下不同語音 > 播放
            toStopAudio()
            toPlayAudio()
            playingNowNum = playingConNum
        }
    }
    if (keyID === 'Numpad0') {
        if (playingNowNum > 0) {
            toStopAudio()
            playingNowNum = 0
        }
    }
}






// ******************************
// 其他功能
// ******************************


// 錯誤提示
function onError() {
    console.log("error")
}


function nothing() {
    console.log("nothing")
}







//  -------------------------------------------------------------------
//
//  創立單體
// 
//  -------------------------------------------------------------------


var textBox = new media($css("textBox")[0], "img")




var imgs = []
imgs[0] = new media($tag("img")[0], "img")
imgs[1] = new media($tag("img")[1], "img")
imgs[2] = new media($tag("img")[2], "img")
imgs[3] = new media($tag("img")[3], "img")
imgs[4] = new media($tag("img")[4], "img")
imgs[5] = new media($tag("img")[5], "img")
imgs[6] = new media($tag("img")[6], "img")


var videos = []
videos[0] = new media($tag("video")[0], "video", 100, 11, "unmuted", "stop", "loop")
videos[1] = new media($tag("video")[1], "video", 100, 12, "unmuted", "stop", "unloop")
videos[2] = new media($tag("video")[2], "video", 100, 13, "unmuted", "stop", "unloop")
videos[3] = new media($tag("video")[3], "video", 100, 14, "unmuted", "stop", "unloop")
videos[4] = new media($tag("video")[4], "video", 100, 15, "unmuted", "stop", "unloop")
videos[5] = new media($tag("video")[5], "video", 100, 16, "unmuted", "stop", "unloop")
videos[6] = new media($tag("video")[6], "video", 100, 17, "unmuted", "stop", "unloop")
videos[7] = new media($tag("video")[7], "video", 100, 18, "unmuted", "stop", "unloop")
videos[8] = new media($tag("video")[8], "video", 100, 19, "unmuted", "stop", "unloop")
videos[9] = new media($tag("video")[9], "video", 100, 20, "unmuted", "stop", "unloop")
videos[10] = new media($tag("video")[10], "video", "height100", 21, "unmuted", "stop", "unloop")





var uppers = []
uppers[0] = new media($css("uBox")[0], "upper")
uppers[1] = new media($css("uBox")[1], "upper")
uppers[2] = new media($css("uBox")[2], "upper")



var pptNum = new media($css("pptNum")[0], "")
// t(pptNum)
// pptNum.addCss("tempShow")
var ppts = []

ppts.push(new ppt(1, 19, pptName01))
ppts.push(new ppt(2, 5, pptName02))

window.onload = function () {
    ppts[0].pagesOKCreate()
    ppts[1].pagesOKCreate()
}

var pptNow = 0
var pptLast = 0



//單體功能

var offAll = () => {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].off()
        imgs[0].addCss("off")
    }
    for (let i = 0; i < videos.length; i++) {
        videos[i].off()
    }
    textBox.removeCss("show")
    textBox.cssTag = 0
}


var upperOn = (upperNum = null) => {
    if (upperNum != null) {
        uppers[upperNum].removeCss("off")
        uppers[upperNum].removeCss("quick")
    }
}

var upperOff = (upperNum = null) => {
    uppers[upperNum].addCss("off")
    uppers[upperNum].addCss("quick")
}


var upperMap = (place = [0, 0, 0]) => {
    for (let i = 0; i < 3; i++) {
        if (place[i] == 1) {
            upperOn(i)
        } else {
            upperOff(i)
        }

    }
}











//  -------------------------------------------------------------------
//
//  進場
// 
//  -------------------------------------------------------------------



offAll()
imgs[0].on()
imgs[0].removeCss("off")
var videoStopTo = 0

logoElement = ''
if (logoOn == 1) {
    logoElement = '</br><img src="element/logo/logo.png" alt="">'
}
textBox.object.innerHTML = textBoxTest + logoElement

if (logoOnShadow == 1) {
    textBox.addCss("shadow")
}

textBox.object.style.top = testPlace + "%"



// 鍵盤快捷鍵
window.addEventListener("keydown", keyboardListener, false);

function keyboardListener(e) {
    var keyID = e.code;


    // 文字切換
    if (keyID === 'KeyT') {
        if (textBox.cssTag == 0) {
            textBox.addCss("show")
            textBox.cssTag = 1
        } else {
            textBox.removeCss("show")
            textBox.cssTag = 0
        }

    }



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

    if (keyID === 'Backquote') {
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
    // if (keyID === 'Numpad2') {
    //     upperMap()
    // }
    // if (keyID === 'Numpad3') {
    //     upperMap([0, 1, 0])

    // }
    // if (keyID === 'Numpad4') {
    //     upperMap([1, 1, 0])

    // }
    // if (keyID === 'Numpad5') {
    //     upperMap([1, 1, 1])
    // }





    //stream

    // if (keyID === 'KeyP') {
    //     if (streamBox[0].cssTag == 0) {
    //         streamBox[0].addCss("show")
    //         streamBox[0].cssTag = 1
    //     } else {
    //         streamBox[0].removeCss("show")
    //         streamBox[0].cssTag = 0
    //     }
    // }


    // if (keyID === 'BracketLeft') {
    //     if (streamBox[1].cssTag == 0) {
    //         streamBox[1].addCss("show")
    //         streamBox[1].cssTag = 1
    //     } else {
    //         streamBox[1].removeCss("show")
    //         streamBox[1].cssTag = 0
    //     }
    // }

    // if (keyID === 'BracketRight') {
    //     if (streamBox[2].cssTag == 0) {
    //         streamBox[2].addCss("show")
    //         streamBox[2].cssTag = 1
    //     } else {
    //         streamBox[2].removeCss("show")
    //         streamBox[2].cssTag = 0
    //     }
    // }





    //stream 裁切

    // if (keyID === 'KeyL') {
    //     if (streamScaleTag == 0) {
    //         for (let i = 0; i < stream.length; i++) {
    //             stream[i].style.width = "132%"
    //             stream[i].style.top = "39%"
    //             stream[i].style.left = "43%"
    //         }


    //         streamScaleTag = 1
    //     } else {
    //         for (let i = 0; i < stream.length; i++) {
    //             stream[i].style.width = ""
    //             stream[i].style.top = ""
    //             stream[i].style.left = ""
    //         }

    //         streamScaleTag = 0
    //     }
    // }




    //PPT--------------------

    //切換PPT
    if (keyID === 'KeyO') {

        pptLast = pptNow
        if (pptNow < ppts.length - 1) {
            pptNow = pptNow + 1
        } else {
            pptNow = 0
        }

        if (ppts[pptLast].openTag == 1) {
            ppts[pptLast].close()
            ppts[pptNow].open()
        }
        pptNum.object.innerHTML = pptNow
        pptNum.addCss("tempShow")
        delay(() => {
            pptNum.removeCss("tempShow")
        }, 1500, 26, false)
    }

    if (keyID === 'KeyP') {
        toggle(ppts[pptNow].openTag, ppts[pptNow].open, ppts[pptNow].openHidden)
    }


    if (keyID === 'ArrowLeft') {
        ppts[pptNow].last()
    }
    if (keyID === 'ArrowRight') {
        ppts[pptNow].next()
    }


}



