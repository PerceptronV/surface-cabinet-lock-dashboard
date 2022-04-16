function toast(msg, color="blue") {
  if (color == "blue") {
    var classname = "toast align-items-center border-0 text-white bg-primary";
  } else if (color == "red") {
    var classname = "toast align-items-center border-0 text-white bg-danger";
  } else if (color == "yellow") {
    var classname = "toast align-items-center border-0 text-white bg-warning";
  } else {
    var classname = "toast align-items-center border-0 text-white bg-primary";
  }

  $("#toast-msg").text(msg);
  document.getElementById("liveToast").className = classname;
  var toast = new bootstrap.Toast(document.getElementById('liveToast'));
  toast.show();
}
