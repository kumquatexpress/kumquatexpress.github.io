var stage;
var buttonLayer, textLayer, rectLayer, imageLayer;

var gitButton, linkButton, fbButton;

var codifyRect, mealmapperRect, maasRect;
var codifyImg, mealmapperImg, maasImg;
var codifyGroup, mealmapperGroup, maasGroup;

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
	        height: winHeight
	    });
	    
	    //define the image sources
	    gitImg = new Image();
	    linkImg = new Image();
	    fbImg = new Image();
	    codifyImg = new Image();
	    mealmapperImg = new Image();
	    maasImg = new Image();

	    //create the rectangle groups
	    codifyGroup = new Kinetic.Group();
	    mealmapperGroup = new Kinetic.Group();
	    maasGroup = new Kinetic.Group();
	    
	    gitImg.src = ("images/octocat.png");
	    linkImg.src = ("images/linkedinlogo.png")
	    fbImg.src = ("images/facebooklogo.png")	  
	    codifyImg.src = (constants.link_to_screenshot("codify.herokuapp.com"))
	    mealmapperImg.src = (constants.link_to_screenshot("mealmapper.net"))
		maasImg.src = (constants.link_to_screenshot("code.launchpad.net/maas"))
	    
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
		addRectListeners(codifyGroup);
		addRectListeners(mealmapperGroup);
		addRectListeners(maasGroup);
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
		textLayer.removeChildren()
		var nameTag = new Kinetic.Text({
			x: winWidth * 0.41,
			y: winHeight * 0.08,
			text: constants.name.text,
			fontSize: Math.max(20, constants.name.font.size*winWidth/1440),
			fontFamily: constants.name.font.family,
			fill: constants.name.style,
			align: 'center',
		});
		textLayer.add(nameTag);
		textLayer.draw();
	},
};

newCircle = function(x, y, winWidth, winHeight, color){
	return new Kinetic.Circle({
			x: x,
			y: y,
			radius: Math.sqrt(Math.pow(Math.sqrt(winWidth), 2) + Math.pow(Math.sqrt(winHeight), 2))/1.8,
			stroke: '#444',
			listening: true,
			strokeWidth: 1,
			fill: color,
			opacity: 0.3,
			shadowColor: 'black',
			shadowBlur: 10,
			shadowOffset: [7, 7],
			shadowOpacity: 0.5,
			cornerRadius: 10,
		});
};

newRect = function(x, y, winWidth, winHeight, color){
	return new Kinetic.Rect({
			x: x,
			y: y,
			height: winHeight/3.5,
			width: winWidth/3.5,
			stroke: '#444',
			listening: true,
			strokeWidth: 2,
			fill: color,
			opacity: 0.5,
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
	var outline = rect.get('Rect')[0]; 
	var image = rect.get('Image')[0];
	//mobile only here
	rect.on('tap', function(){
		if(!project_moused_over){
			project_moused_over = true;

			outline.setOpacity("0");
			image.setStrokeWidth(3);
			image.setStroke(randomColor());

			//refresh the rectangle layer
			rect.remove();
			rectLayer.add(rect);
			rectLayer.draw();
			expandedProject = new Kinetic.Tween({
				node: rect,
				x: rect.getX()/2,
				duration: 0.3,
				scaleX: 1.25 * 1.5,
				scaleY: 1.5,
				rotationDeg: 0,
				easing: Kinetic.Easings.Linear,
			}).play();
		} else {
			project_moused_over = false;
			outline.setOpacity("0.3");
			outline.setStroke('#444');
			
			//refresh the rectangle layer
			rect.remove();
			rectLayer.add(rect);
			rectLayer.draw();
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

	//rest of the listeners 
	rect.on('mouseover', function(){
		if(!project_moused_over){
			if(expandedProject){
				try{ expandedProject.reset() }
				catch(e){ }
			}
			project_moused_over = true;
			outline.setOpacity("0");
			image.setStrokeWidth(3);
			image.setStroke(randomColor());

			//refresh the drawing
			rect.remove();
			rectLayer.add(rect);
			rectLayer.draw();
			expandedProject = new Kinetic.Tween({
				node: rect,
				x: -window.innerWidth/1.5,
				y: -window.innerHeight/4,
				duration: 0.3,
				scaleX: 1.5*1.25,
				scaleY: 2,
				rotationDeg: -10.5,
				easing: Kinetic.Easings.Linear,
			}).play();
		} else { expandedProject.reverse(); }
	});
	rect.on('mouseout', function(){
		if(project_moused_over){
			project_moused_over = false;
			outline.setOpacity("0.5");
			image.setStroke('#444');

			//refresh the drawing
			rect.remove();
			rectLayer.add(rect);
			rectLayer.draw();
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
		window.open(outline.getAttr("linkTo"));
	})
}

addButtonListeners = function(button){
	button.on('tap', function(){
		window.open(button.getAttr("linkTo"));
	});
	button.on('mouseover', function(){
		if(button.getStroke() != '#ffc'){
			button.setOpacity("0.55");
			button.setStroke('#dde');
			button.remove();
			buttonLayer.add(button);
			buttonLayer.draw();
			bubble = new Kinetic.Tween({
				node: button,
				duration: 0.01,
				scaleX: 1.4,
				scaleY: 1.4,
				easing: Kinetic.Easings.EaseIn
			}).play();
		} else { bubble.reverse(); }
	});
	button.on('mouseout', function(){
		if(button.getStroke() != '#444'){
			button.setOpacity("0.45");
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
		var bstartY = 0.25;
		var bstartX = 0.38;
		//Constants for rectangle positions
		var rstartY = 0.40;
		var rstartX = 0.45;
		var rintervalY = 0.06;
		var rintervalX = -0.04;
		var rcolor = '#dddddd';

		//Create rectangle holders for website projects
		codifyRect = newRect(winWidth*rstartX, winHeight*rstartY, winWidth, winHeight,
			rcolor).setAttr("linkTo", constants.urls.codify);
		mealmapperRect = newRect(winWidth*(rstartX+rintervalX), winHeight*(rstartY+rintervalY),
			winWidth, winHeight, rcolor).setAttr("linkTo", constants.urls.mealmapper);
		maasRect = newRect(winWidth*(rstartX+2*rintervalX), winHeight*(rstartY+2*rintervalY),
			winWidth, winHeight, rcolor).setAttr("linkTo", constants.urls.maas);

		//Create website images
		codifyImage = newImage(codifyRect.getX(), codifyRect.getY(),
			codifyRect.getWidth(), codifyRect.getHeight(), codifyImg, constants.rect.rotation);
		mealmapperImage = newImage(mealmapperRect.getX(), mealmapperRect.getY(),
			mealmapperRect.getWidth(), mealmapperRect.getHeight(), mealmapperImg, constants.rect.rotation);
		maasImage = newImage(maasRect.getX(), maasRect.getY(),
			maasRect.getWidth(), maasRect.getHeight(), maasImg, constants.rect.rotation);

		//Group the rect images with the rect outlines
		codifyGroup = new Kinetic.Group();
		mealmapperGroup = new Kinetic.Group();
		maasGroup = new Kinetic.Group();

		codifyGroup.add(codifyImage);
		codifyGroup.add(codifyRect);

		mealmapperGroup.add(mealmapperImage);
		mealmapperGroup.add(mealmapperRect);
		
		maasGroup.add(maasImage);
		maasGroup.add(maasRect);

		//Create buttons
		gitButton = newCircle(winWidth*bstartX, winHeight*bstartY, 
			winWidth, winHeight, '#f9f7ee').setAttr("linkTo", constants.urls.github);
		linkButton = newCircle(winWidth*(bstartX+binterval), winHeight*bstartY, 
			winWidth, winHeight, '#318fd6').setAttr("linkTo", constants.urls.linkedin);
		fbButton = newCircle(winWidth*(bstartX+binterval*2), winHeight*bstartY, 
			winWidth, winHeight, '#5c61ee').setAttr("linkTo", constants.urls.facebook);

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
		
		rectLayer.add(codifyGroup);
		rectLayer.add(mealmapperGroup);
		rectLayer.add(maasGroup);
		//kineticGlobal.setListeners();
		imageLayer.draw();
		buttonLayer.draw();
		rectLayer.draw();
	},
}
