

// ******************************
// 
//      音樂撥放器
//      - 
//      - 
//
// ******************************








// 載入 Audio API
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var ctx = new AudioContext();


// 用戶點擊播放區域時啟動 AudioContext 對象
$css("playingBtnnArea")[0].addEventListener('click', function () {
    ctx.resume().then(() => {
        console.log('AudioContext 已啟動');
    });
});



// Audio Effect 短音效

var bufferBox = [];
var audioUrlList = [
    "music/001.aac",
    "music/003.aac",
    "music/002.aac",
    "music/004.aac",
    "music/ui_01.mp3",
    "music/ui_02.mp3",
    "music/ui_04.wav",
    "music/out_logos---classic.aac"
];

function loadSound(num) {
    url = audioUrlList[num]
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {
        ctx.decodeAudioData(request.response, function (buffer) {
            bufferBox[num] = buffer;               // 將 buffer 倒入清單管理
        }, onError);
    }
    request.send();
}

// 將清單內的音樂載入Buffer
for (let i = 0; i < audioUrlList.length; i++) {
    loadSound(i)
}

//創一個的音源 與連接節點倒終點

function playSound(num, gain = 1) {
    buffer = bufferBox[num];
    var source = ctx.createBufferSource();                    // creates a sound source
    var gainCode = ctx.createGain();
    gainCode.gain.value = gain
    source.buffer = buffer;                                   // tell the source which sound to play
    source.connect(gainCode).connect(ctx.destination);        // connect the source to the ctx's destination (the speakers)
    source.start(0);                                          // play the source now
}







// BGM 長音樂
var music = function (num) {
    this.source = ctx.createMediaElementSource(bgmSource[num]);
    this.gainCode = ctx.createGain();
    this.lowPassCode = ctx.createBiquadFilter();
    this.source.connect(this.gainCode).connect(this.lowPassCode).connect(ctx.destination);

    // option
    this.playingTag = 0
    this.lowPassCode.type = 'lowpass';
    this.lowPassCode.frequency.value = 22050;

    // function

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



    this.fadePlay = function (gain = 1, fadeTime = 1, startGain = 0, isLoop = "noloop") {
        if (this.playingTag === 0) { // 如果尚未在播放
            this.play(isLoop);
            this.gainCode.gain.value = startGain
            this.gainCode.gain.linearRampToValueAtTime(gain, ctx.currentTime + fadeTime);
        }
    }
    this.stop = function () {
        this.playingTag = 0
        bgmSource[num].pause()
        bgmSource[num].currentTime = 0;
        bgmSource[num].removeEventListener('ended', this.playerEndListener)
    }
    this.fadeStop = function (fadeTime = 1) {
        if (this.playingTag == 1) {
            this.playingTag = 0
            let tempGain = this.gainCode.gain.value
            this.gainCode.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
            setTimeout(() => {
                if (this.playingTag == 1) {
                    this.gainCode.gain.linearRampToValueAtTime(tempGain, ctx.currentTime + 0.5);
                    console.log("replay")
                }
                else {
                    this.stop()
                    this.gainCode.gain.value = tempGain
                }
            }, fadeTime * 1000 + 100);
        }
    }
    this.fadeLowPass = function (frequency = 22050, gain = -40, fadeTime = 1) {
        this.lowPassCode.frequency.linearRampToValueAtTime(frequency, ctx.currentTime + fadeTime);
    }
}




bgmSource = document.getElementsByClassName("bgm");
var bgm = []
for (let i = 0; i < bgmSource.length; i++) {
    bgm[i] = new music(i)
}


function musicAllStop(fadeTime = 1) {
    for (let i = 0; i < bgmSource.length; i++) {
        bgm[i].fadeStop(fadeTime)
    }
}


// 測試鍵盤快捷鍵
window.addEventListener("keydown", torandomTest, false);
function torandomTest(e) {
    var keyID = e.code;
    if (keyID === 'KeyQ') {
        bgm[0].play()
    };
    if (keyID === 'KeyW') {
        bgm[0].stop()
    };
    if (keyID === 'KeyE') {
        bgm[0].fadeStop()
    };
    if (keyID === 'KeyR') {
        bgm[0].fadeLowPass(500, -40, 0)
    }
    if (keyID === 'KeyT') {
        bgm[0].fadeLowPass(22050, 0)
    }
    if (keyID === 'KeyA') {
        playSound(0)
    }
    if (keyID === 'KeyS') {
        playSound(1)
    }
    if (keyID === 'KeyD') {
        playSound(2)
    }
    if (keyID === 'KeyF') {
        playSound(3)
    }
    if (keyID === 'KeyG') {
        playSound(4)
    }
    if (keyID === 'KeyH') {
        playSound(5)
    }

}


// 測試按鈕
try {
    var mucBtn = $css("muc-btn")
    mucBtn[0].addEventListener("click", function () {
        bgm[0].play()
        console.log("play")
    })
    mucBtn[1].addEventListener("click", function () {
        bgm[0].stop()
        console.log("stop")
    })
    mucBtn[2].addEventListener("click", function () {
        bgm[0].fadeStop()
        console.log("fade stop")
    })
    let isFilterEnabled = false
    mucBtn[3].addEventListener("click", function () {
        isFilterEnabled = !isFilterEnabled
        if (isFilterEnabled) {
            bgm[0].fadeLowPass(500, -40, 0)
            console.log("fliter")
        } else {
            bgm[0].fadeLowPass(22050, 0)
            console.log("close fliter")
        }
    })
    mucBtn[4].addEventListener("click", function () { playSound(0) })
    mucBtn[5].addEventListener("click", function () { playSound(1) })
    mucBtn[6].addEventListener("click", function () { playSound(2) })
    mucBtn[7].addEventListener("click", function () { playSound(3) })
    mucBtn[8].addEventListener("click", function () { playSound(4) })
    mucBtn[9].addEventListener("click", function () { playSound(5) })

} catch {
    console.log("no music btn")
}





//Loading
// $("loadingMask").classList.add("over")

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