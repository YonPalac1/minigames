import React from 'react'
import styled from 'styled-components'
import movie from '../utils/images/img_back.png'
import '../styles.css'

const Cards = ({ card, onClick, index, isInactive, isFlipped }) => {
  const handleClick = () => {
    onClick(index)
  }

  return (
    <Card onClick={handleClick} className={isFlipped ? 'is-flipped' : isInactive && 'is-inactive'}>
      <CardFace className='card-front-face'>
        <Img src={movie} alt='claketa' />
      </CardFace>
      <CardFace className='card-back-face'>
        <Img src={card.image} />
      </CardFace>

    </Card>
  )
}

export default Cards

const Card = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  box-shadow: 2px 2px 4px 4px #DEDEDE;
  transition: 0.3s;
  transform-style: preserve-3d;
  position: relative;
  cursor: pointer;
`
const CardFace = styled.div`
    backface-visibility: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
`
const Img = styled.img`
    width: 95%;
    height: 95%;
`
