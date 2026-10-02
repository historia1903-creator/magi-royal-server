# Ogar.io oyun sunucusu - Kurulum (Render)

1. github.com'da yeni bir depo aç, bu klasördeki her şeyi yükle.
2. render.com'a GitHub ile giriş yap -> New -> Web Service -> deponu seç.
3. Build Command: npm install   Start Command: npm start
4. Create'e bas. Sana https://ADIN.onrender.com gibi bir adres verir.
5. Oyun sitende Yönetim -> Oyun sunucuları -> adres: wss://ADIN.onrender.com -> Ekle.
6. Eski "Ana Sunucu" (localhost) kaydını sil.

Not: Ücretsiz planda sunucu boş kalınca uyur, ilk girişte ~1 dk açılır.
Kesintisiz için ücretli plan, Railway ya da VPS (Dockerfile hazır).
Ayarlar (bot sayısı, harita): src/config.js
