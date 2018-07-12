"use strict";


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



const boa = {
    constructor: function(tag, attributes) {
        console.log(validate([tag, "string"], [attributes, "string"]));
        if (validate([tag, "string"], [attributes, "string"])) {
            let element = createHTMLTag(tag);
            let elementAttributes = identifyAttr(attributes, regexes);
            console.log(elementAttributes);
            Object.keys(elementAttributes).forEach((attr) => {
                element.setAttribute(attr, elementAttributes[attr]);
            });
            console.log(element);
            
        }
    }
}


function validate(...args) {


    const argumentsToValidate = args.length;
    let argumentsValidated = 0;

    const invalid = args.filter(arg => typeof arg[0] != arg[1]);

    if (invalid.length === 0) {
        return true;
    } else {
       errorLog(`Error: Arguments given to constructor must be strings \n\n${invalid[0][0]} is not a ${invalid[0][0]}`);
    }
    //   args.forEach(function(arg, index) {
    //         if (typeof arg[0] == arg[1]) {
    //             argumentsValidated++;
    //             // End of the loop && all arguments match
    //             if (index === argumentsToValidate - 1 && argumentsValidated == argumentsToValidate) {
    //                 console.log('Returning True');
    //                 break;
    //                 return true;
    //             }
    //         } else {
    //             errorLog(`Error: Arguments given to constructor must be strings \n\n${arg[0]} is not a ${arg[1]}`);
    //             return false;
    //         }
    //     });
}

function errorLog(error) {
    return console.log(error);
}


// Tag creator function
function createHTMLTag(tag) {
    return document.createElement(tag);
}

function identifyAttr(string, regexes) {
    let attributes = {};

    let regex = regexes.attrRegex;

    // Test to see if there are Attributes in the string
    if (regex.test(string)) {

        // Resetting the last index for the iterations through the string
        regex.lastIndex = 0;

        //  Collecting the attributes
        let regexAttr;

        // Iterating through the string and finding the attributes
        // Pushes them into the attributes.name = data
        while ((regexAttr = regex.exec(string)) !== null) {
            attributes[regexAttr[2]] = regexAttr[3];
        }
    } else {
        attributes = false;
    }
    console.log(attributes);
    // Returns attributes object or false 
    return attributes;
}


// Regex Function to Parse Creation Strings
const regexes = {
    'attrRegex': RegExp(/(([\w\-]+)(?:= ?)([\w\-\.\/\:\; ]+)(?:|))/, 'g'),
}

// identifyAttr("class=test; testing=class", regexes);
identifyAttr("class=test biggerTest class-names-snaked| id=uniqueID| src=..path/o/to|", regexes);
// identifyAttr("no attributes", regexes);

// Child Functionality 
boa.constructor('div', 'class=ThisIsAclass this-another-class| id=iIF|');
// Parallel element functionality 

// Content adding to created elements

// Modifying elements post creation 
// Classes, IDs, src, content bare minimum




// Regex Function to Parse Creation Strings

// Child Functionality 

// Parallel element functionality 

// Content adding to created elements

// Modifying elements post creation 
// Classes, IDs, src, content bare minimum