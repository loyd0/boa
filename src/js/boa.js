/* jshint esversion: 6 */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

"use strict";

// Boa class object
// Contains all the functions and the data about that particular set of elements that have been created
// To use initiate a new instance of the class for each section of elements you want to create
// Use .contruct('tag', 'attributes=whateverAttribute', 'internal text content') to create an element
// Use .down, .up and .para in order to determine the relation between elements
// .down nests below
// .up becomes a sibling of the parent
// .para becomes a sibling of the previously generated element
// Note: Boa uses the previously created element as the baseline in order to determine the location of where to place the next element, you have to use a connector method
// Best practise: indent the elements according to their depth as you would HTML elements, this will help you figure out where they should be
// When it is assembled, call .build('x') passing in where you want to append the elements to
// .build() takes the basic css selectors as arguments in order to identify where you want to append to

class Boa {

    constructor() {
        // Array for all elements created
        this.elements = [];

        // Storage of all the regexes used in Boa
        this.regexes = {
            // The attribute extraction regex (matches attribute=value andValues or-values)
            attrRegex: new RegExp(/([\w\-]+)/.source // Find the word before the =
                +
                /(?:= ?)/.source // Non-capturing group to identify the =
                +
                /([\w\-\/\.\;\: ]+)/.source // Collect the values after the = (ignore ; : . / [css, file/paths])
                +
                /(?= [\w\-]+=|$)/.source // Look ahead to find the next attribute, or the end of the line and close the group
                , 'g') // Global flag enabled
        };

        // Tracks the tree level depth in element creation
        this.treeLevel = 0;

        // Tracks whether or not a level change has taken place, used to help logic flow
        this.levelChange = false;

        // Toggle to show reports of elements as they are created and to help in the debugging process
        this.logConstruction = false;

        // Catch all the reports to present at the end
        this.reports = [];

    }

    // Nests the element as a child of the previous element
    // As a getter function does not require invocation
    get down() {
        this.treeLevel++; // Increase the depth of the element logic
        this.nextChild = true; // Used to indicate going down and separate from going up
        this.levelChange = true; // The level has changed, so toggled on
        return this; // Return the class to allow chaining of elements
    }

    // Nests the following element as a sibling of the previous elements parent
    get up() {
        this.treeLevel = this.treeLevel - 1; // Reduces the tree level as rising up
        this.levelChange = true; // The level has changed, so toggling on
        return this;
    }

    // Creates a sibling with the new element to the preceding element
    get para() {
        this.levelChange = false; // The level hasn't changed and is thus indicated
        return this;
    }

    // Toggles the reporting feature, storing all the console logs and information about the item being created
    get showConstruction() {
        this.logConstruction = true;
        return this;
    }
}

// Boa class functions

// Boa.construct is the main function to create elements
// It takes a tag argument => what HTML tag you want to create (string)
// It takes a attributes argument => what attributes you want to assign
// In this format 'attribute=value andValue or-value attribute2=value2 ../and/values/can/be/paths'
// Note: You can string multiple values together in the same string, separated only by spaces
// Just makes sure to use the = correctly
// Does not require a content argument to be passed, will default to an empty string
Boa.prototype.construct = function(tag, attributes, content = "") {

    // Only proceeds if the validations of the arguments are correct (see validation function)
    if (this.validate([tag, "string"], [attributes, "string"], [content, "string"])) {
        // Create the variables required from the arguments 
        let element = this.createHTMLTag(tag); // Create the element tag
        let elementAttributes = this.identifyAttr(attributes); // Parse the attributes
        let htmlContent = this.createContent(content); // Create the text node

        // Attach the attributes to the element
        // Elements are stored in js object, allowing easy access to attribute and attribute value
        Object.keys(elementAttributes).forEach((attr) => {
            element.setAttribute(attr, elementAttributes[attr]);
        });

        // Add the text node into the element
        element.append(htmlContent);

        // Create the Boa element object from all the information that has been passed to it
        var elementObject = this.createElementObject(tag, elementAttributes, content, element);

        // ShowConstruction reports
        this.report('--------------------NEW ELEMENT------------------------');
        this.report('Element created:', elementObject);
        this.report('Element depth level:', this.treeLevel);


        //  Setting the lastElementParent No matter what
        // this.lastElementParent = this.elements[this.elements.length - 1];


        // Functional logic of where to place the element in relation to the previous element
        if (this.treeLevel > 0 && this.nextChild) {


            let treeLevelElement = this.elements[this.elements.length - 1]; // Elements branch starting element


            // ShowConstruction Reports
            this.report("Nesting as child:", elementObject.tag);
            // The element at the top of the branch of elements that the new element will be placed under
            this.report("Elements branch starting element:", treeLevelElement);


            // Loop through the children the number of levels indicated
            for (var i = 0; i < this.treeLevel; i++) {


                // Changes the value of the treeLevel element, first tries to find the last child
                // Then looks for all the children if it is an empty array
                treeLevelElement = treeLevelElement.children[treeLevelElement.children.length - 1] || treeLevelElement.children;

                // ShowConstruction Report
                this.report(`Progressing down tree: (Level: ${i}) - target at level:`, treeLevelElement);

                // Finding the parent of the element  
                // This is used for creating element siblings later on
                if (i === this.treeLevel - 2) {
                    this.report("Parent of element:", treeLevelElement); // Show construction report

                    // Assigns last element allowing access from other functions
                    this.lastElementParent = treeLevelElement;
                } else if (i === this.treeLevel - 1) {

                    // ShowConstruction report
                    this.report("Adding elements to parent:", {
                        element: elementObject,
                        parent: treeLevelElement
                    });

                    this.applyElements(treeLevelElement, elementObject); // Add the elements to the parent
                    this.nextChild = false; // Reset the child nesting toggle
                }
            }
        } else if (this.treeLevel > 0 && !this.nextChild && this.levelChange) {

            let treeLevelElement = this.elements[this.elements.length - 1]; // Elements branch starting element


            // ShowConstruction Reports
            this.report("Nesting as sibling of parent:", elementObject.tag);
            // The element at the top of the branch of elements that the new element will be placed under
            this.report("Elements branch starting element:", treeLevelElement);


            for (var i = 0; i < this.treeLevel; i++) {

                // Get the array of children in order to push element into array
                treeLevelElement = treeLevelElement.children;

                // ShowConstruction Report
                this.report(`Progressing down tree: (Level: ${i}) - target at level:`, treeLevelElement);


                // Finding the parent of the element  
                // This is used for creating element siblings later on
                if (i === this.treeLevel - 2) {
                    this.report("Parent of element:", treeLevelElement); // Show construction report

                    // Assigns last element allowing access from other functions
                    this.lastElementParent = treeLevelElement;
                } else if (i === this.treeLevel - 1) {

                    // ShowConstruction report
                    this.report("Adding elements to parent:", {
                        element: elementObject,
                        parent: treeLevelElement
                    });

                    this.applyElements(treeLevelElement, elementObject); // Add the elements to the parent
                    this.nextChild = false; // Reset the child nesting toggle
                }
            }
        } else if (!this.levelChange && !this.nextChild && this.treeLevel > 0) {
            // ShowConstruction Report
            this.report("Nesting as sibling of element:", elementObject.tag);
            this.report("Using this parent to nest as sibling:", this.lastElementParent);
            console.log("last element parent", this.lastElementParent);

            // Tracking parents here
            //  this.lastElementParent = treeLevelElement;

            this.applyElements(this.lastElementParent, elementObject); // Add elements to the parent
        } else {
            // ShowConstruction Reports
            this.report("Creating new branch", elementObject.tag);
            this.report("TreeLevel should be 0. TreeLevel => ", this.treeLevel);

            this.elements.push(elementObject); // Adding element to base elements array
        }
        return this;
    }
};


// Adds the element to the correct parent of the element
Boa.prototype.applyElements = function(parentsElementArray, elementObject) {

    // Setting the last element on application;
    this.lastElementParent = parentsElementArray;

    parentsElementArray.push(elementObject);
    return this;
};

// Creates the element object 
Boa.prototype.createElementObject = function(tag, elementAttributes, content, html) {
    return {
        tag: tag,
        attributes: elementAttributes,
        content: content,
        html: html,
        children: [] // Adds the empty children array for future nesting
    };
};

// Creates the text node that has be added to the element in order to create the content
Boa.prototype.createContent = function(content) {
    return document.createTextNode(content);
};

// Validation function
// Should be given an array, first value is the input and the second the class of input
// Validates that they match
Boa.prototype.validate = function(...args) {

    // Filter the arguments to determine the invalid ones
    // Invalidity is based on whether or not the type of argument given matches the actual argument given
    const invalidArgs = args.filter(arg => typeof arg[0] != arg[1]);

    // If there are no invalid arguments then return true, else, return first invalid argument
    if (invalidArgs.length === 0) {
        return true;
    } else {
        throw `Error: Arguments given to construct must be strings \n\n${invalidArgs[0][0]} is not a ${invalidArgs[0][1]}`
    }
};

// Report function for toggling presenting more information and to use to debug issues
Boa.prototype.report = function(report, object = "", error) {
    // If reporting is toggled on
    if (this.logConstruction) {
        // If there is something assigned to the object argument
        if (object !== "") {
            // Push both to the report logs
            this.reports.push([report, object]);
            // If there is not an assignment to object
        } else {
            // Push just the report part to the reports
            this.reports.push([report]);
        }
        // Log out the reports
        return console.log(report, object);
    } else {
        return;
    }
};

// Create the HTML tags
Boa.prototype.createHTMLTag = function(tag) {
    return document.createElement(tag);
};

// Identifies the attributes from the attributesString it is given
Boa.prototype.identifyAttr = function(attributeString) {
    // Create object to store attributes
    let attributes = {};

    // Assign the correct regex from the regexes object
    const regex = this.regexes.attrRegex;

    // Test to see if there are attributes in the attributeString
    if (regex.test(attributeString)) {

        // Resetting the last index for the iterations through the attributeString
        regex.lastIndex = 0;

        //  Collecting the attributes
        let regexAttr;

        // Iterating through the attributeString and finding the attributes
        // Pushes them into the attributes.name = data
        while ((regexAttr = regex.exec(attributeString)) !== null) {
            attributes[regexAttr[1]] = regexAttr[2];
        }
    } else {
        attributes = false;
    }

    // Returns attributes object or false 
    return attributes;
};

Boa.prototype.build = function(whatToAppendTo) {

    // Error handling (to be improved with designators)
    if (!whatToAppendTo || typeof(whatToAppendTo) !== "string") { 
        throw 'Error: Attempted to build BOA dom without designating a html element to build under. Please add element as first and only argument of .build("elementToAttachTo")';
    }
    const elements = this.elements;
    document.addEventListener("DOMContentLoaded", function(event) {
        whatToAppendTo = cssSelector(whatToAppendTo);
        appendAllElements(whatToAppendTo, elements);
    });
    return this;
};

function cssSelector(whatToAppendTo) {
    return document.querySelector(whatToAppendTo);
}

function appendAllElements(whatToAppendTo, elementsToAppend) {
    var html = cycle(elementsToAppend, elementsToAppend[0].html, 0);
    console.log(html);
    console.log(whatToAppendTo);
    whatToAppendTo.append(html);
}

function cycle(elements, html, iteration) {
    iteration++;
    console.log(iteration, html);

    // If there is more than one child
    if (elements.length > 1) {
        for (var i in elements) {
            console.log('FIRST ROUNDS', i);
            if (html && elements[i].children.length === 0) {
                console.log(iteration, 'Firing Append FOr Loop1', elements[i]);

                html.append(elements[i].html);
            } else {
                console.log(iteration, 'Firing Append FOr Loop2', elements[i]);
                html.append(cycle(elements[i].children, elements[i].html, iteration));
            }
        }
    } else if (!elements.children) {
        // console.log(iteration, elements);
        if (elements[0].children.length > 0) {
            console.log(iteration, 'Children 1', elements[0].children);
            console.log(iteration, "html 1", html);
            console.log(iteration, "html element", elements[0].html);
            return cycle(elements[0].children, elements[0].html, iteration);
        } else {
            console.log(iteration, 'else: ', elements[0], html);
            console.log(iteration, 'returning', html, elements[0].html);
            html.append(elements[0].html);
        }
    } else if (elements.children.length > 0) {
        console.log(iteration, 'Children 2', elements.children);
        console.log(iteration, 'Children 2html', elements.html);
        console.log(iteration, "html 2", html);
        // debugger;
        var cycleee = cycle(elements.children, elements.html, 100);
        console.log(iteration, "cycle", cycleee);
        // var s = elements.html.append(elements.children[0].html);
        html.append(cycle(elements.children, elements.html, iteration));
    } else {
        console.log(iteration, "Bootm");
        return html.append(elements.html);
    }
    console.log(iteration, 'Returning', html);
    return html;
}

function appendCycle(elementsToAppend, iteration, htmlAppendedElements) {
    const spacer = '-'.repeat(iteration);
    console.log(spacer, 'Iterarion', iteration);

    iteration++;
    const elements = elementsToAppend;

    console.log(spacer, 'Elements Length', elements.length);
    console.log(spacer, 'Elements', elements);
    if (elements.length > 1) {
        console.log(spacer, 'More than one element', elements);
        console.log(spacer, 'Going Deeper');
        appendCycle(elements[elements.length - 1], iteration);
    } else if (elements[0]) {
        if (elements[0].children.length > 0) {
            appendCycle(elements[0].children, iteration);
        } else if (elements[0].html) {
            console.log(elements[0].html);
        }
    } else if (elements.children && elements.children.length > 0) {
        console.log(spacer, 'Found Children', elements);
        appendCycle(elements.children, iteration);
    } else {
        console.log(elements.html);
    }
}

// Create .build() function that renders the elements on the page
// should take an argument for what element it wants to find and render the items under 
// Should function life the jquery selector except without the $ 
// .build('#boa')
// .build('.boa')
// .build('body > span')
// .build('html')

// Create .showConstruction()
// This should engage all the console logs to track the progress of element creation
// Create a function that checks the value of .showConstruction and then add the text to that function for it to log out

// Create some logic that allows boa.construct('span', 'content') without the need for the attribute argument

// Content adding to created elements

// Modifying elements post creation 
// Classes, IDs, src, content bare minimum