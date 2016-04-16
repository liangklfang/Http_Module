var http=require('http');
var querystring=require('querystring');
var postData = querystring.stringify({
  'msg' : 'Hello World!'
});
var options = {
  hostname: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': postData.length
  }
};
//这里的req对象是一个Class: http.ClientRequest
var req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.')
  })
});
//如果DNS解析错误，TCP错误，HTTP解析错误就会触发error事件
req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});
// write data to request body
//把数据写入到请求体中
req.write(postData);
req.end();
//使用http.request方法时候必须调用re.end方法来表示没有请求体发送了，也就是请求完成了。