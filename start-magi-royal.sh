#!/data/data/com.termux/files/usr/bin/bash
set -u
BASE="$HOME/multiogar/ogar-sunucu"
LOGDIR="$BASE/logs"
mkdir -p "$LOGDIR"

"$BASE/stop-magi-royal.sh" >/dev/null 2>&1 || true
sleep 1

cd "$BASE" || exit 1
nohup node "$BASE/magi-launcher.js" > "$LOGDIR/launcher.log" 2>&1 &
echo $! > "$BASE/.magi-launcher.pid"

OK=0
for i in 1 2 3 4 5 6 7 8; do
    if node "$BASE/magi-healthcheck.js" >/dev/null 2>&1; then
        OK=1
        break
    fi
    sleep 1
done

if [ "$OK" -ne 1 ]; then
    echo "Sunucular baslatilamadi. Loglar:"
    for f in ffa teams virus; do
        echo "--- $f ---"
        tail -n 8 "$LOGDIR/$f.log" 2>/dev/null || true
    done
    exit 1
fi

echo "Magi Royal sunuculari AKTIF"
echo "FFA       : 8080"
echo "Teams     : 8081"
echo "Virus Pop : 8082"
