---
marp: true
---

# タイトル


## 環境設定

1. VSCode
2. Nodejs
---


## Project Setting

1. 新しいフォルダ作成
2. VSCodeで作成したフォルダを開く
3. VSCodeに内装されたTermianlで以外のコマンド実行

```bash
npm init -y
npm install net
npm install readline
```

4. 以下のファイルが生成されたら、セッチング完了

```bash
📦node-tcp-student
 ┣ 📂node_modules
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

---

## server.js

```js
const net = require('net');
const port = 3000;

const server = net.createServer(socket => {

    //======================
    //ClientからDataを受けたら実行する。
        socket.on('data', data => {
        console.log(data + ' from ' + socket.remoteAddress + ':' + socket.remotePort);
        socket.write('server -> Repeating: ' + data); //Clientに返信(Dataを送信)
    });
    //======================

    //======================
    //Clientが接続が切れたら実行する
    socket.on('close', () => {
        console.log('client closed connection');
    });
    //======================
}).listen(port);

console.log('listening on port ' + port);
```

---

## Client.js

```js
const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = net.connect('3000', 'localhost', () => {
    console.log('connected to server');
    client.write('Hello World!'); // ServerへDataを送信
});

//========================
//ServerからData受けたら、実行
client.on('data', data => {
    console.log("" + data);
});
//========================

client.on('close', () => {
    console.log('client-> connection is closed');
    client.destroy();
});

rl.on("line", (line) => {
    client.write(line);
});
```

---

## BroadCast追加

```js

const net = require('net');
var clients = [];

const server = net.createServer(socket => {

    clients.push(socket);
    
    socket.on('data', data => {
        console.log(data + ' from ' + socket.remoteAddress + ':' + socket.remotePort);
        socket.write('server -> Repeating: ' + data);
        BroadCast(socket, data);
    });

    socket.on('error', () => {

    })

    socket.on('close', () => {
        clients.pop();
        console.log('client closed connection');
    });
}).listen(3000);

console.log('listening on port 3000');

function BroadCast(socket, data)
{
    clients.forEach(client => {
    
        if(socket == client) return;
        client.write(data);
    });
}
```