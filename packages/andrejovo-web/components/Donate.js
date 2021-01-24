import React from 'react'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export function Donate () {
  return (
    <Container className='text-center'>
      <Button
        href='https://www.paypal.com/paypalme/pavelzakglobal/200'
        variant='link'
      >
        Přispěj 200 Kč na projekt
      </Button>
    </Container>
  )
}
