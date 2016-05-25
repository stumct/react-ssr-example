import http from 'http'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import fs from 'fs'
import zlib from 'zlib'
import routes from '../src/routes/RootRoute'

const PORT = process.env.PORT || 5000

function renderApp(props, res) {
  const markup = renderToString(<RouterContext {...props}/>)
  const html = createPage(markup)
  write(html, 'text/html', res)
}

function writeError(msg, res) {
  res.writeHead(500, { 'Content-Type': 'text/html' })
  res.write('ERROR!')
  res.end()
}

function redirect(location, res) {
  res.writeHead(303, { 'Location': location })
  res.end()
}

function writeNotFound(res) {
  res.writeHead(404, { 'Content-Type': 'text/html' })
  res.write('Not Found')
  res.end()
}

function write(string, type, res) {
  zlib.gzip(string, (err, result) => {
    res.writeHead(200, {
      'Content-Length': result.length,
      'Content-Type': type,
      'Content-Encoding': 'gzip'
    })
    res.write(result)
    res.end()
  });
}

function createPage(html) {
  return `
  <!doctype html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>My Universal App</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script src="/dist/bundle.js"></script>
    </body>
  </html>
  `
}


http.createServer((req, res) => {
console.log(req.url);
  if (req.url === '/favicon.ico') {
    write('haha', 'text/plain', res)
  }
  //else if (req.url === '/about/foo') {
  //  write('haha', 'text/plain', res)
  //}

  // serve JavaScript assets
  else if (/dist/.test(req.url)) {
    fs.readFile(`.${req.url}`, (err, data) => {
      write(data, 'text/javascript', res)
    })
  }

  // handle all other urls with React Router
  else {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error)
        writeError('ERROR!', res)
      else if (redirectLocation)
        redirect(redirectLocation, res)
      else if (renderProps)
        renderApp(renderProps, res)
      else
        writeNotFound(res)
    })
  }

}).listen(PORT)
console.log(`listening on port ${PORT}`)