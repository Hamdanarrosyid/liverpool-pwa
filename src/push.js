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
  endpoint: 'https://fcm.googleapis.com/fcm/send/cymuY2FU6C4:APA91bE6YYtpP6Q-HPbcIfAUMIx7sCIPtlK_rIa6JFjUF49BlAqh3O2uW2Or8xyP3DvvdbywMBEyVA8wYGIF17KqFjSwdToJEr2VBetz9IdCG5HZ8VgNpcnZqcRlxMAr9cQiTygqkNdJ',
  keys: {
    p256dh: 'BLbIXhe9y/QD/AVOqeqYJUw0o73SLLlpe8kXOClusswZhIXOBlI4sXnffcHc04sHiGKFY+MLrDsUS2W2kkfUGXM=',
    auth: 'O5cIAhYrqEdRnLfUHLg+Hg==',
  },
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

const options = {
  gcmAPIKey: '483922158895',
  TTL: 60,
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options,
);
