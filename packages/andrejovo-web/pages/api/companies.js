import agrofert from 'agrofert-list'

export default (_req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(agrofert))
}
