import classnames from 'classnames'
import React from 'react'

import styles from './ExtensionPromo.module.scss'

export function ExtensionPromo () {
  return (
    <div className={styles.extensionPromo}>
      <h1>Nakupuj bez Andreje</h1>
      <p>
        Chceš nakupovat bez Andreje? Stáhni si naše rozšíření do prohlížeče a
        hnedka uvidíš co patří do Andrejova impéria a co ne! Podporujeme Košík,
        Rohlík, iTesco a Makro.
      </p>
      <ul className={styles.browsers}>
        <li>
          <a
            href='https://chrome.google.com/webstore/detail/nakupuj-bez-andreje/jjealpfmifpaeoakfjbafddkhmkbnkmg'
            className={classnames(styles.browser, styles.chrome)}
            title='Nakupuj bez Andreje v Google Chrome'
          />
        </li>
        <li>
          <a
            href='https://addons.mozilla.org/cs/firefox/addon/nakupuj-bez-andreje/'
            className={classnames(styles.browser, styles.firefox)}
            title='Nakupuj bez Andreje ve Firefoxu'
          />
        </li>
      </ul>
    </div>
  )
}
