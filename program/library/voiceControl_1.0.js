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


// // 用戶點擊播放區域時啟動 AudioContext 對象
// $tag("body")[0].addEventListener('click', function () {
//     ctx.resume().then(() => {
//         console.log('AudioContext 已啟動');
//     });
// });
// var freqCanvasBox = $id("freqCanvasBox")




// -------------------
//
// Audio Effect 短音效
//
// -------------------



function loadSound(num, box, audioList) {
    url = audioList[num]
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {
        ctx.decodeAudioData(request.response, function (buffer) {
            box[num] = buffer;               // 將 buffer 倒入清單管理
        }, onError);
    }
    request.send();
}


var sounds = function (list) {

    // 將清單內的音樂載入Buffer
    this.bufferBox = []
    for (let i = 0; i < list.length; i++) {
        loadSound(i, this.bufferBox, list)
    }


    this.play = (num, gain = 1) => {
        buffer = this.bufferBox[num];
        source = ctx.createBufferSource();                    // creates a sound source
        gainCode = ctx.createGain();
        gainCode.gain.value = gain
        source.buffer = buffer;                                   // tell the source which sound to play
        source.connect(gainCode).connect(ctx.destination);        // connect the source to the ctx's destination (the speakers)
        source.start(0);                                          // play the source now
    }



}

// 創造音效範例
// var audioUrlList = [  "bgm.mp3" ];
// var sound = new sounds(audioUrlList)



// -----------------------------------------------
//
// BGM 長音樂
//
// -----------------------------------------------

var music = function (voiceElement) {

    if (voiceElement instanceof HTMLVideoElement || voiceElement instanceof HTMLVideoElement) {
        this.voice = voiceElement
    } else if (typeof voiceElement === "string" && voiceElement.trim().length > 0) {
        this.voice = document.createElement("audio")
        this.voice.src = voiceElement
    } else {
        test("Voice source error")
    }


    // -------------------
    // ctx 設定
    // -------------------
    this.source = ctx.createMediaElementSource(this.voice);
    this.gainCode = ctx.createGain();
    this.gainFadeCode = ctx.createGain();
    this.lowPassCode = ctx.createBiquadFilter();
    this.analyser = ctx.createAnalyser();
    this.source.connect(this.gainCode).connect(this.gainFadeCode).connect(this.lowPassCode).connect(this.analyser).connect(ctx.destination);


    // option
    this.playingTag = { tag: 0 }
    this.muteTag = { tag: 0 }
    this.tag = [{ tag: 0 }, { tag: 0 }, { tag: 0 }]
    this.lowPassCode.type = 'lowpass';
    this.lowPassCode.frequency.value = 22050;



    // -------------------
    // 播放功能
    // -------------------

    // 播放功能
    this.play = (isLoop = "noloop", afterStopFunction = nothing) => {
        if (this.playingTag.tag === 0) {                                                    // 如果尚未在播放
            this.playingTag.tag = 1
            this.voice.play()
            this.voice.addEventListener('ended', this.playerEndListener = () => {   // 播放完後的動作
                this.playEened(isLoop, afterStopFunction)
            });
        }
    }
    this.fadePlay = (gain = 1, fadeTime = 1, startGain = 0) => {
        this.play();
        this.gainFadeCode.gain.value = startGain
        this.gainFadeCode.gain.linearRampToValueAtTime(gain, ctx.currentTime + fadeTime);
    }
    // 播放結束功能
    this.playEened = (isLoop, afterStopFunction) => {
        if (isLoop == "loop") {   // 如果設定為重複播放
            this.voice.play()
        } else {                  // 沒有設定重複播放，則停止播放，並執行播放停止後的其他功能，並去除播放結束監聽器
            this.stop();
            afterStopFunction()
            this.voice.removeEventListener('ended', this.playerEndListener)
        }
    }

    this.stop = () => {
        this.playingTag.tag = 0
        this.voice.pause()
        this.voice.currentTime = 0;
    }
    this.fadeStop = (fadeTime = 1) => {
        if (this.playingTag.tag == 1) {
            this.playingTag.tag = 0
            this.gainFadeCode.gain.setValueAtTime(1, ctx.currentTime);
            this.gainFadeCode.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
            //如果在漸弱中再次 Play > 等漸弱後判斷是否 play 有則在0.5秒後回復音量
            setTimeout(() => {
                if (this.playingTag.tag == 1) {
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


    // -------------------
    // 其他播放功能
    // -------------------


    this.changeFadeGain = (gain = 1) => {
        this.gainCode.gain.value = gain
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


    // -------------------
    // 產生聲波圖
    // -------------------
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.freqCanvas = document.createElement('canvas');
    this.freqContext = this.freqCanvas.getContext('2d');
    this.freqCanvas.height = 500
    this.freqCanvas.width = 1000
    this.freqCanvas.style.position = "absolute"
    this.freqCanvas.style.transform = "translate(-50%, -50%)"
    this.inputCanvas = (freqCanvasBox, w = 50, h = 50, x = 50, y = 50) => {
        this.freqCanvas.style.width = w + "%"
        this.freqCanvas.style.height = h + "%"
        this.freqCanvas.style.top = x + "%"
        this.freqCanvas.style.left = y + "%"
        freqCanvasBox.appendChild(this.freqCanvas);
    }

    this.draw = () => {
        this.drawing = requestAnimationFrame(this.draw);
        this.analyser.getByteFrequencyData(this.dataArray);

        // 使用dataArray来更新你的视觉元素，比如文字的大小、颜色等
        this.freqContext.fillStyle = this.drawColor;
        this.freqContext.clearRect(0, 0, this.freqCanvas.width, this.freqCanvas.height); // clear the canvas
        for (let i = 0; i < this.dataArray.length; i++) {
            this.freqContext.fillRect(i + this.freqCanvas.width / 2, this.freqCanvas.height / 2, 1, this.dataArray[i] / 2);
            this.freqContext.fillRect(i + this.freqCanvas.width / 2, this.freqCanvas.height / 2, 1, -this.dataArray[i] / 2);
            this.freqContext.fillRect(-i + this.freqCanvas.width / 2 - 1, this.freqCanvas.height / 2, 1, this.dataArray[i] / 2);
            this.freqContext.fillRect(-i + this.freqCanvas.width / 2 - 1, this.freqCanvas.height / 2, 1, -this.dataArray[i] / 2);
        }
    }

    this.stopDraw = () => {
        cancelAnimationFrame(this.drawing);

    }


    // // 獲取音量數值
    // this.dataArrayVol = new Uint8Array(this.analyser.frequencyBinCount);
    // this.volumeNum = () => {
    //     this.volumeNuming = requestAnimationFrame(this.volumeNum);
    //     this.analyser.getByteTimeDomainData(this.dataArrayVol);
    //     this.volumeNow = this.dataArrayVol[0]
    //     this.freqContext.fillStyle = this.drawColor;
    //     let y = this.volumeNow
    //     this.freqContext.fillRect(0, this.freqCanvas.height / 2, 20, -2 * y);

    // }
}


// 全部停止
function musicAllStop(fadeTime = 1) {
    for (let i = 0; i < bgmSource.length; i++) {
        bgm[i].fadeStop(fadeTime)
    }
}





