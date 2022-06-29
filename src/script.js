const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight
const unit = canvas.height / 100
const gameColor = $('.color').css('color')

class Player{
	constructor(pwidth, pheight, posx, color){
		this.height = pheight
		this.width = pwidth
		this.color = color
		this.velocity = {
			x: 0,
			y: 0
		}

		this.position = {
			x: posx,
			y: canvas.height / 2 - this.height / 2
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

class Ball{
	constructor(color){
		this.diameter = 2 * unit
		this.color = color
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

let aniTime = 600
const hideClass = 'hide'
const maxScore = $('.maxScore > input')[0].value
const maxGames = $('.maxGames > input')[0].value
let gameEnd = false

const player_width = 5 * unit
const player_height = 25 * unit
const player_start_position = 8 * unit + player_width
const players = [
	new Player(player_width, player_height, player_start_position, gameColor),
	new Player(player_width, player_height, canvas.width - player_width - player_start_position, gameColor)
]
const ball = new Ball(gameColor)

$('.title').addClass('hide-title')
$('.start').addClass('hide-animation')
$('.score').addClass('score-animation').removeClass(hideClass)
setTimeout(() => {
	$('.title').addClass(hideClass).removeClass('hide-title')
	$('.menu.start').addClass(hideClass).removeClass('hide-animation')
	$('.score').removeClass('score-animation '+hideClass)

	let path = $('.break')
	for(let i=0; i<3; i++){
		setTimeout(() => {
			$(path[i]).removeClass(hideClass)
		}, aniTime*i)
		
		setTimeout(() => {
			$(path[i]).addClass(hideClass)
		}, aniTime*(i+1))
	}
	
	setTimeout(() => {
		gameLoop()	
	}, 2000)
	
}, 1900)

function gameLoop(){
	if(ball.position.x + ball.diameter < -ball.diameter || ball.position.x - ball.diameter > canvas.width + ball.diameter){
		scorePoint()

		if(gameEnd){
			endGame()
			return
		}
		reset()
		
		return
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	if(ball.position.x - ball.diameter / 2 <= players[0].position.x + player_width && ball.position.x >= players[0].position.x && ball.position.y - ball.diameter <= players[0].position.y + player_height && ball.position.y >= players[0].position.y && ball.velocity.x < 0){
		hitBall(0)
	}
	else if(ball.position.x + ball.diameter / 2 >= players[1].position.x && ball.position.x <= players[1].position.x + player_width && ball.position.y - ball.diameter <= players[1].position.y + player_height && ball.position.y >= players[1].position.y && ball.velocity.x > 0){
		hitBall(1)
	}

	if(ball.position.y >= canvas.height && ball.velocity.y > 0 || ball.position.y <= 0 && ball.velocity.y < 0){
		ball.velocity.y = -ball.velocity.y
	}

	playerMovement()
	ball.update()

	requestAnimationFrame(gameLoop)
}

function playerMovement(){
	players.forEach((player) => {
		if(player.position.y <= 0 && player.velocity.y < 0 || player.position.y >= canvas.height - player_height && player.velocity.y > 0) player.velocity.y = 0
		player.update()
	})
}

function hitBall(num){
	ball.velocity.x = -ball.velocity.x
	if(ball.velocity.y != 0) ball.velocity.x *= 1.07

	ball.velocity.y = (players[num].position.y + player_height / 2 - ball.position.y) / -6
}

function scorePoint(){
	let path = [$('.score-points > span')[0], $('.score-games > span')[0], $('.break.point')[0]]

	if(ball.position.x < canvas.width / 2){
		path[0] = $('.score-points > span')[1]
		path[1] = $('.score-games > span')[1]
	}

	if(path[0] === $('.score-points > span')[1]){
		$(path[2]).html(path[2].innerText.replace('One', 'Two'))
	}
	
	let score = parseInt(path[0].innerText)
	let games = parseInt([path[1].innerText])
	score++
	if(score >= maxScore){
		score = 0
		games++
		$('.score-points > span').html(score)
	}
	$(path[0]).html(score)
	$(path[1]).html(games)
	if(games >= maxGames) return gameEnd = true
}

function reset(){
	players.forEach((player) => {
		player.position.y = canvas.height / 2 - player.height / 2
	})
	ball.position.x = canvas.width / 2
	ball.position.y = canvas.height / 2
	ball.velocity.x = 1.5 * unit
	ball.velocity.y = 0

	setTimeout(() => {
		$('.break.point').removeClass(hideClass)	
	}, 100)
	

	setTimeout(() => {
		$('.break.point').addClass(hideClass)
		
	}, 100+aniTime)
	
	let path = [$('.break.ready')[0], $('.break.go')[0]]
	for(let i=0; i<2; i++){
		setTimeout(() => {
			$(path[i]).removeClass(hideClass)
		}, 500+aniTime*(i+1))
		
		setTimeout(() => {
			$(path[i]).addClass(hideClass)
		}, 500+aniTime*(i+2))
	}
	
	setTimeout(() => {
		gameLoop()
	}, 500+aniTime*3)
}

function endGame(){
	path = [$('.score-games > span')[0], $('.break.win')[0]]

	if(parseInt($('.score-games > span')[1].innerText) > parseInt(path[0].innerText)){
		$(path[1]).html(path[1].innerText.replace('One', 'Two'))
	}

	$(path[1]).removeClass(hideClass)
	setInterval(() => {
		$(path[1]).addClass(hideClass)
		$('.menu.after').removeClass(hideClass)
	}, aniTime)
}

$('.rematch').click(function(){
	$('.menu.after').addClass('hide-animation')
	setTimeout(() => {
		endGame = false

		$('.menu.after').addClass(hideClass).removeClass('hide-animation')
		
		players.forEach((player) => {
			player.position.y = canvas.height / 2 - player.height / 2
		})

		gameLoop()
	}, 1900)
})

$(document).keydown(function(e){
	switch(e.keyCode){
		case 38:
			players[1].velocity.y = -unit
			break
		case 87:
			players[0].velocity.y = -unit
			break
		case 40:
			players[1].velocity.y = unit
			break
		case 83:
			players[0].velocity.y = unit
			break
	}
})

$(document).keyup(function(e){
	switch(e.keyCode){
		case 38:
		case 40:
			players[1].velocity.y = 0
			break
		case 83:
		case 87:
			players[0].velocity.y = 0
			break
	}
})