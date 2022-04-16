if (USE_NOTIFICATIONS) {
  const NOTIFCATION_SUPPORT = ('Notification' in window);

  if (NOTIFCATION_SUPPORT && Notification.permission == "default") {
    alert("Please allow notifications to be notified of alerts and warnings");
    Notification.requestPermission().then(function (permission) {
      if (permission != "granted") toast("Permission not granted! You will not be notified of alerts and warnings!", "yellow")
    });
  }
}

function notify(msg) {
  // https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API#closing_notifications

  if (USE_NOTIFICATIONS) {
    try {
      var n = new Notification("Surface Cabinet - " + msg);
      document.addEventListener('visibilitychange', function() {
        if (document.visibilityState === 'visible') {
          // The tab has become visible so clear the now-stale Notification.
          n.close();
        }
      });
    } catch (error) {console.log(error);}
  }
}
