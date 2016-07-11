var gui, colorStart, tinyRgb;

var randomColor = function () {
  var rgbTmp = {};
  rgbTmp.r = Math.floor(Math.random() * (255 + 1));
  rgbTmp.g = Math.floor(Math.random() * (255 + 1));
  rgbTmp.b = Math.floor(Math.random() * (255 + 1));
  var tmpColor = tinycolor(rgbTmp);
  return tmpColor;
}

var Character = function() {
  this.name = 'Remka';
  this.isZoomedOut = false;
  this.isSpeaking = false;
  this.colorSeed = '#db6f44';
  this.colorObj = {};
  this.colorSeedR = 0;
  this.colorSeedG = 0;
  this.colorSeedB = 0;
  //console.log(this.colorObj);
  this.initColors();
};

Character.prototype.generatePaletteObj = function(hex){

  var newColor = tinycolor(hex);
  var newSlightlyDark = tinycolor(hex).darken();
  var newGentleLight = tinycolor(hex).lighten();
  var newLighterLight = tinycolor(hex).lighten().lighten().lighten();
  var newVeryLight = tinycolor(hex).spin(180).lighten().lighten().lighten().lighten().lighten();
  var newDarkestColor = tinycolor(hex).darken().darken().darken();
  var newContrasty = tinycolor(hex).spin(180);
  var newFloor = tinycolor(hex).spin(180).darken();
  var newSlightlySaturated = tinycolor(hex).saturate().saturate().saturate().saturate().darken();
  var newFloorShadow = tinycolor(hex).spin(180).darken().darken();

  if (newColor.isDark() && newContrasty.isDark()) {
    //console.log('lighten contrasty');
    newContrasty.lighten().lighten().lighten().lighten().lighten();
    newFloor.lighten().lighten().lighten().lighten().lighten();
  } else if (newColor.isLight() && newContrasty.isLight()) {
    //console.log('darken contrasty');
    newContrasty.darken().darken().darken().darken().darken();
    newFloor.darken().darken().darken().darken().darken();
  }

  this.colorObj.startColor = newColor;
  this.colorObj.slightlyDark = newSlightlyDark;
  this.colorObj.gentleLight = newGentleLight;
  this.colorObj.lighterLight = newLighterLight;
  this.colorObj.veryLight = newVeryLight;
  this.colorObj.darkestColor = newDarkestColor;
  this.colorObj.contrasty = newContrasty;
  this.colorObj.slightlySaturated = newSlightlySaturated;
  this.colorObj.floor = newFloor;
  this.colorObj.floorShadow = newFloorShadow;

  this.colorStart = hex;

  this.applyPaletteObj();

};

Character.prototype.applyPaletteObj = function(){

  var startColorHex = this.colorObj.startColor.toHex();
  var slightlyDarkHex = this.colorObj.slightlyDark.toHex();
  var gentleLightHex = this.colorObj.gentleLight.toHex();
  var veryLightHex = this.colorObj.veryLight.toHex();
  var darkestColorHex = this.colorObj.darkestColor.toHex();
  var newContrastyHex = this.colorObj.contrasty.toHex();
  var newLighterLightHex = this.colorObj.lighterLight.toHex();
  var slightlySaturatedHex = this.colorObj.slightlySaturated.toHex();
  var floorHex = this.colorObj.floor.toHex();
  var floorShadowHex = this.colorObj.floorShadow.toHex();

  if(this.colorObj.startColor.isLight()) {
    $('.colorId').css('color', '#111');
  } else if(this.colorObj.startColor.isDark()) {
    $('.colorId').css('color', '#fff');
  } else {
    $('.colorId').css('color', '#111');
  }

  $('.startColor').attr('fill', '#' + startColorHex);
  $('.gentleLight').attr('fill', '#' + gentleLightHex);
  $('.darkestColor').attr('fill', '#' + darkestColorHex);
  $('.darkestColor').attr('path', '#' + darkestColorHex);
  $('.veryLight').attr('fill', '#' + veryLightHex);
  $('.lighterLight').attr('fill', '#' + newLighterLightHex);
  $('.slightlySaturated').attr('fill', '#' + slightlySaturatedHex);
  $('.strokeDarkest').attr('stroke', '#' + darkestColorHex);
  $('.floorShadow').attr('fill', '#' + floorShadowHex);
  $('.slightlyDark').attr('fill', '#' + slightlyDarkHex);

  $('.darkestColor').css('background-color', '#' + newContrastyHex);
  $('.floor').css('background-color', '#' + floorHex);
  $('.colorId').css('background-color', '#' + startColorHex);

  $('.textBgColor').css('background-color', '#' + darkestColorHex);
  $('.textBgColor').css('color', '#' + veryLightHex);

  $('.colorId').html('#' + startColorHex);

  //colorStart
  var colHex = '#' + startColorHex;
  this.colorSeed = colHex;


  // TODO : proper rgb
  var tmpRgbObj = tinycolor(colHex).toRgb();
  //console.log(tmpRgbObj);
  var tmpREd = Number(tmpRgbObj.r);
  //console.log('RED: ' + tmpREd);
  this.colorSeedR = tmpREd;
  this.colorSeedG = 130;
  this.colorSeedB = 20;
  //console.log();


  //console.log('#' + startColorHex);

};

Character.prototype.initColors = function(){
  this.generatePaletteObj(this.colorStart);
};

Character.prototype.toggleZoom = function() {
  //console.log('Toggle zoom');
  if(this.isZoomedOut) {
    //this.isZoomedOut = true;
    $('body').toggleClass('isZoomedOut');
  } else {
    //this.isZoomedOut = false;
    $('body').toggleClass('isZoomedOut');
  }
  //console.log(this.isZoomedOut);
};

Character.prototype.toggleSpeaking = function() {
  if(this.isSpeaking) {
    this.isSpeaking = true;
    $('body').toggleClass('isSpeaking');
  } else {
    this.isSpeaking = false;
    $('body').toggleClass('isSpeaking');
  }
  //console.log(this.isSpeaking);
};

Character.prototype.saySomething = function(something){
  console.log('Say: ' + something);
};


var character = new Character();

var reverseHsl = function(tinyColorObj) {
  var currHsl = tinyColorObj.toHsl();
  var newObjHsl = {};
  newObjHsl.h = Math.abs(currHsl.h - 180);
  newObjHsl.s = Math.abs(currHsl.s - 100);
  newObjHsl.l = Math.abs(currHsl.l - 100);
  return tinycolor(newObjHsl);
}



var obj = { randomColor: function(){
  var newColor = randomColor();
  character.generatePaletteObj(newColor.toHex());
  // console.log(newColor);
}};

var reverseHsl = function (hsl) {
  var tmpColor = tinycolor(hsl);
  var newHsl = {};
  hsl.h = Math.abs(Math.floor(hsl.h) - 180);
  hsl.s = Math.abs((Math.floor(hsl.s*100)) - 100);
  hsl.l = Math.abs((Math.floor(hsl.l*100)) - 100);
  newHsl.h = hsl.h;
  newHsl.s = hsl.s;
  newHsl.l = hsl.l;
  var tmpNewColor = tinycolor(newHsl);
  /*
  if (tmpColor.isDark() && tmpNewColor.isDark()) {
    tmpNewColor = tmpNewColor.lighten();
  } else if (tmpColor.isLight() && tmpNewColor.isLight()) {
    tmpNewColor = tmpNewColor.darken();
  }
  */
  tmpNewColor.toHsl();
  return tmpNewColor;
}

var initiGui = function() {

  gui = new dat.GUI();
  gui.add(obj,'randomColor');
  var isZoomed = gui.add(character, 'isZoomedOut').listen();
  var isSpeaking = gui.add(character, 'isSpeaking').listen();

  //gui.add(character, 'name');

  colorSeed = gui.addColor(character, 'colorSeed').listen();

  var f2 = gui.addFolder('RGB');

  f2.add(character, 'colorSeedR', 0, 255); // Min and max
  f2.add(character, 'colorSeedG', 0, 255); // Min and max
  f2.add(character, 'colorSeedB', 0, 255); // Min and max

  colorSeed.onChange(function(value) {
    character.generatePaletteObj(value);
  });

  isZoomed.onChange(function(value) {
    character.toggleZoom();
  })

  isSpeaking.onChange(function(value) {
    character.toggleSpeaking();
  });;

  colorSeed.onChange(function(value) {
    character.generatePaletteObj(value);
  });

}

$(function() {

  initiGui();

  var divWidth = $('.head').width();
  console.log(divWidth);
  $('.eyes').height(divWidth);

  $(window).resize(function(){
    divWidth = $('.head').width();
    console.log(divWidth);
    $('.eyes').height(divWidth);
  });

  $('.ui_randomColor a').click(function(e) {
    //console.log('CLICK');
    var newColor = randomColor();
    character.generatePaletteObj(newColor.toHex());
    e.preventDefault();
  });

});
