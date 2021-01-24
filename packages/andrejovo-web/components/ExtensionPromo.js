import React from 'react'

import './ExtensionPromo.scss'

export function ExtensionPromo () {
  return (
    <div className='extension-promo'>
      <h1>Nakupuj bez Andreje</h1>
      <p>
        Chceš nakupovat bez Andreje? Stáhni si naše rozšíření do prohlížeče a
        hnedka uvidíš co patří do Andrejova impéria a co ne! Podporujeme Košík,
        Rohlík, iTesco a Makro.
      </p>
      <ul className='browsers'>
        <li>
          <a
            href='https://chrome.google.com/webstore/detail/nakupuj-bez-andreje/jjealpfmifpaeoakfjbafddkhmkbnkmg'
            className='browser chrome'
            title='Nakupuj bez Andreje v Google Chrome'
          />
        </li>
        <li>
          <a
            href='https://addons.mozilla.org/cs/firefox/addon/nakupuj-bez-andreje/'
            className='browser firefox'
            title='Nakupuj bez Andreje ve Firefoxu'
          />
        </li>
      </ul>
    </div>
  )
}
