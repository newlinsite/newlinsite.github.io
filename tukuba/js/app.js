	// Function
	var $ = function(name){
		return document.getElementById(name)
	}
	var $css = function(name){
		return document.getElementsByClassName(name)
	}
	var $tag = function(name){
		return document.getElementsByTagName(name)
	}


	// Header
	var header = $tag("header")
	document.addEventListener('scroll', function (e) {
		if (window.scrollY != 0) {
			header[0].classList.add("sm");
		} else {
			header[0].classList.remove("sm");
		}
	})