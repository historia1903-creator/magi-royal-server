#!/data/data/com.termux/files/usr/bin/bash
BASE="$HOME/multiogar/ogar-sunucu"

if [ -f "$BASE/.magi-launcher.pid" ]; then
    PID="$(cat "$BASE/.magi-launcher.pid" 2>/dev/null)"
    [ -n "$PID" ] && kill "$PID" 2>/dev/null || true
    rm -f "$BASE/.magi-launcher.pid"
    sleep 1
fi

# Compatibility cleanup for the first multi-server patch.
for f in "$BASE"/.magi-ffa.pid "$BASE"/.magi-teams.pid "$BASE"/.magi-virus.pid; do
    if [ -f "$f" ]; then
        PID="$(cat "$f" 2>/dev/null)"
        [ -n "$PID" ] && kill "$PID" 2>/dev/null || true
        rm -f "$f"
    fi
done

echo "Magi Royal oyun sunuculari durduruldu."
