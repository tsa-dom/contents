const axios = require('axios')
const blog = require('../config/blog.json')
const pages = require('../config/pages.json')
const groups = Object(require('../config/groups.json'))
const resources = Object(require('../config/resources.json'))
const fs = require('fs').promises
require('dotenv').config()

const getCommit = async (path) => {
  const res = await axios.get(`https://api.github.com/repos/tsa-dom/contents/commits?path=${path}`, {
    headers: {
      'Authorization': `token ${process.env.API_TOKEN}`
    }
  })
  return res.data
}

const dumpPages = async (file, data) => {
  const { title, description, group, path, priority } = data
  if (!group) return
  const commits = await getCommit(path)
  const sorted = commits.map(d => d.commit.author).sort((a, b) => new Date(b.date) - new Date(a.date))

  const fileConfig = {
    file,
    title,
    priority: Number(priority)
  }
  const page = {
    file,
    title,
    description,
    modified: new Date(sorted[0].date).toISOString(),
    created: new Date(sorted[sorted.length - 1].date).toISOString(),
    group
  }
  await fs.writeFile('./config/pages.json', JSON.stringify(Object(pages).concat(page)))
  if (groups[group]) {
    groups[group].push(fileConfig)
  } else {
    groups[group] = [{ ...fileConfig }]
  }
  await fs.writeFile('./config/groups.json', JSON.stringify(groups))
}

const dumpBlog = async (file, data) => {
  const { title, keywords, author, description, path } = data
  const commits = await getCommit(path)
  const sorted = commits.map(d => d.commit.author).sort((a, b) => new Date(b.date) - new Date(a.date))
  
  const post = {
    keywords,
    author,
    file,
    title,
    description,
    modified: new Date(sorted[0].date).toISOString(),
    created: new Date(sorted[sorted.length - 1].date).toISOString()
  }
  await fs.writeFile('./config/blog.json', JSON.stringify(Object(blog).concat(post)))
  if (file.includes("/")) {
    const group = file.split("/")[0]
    const resource = {
      file,
      title
    }
    if (resources[group]) {
      resources[group].push(resource)
    } else {
      resources[group] = [{ ...resource }]
    }
  }
  await fs.writeFile('./config/resources.json', JSON.stringify(resources))
}

module.exports = { dumpPages, dumpBlog }