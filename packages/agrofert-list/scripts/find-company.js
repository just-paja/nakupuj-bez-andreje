#!/usr/bin/env node

const { listSubjects } = require('./listSubjects')

const [, , ...subjects] = process.argv

if (subjects.length === 0) {
  process.stderr('Nothing to search for')
  process.exit(0)
}

async function findCompanies () {
  let data
  try {
    data = await listSubjects(subjects)
  } catch (e) {
    console.error(e)
    process.exit(255)
  }
  console.log(data)
}

findCompanies()
