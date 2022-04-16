function sign_out(){
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
    console.log(error);
  });
}

function setup_power_button(isLocked, show_msg=true, disabled=false) {
  $("#power-button").prop("disabled", disabled);
  if (isLocked) {
    $("#power-button").removeClass("btn-outline-warning");
    $("#power-button").addClass("btn-success");
    $("#power-text").text("Unlock");
    if (show_msg) toast("Surface cabinet locked");
  } else {
    $("#power-button").removeClass("btn-success");
    $("#power-button").addClass("btn-outline-warning");
    $("#power-text").text("Lock");
    $("#toast-msg").text("Surface cabinet unlocked");
    if (show_msg) toast("Surface cabinet unlocked");
  }
}

function toggle_solenoid() {
  operateSolStatus((solStat) => {
    operateBatteryDevice((batDev) => {
      if (solStat == true) {
        setSolStatus(false);
        $("#power-button").prop("disabled", true);
      } else if (batDev == "bat") {
        toast("Not enough power: LOCKING DISABLED!", "red");
      } else {
        setSolStatus(true);
        $("#power-button").prop("disabled", true);
      }
    });
  });
}

has_setup = false;
$("#power-button").prop("disabled", true);

firebase.database().ref('deployment/solenoid/response').on('value', (snapshot) => {
  var stat = snapshot.val();

  operateBatteryDevice((dev) => {
    stat = stat && (dev != "bat");
    setup_power_button(stat, show_msg=has_setup, disabled=false);
    if (!has_setup) has_setup = true;
  });
});

