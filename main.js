// // Pure javascript
// document.onclick = function handleClick(e) {
//   console.log("moving to " + [e.x, e.y]);
//
//   var myBlock = document.getElementById('block');
//   myBlock.style.position= 'absolute';
//   myBlock.style.top = (e.y - 50) + "px";
//   myBlock.style.left = (e.x - 50) + "px";
// }

$(document).ready(function() {
  var $block = $('#block')
  $(document).on("click", function(e) {
    var clickX = e.pageX - 50
    var clickY = e.pageY - 50
    var velocity = window.getVelocity(clickX, clickY)
    window.move("#block", velocity[0], velocity[1], clickX, clickY)
  })
})

function move(id, x, y, clickX, clickY) {
  var $block = $(id)
  var interval = setInterval(function() {
    var left = $block.offset().left
    var top = $block.offset().top
    $block.offset({left: left + x, top: top + y})
    if ((left >= clickX - 5 && left <= clickX + 5) && (top >= clickY - 5 && top <= clickY + 5)) {
      console.log('hit');
      console.log([x, y]);
      console.log([left, top]);
      console.log([clickX, clickY]);
      clearInterval(interval)
    }
  }.bind(this), 1)
  $(document).on("click", function() { clearInterval(interval)}.bind(this))
}

function getVelocity(x, y) {
  var currentX = $('#block').offset().left
  var currentY = $('#block').offset().top
  var vX = x - currentX
  var vY = y - currentY
  return window.getRelativeVelocity(vX, vY)
}

function getRelativeVelocity(x, y) {
  var c = Math.pow(x, 2) + Math.pow(y, 2)
  c = Math.pow(c, 0.5)
  var factor = 2 / c
  return [x * factor, y * factor]
}
