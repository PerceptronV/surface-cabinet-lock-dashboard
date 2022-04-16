var locktime, unlocktime;
var lockTried = false, unlockTried = false;

firebase.database().ref('deployment/timing').on('value', (snapshot) => {
  var vals = snapshot.val();
  locktime = vals['lock'];
  unlocktime = vals['unlock'];
  $('#locktime').val(locktime);
  $('#unlocktime').val(unlocktime);
});

function revertLocktimes() {
  $('#locktime').val(locktime);
  $('#unlocktime').val(unlocktime);
}

function updateLocktimes() {
  var timedata = {
    'lock': $('#locktime').val(),
    'unlock': $('#unlocktime').val()
  };
  firebase.database().ref("deployment/timing").update(timedata);
  document.getElementById("modal-close-button").click();
}

function pad(n) {
  if (n < 10) return '0' + n;
  return n;
}

function getMinSec() {
  var now = new Date();
  return pad(now.getHours()) + ":" + pad(now.getMinutes());
}

function locktimeHandler() {
  var minSecNow = getMinSec();
  if (minSecNow == locktime) {
    if (!lockTried) {
      operateBatteryDevice((batDev) => {
        if (batDev == "bat") {
          toast("AUTOLOCKING FAILED - System on battery, not enough power", "red");
          notify("AUTOLOCKING FAILED - System on battery, not enough power");
          lockTried = true;
        } else {
          lock_solenoid();
          lockTried = true;
        }
      });
    }
  } else {
    lockTried = false;
  }
  
  if (minSecNow == unlocktime) {
    if (!unlockTried) {
      unlock_solenoid();
      unlockTried = true;
    }
  } else {
    unlockTried = false;
  }
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    setInterval(locktimeHandler, 1000);
  }
});
