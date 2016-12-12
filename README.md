读取log T的日志

请求类似
127.0.0.1:7001/api/getlog?data={"host":"mongodb://192.168.1.183:27017/mslog","tables":"kmy"}
或者
127.0.0.1:7001/api/getlog?data={"host":"mongodb://192.168.1.183:27017mslog","tables":"kmy","where":{"level":"error"}}