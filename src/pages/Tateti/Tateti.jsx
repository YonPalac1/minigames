import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import './index.css'
import { Square } from './components/Square'
import { TURNS } from './constants'
import { checkEndGame, checkWinnerFrom } from './logic/board'
import { WinnerModal } from '../../commons/WinnerModal'

const Tateti = () => {
  const [board, setBoard] = useState(() => {
    return Array(9).fill(null)
  })
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (i) => {
    if (board[i]) return
    const newBoard = [...board]
    newBoard[i] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }
  }

  return (
    <main className='board'>
      <h1>TA TE TI</h1>

      <section className='game'>
        {board.map((square, i) => {
          return <Square updateBoard={updateBoard} index={i} key={i}>{square}</Square>
        })}
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default Tateti
