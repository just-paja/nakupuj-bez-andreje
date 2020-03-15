#!/usr/bin/env node

const list = require('../index.json');
const { listSubjects } = require('../scripts/listSubjects');

async function regenerateList() {
  const names = list.map(item => item.name);
  let data;
  try {
    data = await listSubjects(names);
  } catch (e) {
    console.error(e);
    process.exit(255);
  }
  console.log(data);
}

regenerateList(list);
