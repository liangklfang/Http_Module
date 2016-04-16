Class: http.Agent
这个HTTP Agent默认使得客户端的请求使用了Connection:keep-alive，但是不需要使用KeepAlive手动关闭。如果你需要使用HTTP的KeepAlive选项，那么你需要在创建一个Agent对象的时把flag设置为true。这时候Agent就会保持在连接池中那些没有使用的连接处于活动状态已被后续使用。这时候的连接就会被显示标记从而不让Node.js的进程一直运行。当然，当你确实不需要使用KeepAlive状态的agent的时候显示的调用destroy方法还是很好的选择，这时候Socket就会被关闭。注意：当socket触发了'close'或者'agentRemove'事件的时候就会从aget池中被移除，因此如果比需要让一个HTTP请求保持长时间的打开状态，同时不想让这个连接在Agent池的时候可以使用下面的方法：
	http.get(options, (res) => {
	  // Do stuff
	}).on('socket', (socket) => {
	  socket.emit('agentRemove');
	});
但是，如果你需要把所有的连接都不让Agent池来管理可以把agent:false
http.get({
  hostname: 'localhost',
  port: 80,
  path: '/',
  agent: false  // create a new agent just for this one request
}, (res) => {
  // Do stuff with response
})
new Agent([options])
这个options可以是如下的内容：
 。keepAlive:布尔值，默认为false,表示让Agent池中的socket保持活动状态用于未来的请求。
 。keepAliveMsecs,当使用了HTTP的KeepAlive的时候，多久为keep-alive的socket发送一个TCP的KeepAlive数据包。默认为1000，但是只有keepAlive设置为true时候才可以
 。maxSockets:每一个主机下面最多具有的socket数量，默认为Infinity
 。maxFreeSockets:处于活动状态的最多的socket数量，默认为256，在keepAlive设置为true时候可用
 注意：http.globalAgent对象所有值都是默认值的
 const http = require('http');
var keepAliveAgent = new http.Agent({ keepAlive: true });
options.agent = keepAliveAgent;
http.request(options, onResponseCallback);
Agent对象有如下一系列的方法：
agent.destroy()
//销毁agent当前正在使用的socket。一般情况没有必要调用，如果你使用了Agent对象并把keepAlive设置为true的时候，当你明确知道以后不需要使用这个socket的时候就需要显示的销毁。否则，这个socket长时间等待服务器销毁
agent.freeSockets
//表示HTTP的keepAlive被使用的时候，这个选项表示当前Agent等待使用的socket，是一个socket数组
agent.getName(options)
//获取一个唯一的值，这个值是在reques对象的options中设置的，使用这个值决定这个连接是否可以重用。在http Agent中返回host:port:localAddress，在https Agent，包含CA, cert, ciphers, and other HTTPS/TLS-specific options that determine socket reusability.
agent.maxFreeSockets
//默认为256.如果这个agent支持KeepAlive，那个这个值表示处于空闲状态的最大的socket
agent.maxSockets
//默认为Infinity,用于指定agent可以在一个域下面提供的最大的并发的socket数量。origion可以是'host:port' or 'host:port:localAddress' combination.
agent.requests
//用于获取一个请求数组，这个数组中保存的是请求对象，表示还没有发送也就是在等待的请求的数量。不要修改他！
agent.sockets
//用于指定当前正在被使用的Agent中的sockets数组，不要修改这个值
