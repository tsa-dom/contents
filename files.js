const fs = require('fs')
const blog = require('./config/blog.json')

const generateBlogContainer = () => {
  let html = ''
  for (post of blog) {
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
      <title></title>
    </head>
  <body>
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