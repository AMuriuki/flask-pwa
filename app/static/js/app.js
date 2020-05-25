var swRegistration = null;
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('./service-worker.js')
        .then(function (registration) {
            console.log('Service Worker Registered!');
            var options = {
                body: 'Here is a notification body!',
                icon: 'static/images/pwa.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                },
                actions: [
                    {
                        action: 'explore', title: 'Explore this new world',
                        icon: 'static/images/checkmark.png'
                    },
                    {
                        action: 'close', title: 'Close notification',
                        icon: 'static/images/xmark.jpg'
                    },
                ]
            };
            swRegistration = registration;
            registration.showNotification('Hello world!', options);
            return registration;
        })
        .catch(function (err) {
            console.error('Unable to register service worker.', err);
        });
}


Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
});

// Push Notifications
const pushButton = document.getElementById('push-btn');
pushButton.addEventListener('click', askPermission);
notificationButtonUpdate();

if (!("Notification" in window)) {
    pushButton.hidden;
}

function askPermission(evt) {
    pushButton.disabled = true;
    Notification.requestPermission().then(function (permission) { notificationButtonUpdate(); });
}

function notificationButtonUpdate() {
    if (Notification.permission == 'granted') {
        pushButton.disabled = true;
    } else {
        pushButton.disabled = false;
    }
}

navigator.serviceWorker.ready.then(function (swRegistration) {
    return swRegistration.sync.register('example-tag');
});

if ('geolocation' in navigator) {
    document.getElementById('askLocation').addEventListener('click', function () {
        navigator.geolocation.getCurrentPosition(function (location) {
            console.log(location);
        });
    });
} else {
    console.log('Geolocation API not supported.');
}