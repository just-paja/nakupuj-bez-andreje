import React from 'react'

import styles from './MatchingBrand.module.scss'

export function MatchingBrand ({ brand }) {
  return (
    <div className={styles.matchingBrand}>
      <div className={styles.matchWarning}>Tohle je Andrejovo</div>
      <div className={styles.matchBubble}>
        <div className={styles.avatarLine}>
          <img src='/match.png' />
        </div>
      </div>

      <div>
        <dl>
          <dt>Název společnosti</dt>
          <dd>{brand.name}</dd>

          <dt>IČO</dt>
          <dd>{brand.id}</dd>
        </dl>
      </div>
    </div>
  )
}
