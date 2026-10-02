const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE = __dirname;
const SRC = path.join(BASE, 'src');
const LOGDIR = path.join(BASE, 'logs');
fs.mkdirSync(LOGDIR, { recursive: true });

const modes = [
    { key: 'ffa', label: 'FFA', port: 8080, mode: 0 },
    { key: 'teams', label: 'Teams', port: 8081, mode: 1 },
    { key: 'virus', label: 'Virus Pop', port: 8082, mode: 4 }
];

const children = new Map();
let stopping = false;

function randomBots() {
    return 11 + Math.floor(Math.random() * 10);
}

function launch(def) {
    if (stopping) return;

    const logPath = path.join(LOGDIR, `${def.key}.log`);
    const fd = fs.openSync(logPath, 'a');
    const bots = randomBots();
    const child = spawn(process.execPath, ['index.js'], {
        cwd: SRC,
        env: {
            ...process.env,
            PORT: String(def.port),
            GAME_MODE: String(def.mode),
            BOTS: String(bots),
            SERVER_NAME: `Magi Royal - ${def.label}`,
            SERVER_WELCOME: `Magi Royal ${def.label} sunucusuna hos geldin!`
        },
        stdio: ['ignore', fd, fd]
    });
    fs.closeSync(fd);
    children.set(def.key, child);

    child.on('exit', () => {
        children.delete(def.key);
        if (!stopping) setTimeout(() => launch(def), 1500);
    });
}

function shutdown() {
    if (stopping) return;
    stopping = true;
    for (const child of children.values()) {
        try { child.kill('SIGTERM'); } catch (_) { }
    }
    setTimeout(() => process.exit(0), 500);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
process.on('exit', () => {
    for (const child of children.values()) {
        try { child.kill('SIGTERM'); } catch (_) { }
    }
});

for (const mode of modes) launch(mode);
setInterval(() => {}, 60 * 60 * 1000);
