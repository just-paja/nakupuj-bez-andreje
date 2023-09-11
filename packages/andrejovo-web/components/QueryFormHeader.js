import React from 'react'
import Container from 'react-bootstrap/Container'

import { QueryFormInline } from './QueryFormInline'

import styles from './QueryFormHeader.module.scss'

export function QueryFormHeader ({ q }) {
  return (
    <div className={styles.queryFormHeader}>
      <Container>
        <QueryFormInline q={q} />
      </Container>
    </div>
  )
}
