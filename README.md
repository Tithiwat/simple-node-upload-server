# Simple Node Upload Server
Simple Node Upload Server in Docker Container

To build container, using the command
```shell
docker build -t [Docker repository][:TAG] .
```

For example,
```shell
docker build -t tithiwat/simple-node-upload-server:latest .
```

To run container, using the command
```shell
docker run --rm -p [YOUR_PORT]:8080 -v="[HOST]:/usr/src/app/upload" -d [Docker repository][:TAG]
```

For example,
```shell
docker run --rm -p 8080:8080 -d -v=".:/usr/src/app/upload" tithiwat/simple-node-upload-server:latest
```


Lastly, use Web browser (Chrome) to inspect
## Result
![Result](https://raw.githubusercontent.com/Tithiwat/simple-node-upload-server/master/images/result.png)

