var images = {
  'layout': 'images/card_layout.png',
  'icons': 'images/card_icons.png',
  'bandoche': ['images/bandoche.jpg','images/bandoche1.jpg','images/bandoche2.jpg','images/bandoche3.jpg']
}

function getImage(arg, cb) {
    if( typeof arg === 'string') arg = [arg];
    for(var i=0;i<arg.length;i++){
      var uri = arg[i];
      (function(){
      var img = new Image();
      img.src = uri;
      img.addEventListener('load', function () {
        cb(img);
      });
      })();
    }
}

function Card(container) {
  var prs = [];
  var num = 2 + images.bandoche.length;
  this.loaded = false;
  this.canvas = document.createElement('canvas');
  this.canvas.width = 420;
  this.canvas.height = 609;
  this.container = container;
  this.container.appendChild(this.canvas);
  this.title = '단결정 규소';
  this.subtitle = '광물사족/효과';
  this.description = '이 카드를 패에 가지고 있으면 기분이 이상하게 좋아집니다.';
  this.bandoche = [];
  var that = this;
  getImage(images.layout, function (img) { 
    that.layout = img;
    num--;
    if (num <= 0) that.loaded = true;
  });
  getImage(images.icons, function (img) { 
    that.icons = img;
    num--;
    if (num <= 0) that.loaded = true;
  });
  getImage(images.bandoche, function (img) { 
    that.bandoche.push(img);
    num--;
    if (num <= 0) that.loaded = true;
  });
}

Card.prototype = {
  render:function() {
    if (!this.loaded) {
      setTimeout(this.render.bind(this), 500);
      return;
    }
    var ctx = this.canvas.getContext('2d');
    ctx.drawImage(this.bandoche[ Math.floor(Math.random() * this.bandoche.length) ], 40, 110, 340, 340);
    ctx.drawImage(this.layout, 0, 0);

    // draw title 40,35
    ctx.save();
    ctx.font = 'bold 27px serif';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.fillText(this.title, 40, 35);
    ctx.restore();

    // draw type icon 340 40
    var type = Math.floor(Math.random()*6);
    ctx.save();
    ctx.drawImage(this.icons, type * 192 + 30, 41, 192, 192, 340, 25, 50, 50);
    ctx.restore();

    // draw subtitle 42 465
    ctx.save();
    ctx.font = 'bold 16px serif';
    ctx.fillText('[' + this.subtitle + ']', 42, 475);
    ctx.restore();

    // draw desc 46, 490 / w330,h50
    ctx.save();
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.font = '14px serif';
    var w = 0, cW = 0, line = 0;
    for (var ch = 0; ch < this.description.length; ch++) {
      cW = ctx.measureText(this.description[ch]).width;
      if (cW + w > 330) {
        w = 0;
        line++;
      }
      ctx.fillText(this.description[ch], 45 + w, 490 + (line * 16));
      w += cW;
    }
    ctx.restore();

    // draw atk 260 555, def 343, 555
    var atk = Math.floor(Math.random() * 9999), def = Math.floor(Math.random() * 9999);
    ctx.save();
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'black';
    ctx.font = 'bold 14px serif';
    ctx.fillText(atk, 260, 555);
    ctx.fillText(def, 344, 555);
    ctx.restore();
  }
}
