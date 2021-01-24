import React from 'react'
import Container from 'react-bootstrap/Container'

import './Footer.scss'

export function Footer () {
  return (
    <footer className='footer'>
      <Container>
        Projekt <a href='https://andrejov.cz'>Andrejov</a> má za cíl označkovat
        výrobky Agrofertu.
      </Container>
    </footer>
  )
}
