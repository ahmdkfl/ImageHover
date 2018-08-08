var tags = [], imageAddress, img, tagType, getting, overlay;
//extension options' variables
var delay = 1000,
    maxWidth = 98,
    maxHeight = 98;

//load the settings
getting = browser.storage.local.get(["imgZoom", "bgImgZoom", "delay", "maxWidth", "maxHeight"]);
getting.then(onGot, onError);

//create the overlay for the image
overlay = document.createElement("div");
overlay.setAttribute("id", "overlay");

//create the tag where the image is stored
img = document.createElement("img");

$(document).ready(function(){
    detectMovements();
});

function detectMovements(){
    //each mouse events if attached to the tag <body>, used when
    $("body").on("mousemove", moveImage);
    $("body").on("mouseenter", tags.toString(), setupImage);  
    $("body").on("mouseleave", tags.toString(), removeOverlay);
}

function setupImage(){
    // 'this' is the img or div element under the cursor
    tagType = this.nodeName;
    genericWebsite(this);
    if(img.complete){
        resizeImage();
        appendImgTitle(overlay);
    }
}

function moveImage(event){
    if($(overlay).html().length == 0)
        $(overlay).hide();
    else
        positionOverlay(event.pageX, event.pageY);
}

function positionOverlay(ex, ey){
    var left = 0, 
        top = 0,
        x = ex-$(window).scrollLeft(),
        y = ey-$(window).scrollTop(),
        w = $(overlay).width(),
        h = $(overlay).height(),
        wX = window.innerWidth-30,
        wY = window.innerHeight-15;
    //calculate the left position of the image
    if( x + w > wX && x - w > 0)
        left = x - w;
    else if( x + w <= wX  )
            left = x;
    else
        left = (wX-w)/2;
    //calculate the top position of the image
    if( y + h > wY && y - h > 0)
        top = y - h;
    else if( y + h <= wY  )
            top = y;
    else
        top = (wY-h)/2;
    //position overlay where the cursor is
    $(overlay).css({
        left: left,
        top: top
    });
}

function resizeImage(){
    img.style.maxWidth = maxWidth+"vw";
    img.style.maxHeight = maxHeight+"vh";
}

function removeOverlay() {
    img = new Image();
    imageAddress = "";
    $(overlay).hide();
    $(overlay).empty();
}

function appendImgTitle(element){
    $(element).empty();
    $(element).append(img);
}

function genericWebsite(element){
    if(tagType =="DIV"){
        // get background-image attribute of the div
        var style = element.currentStyle || window.getComputedStyle(element, false),
        imageAddress = style.backgroundImage.slice(4, -1).replace(/"/g, "");
    } else if(tagType == "IMG"){
        imageAddress = $(element).attr("src");
    }
    if(typeof imageAddress !== "undefined" && imageAddress !== ""){
        //function called after the image is loaded
        img.onload = function(){
            $("body").append(overlay);
            $(overlay).delay(delay).fadeIn();
        };    
        img.src = imageAddress;
    } else
        $(overlay).hide(); // if there is not image address, hide the overlay
}

function onError(error) {
    console.log(`Error: ${error}`);
}

function onGot(item) {
    //retrieve the extension's settings if saved, if not saved apply the default one
    tags = [];
    if(item.imgZoom)
        tags.push("img");
    else
        tags.push("img");
    if(item.bgImgZoom)
        tags.push("div");
    else
        tags.push("div");
    if(item.delay)
        delay = parseInt(item.delay);
    if(item.maxWidth)
        maxWidth = parseInt(item.maxWidth);
    if(item.maxHeight)
        maxHeight = parseInt(item.maxHeight);
}