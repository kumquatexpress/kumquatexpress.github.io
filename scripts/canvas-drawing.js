var height;
var width;
var doit;

$(document).ready(function(){
	update_global_sizes();
	
	//instantiate kineticJS
	kineticGlobal.create($(document).width(), $(document).height());

	//redraws all canvases to be correct size
	$(window).load(function(){
		update_and_redraw();
	});


	//trigger for page to be responsive
	$(window).resize(function() {
	    clearTimeout(doit);
	    doit = setTimeout(function() {
	        update_and_redraw();
	    }, 100);
	});

});

update_and_redraw = function(){
	update_global_sizes();

	var winWidth = width;
	var winHeight = height;
	kineticGlobal.draw(winWidth, winHeight);
	kineticGlobal.setListeners();
}

update_global_sizes = function(){	
	height = $(window).innerHeight();
	width = $(window).innerWidth();
}
