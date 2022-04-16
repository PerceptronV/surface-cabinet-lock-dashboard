firebase.database().ref('deployment/sensors/mq2').on('value', (snapshot) => {
  $('#mq2-val').text(snapshot.val());
});

firebase.database().ref('deployment/sensors/fsr').on('value', (snapshot) => {
  $('#fsr-val').text(snapshot.val());
});
