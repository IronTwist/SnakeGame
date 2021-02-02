import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
import { snakeLength as score } from './snake.js'

let lastRenderTime = 0;
let gameover = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
    if (gameover) {
        if (confirm(`You lost. Press OK to restart. Scorul tau este ${score()}`)) {
            window.location = '/JocSnake/index.html'
        }
        return
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000 //pentru a afla cate secunde au trecut
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return //0.5 sec pe miscare
    console.log("redat");
    lastRenderTime = currentTime

    update()
    draw()

}

window.requestAnimationFrame(main)

function update() {

    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameover = outsideGrid(getSnakeHead()) || snakeIntersection()
}