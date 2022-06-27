import Player from "./player"

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
let unit = canvas.height / 100

class Ball{
	constructor(){
		this.diameter = 2 * unit
		this.color = "white"
		this.velocity = {
			x: 1.5 * unit,
			y: 0
		}

		this.position = {
			x: canvas.width / 2,
			y: canvas.height / 2
		}

		let rand = Math.floor(Math.random() * 2)
		if(rand > 0) this.velocity.x = -this.velocity.x
	}

	draw(){
		ctx.beginPath()
		ctx.arc(this.position.x, this.position.y, this.diameter, 0, 2 * Math.PI)
		ctx.fillStyle = this.color
		ctx.fill()
	}

	update(){
		this.draw()
		this.position.x += this.velocity.x
		this.position.y += this.velocity.y
	}
}

let player_width = 5 * unit
let player_height = 25 * unit
let player_posx = 8 * unit + player_width
let player = []
player[0] = new Player(player_width, player_height, player_posx)
player[1] = new Player(player_width, player_height, canvas.width - player_width - player_posx)

const ball = new Ball()

function animation(){
	if(ball.position.x + ball.diameter < -ball.diameter || ball.position.x - ball.diameter > canvas.width + ball.diameter) return
	requestAnimationFrame(animation)

	if(ball.position.x - ball.diameter / 2 <= player[0].position.x + player_width && ball.position.x >= player[0].position.x && ball.position.y - ball.diameter <= player[0].position.y + player_height && ball.position.y >= player[0].position.y && ball.velocity.x < 0){
		hitBall(0)
	}
	else if(ball.position.x + ball.diameter / 2 >= player[1].position.x && ball.position.x <= player[1].position.x + player_width && ball.position.y - ball.diameter <= player[1].position.y + player_height && ball.position.y >= player[1].position.y && ball.velocity.x > 0){
		hitBall(1)
	}

	if(ball.position.y >= canvas.height && ball.velocity.y > 0 || ball.position.y <= 0 && ball.velocity.y < 0){
		ball.velocity.y = -ball.velocity.y
	}

	ctx.clearRect(0, 0, canvas.width, canvas.height)
	for(let i=0; i<=1; i++){
		playerMovement(i)
	}
	ball.update()
}

function playerMovement(num){
	if(player[num].position.y <= 0 && player[num].velocity.y < 0 || player[num].position.y >= canvas.height - player_height && player[num].velocity.y > 0){
		player[num].velocity.y = 0
	}

	player[num].update()
}

function hitBall(num){
	ball.velocity.x = -ball.velocity.x
	ball.velocity.x *= 1.07

	ball.velocity.y = (player[num].position.y + player_height / 2 - ball.position.y) / -6
}

animation()

$(document).keydown(function(e){
	switch(e.keyCode){
		case 38:
			player[1].velocity.y = -unit
			break
		case 87:
			player[0].velocity.y = -unit
			break
		case 40:
			player[1].velocity.y = unit
			break
		case 83:
			player[0].velocity.y = unit
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