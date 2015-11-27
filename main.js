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
    console.log([e.pageX, e.pageY]);

    var velocity = window.getVelocity(e.pageX, e.pageY)
    console.log(velocity);
    window.move("#block", velocity[0], velocity[1])
  })
})

function move(id, x, y) {
  var $block = $(id)
  // setTimeout(function() {
    var left = $block.offset.left
    var top = $block.offset.top
    $block.offset({left: left + x, top: top + y})
  // }.bind(this), 500)
}

// $('#block').offset({top: 100, left: 400 })

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
  var factor = 5 / c
  return [x * factor, y * factor]
}
