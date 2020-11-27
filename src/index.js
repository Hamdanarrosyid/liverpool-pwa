// import '../assets/js/idb';
import 'regenerator-runtime';
import '../assets/css/style.css';
import '../assets/js/nav';
import '../assets/js/api';
import '../assets/js/db';

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
navigator.serviceWorker.ready.then(() => {
  if (('PushManager' in window)) {
    navigator.serviceWorker.getRegistration().then((registration) => {
      registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array('BNbRYTvzDX5hYSH0jTeYVuztMOUoUFLHGGNDWMoz4p2TBIo3Nfw5rH8eFiR6DnGWETRj6ofLyCmumzhxCoYbhH4'),
      }).then((subscribe) => {
        console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
        console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
          null, new Uint8Array(subscribe.getKey('p256dh')),
        )));
        console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
          null, new Uint8Array(subscribe.getKey('auth')),
        )));
      }).catch((e) => {
        console.error('Tidak dapat melakukan subscribe ', e.message);
      });
    });
  }
});
