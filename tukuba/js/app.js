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


var header = $tag("header")




//--------------------------------
//
//			Header
//
//--------------------------------

var header = $tag("header")

// input Header

var a = '\
<div class="container row flex-align-end">\
	<img src="image/logo.png" alt="" class="logo">\
	<ul class="row flex-jus-end">\
		<li class=""><a href="#">Works</a></li>\
		<li class=""><a href="#">Blog</a></li>\
		<li class=""><a href="#">About</a></li>\
	</ul>\
	<div class="sidebar row flex-dir-col">\
		<a class="" href="index.html">home</a>\
		<a class="block now" href="index.html">Works</a>\
	</div>\
</div>'

header[0].innerHTML = a;



// Header smaller

document.addEventListener('scroll', function (e) {
	if (window.scrollY != 0) {
		header[0].classList.add("sm");
	} else {
		header[0].classList.remove("sm");
	}
})




