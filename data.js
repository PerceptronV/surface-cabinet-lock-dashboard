const BATMAP = {
  0: 'unk',
  1: 'usb',
  2: 'bat'
}

function operateDB(path, func) {
  const dbRef = database.ref();
  dbRef.child(path).get().then((snapshot) => {
    if (snapshot.exists()) {
      func(snapshot.val());
    } else {
      console.log("No data available");
      func(null);
    }
  }).catch((error) => {
    console.error(error);
    func(undefined);
  });
}

function operateSolStatus(func) {
  operateDB("deployment/solenoid/lock", func);
}

function operateSolResponse(func) {
  operateDB("deployment/solenoid/response", func);
}

function setSolStatus(val) {
  firebase.database().ref("deployment/solenoid").update({'lock': val});
  if (DEBUG) setTimeout(() => {
    firebase.database().ref("deployment/solenoid").update({'response': val});
  }, 1000);
}

function operateBatteryDevice(func) {
  operateDB("deployment/battery/device", (devIdx) => {
    func(BATMAP[devIdx]);
  });
}
