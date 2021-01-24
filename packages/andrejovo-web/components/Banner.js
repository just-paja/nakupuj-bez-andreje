import React from 'react'
import Container from 'react-bootstrap/Container'

import './Banner.scss'

export function Banner () {
  return (
    <header className='header'>
      <Container>
        <img src='/andrej-pin.png' />
      </Container>
    </header>
  )
}
