读取log T的日志
===

请求类似
<br>

<pre><code>
127.0.0.1:7001/api/getlog?data={"host":"mongodb://192.168.1.183:27017/mslog","tables":"kmy"}
</code></pre>
或者<br>
<pre><code>
127.0.0.1:7001/api/getlog?data{"host":"mongodb://127.0.0.1:27017/mslog","tables":"kmy","condition":{"where":{"level":"info"},"limit":10,"sort":{"createdate":-1}}}
</code></pre>