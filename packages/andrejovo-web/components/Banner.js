import React from 'react'
import Container from 'react-bootstrap/Container'

import styles from './Banner.module.scss'

export function Banner () {
  return (
    <header className={styles.header}>
      <Container>
        <img src='/andrej-pin.png' />
      </Container>
    </header>
  )
}
