const axios = require('axios')
const blog = require('./config/blog.json')
const pages = require('./config/pages.json')
const fs = require('fs')
require('dotenv').config()

const getCommit = async () => {
  const { data } = await axios.get(`https://api.github.com/repos/tsa-dom/contents/commits?path=${process.argv[6]}`, {
    headers: {
      'Authorization': `token ${process.env.API_TOKEN}`
    }
  })
  return data
}

const createFiles = async () => {
  const commit = await getCommit()
  const data = commit.map(d => d.commit.author).sort((a, b) => new Date(b.date) - new Date(a.date))

  const body = {
    file: process.argv[3],
    title: process.argv[4],
    description: process.argv[5],
    modified: new Date(data[0].date).toISOString(),
    created: new Date(data[data.length - 1].date).toISOString()
  }
  
  if (process.argv[2] === "blog") {
    const post = {
      keywords: process.argv[7],
      author: process.argv[8],
      ...body
    }
    fs.writeFile('./config/blog.json', JSON.stringify(Object(blog).concat(post)), () => {})
  } else if (process.argv[2] === "pages") {
    const group = process.argv[7].split('.')
    const page = {
      group: {
        name: group[0],
        child: group[1] ? group[1].replaceAll('-', ' ') : null,
      },
      ...body
    }
    fs.writeFile('./config/pages.json', JSON.stringify(Object(pages).concat(page)), () => {})
  }
}

createFiles()