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




function onError() {
    console.log("error")
}

function nothing() {
    console.log("nothing")
}

