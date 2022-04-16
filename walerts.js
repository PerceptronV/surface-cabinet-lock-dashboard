const COLORMAP = {
    'blue': 'primary',
    'red': 'danger',
    'yellow': 'warning'
}

function newWalertDiv(text, color) {
    var newDiv = document.createElement("div");
    newDiv.innerHTML = text;
    newDiv.className = "alert alert-" + COLORMAP[color] + " walert flex-fill";
    newDiv.setAttribute("role", "alert");
    return newDiv;
}

var warnings_div = document.getElementById("warnings-container");
firebase.database().ref('deployment/warnings').on('value', (snapshot) => {
    var snapval = snapshot.val();
    var keys = Object.keys(snapval);
    for (k in keys) {
        warnings_div.appendChild(
            newWalertDiv(
                keys[k] + ": " + snapval[keys[k]], "red"
            )
        );
    }
});

var alerts_div = document.getElementById("alerts-container");
firebase.database().ref('deployment/alerts').on('value', (snapshot) => {
    var snapval = snapshot.val();
    var keys = Object.keys(snapval);
    for (k in keys) {
        alerts_div.appendChild(
            newWalertDiv(
                keys[k] + ": " + snapval[keys[k]], "yellow"
            )
        );
    }
});
