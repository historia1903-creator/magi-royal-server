const net = require('net');
const ports = [8080, 8081, 8082];

function check(port) {
    return new Promise((resolve) => {
        const socket = net.createConnection({ host: '127.0.0.1', port });
        const done = (ok) => {
            socket.removeAllListeners();
            socket.destroy();
            resolve(ok);
        };
        socket.setTimeout(700);
        socket.once('connect', () => done(true));
        socket.once('timeout', () => done(false));
        socket.once('error', () => done(false));
    });
}

Promise.all(ports.map(check)).then((states) => {
    if (states.every(Boolean)) process.exit(0);
    process.exit(1);
});
