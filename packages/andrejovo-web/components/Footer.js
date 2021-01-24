import React from 'react'
import Container from 'react-bootstrap/Container'

import styles from './Footer.module.scss'

export function Footer () {
  return (
    <footer className={styles.footer}>
      <Container>
        Projekt <a href='https://andrejov.cz'>Andrejov</a> má za cíl označkovat
        výrobky Agrofertu.
      </Container>
    </footer>
  )
}
