import React from 'react'
import Container from 'react-bootstrap/Container'

import { Clean } from '../components/Clean'
import { MatchingBrand } from '../components/MatchingBrand'
import { QueryFormHeader } from '../components/QueryFormHeader'
import { matchBlacklistedBrand } from '../db'

function Search ({ brand, query }) {
  const { q } = query
  return (
    <>
      <QueryFormHeader q={q} />
      <Container as='main'>
        <h1 className='text-center'>"{q}" v Agrofertu</h1>
        {brand ? <MatchingBrand brand={brand} /> : <Clean />}
      </Container>
    </>
  )
}

Search.getInitialProps = function ({ query, res }) {
  const { q } = query
  if (typeof window === 'undefined' && res.writeHead) {
    if (!q) {
      res.writeHead(302, { Location: '/' })
      res.end()
    }
  }
  const match = matchBlacklistedBrand(q)
  return { brand: match?.companyRef, query }
}

export default Search
