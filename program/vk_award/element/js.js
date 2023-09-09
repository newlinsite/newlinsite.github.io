// Function
var $id = function (name) {
    return document.getElementById(name)
}
var $css = function (name) {
    return document.getElementsByClassName(name)
}
var $tag = function (name) {
    return document.getElementsByTagName(name)
}



toggle = (tag, do1, do0) => {
    if (tag === 0) {
        do1()
    } else {
        do0()
    }
}


var vkObject = function (object) {
    this.object = object

    this.delay = (delayObj, doSomething, delayTime) => {
        if (delayObj.id !== null) {
            clearTimeout(delayObj.id);
            delayObj.id = null
            console.log("clear")
        } else {
            delayObj.id = setTimeout(() => {
                doSomething()
                delayObj.id = null
            }, delayTime);
        }
    }

    this.appearTag = 1
    this.appear = () => {
        this.object.style.opacity = 1
        this.appearTag = 1
    }
    this.disappear = () => {
        this.object.style.opacity = 0
        this.appearTag = 0
    }

    this.appearToggle = () => {
        toggle(this.appearTag, this.appear, this.disappear)
    }

    this.customOpacity = (opacity) => {
        this.object.style.opacity = opacity
        this.appearTag = 0
    }

    this.upCloseTag = 0
    this.upClose = (position = "0.8%") => {
        this.object.style.paddingTop = position
        this.upCloseTag = 1
    }
    this.disUpClose = (position = "14.5%") => {
        this.object.style.paddingTop = position
        this.upCloseTag = 0
    }

    this.upCloseToggle = () => {
        toggle(this.upCloseTag, this.upClose, this.disUpClose)
    }

}



var message = function (content = "Light On", style = "messageBox") {
    this.message = document.createElement("div");
    this.message.classList = style;
    this.message.innerText = content;

    this.add = (fadeTime = 1000, time = 5000) => {
        $id("messageContainer").appendChild(this.message);
        this.message.style.animationName = "fadein"
        this.message.style.animationDuration = String(fadeTime) + "ms"

        //創造後 X 秒淡出, 創造後 X 秒淡出刪除
        setTimeout(() => {
            this.message.style.animationName = "fadeout"
        }, time);
        setTimeout(() => {
            this.message.remove();
        }, time + fadeTime);
    }
}





var light = new vkObject($css("scene")[1])
var people = new vkObject($css("scene")[2])
var projector = new vkObject($id("projector"))
var board = new vkObject($css("board")[0])
var screen = new vkObject($id("screen"))
var screenContent00 = new vkObject($css("content")[0])
var screenContent01 = new vkObject($css("content")[1])

var lightAppearDelay = { id: null }
var screenAppearDelay = { id: null }

//先把影片關掉
screenContent01.disappear()





// 鍵盤快捷鍵
window.addEventListener("keydown", keyboardListener, false);
function keyboardListener(e) {
    var keyID = e.code;
    if (keyID === 'KeyQ') {
        toggle(light.appearTag,
            () => {
                light.appear()
                board.appear()
                new message("Light On").add()
            },
            () => {
                light.disappear()
                board.customOpacity(0.1)
                new message("Light Off").add()
            })
    }

    // open projector
    if (keyID === 'KeyW') {
        toggle(projector.upCloseTag,
            () => {
                projector.upClose()
                screen.delay(screenAppearDelay, screen.disappear, 0)
                new message("Porjector Off").add()
            },
            () => {
                projector.disUpClose()
                screen.delay(screenAppearDelay, screen.appear, 1200)
                new message("Porjector On").add()
            })
    }

    if (keyID === 'KeyA') {
        screen.appearToggle()
        toggle(screen.appearTag, new message("Screen Off").add, new message("Screen On").add)
    }

    if (keyID === 'KeyZ') {
        projector.upCloseToggle()
        toggle(screen.upCloseTag, new message("Projector Off").add, new message("Projector On").add)
    }

    // content switch
    if (keyID === 'KeyS') {
        toggle(screenContent00.appearTag,
            () => {
                screenContent00.appear()
                screenContent01.disappear()
                new message("Show Slide").add()
            },
            () => {

                screenContent00.disappear()
                screenContent01.appear()
                new message("Show Video").add()
            })
    }


    // video mode
    if (keyID === 'KeyE') {
        people.appear()
        light.appear()
        board.appear()
        projector.disUpClose()
        screen.delay(screenAppearDelay, screen.appear, 1200)
        new message("Meeting mode").add()
    }

    // meeting mode
    if (keyID === 'KeyR') {
        people.appear()
        light.appear()
        board.appear()
        projector.disUpClose()
        screen.delay(screenAppearDelay, screen.appear, 1200)
        new message("Meeting mode").add()
    }

    // nobody mode
    if (keyID === 'KeyT') {
        people.disappear()
        light.disappear()
        board.customOpacity(0.1)
        projector.upClose()
        screen.delay(screenAppearDelay, screen.disappear, 0)
        new message("Leave mode").add()
    }
}