var PageViewer = function(viewerElement,imageURLs){
	this.viewer = viewerElement;
	this.imageURLs = imageURLs;
	this.currentPage = 1;
}

PageViewer.prototype.build = function(){
	// contains single page jQuery objects
	var innerElems = [];
	var pageIndicator = [];
	var viewer = this.viewer;
	var _this = this;

	function buildInnerElement(imageSrc){
		return $("<div class=\"apc-image\" style=\"background-image:url(" + imageSrc + ");\">&nbsp;</div>");
	}

	function buildPageIndicator(){
		return $("<div class=\"apc-page-indicator\">" + _this.currentPage + "/" + _this.imageURLs.length + "</div>");
	}

	function buildElements(){
		var index = 0;
		var urls = _this.imageURLs;
		viewer.html('');
		jQuery.each(urls, function(){
			var inner = buildInnerElement(this);
			if(index == 0) inner.addClass('active');
			viewer.append(inner);
			index++;
			innerElems.push(inner);
		});
		pageIndicator = buildPageIndicator();
		viewer.append(pageIndicator);
	}

	// page moving
	function forwardPage(){
		if(_this.currentPage >= innerElems.length) return false;
		innerElems[_this.currentPage - 1].removeClass('active');
		_this.currentPage++;
		innerElems[_this.currentPage - 1].addClass('active');
	}

	function backwordPage(){
		if(_this.currentPage == 1) return false;
		innerElems[_this.currentPage - 1].removeClass('active');
		_this.currentPage--;
		innerElems[_this.currentPage - 1].addClass('active');
	}

	// cursor changing
	function cursorUpdate(e){
		var currentX = e.pageX - viewer.offset().left;
		if(currentX / viewer.width() > 0.5){
			if(_this.currentPage == innerElems.length){
				viewer.css('cursor','auto');
			}else{
				viewer.css('cursor',"url(images/glyphicons_211_right_arrow.png)");
			}
		}else{
			if(_this.currentPage == 1){
				viewer.css('cursor','auto');
			}else{
				viewer.css('cursor',"url(images/glyphicons_210_left_arrow.png)");
			}
		}
	}

	function clicked(e){
		var clickedX = e.pageX - viewer.offset().left;
		if(clickedX / viewer.width() > 0.5){
			forwardPage();
		}else{
			backwordPage();
		}
		cursorUpdate(e);
		pageIndicator.html( _this.currentPage + "/" + _this.imageURLs.length);
	}

	// build execute
	buildElements.call(this);
	this.viewer.click(function(e){
		clicked(e);
	});
	this.viewer.mousemove(function(e){
		cursorUpdate(e);
	});

	// publish
	// return {
	// 	build: buildElements
	// }

}