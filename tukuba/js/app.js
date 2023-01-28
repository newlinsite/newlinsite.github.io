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
//			input name , work image
//
//--------------------------------



var workname = [
	"portfolio",
	//----------------------
	"All-in-One Streaming Studio Solution Application.",
	"Text-to-Speech AI Application",
	"Future Training Room",
	"uvc",
	"Design system"
]

var workname_xs = [
	"portfolio",
	//----------------------
	"d_uc",
	"d_tts",
	"d_ftr",
	"d_uvc",
	"d_ds"

]





//--------------------
//	input index work name/link
//--------------------
if (workNumber == 0) {
	var h3 = $tag("h3")
	var link = $tag("a")
	for (let i = 0; i < h3.length; i++) {
		h3[i].innerHTML = workname[i + 1];
		link[i].href = workname_xs[i + 1] + ".html"
	}
}


//--------------------
//	input work name and image
//--------------------
if (workNumber > 0) {
	$tag("title")[0].innerHTML = workname[workNumber]
	$tag("h1")[0].innerHTML = workname[workNumber]
	var img = $tag("img")
	for (let i = 0; i < img.length; i++) {
		img[i].src = "image/" + workname_xs[workNumber] + i + ".png"
	}
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
					<li class=""><a href="about.html">Blog</a></li>\
					<li class=""><a href="about.html">About</a></li>\
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





