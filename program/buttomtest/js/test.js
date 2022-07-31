





// --------------------------------- 元件抓取 ----------------------------


var btn_01 = document.getElementById("btn_01");
var btn_02 = document.getElementById("btn_02");
var btn_03 = document.getElementById("btn_03");
var btn_04 = document.getElementById("btn_04");
var btn_05 = document.getElementById("btn_05");

var testType = document.getElementById("testType");
var btnColor = document.getElementsByClassName("button");

btnList = [btn_01, btn_02, btn_03, btn_04, btn_05]




var v1Souce = document.getElementById("v1Souce");
var v2Souce = document.getElementById("v2Souce");




// --------------------------------- 功能 ----------------------------


// 燈號狀態切換器
function classSwitch(keyID, keyIDList, elementList, on, off, check) {
    for (let i = 0; i < 5; i++) {
        if (keyID === keyIDList[i]) {
            if (check[i] == 1) {
                elementList[i].classList.add(off)
                elementList[i].classList.remove(on)
                check[i] = 0
            } else {
                elementList[i].classList.add(on)
                elementList[i].classList.remove(off)
                check[i] = 1
            };
        }
    }
}

// 建立 layout Source 組合器

function layoutSouceConnector(layout, v1_Source, v2_Source) {
    videoLayout.classList.remove("single")
    videoLayout.classList.remove("pip")
    videoLayout.classList.remove("pbp")
    videoLayout.classList.remove("pkp")
    videoLayout.classList.add(layout)
    v1Souce.classList = v1_Source
    v2Souce.classList = v2_Source
}







// --------------------------------- 清單 ----------------------------


// 燈號開關清單
var keyIDList_01 = ['KeyN', 'KeyM', 'Comma', 'Period', 'Slash']
var check_lightOn = [0, 0, 0, 0, 0]

//燈號閃爍清單
var keyIDList_02 = ['KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote']
var check_flashOn = [0, 0, 0, 0, 0]


// 畫面清單
var keyIDList_S04 = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6']
var keyIDList_S03 = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY']
var keyIDList_S02 = ['KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH']
var keyIDList_S01 = ['KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB']

var sourceList_single = ['s01', 's02', 's03', 's04']
var sourceList_mati_01 = ['s01', 's01', 's02', 's02', 's03', 's03']
var sourceList_mati_02 = ['s02', 's03', 's01', 's03', 's01', 's02']


// 紀錄計時器
var taskNum = 1
var sessionNum = 1







//   模式 

// var test_mode = 0
document.getElementById("testmode").innerHTML = "Mode = " + test_mode;





// --------------------------------- 鍵盤快捷鍵----------------------------

if (test_mode == 0) {

    document.addEventListener("keydown", keydownEvent, false);

    function keydownEvent(e) {
        var keyID = e.code;

        // 換測試項目
        if (keyID === "Digit0") {
            testType.classList = "buttonBox test01"
        }
        if (keyID === "Minus") {
            testType.classList = "buttonBox test02"
        }
        if (keyID === "Equal") {
            testType.classList = "buttonBox test03"
        }


        // 燈號
        classSwitch(keyID, keyIDList_01, btnList, "on", "off", check_lightOn)
        classSwitch(keyID, keyIDList_02, btnList, "animate__flash", "non", check_flashOn)

        for (let i = 0; i < 5; i++) { if (keyID === "Backslash") { btnColor[i].classList = "button" } }
        for (let i = 0; i < 5; i++) { if (keyID === "BracketRight") { btnColor[i].classList = "button yallow" } }
        for (let i = 0; i < 5; i++) { if (keyID === "BracketLeft") { btnColor[i].classList = "button blue" } }
        for (let i = 0; i < 5; i++) { if (keyID === "KeyP") { btnColor[i].classList = "button red" } }



        // 切Source
        for (let i = 0; i < 4; i++) {
            if (keyID === keyIDList_S01[i]) {
                layoutSouceConnector("single", sourceList_single[i], sourceList_single[i])
            }
        }
        for (let i = 0; i < 6; i++) {
            if (keyID === keyIDList_S02[i]) {
                layoutSouceConnector("pip", sourceList_mati_01[i], sourceList_mati_02[i])
            }
        }
        for (let i = 0; i < 6; i++) {
            if (keyID === keyIDList_S03[i]) {
                layoutSouceConnector("pbp", sourceList_mati_01[i], sourceList_mati_02[i])
            }
        }
        for (let i = 0; i < 6; i++) {
            if (keyID === keyIDList_S04[i]) {
                layoutSouceConnector("pkp", sourceList_mati_01[i], sourceList_mati_02[i])
            }
        }



        // 偵測 LOG
        if (keyID === "NumpadMultiply") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - 4 - keydown")
        }
        if (keyID === "Numpad9") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - 3 - keydown")
        }
        if (keyID === "Numpad6") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - 2 - keydown")
        }
        if (keyID === "Numpad3") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - 1 - keydown")
        }
        if (keyID === "NumpadDecimal") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - f - keydown")

        }
        if (keyID === "KeyI") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - --- Task " + taskNum + " --- - ")
            taskNum++
        }
        if (keyID === "KeyO") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - ---Session " + sessionNum + "--- - ")
            sessionNum++
        }
    }



    document.addEventListener("keyup", keyupEvent, false);
    function keyupEvent(e) {
        // 偵測 LOG
        var keyID = e.code;
        if (keyID === "NumpadMultiply") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - 4 - keyup")
        }
        if (keyID === "Numpad9") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - 3 - keyup")
        }
        if (keyID === "Numpad6") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - 2 - keyup")
        }
        if (keyID === "Numpad3") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - 1 - keyup")
        }
        if (keyID === "NumpadDecimal") {
            var now = new Date();
            console.log(+ now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + " - f - keyup")
        }

    }

} else {

    // 變數

    var V1C = 0 // default
    var V2C = 0
    var V3C = 0
    var input = 0
    var inputV1C = 0     // 保留值
    var inputV2C = "s02" // 保留值
    var layout = "pip"
    var layoutSigal = 0
    var layoutSwitchSigal = 0



    // 輸入Source

    document.addEventListener("keydown", keydownEvent, false);

    function VCSource(Key, Source, e) {
        let keyID = e.code;
        if (keyID === Key) {
            if (V1C == 0) {
                V1C = Source
            }
            else if (V1C == Source) {
                V3C = Source
            }
            else if (V2C == 0) {
                V2C = Source
            }
            else {
                V3C = Source
            }
        }
    }

    function keydownEvent(e) {
        VCSource("KeyA", "s01", e)
        VCSource("KeyS", "s02", e)
        VCSource("KeyD", "s03", e)
        VCSource("KeyF", "s04", e)
        // layout buttom
        var keyID = e.code;
        if (keyID === "KeyG") {
            // console.log(layout)
            // console.log(input.length)
            console.log(input)
            // 從 single view 切到 layout
            if (input.length == 1 && input != 0) {
                videoLayout.classList.remove("single")
                videoLayout.classList.add(layout)
                input = [inputV1C, inputV2C]
                layoutSigal = 1
            }
            // 已在 layout view 切 layout
            else {
                videoLayout.classList.remove("single")
                videoLayout.classList.remove("pip")
                videoLayout.classList.remove("pbp")
                videoLayout.classList.remove("pkp")
                if (layout == "pip") {
                    videoLayout.classList.add("pbp")
                    layout = "pbp"
                }
                else if (layout == "pbp") {
                    videoLayout.classList.add("pkp")
                    layout = "pkp"
                }
                else {
                    videoLayout.classList.add("pip")
                    layout = "pip"
                }
                layoutSwitchSigal = 1
            }
        }
    }



    document.addEventListener("keyup", keyupEvent, false);

    function keyupEvent(e) {
        var keyID = e.code;
        // 偵測是否在 single view 是按下 layout  
        if (layoutSigal == 1) {
            layoutSigal = 0
        } else if (layoutSwitchSigal == 1) {
            layoutSwitchSigal = 0
        }
        else {
            if (V2C != 0) {
                input = [V1C, V2C]
                inputV1C = V1C
                inputV2C = V2C         // single view 保留值
            }
            else {
                input = [V1C]
            }

            if (input != 0) {
                if (input.length == 1) {
                    layoutSouceConnector("single", input[0], inputV2C)
                } else {
                    layoutSouceConnector(layout, input[0], input[1])
                }
            }
            V1C = 0
            V2C = 0
            V3C = 0
            console.log("input = " + input)
        }
    }

}











