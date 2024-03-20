

// 創造音效範例
// var audioUrlList = [  "bgm.mp3" ];
// var sound = new Sound(audioUrlList)

// 創立 長音樂範例
// var bgmList = [
//     { voice: "bgm.mp3", drawColor: "#ffffff88", w: 50, h: 50, x: 50, y: 50 },
// ]

// var bgm = bgmList.map((item) => {
//     let musicInstance = new music(item.voice);
//     musicInstance.drawColor = "#ffffff88";
//     musicInstance.inputCanvas(container, item.w, item.h, item.x, item.y);
//     musicInstance.draw();
//     return musicInstance;
// });






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
var mainGainNode = ctx.createGain();
mainGainNode.gain.value = 1



// ******************************
// ------------------------------
//
// Audio Effect 短音效
//
// -----------------------------
// ******************************

function loadSound(num, box, audioList) {
    const url = audioList[num];
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    // Decode asynchronously
    request.onload = function () {
        ctx.decodeAudioData(request.response, function (buffer) {
            box[num] = buffer;               // 將 buffer 倒入清單管理
        }, () => { console.log("ctx Error") });
    }
    request.send();
}

class Sound {
    constructor(list) {
        this.bufferBox = []
        this.sourceBox = [];   // 用于儲存每个聲音源，便於用於停止等操作
        this.isPlaying = [];   // 用于追蹤每个聲音是否正在播放
        this.isReplaying = []; // 用于追蹤每个是否重新播放中，用於調整執行順序
        for (let i = 0; i < list.length; i++) {
            loadSound(i, this.bufferBox, list)
            this.isPlaying[i] = false;
        }
    }

    // 將清單內的音樂載入Buffer
    play(num, type = "", gain = 1) {
        // 效果音 再次點擊模式模式 1.播放新的 2.停止 3.從新播放  
        if (this.isPlaying[num]) {
            if (type === "stop") {
                this.sourceBox[num].stop();
                this.isPlaying[num] = false;
                return;
            } else if (type === "replay" || type === "re") {
                this.sourceBox[num].stop();
                this.isPlaying[num] = false;
                this.isReplaying[num] = true;
            }
        }

        const buffer = this.bufferBox[num];
        if (!buffer) {
            console.error("Buffer is undefined. Sound not loaded or decode failed.");
            return;
        }
        const source = ctx.createBufferSource();
        const gainNode = ctx.createGain();

        gainNode.gain.value = gain
        source.buffer = buffer;                                   // tell the source which sound to play
        source.connect(gainNode).connect(mainGainNode).connect(ctx.destination);
        source.start(0);


        //播放狀態紀錄
        this.sourceBox[num] = source; // 更新sourceBox中的source
        this.isPlaying[num] = true;
        source.onended = () => {
            this.isPlaying[num] = false;
            if (this.isReplaying[num]) {
                this.isPlaying[num] = true
                this.isReplaying[num] = false
            }
        };
    }

}




// -----------------------------
// ******************************
//
// BGM 長音樂
//
// -----------------------------
// ******************************


class music {
    constructor(voiceElement) {

        if (voiceElement instanceof HTMLVideoElement || voiceElement instanceof HTMLVideoElement) {
            this.voice = voiceElement
        } else if (typeof voiceElement === "string" && voiceElement.trim().length > 0) {
            this.voice = document.createElement("audio")
            this.voice.src = voiceElement
        } else {
            console.log("Voice source error")
        }


        // -------------------
        // ctx 設定
        // -------------------
        this.source = ctx.createMediaElementSource(this.voice);
        this.gainNode = ctx.createGain();
        this.gainFadeCode = ctx.createGain();
        this.lowPassCode = ctx.createBiquadFilter();
        this.analyser = ctx.createAnalyser();
        this.source.connect(this.gainNode).connect(this.gainFadeCode)
            .connect(this.lowPassCode).connect(this.analyser)
            .connect(mainGainNode).connect(ctx.destination);


        // option
        this.isPlaying = { tag: 0 }
        this.isMute = { tag: 0 }
        this.tag = [{ tag: 0 }, { tag: 0 }, { tag: 0 }]
        this.lowPassCode.type = 'lowpass';
        this.lowPassCode.frequency.value = 22050;



        // -------------------
        // 聲波圖參數
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

    }

    // -------------------
    // 播放功能
    // -------------------

    // 播放功能
    play(isLoop = "noloop", afterStopFunction = nothing) {
        if (this.isPlaying.tag === 0) {                                                // 如果尚未在播放
            this.isPlaying.tag = 1
            this.voice.play()
            this.voice.addEventListener('ended', this.playerEndListener = () => {   // 播放完後的動作
                this.playEened(isLoop, afterStopFunction)
            });
        }
    }
    fadePlay(gain = 1, fadeTime = 1, startGain = 0) {
        this.play();
        this.gainFadeCode.gain.value = startGain
        this.gainFadeCode.gain.linearRampToValueAtTime(gain, ctx.currentTime + fadeTime);
    }
    // 播放結束功能
    playEened(isLoop, afterStopFunction) {
        if (isLoop == "loop") {   // 如果設定為重複播放
            this.voice.play()
        } else {                  // 沒有設定重複播放，則停止播放，並執行播放停止後的其他功能，並去除播放結束監聽器
            this.stop();
            afterStopFunction()
            this.voice.removeEventListener('ended', this.playerEndListener)
        }
    }

    stop() {
        this.isPlaying.tag = 0
        this.voice.pause()
        this.voice.currentTime = 0;
    }
    fadeStop(fadeTime = 1) {
        if (this.isPlaying.tag == 1) {
            this.isPlaying.tag = 0
            this.gainFadeCode.gain.setValueAtTime(1, ctx.currentTime);
            this.gainFadeCode.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
            //如果在漸弱中再次 Play > 等漸弱後判斷是否 play 有則在0.5秒後回復音量
            setTimeout(() => {
                if (this.isPlaying.tag == 1) {
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


    changeFadeGain(gain = 1) {
        this.gainNode.gain.value = gain
    }

    fadeMute(fadeTime = 1) {
        this.gainFadeCode.gain.setValueAtTime(1, ctx.currentTime);
        this.gainFadeCode.gain.linearRampToValueAtTime(0, ctx.currentTime + fadeTime);
    }
    fadeUnmute(fadeTime = 1) {
        this.gainFadeCode.gain.setValueAtTime(0, ctx.currentTime);
        this.gainFadeCode.gain.linearRampToValueAtTime(1, ctx.currentTime + fadeTime);
    }

    fadeLowPass(frequency = 22050, gain = -40, fadeTime = 1) {
        this.lowPassCode.frequency.linearRampToValueAtTime(frequency, ctx.currentTime + fadeTime);
    }





    // -------------------
    // 產生聲波圖
    // -------------------
    draw() {
        this.draw = this.draw.bind(this);
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

    stopDraw() {
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
function musicAllStop(fadeTime = 1, musicContainer = bgm) {
    for (let i = 0; i < musicContainer.length; i++) {
        musicContainer[i].fadeStop(fadeTime)

    }
}





