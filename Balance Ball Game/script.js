var charactor = document.getElementById("charactor");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];

function moveLeft(){
	var left = parseInt(window.getComputedStyle(charactor).getPropertyValue("left"));
	if(left>0){
		charactor.style.left = left - 2 + "px";
	}
}
function moveRight(){
	var left = parseInt(window.getComputedStyle(charactor).getPropertyValue("left"));
	if(left<300){
		charactor.style.left = left + 2 + "px";
	}
}
document.addEventListener("keydown", event => {
	if(both==0){
		both++;
		if(event.key==="ArrowLeft"){
			interval = setInterval(moveLeft,1);
		}
		if(event.key==="ArrowRight"){
			interval = setInterval(moveRight,1);
		}
	}
});
document.addEventListener("keyup",event => {
	clearInterval(interval);
	both=0;
});

var blocks = setInterval(function(){
	var blockLast = document.getElementById("block"+(counter-1));
	var holeLast =  document.getElementById("hole"+(counter-1));
	if(counter>0){
		var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
		var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
	}
	if(blockLastTop<400||counter==0){
		var block = document.createElement("div");
		var hole = document.createElement("div");
		block.setAttribute("class" , "block");
		hole.setAttribute("class" , "hole");
		block.setAttribute("id" , "block"+counter);
		block.setAttribute("id" , "hole"+counter);
		block.style.top = blockLastTop + 60 + "px";
		hole.style.top = holeLastTop + 60 + "px";
		var random = Math.floor(Math.random() * 360);
		hole.style.left = random + "px";
		game.appendChild(block);
		game.appendChild(hole);
		currentBlocks.push(counter);
		counter++;
	}
	var charactorTop = parseInt(window.getComputedStyle(charactor).getPropertyValue("top"));
	var charactorLeft = parseInt(window.getComputedStyle(charactor).getPropertyValue("left"));
	var drop = 0;
	if(charactorTop < 0){
		alert("Game over. Score:"+(counter-9));
		clearInterval(blocks);
		location.reload();
	}
	for(var i=0; i< currentBlocks.lenght;i++){
		let current = current.currentBlocks[i];
		let iblock = document.getElementById("block"+current);
		let ihole = document.getElementById("hole"+current);
		let iblockTop = parseFloat(window.getComputedStyle("iblock").getPropertyValue("top"));
		var iholeLeft = parseFloat(window.getComputedStyle("ihole").getPropertyValue("left"));
		iblock.style.top = iblockTop - 0.5 + "px";
		ihole.style.top = iblockTop - 0.5 + "px";
		if(iblockTop < -20){
			currentBlocks.shift();
			iblocks.remove();
			ihole.remove();
		}
		if(iblockTop-20<charactorTop && iblockTop>charactorTop){
			drop++;
			if(iholeLeft<charactorLeft && iholeLeft+20>charactorLeft){
				drop  = 0;
			}
		}
	}
	if(drop==0){
		if(charactorTop < 480){
			charactor.style.top = charactorTop + 2 + "px";
		}else{
			charactor.style.top = charactorTop - 0.5 + "px";
		}
	}
},1);