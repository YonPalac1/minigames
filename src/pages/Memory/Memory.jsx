import React, { useEffect, useState, useRef } from 'react'
import confetti from 'canvas-confetti'
import styled from 'styled-components'

import { IMAGES_ARRAY } from './utils/constants'
import Cards from './components/Cards'
import { WinnerModal } from '../../commons/WinnerModal'

const shuffleCards = (array) => {
  const length = array.length
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i)
    const currentIndex = i - 1
    const temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}

const Memory = () => {
  const [cards, setCards] = useState(shuffleCards(IMAGES_ARRAY.concat(IMAGES_ARRAY)))
  const [openCards, setOpenCards] = useState([])
  const [clearedCards, setClearedCards] = useState({})
  const timeout = useRef(null)
  const [winner, setWinner] = useState(null)
  const [moves, setMoves] = useState(0)

  const evaluate = () => {
    const [first, second] = openCards
    setMoves(moves + 1)
    if (cards[first].type === cards[second].type) {
      setClearedCards((prev) => ({ ...prev, [cards[first].type]: true }))
      setOpenCards([])
    }
    timeout.current = setTimeout(() => {
      setOpenCards([])
    }, 500)
  }

  const checkCompletion = () => {
    if (Object.keys(clearedCards).length === IMAGES_ARRAY.length) {
      confetti()
      setWinner()
    }
  }

  useEffect(() => {
    checkCompletion()
  }, [clearedCards])

  useEffect(() => {
    let timeout = null
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate, 300)
    }
    return () => {
      clearTimeout(timeout)
    }
  }, [openCards])

  const handleCardClick = (index) => {
    if (openCards.length < 2) {
      setOpenCards(prev => [...prev, index])
    }
  }
  const checkIsFlipped = (index) => {
    return openCards.includes(index)
  }

  const checkIsInactive = (card) => {
    return Boolean(clearedCards[card.type])
  }

  const resetGame = () => {
    setClearedCards({})
    setOpenCards([])
    setCards(shuffleCards(IMAGES_ARRAY.concat(IMAGES_ARRAY)))
    setWinner(null)
  }

  return (
    <Main>
      <Title>Memory Movies</Title>
      <ContainerCards>
        {cards.map((card, i) => {
          return <Cards card={card} key={i} onClick={handleCardClick} isFlipped={checkIsFlipped(i)} isInactive={checkIsInactive(card)} index={i} />
        })}
      </ContainerCards>
      <h2>Movientos {moves}</h2>
      <WinnerModal resetGame={resetGame} winner={winner} msg={`intentos ${moves}`} />
    </Main>
  )
}

export default Memory

const Main = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Title = styled.h1`
    font-size: 20px;
`
const ContainerCards = styled.section`
    border: 1px solid #DEDEDE;
    padding: 12px;
    box-shadow: 0 0 4px 4px #DEDEDE; 
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    align-items: stretch;
    gap: 1rem;
    margin: 0 auto;
    width: 660px;
    height: 800px;
    perspective: 100%;
    max-width: 720px;
`
