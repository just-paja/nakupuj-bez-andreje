const { matchBlacklistedBrand } = require('../brands')
const { describe, expect, it } = require('@jest/globals')

describe('matchBlacklistedBrand', () => {
  it('matches penam at the beginning of the string', () => {
    expect(matchBlacklistedBrand('penam chléb')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches penam at the end of the string', () => {
    expect(matchBlacklistedBrand('Chléb penam')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches penam at in the middle of the string', () => {
    expect(matchBlacklistedBrand('Celozrnný penam chléb')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches Penam at the beginning of the string', () => {
    expect(matchBlacklistedBrand('Penam chléb')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches Penam at the end of the string', () => {
    expect(matchBlacklistedBrand('Chléb Penam')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches Penam at in the middle of the string', () => {
    expect(matchBlacklistedBrand('Celozrnný Penam chléb')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches pEnAm at the beginning of the string', () => {
    expect(matchBlacklistedBrand('pEnAm chléb')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches pEnAm at the end of the string', () => {
    expect(matchBlacklistedBrand('Celozrnný pEnAm')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches pEnAm at in the middle of the string', () => {
    expect(matchBlacklistedBrand('Celozrnný pEnAm chléb')).toMatchObject({
      name: 'PENAM'
    })
  })

  it('matches brand inside brackets', () => {
    expect(matchBlacklistedBrand('(Vodňanská drůbež)')).toMatchObject({
      name: 'Vodňanská drůbež'
    })
  })

  it('matches brand touching start of brackets', () => {
    expect(
      matchBlacklistedBrand('(Vodňanská drůbež (dodavatel))')
    ).toMatchObject({
      name: 'Vodňanská drůbež'
    })
  })

  it('matches brand touching comma', () => {
    expect(
      matchBlacklistedBrand('(Vodňanská drůbež, dodavatel)')
    ).toMatchObject({
      name: 'Vodňanská drůbež'
    })
  })

  it('matches brand touching end of brackets', () => {
    expect(
      matchBlacklistedBrand('bez kosti (dodavatel Vodňanská drůbež)')
    ).toMatchObject({
      name: 'Vodňanská drůbež'
    })
  })
})
