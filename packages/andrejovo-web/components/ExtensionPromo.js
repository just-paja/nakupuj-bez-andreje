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
          >
            <span className={styles.hidden}>Nakupuj bez Andreje v Google Chrome</span>
          </a>
        </li>
        <li>
          <a
            href='https://addons.mozilla.org/cs/firefox/addon/nakupuj-bez-andreje/'
            className={classnames(styles.browser, styles.firefox)}
            title='Nakupuj bez Andreje ve Firefoxu'
          >
            <span className={styles.hidden}>Nakupuj bez Andreje ve Firefoxu</span>
          </a>
        </li>
        <li>
          <a
            href='https://microsoftedge.microsoft.com/addons/detail/nakupuj-bez-andreje/pogbglamipgclmpjlmjdlaligmgoeldk'
            className={classnames(styles.browser, styles.edge)}
            title='Nakupuj bez Andreje v Microsoft Edge'
          >
            <span className={styles.hidden}>Nakupuj bez Andreje v Edgi</span>
          </a>
        </li>
      </ul>
    </div>
  )
}
