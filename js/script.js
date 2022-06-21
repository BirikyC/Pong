const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
let rem = canvas.height / 100

$(window).resize(function(){
	canvas.width = innerWidth
	canvas.height = innerHeight
	rem = canvas.height / 100
	player[0] = new Player()
	player[0].draw()
})



class Player{
	constructor(pwidth, pheight, posx){
		this.height = pheight
		this.width = pwidth
		this.color = "white"
		this.velocity = {
			x: 0,
			y: 0
		}

		this.position = {
			x: posx,
			y: canvas.height / 2 + this.height / 2
		}
	}

	draw(){
		ctx.beginPath()
		ctx.rect(this.position.x, this.position.y, this.width, this.height)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	update(){
		this.draw()
		this.position.y += this.velocity.y
	}
}

let player_width = 5 * rem
let player_height = 25 * rem
let player_posx = 8 * rem + player_width
let player = [null]
player[0] = new Player(player_width, player_height, player_posx)
player[1] = new Player(player_width, player_height, canvas.width - player_width - player_posx)

function animation(){
	requestAnimationFrame(animation)
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for(let i=0; i<=1; i++){
		playerMovement(i)
	}
}

function playerMovement(num){
	if(player[num].position.y <= 0 && player[num].velocity.y < 0 || player[num].position.y >= canvas.height - player_height && player[num].velocity.y > 0){
		player[num].velocity.y = 0
	}

	player[num].update()
}

animation()

$(document).keydown(function(e){
	switch(e.keyCode){
		case 38:
			player[1].velocity.y = -rem
			break
		case 87:
			player[0].velocity.y = -rem
			break
		case 40:
			player[1].velocity.y = rem
			break
		case 83:
			player[0].velocity.y = rem
			break
	}
})

$(document).keyup(function(e){
	switch(e.keyCode){
		case 38:
		case 40:
			player[1].velocity.y = 0
			break
		case 83:
		case 87:
			player[0].velocity.y = 0
			break
	}
})