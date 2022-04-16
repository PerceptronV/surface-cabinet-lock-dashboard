var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})

function sign_in() {
    var email = $("#username").val() + "@solos-mg.firebaseapp.com";   // + "@" + $("#domain").val();
    var password = $("#password").val();

    $("#username").val("");
    $("#password").val("");

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Signed in
        $("#warning").css("display", "none");
        // ...
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);

        var warningbox = $("#warning");
        warningbox.css("display", "block");
        warningbox.html(errorMessage.slice(9));
    });
}

$("#password").keypress(function (e) {
    if (e.which == 13) {
        document.getElementById("sign-in-button").click();
    }
});

$("#show-password").click(function () {
    var checked = $("#show-password").is(":checked");
    if (checked) $("#password").attr("type", "text");
    else $("#password").attr("type", "password");
});
    