function getClock() {
  var clock = localStorage.getItem('clock');
  if ( !clock ) {
    clock = {
      id: 1,
      posy: 0,
      posx: 0,
      visible: true,
    };
    var clockStr = JSON.stringify(clock);
    localStorage.setItem('clock', clockStr);
  } else {
    clock = JSON.parse(clock);
  }
  clock.time = Date.now();
  clock.toggle = function() {
    this.visible = !this.visible;
    var c = localStorage.getItem('clock');
    c = JSON.parse(c);
    c.visible = !c.visible;
    c = JSON.stringify(c);
    localStorage.setItem('clock', c);
  };
  clock.update = update;
  clock.update();
  return clock;
};

const deg = 6; 
function update() {
  let day = new Date();
  let hh = day.getHours() * 30;
  let mm = day.getMinutes() * deg;
  let ss = day.getSeconds() * deg;
  let msec = day.getMilliseconds();
  
  this.hr = (hh) + (mm / 12);
  this.mm = mm;
  this.ss = ss;
}

function setClockPos(id, pos) {
  var c = localStorage.getItem('clock');
  c = JSON.parse(c);
  c.posy = pos.y;
  c.posx = pos.x;
  c = JSON.stringify(c);
  localStorage.setItem('clock', c);
};
