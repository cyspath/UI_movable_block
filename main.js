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
  run()
  var $block = $('#block')
  $(document).on("click", function(e) {
    var clickX = e.pageX - 50
    var clickY = e.pageY - 50
    var velocity = window.getVelocity(clickX, clickY)
    window.giveVelocity(velocity[0], velocity[1])
  })
})

function giveVelocity(x, y) {
  Block.left = x
  Block.top = y
}

Block = {left: 1, top: 1}

function run () {
  console.log('run');
  var interval = setInterval(function() {
    $block = $('#block')
    var left = $block.offset().left
    var top = $block.offset().top
    $block.offset({left: left + Block.left, top: top + Block.top})
    window.checkBounce()
  }.bind(this), 1)
}

function checkBounce() {
  $block = $('#block')
  var left = Math.abs(Block.left)
  var top = Math.abs(Block.top)
  if ($block.offset().left >= $(window).width() - 100) {
    Block.left = -left
  }
  if ($block.offset().top >= $(window).height() - 100){
    Block.top = -top
  }
  if ($block.offset().left <= 0){
    Block.left = left
  }
  if ($block.offset().top <= 0){
    Block.top = top
  }
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
