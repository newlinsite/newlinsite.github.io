// Function
var $ = function (name) {
    return document.getElementById(name)
}
var $css = function (name) {
    return document.getElementsByClassName(name)
}
var $tag = function (name) {
    return document.getElementsByTagName(name)
}






//--------------------------------
//
//			GTM
//
//--------------------------------


var ga1 = $("ga1")
// var ga2 = $("ga2")





// ga2.innerHTML=bb


var aa = '<script async src="https://www.googletagmanager.com/gtag/js?id=UA-114514958-1"></script>\
<script>\
(function (w, d, s, l, i) {\
    w[l] = w[l] || []; w[l].push({\
        \'gtm.start\':\
            new Date().getTime(), event: \'gtm.js\'\
    }); var f = d.getElementsByTagName(s)[0],\
        j = d.createElement(s), dl = l != \'dataLayer\' ? \'&l=\' + l : \'\'; j.async = true; j.src =\
            \'https://www.googletagmanager.com/gtm.js?id=\' + i + dl; f.parentNode.insertBefore(j, f);\
})(window, document, \'script\', \'dataLayer\', \'GTM-PMLJXPC\');\
</script>\
'

ga1.innerHTML = aa