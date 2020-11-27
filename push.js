const webPush = require('web-push');

const vapidKeys = {
  publicKey: 'BNbRYTvzDX5hYSH0jTeYVuztMOUoUFLHGGNDWMoz4p2TBIo3Nfw5rH8eFiR6DnGWETRj6ofLyCmumzhxCoYbhH4',
  privateKey: 'qJSwggoSa9VGVjwM9ZpYGKSo9jevkG5JY2QuNoq7n4c',
};

webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey,
);
const pushSubscription = {
  endpoint: 'https://fcm.googleapis.com/fcm/send/etcgjEdTTw4:APA91bH_5dPUIVIoyQHVnuh5LbOiFF5hIrp-mSZwL6_CuKMYPDNfbfvbv9uxn45ESuN0XzoISkS0pyysDh6ON_w-xk2ReaC2WyMa6NqLs3LIUgqybRKP8PRG4BCZBAth39qUuv-P535O',
  keys: {
    p256dh: 'BFISL53jMJQacYOsKNWIuuFVavKCFjooTsw1kCbsCT/s0pauVF+dHIfy/MooPY3pIYMpo7vy4ukVYJMSS3SRH4w=',
    auth: 'O5cIAhYrqEdRnLfUHLg+Hg==',
  },
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
  gcmAPIKey: 'DXOT5LwCx8nm9WG78cLYXg==',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
