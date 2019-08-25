const {
    ipcRenderer,
    remote
} = require('electron');
const Mousetrap = require('mousetrap');
window.onclick = function(e) {
    if (e.target.tagName == "A") {
        ipcRenderer.send('linkOpen', e.target.href);
    }
}

var ses = remote.session.defaultSession;

ses.flushStorageData();
ses.clearStorageData({
    storages: ['appcache', 'serviceworkers', 'cachestorage', 'websql', 'indexdb'],
});

window.navigator.serviceWorker.getRegistrations().then(registrations => {
    for (let registration of registrations) {
        registration.unregister();
    }
});

window.onload = () => {
    const titleEl = document.querySelector('.landing-title');
    if (titleEl && titleEl.innerHTML.includes('Google Chrome 49+')) {
        window.location.reload();
    }
}