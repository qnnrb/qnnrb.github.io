/*
 * Write your server code in this file.
 *
 * name: Quinn Robertson
 * email: robertsq@oregonstate.edu
 */


var port_num = process.env.PORT
if (!(port_num)) { 
    process.env.PORT = 3000
    port_num = 3000
}
var http = require('http')
var fs = require('fs')

var server = http.createServer(function(req, res) { 
    console.log("== request received")
    console.log(" -- method: ", req.method)
    console.log(" -- url: ", req.url)
    console.log(" -- headers: ", req.headers)

    if (req.url === '/index.html' || req.url === '/') { 
        res.writeHead(200, {'Content-Type': 'text/html'})
        res.write(html)
    }
    else if (req.url === '/style.css') {
        res.writeHead(200, {'Content-Type': 'text/css'}) 
        res.write(style)
    } 

    else if (req.url === '/index.js') { 
        res.writeHead(200, {'Content-Type': 'application/javascript'})
        res.write(java) 
    } 

    else if (req.url === '/benny.jpg') { 
        res.writeHead(200, {'Content-Type': 'image/jpeg'}) 
        res.write(pic)
    }
    
    else if (req.url != '/benny.jpg' && req.url != '/index.html' && req.url != '/style.css' && req.url != '/index.js') { 
        res.writeHead(400, {'Content-Type': 'text/html'})
        res.write(error_page)
    } 

    res.end()
})

var html
fs.readFile('public/index.html', 'utf-8', function(err, contents) { 
    if (!err) { 
        console.log("== file contents: ", contents)
        html = contents
    }
    else { 
        throw err
    }
})

var style 
fs.readFile('public/style.css', 'utf-8', function(err, contents) { 
    if (!err) { 
        console.log("== file contents: ", contents)
        style = contents 
    }
    else { 
        throw err
    }
})

var java 
fs.readFile('public/index.js', 'utf-8', function(err, contents) { 
    if (!err) { 
        console.log("== file contents: ", contents)
        java = contents
    }
    else { 
        throw err
    }
})

var pic 
fs.readFile('public/benny.jpg', function(err, contents) { 
    if (!err) { 
        console.log("== file contents: ", contents)
        pic = contents 
    }
    else { 
        throw err
    }
})

var error_page 
fs.readFile('public/404.html', function(err, contents) { 
    if (!err) { 
        console.log("== file contents: ", contents)
        error_page = contents
    }
    else { 
        throw err
    }
})

server.listen(port_num, function() { 
    console.log("== server is listening on port: ", port_num )
})