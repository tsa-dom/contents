const fs = require('fs')
const blog = require('./config/blog.json')

const generateBlogContainer = () => {
  let html = ''
  for (post of blog) {
    if (post.file.includes('test')) continue
    html = html + `
      <div>
        <strong>${post.title}</strong>
        <div>${post.description}</div>
        <a href="https://tsa-dom.github.io/blog/${post.file}">Read</a>
        <hr>
      </div>
  `
  }
  return html
}

const blogContainer = generateBlogContainer()

const indexFile = `
<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8">
    <title>All blog posts</title>
    <meta
      name="description"
      content="Find you answers to your questions here"
      data-rh="true"
    />
    <meta
      name="author"
      content="Tapio Salonen"
    >
    <link rel="icon" href="%PUBLIC_URL%/../favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta name="google-site-verification" content="sGo3V_g8qjmhW-tRL3VFR4q_sFXWointhBROBAAZpNw" />
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/../logo192.png" />
    <link rel="manifest" href="%PUBLIC_URL%/../manifest.json" />
  </head>
  <body>
    <div id="root"></div>
    <noscript>
      <div id="menu-nav">
        <a class="menu-link" href="https://tsa-dom.github.io">Home</a>
        <a class="menu-link" href="https://tsa-dom.github.io/blog">Blog</a>
        <a class="menu-link" href="https://tsa-dom.github.io/pages/contributors">Contributors</a>
      </div>
      <div id="container">
        ${blogContainer}
      </div>
      <style>
        #container {
          margin: auto;
          max-width: 700px;
          font-size: 20px;
          margin-top: 30px;
        }
        body {
          margin: 0;
          font-family: sans-serif;
        }
        #menu-nav {
          width: 100%;
          min-height: 50px;
          background-color: black;
          color: white;
          text-align: center;
          font-size: 30px;
          padding-top: 10px;
        }
        .menu-link {
          padding: 20px;
          color: white !important;
        }
        .menu-link:hover {
          color: grey !important
        }
      </style>
    </noscript>
  </body>
</html>
`

fs.writeFile('./blog/index.html', indexFile, (err) => console.log(err))