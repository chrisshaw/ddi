var SVGJQ = function (){
  var $sprite = null;

  function setUpSvgs (){
    console.log("Setting up SVG files...");
    if($sprite === null){
      console.log("Sprite not loaded. Loading sprite...");
      $.get("svg/stack/sprite.svg").done(function(data){
          $sprite = $(data);
          loadSvgs();
        }
      );
    } else {
      console.log("Sprite already loaded...");
      loadSvgs();
    }
    //$(".svg-work").click(animateSvg);
  }
  
  function loadSvgs (){
    $(".svg-placeholder").each(function(){
      var $this = $(this);
      var id = $this.data("svgId");
      console.log("Appending " + id);
      var $svg = $sprite.find("svg #" + id);
      console.log("Found svg:");
      console.log($svg.documentElement);
      $this.append($svg.clone()).removeClass("svg-placeholder").addClass("svg-container");
    });
  }  
  
  /************/  
  /*ANIMATIONS*/
  /************/
  
  function animateSvg (){
    var $this = $(this);
    var aniSeq = [];
    console.log("Working");
    var $svg = $this.children('svg');
    console.log("This is the " + $svg.attr("id") + " svg.");
    
    if($this.hasClass('svg-work')){
      aniSeq = fillSequence($svg, aniSeq, "work");
      //animateRocket($svg);
    }
    
    fillSequence($svg, aniSeq, $svg.attr("id"));
    $.Velocity.RunSequence(aniSeq);
    
  }
  
  function fillSequence($svg, arrSequence, animation){
    console.log("Filling sequence...");
    var config = {
      "work": {
        ".circle": {
          p: "transition.cover",
          o: {duration: 1500, sequenceQueue: false}
        },
        ".shadow": {
          p:"transition.fadeOut",
          o:{duration: 250, sequenceQueue: false}
        }
      },
      "advance-rocket": {
        "#trajectory": {
          p: "blastOff",
          o: {duration:1500, sequenceQueue: false}
        },
        "#rocket": {
          p: "engineShake",
          o: {duration: 1000, sequenceQueue: false}
        },
        "#flames": {
          p: "blowFire",
          o: {duration: 1500, sequenceQueue: false}
        }
      },
      "web-mobile": {
        "#glare": {
          p:"transition.fadeOut",
          o:{duration: 250, sequenceQueue: false}
        },        
        ".colors":{
          p: "cycleColor",
          o: {duration: 900, stagger: 100, sequenceQueue: false}
        },
        "#phone": {
          p: "spinZoom",
          o: {duration:1150, sequenceQueue: false, delay: 350}
        }
      },
      "enhance-speedometer": {
        "#speedometer": {
          p: "vroomOut",
          o: {duration:1500, sequenceQueue: false}
        },
        "#needle": {
          p: "revUp",
          o: {duration: 1500, sequenceQueue: false}
        },
        "#meter": {
          p: "flashRed",
          o: {duration: 500, sequenceQueue: false, delay: 500}
        }
      }
    };

    var aniSttgs = config[animation];
    
    for(var shape in aniSttgs){
      console.log("Now for the " + shape + "...");
      console.log(aniSttgs[shape]);
      var shp = aniSttgs[shape];
      var $shape = $svg.find(shape);
      
      arrSequence.push({e: $shape, p: shp["p"], o: shp["o"]});
    }

    console.log("Here's the sequence.");
    console.log(arrSequence);
    return arrSequence;
  }
  
  /*Figure out some variables*/
  var vpDims = {};
  vpDims.vpHeight = 0;
  vpDims.vpWidth = 0;
  vpDims.hToEms = 0;
  vpDims.wToEms = 0;
  
  /*Animate circles*/
  $.Velocity.RegisterEffect("transition.cover", {
    calls: [
      [{scale: 1.25}, .35],
      [{scale: 1}, .15],
      [{scale: 20}, .50]
    ]
  });  
  
  /*Animate Rocket*/
  $.Velocity.RegisterEffect("blastOff", {
    calls:[
      [{translateY:-3000}, 1, {easing: "easeInQuint"}],
    ]
  });
  
  $.Velocity.RegisterEffect("engineShake", {
    calls: [
      [{translateX: -4}, .05],
      [{translateX: 4}, .05],
      [{translateX: -4}, .05],
      [{translateX: 4,  translateY:4}, .05],
      [{translateX:-4,  translateY:-2}, .05],
      [{translateX:4,   translateY:0}, .05],
      [{translateX:-4,  translateY:3}, .05],
      [{translateX:4,   translateY:0}, .05],
      [{translateX:-4,  translateY:2}, .05],
      [{translateX:0,   translateY:0}, .05],
      [{translateX:-4,  translateY:2}, .05],
      [{translateX: 4,  translateY:4}, .05],
      [{translateX:-4,  translateY:-2}, .05],
      [{translateX:4,   translateY:0}, .05],
      [{translateX:-4,  translateY:3}, .05],
      [{translateX:4,   translateY:0}, .05],
      [{translateX:-4,  translateY:2}, .05],
      [{translateX:0,   translateY:0}, .05],
      [{translateX:-4,  translateY:2}, .05],      
      [{translateX:0,   translateY:0}, .05]     
    ]
  });
  
  $.Velocity.RegisterEffect("blowFire", {
    calls: [
      [{opacity: 1, scaleY:1.2}, .125],
      [{scaleY:1}, .125],
      [{scaleY:1.2}, .125],
      [{scaleY:1}, .125],
      [{scaleY:1.2}, .125],
      [{scaleY:1}, .125],
      [{scaleY:1.2}, .125],
      [{scaleY:1}, .125]
    ]
  });
  
  /*Animate Mobile*/
  
  $.Velocity.RegisterEffect("spinZoom", {
    calls: [
      [{rotateZ: -5}, .1],
      [{rotateZ: 5}, .1],
      [{rotateZ: -5}, .1],
      [{rotateZ: 5}, .1],      
      [{rotateZ: -10}, .15],
      [{rotateZ: 200, scale: 22}, .6]
    ]
  });
  
  $.Velocity.RegisterEffect("cycleColor", {
    calls: [
      [{fill: "#bdccd4"}, 1/3],
      [{fill: "#ff8080"}, 1/3],
      [{fill: "#ffe271"}, 1/3]
    ]
  });
  
  /*Animate Speedometer*/
  $.Velocity.RegisterEffect("revUp", {
    calls: [
      [{rotateZ: -15}, 1/9],
      [{rotateZ: -17}, 1/9],
      [{rotateZ: 170}, 2/9],
      [{rotateZ: 150}, 1/9],
      [{rotateZ: 155}, 1/18],
      [{rotateZ: 150}, 1/18],
      [{rotateZ: 160}, 1/18],
      [{rotateZ: 150}, 1/18],
      [{rotateZ: 160}, 1/18],
      [{rotateZ: 150}, 1/18],
      [{rotateZ: 160}, 1/18],
      [{rotateZ: 150}, 1/18]      
    ]
  });
  
  $.Velocity.RegisterEffect("vroomOut", {
    calls: [
      [{scale:1.2}, 1/3],
      [{scale: 1}, 2/9],
      [{scale: 1.05}, 2/9],
      [{scale: 0}, 2/9, {easing: "none"}]
    ]
  });
  
  $.Velocity.RegisterEffect("flashRed", {
    calls: [
      [{fill:"#ff1d25"}, 1]
    ]
  });  
  
  return {
    setUpSvgs: setUpSvgs
  };

    //       var svgBox = $svg[0].viewBox.baseVal;
    //       var vbRatio = (100 * svgBox.height / svgBox.width);
    //       $this.css("padding-bottom", vbRatio + "%");

}();