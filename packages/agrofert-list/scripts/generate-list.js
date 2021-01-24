#!/usr/bin/env node

const list = require('../index.json')
const { listSubjects } = require('../scripts/listSubjects')

async function regenerateList () {
  const names = list.map(item => item.brandName)
  let data
  try {
    data = await listSubjects(names)
  } catch (e) {
    console.error(e)
    process.exit(255)
  }
  process.stdout.write(JSON.stringify(data, null, 2))
  process.stdout.write('\n')
}

regenerateList(list)
