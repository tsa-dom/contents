const about = `
          <div>
            <a href="https://tsa-dom.github.io/pages/main">Introduction</a>
          </div>
          
          <div>
            <a href="https://tsa-dom.github.io/pages/about">About me</a>
          </div>
          <h4 id="hi-im-tapio-salonen">Hi, I&#39;m Tapio Salonen!</h4>
<p>I&#39;m a Computer Science student at the University of Helsinki which passion is especially Agile Software Development.</p>
<p>The best way to learn new things is to teach others. I&#39;m eager to learn new things constantly and that&#39;s one of the reasons why I set up this blog platform. Topics that I&#39;m going to cover through posts are related to my interests which are for example Full Stack development, programming techniques, DevOps, and much mor</p>
`

const post = `<h3 id="this-is-test-article">This is test article</h3>
<p>Lets try some jsx</p>
<pre><code class="language-jsx">import React from &#39;react&#39;

const App = () =&gt; {

  // Contents here are going to change a little bit
  // After this file change something should happen

  return (
    &lt;div&gt;This is test component&lt;/div&gt;
  )
}

export default App
</code></pre>
<h3 id="test-ends">Test ends</h3>
`

const blogTree = {
  path: './blog',
  name: 'blog',
  children: [
    { path: 'blog/index.html', name: 'index.html' },
    { path: 'blog/react', name: 'react', children: [
      { path: 'blog/react/theme-toggle.html', name: 'theme-toggle.html' }
    ] },
    { path: 'blog/seo', name: 'seo', children: [
      {
        path: 'blog/seo/react-app-seo-for-github-pages.html',
        name: 'react-app-seo-for-github-pages.html'
      }
    ] },
    { path: 'blog/test', name: 'test', children: [
      { path: 'blog/test/test.html', name: 'test.html' },
      { path: 'blog/test/test2.html', name: 'test2.html' },
      { path: 'blog/test/yttest.html', name: 'yttest.html' }
    ] },
    { path: 'blog/test2', name: 'test2', children: [
      { path: 'blog/test2/test.html', name: 'test.html' },
      { path: 'blog/test2/test2.html', name: 'test2.html' }
    ] },
    { path: 'blog/testim.html', name: 'testim.html' }
  ]
}

const blogTreeResult = [
  'blog/index',
  'blog/react/theme-toggle',
  'blog/seo/react-app-seo-for-github-pages',
  'blog/test/test',
  'blog/test/test2',
  'blog/test/yttest',
  'blog/test2/test',
  'blog/test2/test2',
  'blog/testim'
]

const expectedContent = `\t\t<title>This is something very interesting</title>
\t\t<meta
\t\t\tname="description"
\t\t\tcontent="Lets try if the script can access this"
\t\t>
\t\t<meta
\t\t\tname="author"
\t\t\tcontent="Tapio Salonen"
\t\t>
\t\t<meta
\t\t\tname="keywords"
\t\t\tcontent="Test"
\t\t>`

const generatedHtml = ` <!DOCTYPE html>
 <html>
  <head>
    <meta charset="utf-8">
          <title>This is something very interesting</title>
          <meta
                  name="description"
                  content="Lets try if the script can access this"
          >
          <meta
                  name="author"
                  content="Tapio Salonen"
          >
          <meta
                  name="keywords"
                  content="Test"
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
 this works pretty well      </div>
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
 </html>`

module.exports = {
  about,
  post,
  blogTree,
  blogTreeResult,
  expectedContent,
  generatedHtml
}