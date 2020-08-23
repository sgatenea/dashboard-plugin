function loadStickies() {
  var sts = localStorage.getItem('stickies');
  if ( !sts ) {
    return [];
  }
  sts = JSON.parse(sts);
  for ( var i = 0; i < sts.length; i++ ) {
    sts[i].save = function() {
      updateStickies(this);
    };
  }
  return sts;
};

function setStickyPos(id, pos) {
  var sts = loadStickies();
  sts[id].posx = pos.x;
  sts[id].posy = pos.y;
  updateStickies(sts[id]);
};

function updateStickies(st) {
  var sts = loadStickies();
  sts[st.id] = st;
  sts = JSON.stringify(sts);
  localStorage.setItem('stickies', sts);
}

function removeSticky(id) {
  var sts = loadStickies();
  var newSt = [];
  for ( var i = 0; i < sts.length; i++ ) {
    if ( i != id ) {
      sts[i].id = newSt.length;
      newSt.push(sts[i]);
    }
  }
  sts = JSON.stringify(newSt);
  localStorage.setItem('stickies', sts);
  return newSt;
};

function newSticky() {
  var sts = loadStickies();
  var s = {
    id: sts.length,
    txt: '',
    posx: 0,
    posy: 1,
    save: function() {
      updateStickies(this);
    },
  };
  sts.push(s);
  stsString = JSON.stringify(sts);
  localStorage.setItem('stickies', stsString);
  return s;
};
