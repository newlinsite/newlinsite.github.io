
//------------------------------------------------------------------------
//
// 客戶歡迎文字與LOGO
//
//------------------------------------------------------------------------


//請在以下 " " 中輸入您要顯示的內容 --------------------
// <span></span> 被左方標籤包住的文字比較大
// 換行使用 </br>

var textBoxTest = "<span>Welcome!</span></br>我是副標副標副標副標 "



//文字位置:從頂部開始 0~100 ----------------------------

var testPlace = 50



//logo開關與陰影 0=關 1=開 -----------------------------

var logoOn = 0
var logoOnShadow = 0





//------------------------------------------------------------------------
//
// 圖片、影片　連結、快捷鍵
//
//------------------------------------------------------------------------


imgData = [
    { link: "element/ibg.jpg", hotkey: "KeyZ", style: "bg" },
    //---------------------------------------------------------
    { link: "element/i01.jpg", hotkey: "KeyX", style: "" },
    { link: "element/i02.jpg", hotkey: "KeyC", style: "" },
    { link: "element/i03.jpg", hotkey: "KeyV", style: "" },
    { link: "element/i04.jpg", hotkey: "KeyB", style: "" },
    { link: "element/i05.jpg", hotkey: "KeyN", style: "" },
    //---------------------------------------------------------
    { link: "element/i06.jpg", hotkey: "KeyM", style: "" },
    { link: "element/i07.jpg", hotkey: "Comma", style: "" },
    { link: "element/i08.jpg", hotkey: "Period", style: "" },
    // { link: "element/i09.jpg", hotkey: "Slash", style: "" },

]


videoData = [
    { link: "element/vbg.mp4", w: 100, muted: false, stop: "stop", loop: true, hotkey: "Backquote", style: "bg" },
    { link: "element/v01.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit1", style: "" },
    { link: "element/v02.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit2", style: "" },
    { link: "element/v03.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit3", style: "" },
    // { link: "element/v04.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit4", style: "" },
    // { link: "element/v05.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit5", style: "" },
    // { link: "element/v06.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit6", style: "" },
    // { link: "element/v07.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit7", style: "" },
    // { link: "element/v08.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit8", style: "" },
    // { link: "element/v09.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit9", style: "" },
    // { link: "element/v10.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Digit0", style: "" },
    // { link: "element/v11.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Minus", style: "" },
    // { link: "element/v12.mp4", w: 100, muted: false, stop: "stop", loop: false, hotkey: "Equal", style: "" },
]

var videoStopToVideo = 0 //影片播放結束播放哪個影片





// 音效
var audioUrlList = [
    // "crowd-disapproving.wav",
    // "energetic-crowds.wav",
    // "evil-laugh.wav",
]


// 音樂
var musicAllStopHotKey = "Numpad0"
var bgmList = [
    // { voice: "element/voice/bgm01.mp3", hotkey: "Numpad1" },
    // { voice: "element/voice/bgm02.wav", hotkey: "Numpad2" },
]



