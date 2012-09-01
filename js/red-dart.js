// Parallax module
var ParallaxModule = (function() {


    var parallaxLayers = [{
        "selector": ".parallax-bg-1",
        "initialY": 0,
        "finalY": 0
    }, {
        "selector": ".parallax-bg-2",
        "initialY": 30,
        "finalY": 25
    }, {
        "selector": ".parallax-bg-3",
        "initialY": 34,
        "finalY": 0
    }, {
        "selector": ".parallax-bg-4",
        "initialY": 44,
        "finalY": 10
    }, {
        "selector": ".parallax-bg-ufo",
        "initialY": 10,
        "finalY": 0
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
        for (var i=0; i<parallaxObjects.length; i++) {
            // Rotate div
            var newY = parallaxObjects[i].config.initialY + (parallaxObjects[i].config.finalY - parallaxObjects[i].config.initialY)*scrollRatio;
            parallaxObjects[i].element.css('transform', 'translate(0, ' + newY + '%)');
        }
    };
    
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
        init : init
    };

})(); 







var actualSection = "home";

var init = function() {

    assignMenuHandlers();
    ParallaxModule.init();
};

var assignMenuHandlers = function() {

    $(".js-menu").on("click", menuClicked);
};

var menuClicked = function(event) {

    var srcElement = $(event.srcElement).closest(".js-menu-link");
    if (srcElement && (srcElement.length === 1)) {
        var newSection = srcElement.data("target-section");
        if (newSection) {
            $("body").removeClass(actualSection).addClass(newSection);
            actualSection = newSection;
        }
    }
};



// Initializing when dom is ready
$(document).ready(init);
