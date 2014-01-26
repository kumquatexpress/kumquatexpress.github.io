var constants = {
	name: {
		text: "Boyang Niu",
		font: {
			size: 44,
			family: "Raleway",
		},
		style: "rgb(0,0,0)",
		startx: 0.41,
		starty: 0.05,
	},
	tagline: {
		text: "I run on the backend.",
		font: {
			size: 25,
			family: "Raleway",
		},
		style: "rgb(0,0,0)",
		startx: 1,
		starty: 2.75,
	},
	image_text: {
		font: {
			size: 25,
			family: "Raleway",
		},
		maas: {
			text: "MAAS\n\nAn open source server\nmanagement tool from\nCanonical. Images, reboots,\nand registers cloud and\nbaremetal servers while\ndisplaying a clean webUI.\nI implemented an extension\nfor custom image use\nat Ooyala, Summer 2013.\nMade using Python/Django."
		},
		codify: {
			text: "Codify\n\nA hackathon project from\nPennApps Fall 2012.\nOffers a collaborative, real-time\nenvironment for designing\nand visualizing object-oriented\nsystems using node.js.\nAlso has some scaffolding\nfunctionality.",
		},
		mealmapper: {
			text: "Mealmapper\n\nDatabases project from\nSpring 2013 using the\nYelp dataset to generate\ninsights based on NLP\nof user reviews.\nThe app integrates with\nGoogle maps APIs to allow\nusers to search restaurant\nratings by specific food names.\nBuilt using RoR, NLTK,\nand Javascript."
		},
		visualizer: {
			text: "Visualizer\n\nA fun side project\nusing the Echo Nest and\nSoundCloud APIs to analyze\nsongs and visualize them\naccording to the pitch\nof each encountered note.",
		},
		bayes: {
			text: "HearTheBayes: Coming Soon\n\nAnother Echo Nest API\nproject, uses a naive\nbayesian prediction system\nto act on analyzed\nnotes of songs in order\nto generate brand new songs\nbased entirely on pitches\nand rhythms."
		}
	},
	urls: {
		github: "http://www.github.com/kumquatexpress",
		linkedin: "http://www.linkedin.com/profile/view?id=159503346",
		facebook: "http://www.facebook.com/boyang.niu",
		codify: "http://codify.herokuapp.com",
		mealmapper: "http://mealmapper.net",
		maas: "http://www.launchpad.net/maas",
		visualizer: "http://www.boyangniu.com/visualizer",
		bayes: "http://www.boyangniu.com/hearmeroar"
	},
	link_to_screenshot: function(url){
		return "http://s.wordpress.com/mshots/v1/http%3A%2F%2F"+url+"%2F?w=480"
	},
	rect: {
		rotation: 0,
	},
};