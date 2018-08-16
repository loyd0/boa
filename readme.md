# BOA 

A small lightweight framework project under development.

Designed to render DOM elements through simple, native JS and minimising file size to make speedy single page applications. 

> Current Status: We've reached MVP. The current iteration works, it has several pieces of functionality missing but the core of it works.
### Getting started

Boa strives to make the process of generating HTML elements through JS as simple, easy and most importantly, quick as possible.

A stereotypical Boa command is as follows:

In order to get started require the boa.min.js file in your project and then, in a separate js file (perhaps app.js) declare the following: 

```js
const boa = new Boa;

```

Now you're good to go.

### Example Usage

Boa runs primarily off the idea that you construct HTML into js objects. These objects are then 'built' into HTML at run time. 


#### At its most simple creating elements take this form

```js
const example = boa.construct("elementTag", ".classes #id style=like: so; src=what/path/you/want.jpg attribute=anythingYouWouldLike", "Content that you would like in the element")
```

#### So a proper example might be:


```js
const properExample = boa.construct("div", ".box .red .parent", "Parent")
```

#### In order to traverse this vertual dom you need to use the key words - up, down, para 

```js 

// .down nests below
// Tip: indent according to the level

const downExample = boa
  .construct("div", ".box .red .parent", "Parent")
      .down.construct("div", ".box .green .child ", "Child")


// .up goes up from the previous position

const upExample = boa
  .construct("div", ".box .red .parent", "Parent")
      .down.construct("div", ".box .green .child ", "Child")
  .up.construct("div", ".box .green .child ", "Sibling of parent")

// .para nests as a sibling

const paraExample = boa
  .construct("div", ".box .red .parent", "Parent")
      .down.construct("div", ".box .green .child ", "Child")
      .para.construct("div", ".box .green .child ", "Sibling of child")
```
#### In order to build out the HTML and attach it to the DOM you need to use the .build('elementToAttachTo')

```js
const buildingExample = boa
  .construct("div", ".box .red .parent", "Parent")
      .down.construct("div", ".box .green .child ", "Child")
      .para.construct("div", ".box .green .child ", "Sibling of child").build("body");
```

> Note: ``.build();`` does support ids and classes, but with the latter will always return the first element if there are multiple with that class.

#### Full example



```js
const fullExample = boa
    .construct("div", ".box .red .parent", "Parent")
      .down.construct("div", ".box .green .child ", "Child")
        .down.construct("div", ".box .blue .gran-child", "Gran-Child")
          .down.construct("div", ".box .blue", "Gran-Gran-Child ")
        .up.construct("div", ".box .green .child #testChild style=color: blue; border-radius: 100px; src=path/topath/image.ph onclick=logItOut()", "Child 2")
        .para.construct("div", ".box .green .child", "Child 3")
        .para.construct("div", ".box .green .child", "Child 4")
      .up.construct("div", ".box .green .child", "Child 4")
        .down.construct("div", ".box .blue .gran-child", "Gran-Child3").build("body");
```


##### This produces this: 

![Example](https://i.imgur.com/IkqVeXd.png)

### Debugging

As this is a very early stage product, there is a level of debugging that might be required. For that purpose there is a `showConstruction` function that logs out every step. And will help you isolate the problems. 

To engage it simply make it the first method after boa and then continue building as normal. 

```js
const showConstructionExample = boa.showConstruction
    .construct("div", ".box .red .parent", "Parent")
      .down.construct("div", ".box .green .child ", "Child")
        .down.construct("div", ".box .blue .gran-child", "Gran-Child")
          .down.construct("div", ".box .blue", "Gran-Gran-Child ")
        .up.construct("div", ".box .green .child #testChild style=color: blue; border-radius: 100px; src=path/topath/image.ph onclick=logItOut()", "Child 2")
        .para.construct("div", ".box .green .child", "Child 3")
        .para.construct("div", ".box .green .child", "Child 4")
      .up.construct("div", ".box .green .child", "Child 4")
        .down.construct("div", ".box .blue .gran-child", "Gran-Child3").build("body");

```


### To work on

* Integrating multiple object connection with a .join function. This function connects the two objects into one and allows you to create multiple elements separately and then connect them together at build time.
* Improve the relation between the created elements and the original objects
* Write tests to maintain stability of new versions

