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


const Boa = function() {
    this.elements = [];
    this.regexes = {
        attrRegex: new RegExp(/(([\w\-]+)(?:= ?)([\w\-\.\/\:\; ]+)(?:|))/, 'g'),
    };
    // this.constructor = constructor;
    // this.attach = attach
    // this.validate = validate
};


Boa.prototype.constructor = function(tag, attributes, content = "") {
    if (this.validate([tag, "string"], [attributes, "string"], [content, "string"])) {
        let element = this.createHTMLTag(tag);
        let elementAttributes = this.identifyAttr(attributes);
        let htmlContent = this.createContent(content);
        // console.log(htmlContent);
        Object.keys(elementAttributes).forEach((attr) => {
            element.setAttribute(attr, elementAttributes[attr]);
        });
        element.append(htmlContent);

        // Probably need to make this into an array for parralels.
        this.elements.push(this.createElementObject(tag, elementAttributes, content, element));
        // console.log(elementObject);
        return this;
    }
};



Boa.prototype.createElementObject = function(tag, elementAttributes, content, html) {
    return {
        tag: tag,
        attributes: elementAttributes,
        content: content,
        html: html
    };
};
Boa.prototype.createContent = function(content) {
    return document.createTextNode(content);
};
Boa.prototype.validate = function(...args) {


    let argumentsToValidate = args.length;
    let argumentsValidated = 0;

    let invalidArgs = args.filter(arg => typeof arg[0] != arg[1]);

    if (invalidArgs.length === 0) {
        return true;
    } else {
        this.errorLog(`Error: Arguments given to constructor must be strings \n\n${invalidArgs[0][0]} is not a ${invalidArgs[0][1]}`);
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
};

Boa.prototype.errorlog = function(error) {
    return console.log(error);
};


// Tag creator function
Boa.prototype.createHTMLTag = function(tag) {
    return document.createElement(tag);
};

Boa.prototype.identifyAttr = function(string) {
    let attributes = {};

    let regex = this.regexes.attrRegex;

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
};


// Adds a child to the element
Boa.prototype.add = function() {

}
// identifyAttr("class=test; testing=class", regexes);
// identifyAttr("class=test biggerTest class-names-snaked| id=uniqueID| src=..path/o/to|", regexes);
// identifyAttr("no attributes", regexes);

// Child Functionality 
const boa = new Boa;
const p = boa.constructor('p', 'class=ThisIsAclass this-another-class| id=iIF|', 'TEST');

console.dir(p);

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