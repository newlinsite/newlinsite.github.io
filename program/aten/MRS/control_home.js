
//  -------------------------------------------------------------------
//  -------------------------------------------------------------------
//  
//  基礎 Function
//  
//  -------------------------------------------------------------------
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

var test = function (print = "test") {
    console.log(print)
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





//------------------------------


var mouseMask = $css("mouseMask")[0]

document.addEventListener("mousemove", (e) => {
    let gradient = "radial-gradient(circle at " + e.x + "px " + e.y + "px , #00000000 0%, #00000000 10%, #00000088 40%, #000000 100%)"
    mouseMask.style.background = gradient
})


var openMask = $css("openMask")[0]
openMask.addEventListener("click", () => {
    openMask.classList.add("off")
})



var roomName = $css("roomName")
var sidebar = $css("sidebar")[0]
var black = $css("black")[0]
var roomImg = $css("roomImg")[0]
var spacename = $css("spacename")[0]
var spaceDeH = $css("spaceDeH")
var spaceDe = $css("spaceDe")
var enterRoomBt = $css("enterRoomBtn")[0]

for (let i = 0; i < roomName.length; i++) {
    roomName[i].addEventListener("click", () => {
        enterRoomBt.style.display = "block"
        sidebar.classList.add("on")
        roomImg.src = "element/roomImg" + i + ".png"
        spacename.innerHTML = spacenameContent[i]
        spaceDeH[0].innerHTML = spaceDeH01Content[i]
        spaceDeH[1].innerHTML = spaceDeH02Content[i]
        spaceDe[0].innerHTML = spaceDe01Content[i]
        spaceDe[1].innerHTML = spaceDe02Content[i]
        if (spacenameContent[i] == "") {
            test($css("enterRoomBtn")[0].style)
            enterRoomBt.style.display = "none"
        }
    })
}
black.addEventListener("click", () => {
    sidebar.classList.remove("on")
})


var spacenameContent = [
    "",
    "",
    "",
    "",
    "Board Room",
    //--------------
    "",
    "",
    "",
    "",
    ""
]
var spaceDeH01Content = [
    "",
    "",
    "",
    "",
    "[ Coference Scenarios ]",
    //--------------
    "",
    "",
    "",
    "",
    ""
]

var spaceDeH02Content = [
    "",
    "",
    "",
    "",
    "[ Key Requirements ]",
    //--------------
    "",
    "",
    "",
    "",
    ""
]

var spaceDe01Content = [
    "",
    "",
    "",
    "",
    "The space is for critical decision-making where members can make decisions together based on presentation data; participants may be board members or in roles withdecision - making authorities.",
    //--------------
    "",
    "",
    "",
    "",
    ""
]
var spaceDe02Content = [
    "",
    "",
    "",
    "",
    "The local site requires simultaneous viewing of the presentation and remote video view, while the entire meeting needs to be recorded and audio-recorded.​<br><br>According to the topic of discussion, the contents of the screen in front of the participants can be adjusted; it can be divided into the same or different contents and switched in real time without interrupting the meeting.​<br><br>To ensure a smooth meeting, the chairman can control the meeting flow and let the participants speak in order by the microphone system.",
    //--------------
    "",
    "",
    "",
    "",
    ""
]
