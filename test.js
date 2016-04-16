abort事件
//如果客户端取消了请求的时候就会触发，而且只会第一次取消的时候触发
connect事件
//函数签名为：function (response, socket, head) { }，每次服务器通过CONNECT方法来回应客户端的时候触发。如果客户端没有监听这个事件那么当接收到服务器的CONNECT方法的时候就会关闭连接。
continue事件
//当服务器发送一个100 Continue的HTTP响应的时候触发，一般是因为客户端发送了Expect: 100-continue'，这时候客户端应该发送消息体
response事件
//获取到请求的时候触发，而且只会触发一次，response对象是一个http.IncomingMessage.
socket事件
//如果这个request对象获取到一个socket的时候就会触发
upgrade事件
//如果服务器端通过发送一个upgrade响应客户端的请求的时候触发。如果客户端没有监听这个事件那么当客户端收到一个upgrade请求头的时候那么连接就会关闭





