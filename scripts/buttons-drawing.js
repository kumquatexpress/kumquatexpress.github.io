var stage;
var buttonLayer, textLayer, rectLayer, imageLayer;

var gitButton, linkButton, fbButton;

var codifyRect, mealmapperRect, maasRect, bayesRect, visualizerRect;

var codifyImg, mealmapperImg, maasImg, visualizerImg, bayesImg;

var buttons;
var gitImg, linkImg, fbImg;

var randomColor = function(){
	return '#'+Math.floor(Math.random()*10777215+6000000).toString(16);
}


var kineticGlobal = {
	create: function(winWidth, winHeight){
		stage = new Kinetic.Stage({
	        container: 'title-header',
	        width: winWidth,
	        height: winHeight,
	    });
	    
	    //define the image sources
	    gitImg = new Image();
	    linkImg = new Image();
	    fbImg = new Image();
	    codifyImg = new Image();
	    mealmapperImg = new Image();
	    maasImg = new Image();
	    visualizerImg = new Image();
	    bayesImg = new Image();
	    
	    gitImg.src = ("images/octocat.png");
	    linkImg.src = ("images/linkedinlogo.png");
	    fbImg.src = ("images/facebooklogo.png");
	    codifyImg.src = (constants.link_to_screenshot("codify.herokuapp.com"));
	    mealmapperImg.src = (constants.link_to_screenshot("mealmapper.net"));
		maasImg.src = (constants.link_to_screenshot("code.launchpad.net/maas"));
		visualizerImg.src = (constants.link_to_screenshot("boyangniu.com/visualizer"));
		bayesImg.src = (constants.link_to_screenshot("boyangniu.com/hearmeroar"));
	    
	    //add all the layers to the stage
	    buttonLayer = new Kinetic.Layer();
	    textLayer = new Kinetic.Layer();
	    rectLayer = new Kinetic.Layer();
	  	imageLayer = new Kinetic.Layer();    
	    stage.add(textLayer);
	    stage.add(buttonLayer);
	    stage.add(rectLayer);
	    stage.add(imageLayer);
	},
	setListeners: function(){
		addButtonListeners(gitButton);
		addButtonListeners(linkButton);
		addButtonListeners(fbButton);
		addRectListeners(codifyRect);
		addRectListeners(mealmapperRect);
		addRectListeners(maasRect);
		addRectListeners(visualizerRect);
		addRectListeners(bayesRect);
	},
	doAnimation: function(){

	},
	draw: function(winWidth, winHeight){
		stage.setWidth(winWidth);
		stage.setHeight(winHeight);
		kineticText.draw(winWidth, Math.min(700, winHeight));
		kineticButtons.draw(winWidth, Math.min(700, winHeight));
	},
};

var kineticText = {
	draw: function(winWidth, winHeight){
		textLayer.removeChildren();
		var width_x = winWidth * constants.name.startx;
		var height_y = winHeight * constants.name.starty;

		var nameTag = new Kinetic.Text({
			x: width_x,
			y: height_y,
			text: constants.name.text,
			fontSize: Math.max(27, constants.name.font.size*winWidth/1440),
			fontFamily: constants.name.font.family,
			fill: constants.name.style,
			textAlign: "center",
			align: 'center',
		});
		var tagline = new Kinetic.Text({
			x: width_x * constants.tagline.startx,
			y: height_y * constants.tagline.starty,
			text: constants.tagline.text,
			fontSize: Math.max(15, constants.tagline.font.size*winWidth/1440),
			fontFamily: constants.name.font.family,
			fill: constants.tagline.style,
			textAlign: "center",
			align: 'center',
		});
		textLayer.add(nameTag);
		textLayer.add(tagline);
		textLayer.draw();
	},
};

newCircle = function(x, y, winWidth, winHeight, image){
	return new Kinetic.Circle({
			x: x,
			y: y,
			radius: Math.sqrt(Math.pow(Math.sqrt(winWidth), 2) + Math.pow(Math.sqrt(winHeight), 2))/1.6,
			stroke: '#444',
			listening: true,
			strokeWidth: 2,
			fill: "#FEECEE",
			fillPatternImage: image,
			opacity: 0.15,
			shadowColor: 'black',
			shadowBlur: 10,
			shadowOffset: [7, 7],
			shadowOpacity: 0.5,
			cornerRadius: 10,
		});
};

newRect = function(x, y, winWidth, winHeight, image){
	return new Kinetic.Rect({
			x: x,
			y: y,
			height: winHeight/3.5,
			width: Math.min(winWidth/3.5, 400),
			stroke: '#444',
			listening: true,
			strokeWidth: 2,
			fillPatternImage: image,
			opacity: 0.90,
			rotationDeg: constants.rect.rotation,
			shadowColor: 'black',
			shadowBlur: 5,
			shadowOffset: [7, 7],
			shadowOpacity: 0.2,
			cornerRadius: 3,
		});
};

newImage = function(x, y, w, h, image, rotation){
	return new Kinetic.Image({
		image: image,
		x: x,
		y: y,
		width: w,
		height: h,
		rotationDeg: typeof rotation !== 'undefined' ? rotation : 0,
	})
}


var bubble, expandedProject;
var project_moused_over = false;


addRectListeners = function(rect){
	//rest of the listeners 
	var winWidth = $(window).innerWidth();
	var winHeight = $(window).innerHeight();
	var text;
	rect.on('mouseover', function(){
		if(!project_moused_over){
			if(expandedProject){
				try{ expandedProject.reset() }
				catch(e){ }
			}
			project_moused_over = true;

			rect.setStroke("#E6B85C");

			expandedProject = new Kinetic.Tween({
				node: rect,
				height: rect.getHeight() * 1.75,
				//width: rect.getWidth(),
				duration: 0.2,
				easing: Kinetic.Easings.Linear,
				strokeWidth: 6,
				opacity: 0.15,
			}).play();

			text = new Kinetic.Text({
				x: rect.getX()+winWidth/35,
				y: rect.getY()+winHeight/25,
				fontSize: Math.min(Math.max(11,
					constants.image_text.font.size*winWidth/1440), 22),
				text: constants.image_text[rect.getAttr("name")].text,
				fontFamily: constants.image_text.font.family,
				fill: "#FFFFFF"
			});

			textLayer.add(text);
			textLayer.draw();

		} else { expandedProject.reverse(); }
	});
	rect.on('mouseout', function(){
		if(project_moused_over){
			project_moused_over = false;
			text.destroy();
			textLayer.draw();
			rect.setStrokeWidth(2);
			rect.setStroke('#444');

			if(expandedProject){
				expandedProject.reverse();
				/*expandedProject = new Kinetic.Tween({
					node: rect,
					duration: 0.3,
					rotationDeg: 10,
					scaleX: 1,
					scaleY: 1,
					easing: Kinetic.Easings.Linear
				}).play();*/
			}
		}
	});
	rect.on('mousedown', function(){
		window.open(rect.getAttr("linkTo"));
	})
}

addButtonListeners = function(button){
	button.on('tap', function(){
		window.open(button.getAttr("linkTo"));
	});
	button.on('mouseover', function(){
		if(button.getStroke() != '#ffc'){
			button.setOpacity("0.1");
			button.setStroke('#dde');
			button.remove();
			buttonLayer.add(button);
			buttonLayer.draw();
			bubble = new Kinetic.Tween({
				node: button,
				duration: 0.15,
				scaleX: 1.5,
				scaleY: 1.5,
				easing: Kinetic.Easings.Linear
			}).play();
		} else { bubble.reverse(); }
	});
	button.on('mouseout', function(){
		if(button.getStroke() != '#444'){
			button.setOpacity("0.15");
			button.setStroke('#444');
			button.remove();
			buttonLayer.add(button);
			buttonLayer.draw();
			if(bubble){
				bubble.reverse();
				/*bubble = new Kinetic.Tween({
					node: button,
					duration: 0.005,
					scaleX: 1,
					scaleY: 1,
					easing: Kinetic.Easings.Linear
				}).play();*/
			}
		}
	});
	button.on('mousedown', function(){
		window.open(button.getAttr("linkTo"));
	})
};


var kineticButtons = {
	draw: function(winWidth, winHeight){
		buttonLayer.removeChildren();
		rectLayer.removeChildren();
		imageLayer.removeChildren();

		//Constants for button positions
		var binterval = 0.11;
		var bstartY = 0.30;
		var bstartX = 0.38;
		//Constants for rectangle positions
		var rstartY = 0.40;
		var rstartX = 0.67;
		var rintervalY = 0.37;
		var rintervalX = -0.31;
		var rcolor = '#dddddd';

		//Create rectangle holders for website projects
		visualizerRect = newRect(winWidth*(rstartX+0.5*rintervalX), winHeight*rstartY,
			winWidth, winHeight, visualizerImg).setAttr("linkTo", constants.urls.visualizer)
			.setAttr("name", "visualizer");		
		codifyRect = newRect(winWidth*(rstartX+1.5*rintervalX), winHeight*rstartY, winWidth, winHeight,
			codifyImg).setAttr("linkTo", constants.urls.codify)
			.setAttr("name", "codify");

		mealmapperRect = newRect(winWidth*(rstartX+1*rintervalX), winHeight*(rstartY+rintervalY),
			winWidth, winHeight, mealmapperImg).setAttr("linkTo", constants.urls.mealmapper)
			.setAttr("name", "mealmapper");
		maasRect = newRect(winWidth*(rstartX+2*rintervalX), winHeight*(rstartY+rintervalY),
			winWidth, winHeight, maasImg).setAttr("linkTo", constants.urls.maas)
			.setAttr("name", "maas");
		bayesRect = newRect(winWidth*(rstartX+0*rintervalX), winHeight*(rstartY+rintervalY),
			winWidth, winHeight, bayesImg).setAttr("linkTo", constants.urls.bayes)
			.setAttr("name", "bayes");			


		//Create buttons
		gitButton = newCircle(winWidth*bstartX, winHeight*bstartY, 
			winWidth, winHeight, gitImg).setAttr("linkTo", constants.urls.github);
		linkButton = newCircle(winWidth*(bstartX+binterval), winHeight*bstartY, 
			winWidth, winHeight, linkImg).setAttr("linkTo", constants.urls.linkedin);
		fbButton = newCircle(winWidth*(bstartX+binterval*2), winHeight*bstartY, 
			winWidth, winHeight, fbImg).setAttr("linkTo", constants.urls.facebook);

		//Create button images
		gitImage = newImage(gitButton.getX()-gitButton.attrs.radius, gitButton.getY()-gitButton.attrs.radius,
			gitButton.getWidth(), gitButton.getHeight(), gitImg);
		linkImage = newImage(linkButton.getX()-linkButton.attrs.radius, linkButton.getY()-linkButton.attrs.radius,
			linkButton.getWidth(), linkButton.getHeight(), linkImg);
		fbImage = newImage(fbButton.getX()-fbButton.attrs.radius, fbButton.getY()-fbButton.attrs.radius,
			fbButton.getWidth(), fbButton.getHeight(), fbImg);

		buttonLayer.add(gitButton);
		buttonLayer.add(fbButton);
		buttonLayer.add(linkButton);
		
		imageLayer.add(gitImage);
		imageLayer.add(linkImage);
		imageLayer.add(fbImage);
		imageLayer.moveToBottom();
		
		rectLayer.add(codifyRect);
		rectLayer.add(mealmapperRect);
		rectLayer.add(maasRect);
		rectLayer.add(visualizerRect);
		rectLayer.add(bayesRect);

		imageLayer.draw();
		buttonLayer.draw();
		rectLayer.draw();
	},
}
