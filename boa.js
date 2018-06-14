document.addEventListener("DOMContentLoaded", function (event) {
    // Your code to run since DOM is loaded and ready
    getBoa();
});

function getBoa() {
    var document = window.document;
    const boa = document.getElementById("boa");
    const div = document.createElement("div");
    div.style.backgroundColor = "Black";
    div.style.width = "100px";
    div.style.height = "100px";
    boa.appendChild(div);
}

