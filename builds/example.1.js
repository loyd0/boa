const boa = new Boa;

console.log('Working');


// const p = boa
//     .construct('p', 'class=ThisIsAclass this-another-class id=iIF', 'TEST')
//         .down.construct('span', 'class=exampleSpan id=child', 'ing')
//             .down.construct('div', 'class=exampleDic id=div', '')
//         .up.construct('b', 'style=font-weight:400', 'SUCCESS')
//     // .up.construct('div', 'style=font-weight:400', 'up one more')
//         .down.construct('p', '', 'some amazing p content')
//         .para.construct('em', '', 'CAPITALS')
//             .down.construct('span', '', 'this')
//                 .down.construct('span', '', 'might')
//                 .para.construct('span', '', 'work').build('body');

// Number Test


const numberTest = boa.showConstruction
    .construct('div', 'class=box red parent', 'Parent')
        .down.construct('div', 'class=box green child ', 'Child')
            .down.construct('div', 'class=box blue gran-child', 'Gran-Child')
                .down.construct('div', 'class=box blue', 'Gran-Gran-Child ')
            .up.construct('div', 'class=box green child', 'Child2')
            .para.construct('div', 'class=box green child', 'Child 3')
            .para.construct('div', 'class=box green child', 'Child 4')
        .up.construct('div', 'class=box green child', 'Child 4')
            .down.construct('div', 'class=box blue gran-child', 'Gran-Child3').build("body");



// const p = boa
//     .construct('p', 'class=ThisIsAclass this-another-class id=iIF', 'TEST')
//     // .construct('p', 'class=ThisIsAclass this-another-class', 'TEST')
//     .down.construct('span', 'class=exampleSpan id=child', 'ing')
//     .para.construct('span', 'class=ts', '!!')
//     .down.construct('div', 'class=examplediv', 'DIV1')
//     .down.construct('div', 'class=examplediv', 'DIV2')
//     .down.construct('div', 'class=examplediv', 'DIV3')
//     .build('body');

// console.log(numberTest.elements);