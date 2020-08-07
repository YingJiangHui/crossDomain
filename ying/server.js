let http = require('http');
let url = require('url');
let fs = require('fs');
let port = process.argv[2];
if (!port) {
    console.log('端口都不指定的的吗？来个\n node server 8888也行啊');
    process.exit(1);
}
let server = http.createServer(function(request, response) {
    let parseUrl = url.parse(request.url, true);
    let pathWidthQuery = request.url;
    let queryStr = '';
    if (pathWidthQuery.indexOf('?') >= 0) queryStr = pathWidthQuery.substring(pathWidthQuery.indexOf('?'));
    let path = parseUrl.path;
    let query = parseUrl.query;
    let method = parseUrl.method;
    console.log('有个大帅哥发来了请求！路径为：' + pathWidthQuery);
    if (path === "/index.html") {
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/html;charset=utf-8');
        response.write(fs.readFileSync('./public/index.html'))
        response.end()
    }else if (path === '/ying.js') {
        response.statusCode = 200;
        response.setHeader('Content-type', 'text/js;charset=utf-8');
        response.write(fs.readFileSync('public/ying.js'))

        response.end()
    } else {
        response.statusCode = 400;
        response.setHeader('Content-type', 'text/html;charset=utf-8');
        response.write(`
        <DOCTYPE html>
        <head>
        </head>
        <body>
            <h1>！你走错了这里啥都没有给你来个404自己收好</h1>
        </body>
        `)
        response.end();
    }
})

server.listen(port);
console.log('监听' + port + "成功 请使用打开：http://localhost:" + port);
