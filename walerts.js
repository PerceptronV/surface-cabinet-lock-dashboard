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

function removeChildren(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

var warnings_div = document.getElementById("warnings-container");
firebase.database().ref('deployment/warnings').on('value', (snapshot) => {
    var snapval = snapshot.val();
    var keys = Object.keys(snapval);
    removeChildren(warnings_div);

    for (k in keys) {
        var text = keys[k] + ": " + snapval[keys[k]];
        warnings_div.appendChild(newWalertDiv(text, "red"));
        notify(text);
    }
});

var alerts_div = document.getElementById("alerts-container");
firebase.database().ref('deployment/alerts').on('value', (snapshot) => {
    var snapval = snapshot.val();
    var keys = Object.keys(snapval);
    removeChildren(alerts_div);

    for (k in keys) {
        var text = keys[k] + ": " + snapval[keys[k]];
        alerts_div.appendChild(newWalertDiv(text, "yellow"));
        notify(text);
    }
});
