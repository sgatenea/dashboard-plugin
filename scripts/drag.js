app.directive('draggable',['$document',function($document){
    return{
      restrict:'A',
      link: function(scope, elm, attrs) {
        var startX, startY, initialMouseX, initialMouseY;
        elm.css({position:'absolute'});

        elm.bind('mousedown', function($event) {
          startX = elm.prop('offsetLeft');
          startY = elm.prop('offsetTop');
          initialMouseX = $event.clientX;
          initialMouseY = $event.clientY;
          $document.bind('mousemove', mousemove);
          $document.bind('mouseup', mouseup);
          return false;
        });

        function mousemove( $event ) {
          var dx = $event.clientX-initialMouseX;
          var dy = $event.clientY-initialMouseY;
          elm.css({
            top: startY + dy + 'px',
            left: startX + dx + 'px'
          });
          updateDragged(elm[0].id, {
            x: startX + dx,
            y: startY + dy,
          });
          return false;
        }

        function mouseup() {
          $document.unbind('mousemove', mousemove);
          $document.unbind('mouseup', mouseup);
        }
      }
    };
}]);

function updateDragged(id, pos) {
  var spl = id.split('-');
  switch (spl[0]) {
  case 'sticky':
    setStickyPos(parseInt(spl[1]), pos);
    break;
  case 'calc':
    setCalcPos(parseInt(spl[1]), pos);
    break;
  case 'clock':
    setClockPos(parseInt(spl[1]), pos);
    break;
  }
};
