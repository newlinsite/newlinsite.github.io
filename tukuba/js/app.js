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
//			Header/footer
//
//--------------------------------

var header = $tag("header")
var footer = $tag("footer")

// input Header
var headerHtml = '\
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

header[0].innerHTML = headerHtml;


// input footer
var footerHtml = '\
	<div class="container">123\
	</div>'

footer[0].innerHTML = footerHtml;













// Header smaller

document.addEventListener('scroll', function (e) {
	if (window.scrollY != 0) {
		header[0].classList.add("sm");
	} else {
		header[0].classList.remove("sm");
	}
})




