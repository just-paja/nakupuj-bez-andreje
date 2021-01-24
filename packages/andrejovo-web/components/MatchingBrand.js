import React from 'react'

import './MatchingBrand.scss'

export function MatchingBrand ({ brand }) {
  return (
    <div className='matching-brand'>
      <div className='match-warning'>Tohle je Andrejovo</div>
      <div className='match-bubble'>
        <div className='avatar-line'>
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
