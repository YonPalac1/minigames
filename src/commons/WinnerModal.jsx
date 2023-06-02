import { Square } from '../pages/Tateti/components/Square'

export function WinnerModal ({ winner, resetGame, msg }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Empate' : 'Ganó:'

  return (
    <section className='winner'>
      <div className='text'>
        <h2>{winner ? winnerText : 'Game over'}</h2>

        <header className='win'>
          {winner && <Square>{winner}</Square>}
        </header>
        {msg && <h2>{msg}</h2>}

        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  )
}
