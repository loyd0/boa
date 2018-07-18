const boa = new Boa;

console.log('Working');
document.addEventListener("DOMContentLoaded", function(event) {
    const document = Window.document;
    getBoa();

});

function getBoa() {
    const boa = document.getElementById('boa');
    const div = document.createElement("div");
    div.style.backgroundColor = "Black";
    div.style.width = "100px";
    div.style.height = "100px";
    boa.appendChild(div);
}

const p = boa.showConstruction
    .construct('p', 'class=ThisIsAclass this-another-class id=iIF', 'TEST')
    .down.construct('span', 'class=exampleSpan id=child', 'ing')
    .down.construct('div', 'class=exampleSpan id=div', '')
    .up.construct('b', 'style=font-weight:400', 'SUCCESS')
    .up.construct('div', 'style=font-weight:400', 'up one more')
    .down.construct('p', '', 'some amazing p content')
    .down.construct('span', '', 'this')
    .down.construct('span', '', 'might')
    .para.construct('span', '', 'work');

console.log(p.elements);