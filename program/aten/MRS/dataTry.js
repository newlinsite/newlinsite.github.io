












// Function -------
// music control
// Delay
// Toggle
// copy
// video timer
// timer


// UI ----------
// dialog
// say
// toolTips
// toast 










VKItemData = [{
    type: "source",
    io: "1",
}, {
    type: "source",

}]



class VKItem {
    constructor(data) {
        console.log(data.type)
        console.log(data.io)
        console.log(new.target.name)
    }
}

new VKItem(VKItemData[0])
new VKItem(VKItemData[1])