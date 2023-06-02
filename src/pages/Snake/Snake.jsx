import React, { useEffect, useState, useRef } from 'react'
import { WinnerModal } from '../../commons/WinnerModal'

const Snake = () => {
  const [start, setStart] = useState(false)
  const canvasWidth = 400
  const canvasHeight = 400
  const canvas = useRef()
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [time, setTime] = useState(0)
  const [velocity, setVelocity] = useState(130)
  const [gameOver, setGameOver] = useState(false)
  const [gamePause, setGamePause] = useState(false)
  const index = 2
  const [food, setFood] = useState({ x: 80, y: 100 })
  const [winner, setWinner] = useState(null)

  // Snake
  const initUbication = 20
  const [ubicationSnakeX, setUbicationSnakeX] = useState(20)
  const [ubicationSnakeY, setUbicationSnakeY] = useState(0)
  const [snake, setSnake] = useState([
    { x: initUbication * 2, y: 0 },
    { x: initUbication, y: 0 },
    { x: 0, y: 0 }
  ])

  useEffect(() => {
    startGame()
  }, [start, time])

  const drawBoard = () => {
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d')
    ctx.clearRect(0, 0, canvas.current.width, canvas.current.height)
  }

  const drawSnake = () => {
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d')
    ctx.fillStyle = 'green'
    ctx.strokeStyle = 'black'
    snake.forEach(snakeBody => {
      // 1 y 2: Posicion dentro del canvas, 3 y 4: width, height
      ctx.fillRect(snakeBody.x, snakeBody.y, 20, 20)
      ctx.strokeRect(snakeBody.x, snakeBody.y, 20, 20)
    })
  }

  const moveSnake = () => {
    const move = {
      x: snake[0].x + ubicationSnakeX,
      y: snake[0].y + ubicationSnakeY
    }
    snake.unshift(move)

    snakePosition()
  }

  const drawFood = () => {
    if (!canvas.current) return
    const ctx = canvas.current.getContext('2d')

    ctx.fillStyle = '#ffab56'
    ctx.strokeStyle = 'white'

    ctx.strokeRect(food.x, food.y, 20, 20)
    ctx.fillRect(food.x, food.y, 20, 20)
  }

  const randomFood = () => {
    const randNumX = Math.round((Math.random() * (canvasWidth - 20) + 0) / 20) * 20
    const randNumY = Math.round((Math.random() * (canvasHeight - 20) + 0) / 20) * 20
    setFood({ x: randNumX, y: randNumY })

    drawFood()
  }

  const snakePosition = () => {
    if (food.x === snake[0].x && food.y === snake[0].y) {
      randomFood()
      setScore(score + 1)
      setSnake([...snake, { x: initUbication * index + 1, y: snake[0].y }])
    } else {
      snake.pop()
    }

    if (snake[0].x < 0 || snake[0].y < 0 || snake[0].y >= canvasHeight || snake[0].x >= canvasWidth) {
      handleResetGame()
      setWinner()
    }

    for (let i = 1; i < snake.length; i += 1) {
      if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
        setStart(false)
        setGameOver(true)
        setWinner()
      }
    }
  }

  const changeDirection = event => {
    const keydown = event.keyCode
    const up = 38
    const down = 40
    const right = 39
    const left = 37
    const enter = 13

    if (up === keydown) {
      setUbicationSnakeX(0)
      setUbicationSnakeY(-20)
    } else if (down === keydown) {
      setUbicationSnakeX(0)
      setUbicationSnakeY(20)
    } else if (right === keydown) {
      setUbicationSnakeX(20)
      setUbicationSnakeY(0)
    } else if (left === keydown) {
      setUbicationSnakeX(-20)
      setUbicationSnakeY(0)
    } else if (enter === keydown) {
      setGamePause(!gamePause)
      if (gameOver) {
        handleResetGame()
      }
      setStart(!start)
    }
  }

  const handleResetGame = () => {
    setLevel(1)
    setScore(0)
    setVelocity(130)
    setUbicationSnakeX(20)
    setUbicationSnakeY(0)
    setStart(false)
    setGameOver(false)
    setWinner(null)
    setSnake([
      { x: initUbication * 2, y: 0 },
      { x: initUbication, y: 0 },
      { x: 0, y: 0 }
    ])
  }

  const startGame = () => {
    if (start) {
      setTimeout(() => {
        setTime(time + 1)
        drawBoard()
        drawSnake()
        drawFood()
        moveSnake()
      }, velocity)
    }
  }

  return (
    <div>
      <h1>Snake</h1>
      <div className='container__canva' onKeyDown={changeDirection}>
        <canvas
          ref={canvas}
          tabIndex={0}
          width={canvasWidth}
          height={canvasHeight}
          style={{ border: '3px solid #fff', background: 'blue' }}
        />
        <h2>puntos: {score}</h2>
      </div>
      <WinnerModal resetGame={handleResetGame} winner={winner} msg={`Puntos ${score}`} />
    </div>
  )
}

export default Snake
