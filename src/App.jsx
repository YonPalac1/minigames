import '../style.css'
import styled from 'styled-components'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Tateti from './pages/Tateti/Tateti.jsx'

import image from './utils/images/bg2.jpg'
import Memory from './pages/Memory/Memory'
import Snake from './pages/Snake/Snake'

const Home = () => {
  return (
    <MainHome className='home'>
      <h1>Mini Games</h1>
      <Link to='/tateti'>TATETI</Link>
      <Link to='/memory'>MEMORY</Link>
      <Link to='/snake'>SNAKE</Link>
    </MainHome>
  )
}

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/tateti' element={<Tateti />} />
        <Route path='/memory' element={<Memory />} />
        <Route path='/snake' element={<Snake />} />
      </Routes>
      <ImageBg src={image} alt='imagen de fondo' />
    </Router>
  )
}

export const App = () => {
  return <AppRouter />
}

const MainHome = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  margin-top: 30px;
`
const ImageBg = styled.img`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
`
