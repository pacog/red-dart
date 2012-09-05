// Parallax module
var ParallaxModule = (function() {

    //Multiplier for the X coordinate to be applied in each parallax layer depending on the body class
    var bodyClassesX = {
        "home": 0,
        "story": -1,
        "about": -3,
        "blog": -2
    };


    var parallaxLayers = [{
        "selector": ".parallax-bg-1",
        "initialY": 0,
        "finalY": 0,
        "xStep": 2
    }, {
        "selector": ".parallax-bg-2",
        "initialY": 30,
        "finalY": 25,
        "xStep": 4
    }, {
        "selector": ".parallax-bg-3",
        "initialY": 34,
        "finalY": 0,
        "xStep": 6
    }, {
        "selector": ".parallax-bg-4",
        "initialY": 44,
        "finalY": 10,
        "xStep": 8
    }, {
        "selector": ".parallax-bg-ufo",
        "initialY": 10,
        "finalY": 0,
        "xStep": 5
    }];
    
    var parallaxObjects = [];
    var mainContainer = $(".page-content");
    var mainContainerInner = $(".page-content-inner");

    var init = function() {

        createObjects();
        createScrollListener();
        updateLayers();

    };

    var getScrollRatio = function () {
        var s = mainContainer.scrollTop(),
            d = mainContainerInner.height(),
            c = mainContainer.height();
        var scrollPercent = (s / (d-c));
        return scrollPercent;
    };

    var updateLayers = function() {

        var scrollRatio = getScrollRatio();
        var menuXMultiplier = getMenuMultiplier();
        for (var i=0; i<parallaxObjects.length; i++) {
            var newY = parallaxObjects[i].config.initialY + (parallaxObjects[i].config.finalY - parallaxObjects[i].config.initialY)*scrollRatio;
            var newX = parallaxObjects[i].config.xStep*menuXMultiplier;
            parallaxObjects[i].element.css('transform', 'translate(' + newX + '%, ' + newY + '%)');
        }
    };
    
    var getMenuMultiplier = function () {
        var body = $("body");
        for (className in bodyClassesX) {
            if(body.hasClass(className)) {
                return bodyClassesX[className];
            }
        }
        return 0;
    }
    
    var createScrollListener = function() {
        mainContainer.scroll(updateLayers);
        //$(window).resize(updateLayers);
    };
    
    var createObjects = function () {

        for (var i=0; i<parallaxLayers.length; i++) {
            var newParallaxObject = {
                "element": $(parallaxLayers[i].selector),
                "config": parallaxLayers[i]
            };
            parallaxObjects.push(newParallaxObject);
        }
    };
    
    return {
        init : init,
        updateLayers: updateLayers
    };

})(); 

var actualSection = "home";

var init = function() {

    assignMenuHandlers();
    ParallaxModule.init();
    //getRssFeed();
};

var getRssFeed = function(){
    //TODO
    $('#feed-container').FeedEk({
        FeedUrl : 'http://rss.cnn.com/rss/edition.rss',
        MaxCount : 5,
        ShowDesc : true,
        ShowPubDate:true
    });
};

var assignMenuHandlers = function() {

    $(".js-menu").on("click", menuClicked);
};

var menuClicked = function(event) {

    var originalElement = event.srcElement || event.target;
    var srcElement = $(originalElement).closest(".js-menu-link");
    if (srcElement && (srcElement.length === 1)) {
        var newSection = srcElement.data("target-section");
        if (newSection) {
            $("body").removeClass(actualSection).addClass(newSection);
            actualSection = newSection;
            ParallaxModule.updateLayers();
        }
    }
};



// Initializing when dom is ready
$(document).ready(init);
