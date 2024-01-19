


// ---------------------------------
//
// Spaces
//
// ---------------------------------

spaceAtr = [{
    spaceBg: ["image/background.jpg", "image/background_chair.jpg"],
    spacePerspectRate: 0.8,
    cameraLen: [0, 0, -2, 0],
    sW: 75,
    sH: 11,
    sD: 100,
    sDWallD: -50,
    sDWallx: 50,
    sDWally: 48,
    wallCount: 0
}]




//-----------------------------
// Media
//-----------------------------

var mediaList = [
    "element/01.png",
    "element/video.mp4",
    "image/i03.png"
]

bgmList = [
    { voice: "bgm.mp3", drawColor: "#ffffff88", w: 50, h: 50, x: 50, y: 50 },
    { voice: "../../../music/audio_guitar.wav", drawColor: "#ffffff88", w: 50, h: 50, x: 50, y: 50 },
    { voice: "../../../music/audio_drum.wav", drawColor: "#ffffff88", w: 50, h: 50, x: 50, y: 50 },
    { voice: "../../../music/people.aac", drawColor: "#ffffff88", w: 50, h: 50, x: 50, y: 50 },
    { voice: "../../../music/AI_Voice006en.mp3", drawColor: "#ffffff88", w: 50, h: 50, x: 50, y: 50 },
]

var audioList = [
    "music/001.aac",
    "music/003.aac",
    "music/002.aac",
    "music/004.aac",
    "music/ui_01.mp3",
    "music/ui_02.mp3",
    "music/ui_04.wav",
    "music/out_logos---classic.aac"
];



//-----------------------------
// Display
//-----------------------------

//設定所有 display 屬性
var displayAttr = [
    //LED*3
    { size: [19.5, 16 / 9], xyz: [30.5, 45.8, -50], xyzR: [0.00, 0.000, 0.00], thick: [0.00, "#888"], videoWall: [0, 0], border: 0, addClass: "led", name: "" },
    { size: [19.5, 16 / 9], xyz: [50.0, 45.8, -50], xyzR: [0.00, 0.000, 0.00], thick: [0.00, "#111"], videoWall: [2, 2], border: 0, addClass: "led", name: "" },
    { size: [19.5, 16 / 9], xyz: [69.5, 45.8, -50], xyzR: [0.00, 0.000, 0.00], thick: [0.00, "#111"], videoWall: [3, 3], border: 0, addClass: "led", name: "" },
    //LED 16:3
    { size: [58.5, 16 / 3], xyz: [50.0, 45.8, -50], xyzR: [0.00, 0.000, 0.00], thick: [0.00, "#111"], videoWall: [2, 2], border: 0, addClass: "", name: "" },
    //Display
    { size: [15.0, 16 / 9], xyz: [86.0, 45.0, -40], xyzR: [0.00, -90.0, 0.00], thick: [0.03, "#222"], videoWall: [0, 0], border: 1, addClass: "", name: "" },
    { size: [18.0, 16 / 9], xyz: [-10.0, 58.0, -80], xyzR: [20.00, 45.0, -20.00], thick: [0.06, "#222"], videoWall: [2, 2], border: 1, addClass: "shadow", name: "" }
]




// ---------------------------------
//
// Controller
//
// ---------------------------------

var ipadElementAtr = []
ipadElementAtr[0] = [
    {
        pageID: 101,
        bgColor: "#595959",
        bgScr: "image/test_bg.png",
        btns: [
            {
                xy: [25, 45], size: [24.5, 17], radius: 4, border: 3,
                bgColor: ["#000", "#333"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "PIP Mode", textColor: "#fff", textSize: 20,
                act: [() => { vp.changeLayout(display[0], "pip") }, () => { vp.changeLayout(display[0], "pop") }], toggle: true
            }, {
                xy: [50, 45], size: [24.5, 17], radius: 4, border: 3,
                bgColor: ["#000", "#333"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "source", textColor: "#fff", textSize: 20,
                act: [() => { display[1].input(media[1]) }, () => { display[1].input(media[0]) }], toggle: true
            }, {
                xy: [75, 45], size: [24.5, 17], radius: 4, border: 3,
                bgColor: ["#000", "#333"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "PIP", textColor: "#fff", textSize: 20,
                act: [() => { vp.changeLayout(display[2], "4x") }, () => { vp.changeLayout(display[2], [3, 3]) }], toggle: true
            }, {
                xy: [90, 8], size: [16, 6], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "Mixer", textColor: "#fff", textSize: 14,
                act: () => { ipad.goTo(1) }, toggle: false
            }, {
                xy: [85, 90], size: [16, 8], radius: 6, border: 0,
                bgColor: ["#00000055", ""], bgScr: ["", ""], borderColor: ["#888", "#111"],
                text: "50", textColor: "#aaa", textSize: 15,
                act: "none", toggle: false
            }, {
                xy: [50, 70], size: [40, 8], radius: 10, border: 0,
                bgColor: ["#00000055", "#00BBFF77"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "< >", textColor: "#fff", textSize: 15,
                act: [() => {
                    display[0].move([6, 0, 0], [0, 0, 0])
                    display[2].move([-6, 0, 0], [0, 0, 0])
                }, () => {
                    display[0].move([-6, 0, 0], [0, 0, 0])
                    display[2].move([6, 0, 0], [0, 0, 0])
                }], toggle: true
            }, {
                xy: [94, 45], size: [10, 14], radius: 4, border: 3,
                bgColor: ["#000", "#333"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "Proj.", textColor: "#fff", textSize: 14,
                act: [() => { display[4].input(media[1]) }, () => { display[4].input(media[0]) }], toggle: true
            }, {
                xy: [90, 20], size: [16, 6], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "UC8000", textColor: "#fff", textSize: 14,
                act: () => { ipad.goTo(2) }, toggle: false
            }
        ],
        sliders: [
            { xy: [50, 90], size: 50, dir: "", value: 50, bgColor: "#000000", activeColor: "#fff", act: (e) => { ipad.page[0].btn[4].changeText(e) } }
        ]
    }, {
        pageID: 102,
        bgColor: "#595959",
        bgScr: "",
        btns: [
            {
                xy: [50, 10], size: [20, 10], radius: 6, border: 0,
                bgColor: ["#00000000", ""], bgScr: ["", ""], borderColor: ["#fff", ""],
                text: "Mixer", textColor: "#aaa", textSize: 18,
                act: "none", toggle: true
            }, {
                xy: [10, 10], size: [20, 10], radius: 6, border: 0,
                bgColor: ["", ""], bgScr: ["", ""], borderColor: ["", ""],
                text: "back", textColor: "#aaa", textSize: 14,
                act: () => { ipad.goTo(0) }, toggle: false
            }, {
                xy: [20, 92], size: [7, 7], radius: 6, border: 0,
                bgColor: ["#00000033", "#00225555"], bgScr: ["", ""], borderColor: ["#fff", ""],
                text: "≫", textColor: "#aaa", textSize: 12,
                act: [() => { bgm[0].stop() }, () => { bgm[0].play() }], toggle: true
            }, {
                xy: [30, 92], size: [7, 7], radius: 6, border: 0,
                bgColor: ["#00000033", "#00225555"], bgScr: ["", ""], borderColor: ["#fff", ""],
                text: "≫", textColor: "#aaa", textSize: 12,
                act: [() => { bgm[1].stop() }, () => { bgm[1].play() }], toggle: true
            }, {
                xy: [40, 92], size: [7, 7], radius: 6, border: 0,
                bgColor: ["#00000033", "#00225555"], bgScr: ["", ""], borderColor: ["#fff", ""],
                text: "≫", textColor: "#aaa", textSize: 12,
                act: [() => { bgm[2].stop() }, () => { bgm[2].play() }], toggle: true
            }, {
                xy: [50, 92], size: [7, 7], radius: 6, border: 0,
                bgColor: ["#00000033", "#00225555"], bgScr: ["", ""], borderColor: ["#fff", ""],
                text: "≫", textColor: "#aaa", textSize: 12,
                act: [() => { bgm[3].stop() }, () => { bgm[3].play() }], toggle: true
            }, {
                xy: [60, 92], size: [7, 7], radius: 6, border: 0,
                bgColor: ["#00000033", "#00225555"], bgScr: ["", ""], borderColor: ["#fff", ""],
                text: "≫", textColor: "#aaa", textSize: 12,
                act: [() => { bgm[4].stop() }, () => { bgm[4].play() }], toggle: true
            }
        ],
        sliders: [
            { xy: [20, 55], size: 40, dir: "row", value: 100, bgColor: "#000000", activeColor: "#fff", act: (e) => { bgm[0].changeFadeGain(e * 0.01) } },
            { xy: [30, 55], size: 40, dir: "row", value: 50, bgColor: "#000000", activeColor: "#fff", act: (e) => { bgm[1].changeFadeGain(e * 0.01) } },
            { xy: [40, 55], size: 40, dir: "row", value: 55, bgColor: "#000000", activeColor: "#fff", act: (e) => { bgm[2].changeFadeGain(e * 0.01) } },
            { xy: [50, 55], size: 40, dir: "row", value: 70, bgColor: "#000000", activeColor: "#fff", act: (e) => { bgm[3].changeFadeGain(e * 0.01) } },
            { xy: [60, 55], size: 40, dir: "row", value: 42, bgColor: "#000000", activeColor: "#fff", act: (e) => { bgm[4].changeFadeGain(e * 0.01) } },
            { xy: [70, 55], size: 40, dir: "row", value: 34, bgColor: "#000000", activeColor: "#fff", act: "" },
            { xy: [80, 55], size: 40, dir: "row", value: 20, bgColor: "#000000", activeColor: "#fff", act: "" }
        ]
    }, {
        pageID: 103,
        bgColor: "#595959",
        bgScr: "",
        btns: [
            {
                xy: [50, 10], size: [20, 10], radius: 6, border: 0,
                bgColor: ["#00000000", ""], bgScr: ["", ""], borderColor: ["#fff", ""],
                text: "UC8000", textColor: "#aaa", textSize: 18,
                act: "none", toggle: true
            }, {
                xy: [15, 36], size: [14, 14], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "1", textColor: "#fff", textSize: 20,
                act: () => { sound.play(0) }, toggle: false
            }, {
                xy: [30, 36], size: [14, 14], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "2", textColor: "#fff", textSize: 20,
                act: () => { sound.play(1) }, toggle: false
            }, {
                xy: [45, 36], size: [14, 14], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "3", textColor: "#fff", textSize: 20,
                act: () => { sound.play(2) }, toggle: false
            }, {
                xy: [60, 36], size: [14, 14], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "4", textColor: "#fff", textSize: 20,
                act: () => { sound.play(3) }, toggle: false
            }, {
                xy: [15, 60], size: [14, 14], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "5", textColor: "#fff", textSize: 20,
                act: () => { sound.play(4) }, toggle: false
            }, {
                xy: [30, 60], size: [14, 14], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "6", textColor: "#fff", textSize: 20,
                act: () => { sound.play(5) }, toggle: false
            }, {
                xy: [45, 60], size: [14, 14], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "7", textColor: "#fff", textSize: 20,
                act: () => { sound.play(6) }, toggle: false
            }, {
                xy: [60, 60], size: [14, 14], radius: 4, border: 1,
                bgColor: ["#00000055", "#333555"], bgScr: ["", ""], borderColor: ["#333", "#111"],
                text: "8", textColor: "#fff", textSize: 20,
                act: () => { sound.play(7) }, toggle: false
            }, {
                xy: [17, 85], size: [18, 7], radius: 6, border: 0,
                bgColor: ["#00000033", "#00225555"], bgScr: ["", ""], borderColor: ["#fff", ""],
                text: "MIC in", textColor: "#aaa", textSize: 12,
                act: [() => { bgm[4].stop() }, () => { bgm[4].play() }], toggle: true
            }, {
                xy: [10, 10], size: [20, 10], radius: 6, border: 0,
                bgColor: ["", ""], bgScr: ["", ""], borderColor: ["", ""],
                text: "back", textColor: "#aaa", textSize: 14,
                act: () => { ipad.goTo(0) }, toggle: false
            }
        ],
        sliders: [{ xy: [50, 85], size: 40, dir: "", value: 42, bgColor: "#000000", activeColor: "#fff", act: (e) => { bgm[4].changeFadeGain(e * 0.01) } }]
    }
]








// ---------------------------------
//
// 選單內容
//
// ---------------------------------


var featureMenuContent = []
featureMenuContent[0] = {
    flow: "Turn on",
    feature: [[
        "element/icon_share.png",
        "Local Content Sharing",
        "All attendees are allow to quickly share content with their personal devices."
    ], [
        "element/icon_share.png",
        "Enviromental Control",
        "By detecting meeting environment factors, environmental equipment can be automatically turned on or off to allow the meeting to proceed smoothly."
    ], [
        "element/icon_controls.png",
        "",
        ""
    ], [
        // "element/icon_.png",
        // "",
        // ""
    ], [
        // "element/icon_.png",
        // "",
        // ""
    ]]
}
featureMenuContent[1] = {
    flow: "Round Table",
    feature: [[
        "element/icon_share.png",
        "Local Content Sharing",
        "All attendees are allow to quickly share content with their personal devices."
    ], [
        "element/icon_share.png",
        "Enviromental Control",
        "By detecting meeting environment factors, environmental equipment can be automatically turned on or off to allow the meeting to proceed smoothly."
    ], [
        "element/icon_controls.png",
        "",
        ""
    ], [
        // "element/icon_.png",
        // "",
        // ""
    ], [
        // "element/icon_.png",
        // "",
        // ""
    ]]
}

