const SOON = {stringValue: "fewer that 7 days", integerValue: 7, stringClass:"soon"}
const KIND_OF_SOON = {stringValue: "between 7 and 30 days", integerValue: 14, stringClass:"kindasoon"}
const NOT_SOON = {stringValue: "more than 30 days", integerValue: 30, stringClass:"notsoon"}
const INACTIVE = {stringValue: "inactive", integerValue: 0, stringClass:"inactive"}

const returnStringDict = {};
returnStringDict[SOON.integerValue] = SOON.stringValue;
returnStringDict[KIND_OF_SOON.integerValue] = KIND_OF_SOON.stringValue;
returnStringDict[NOT_SOON.integerValue] =  NOT_SOON.stringValue;
returnStringDict[INACTIVE.integerValue] = INACTIVE.stringValue;

const returnClassStringDict = {};
returnClassStringDict[SOON.integerValue] = SOON.stringClass;
returnClassStringDict[KIND_OF_SOON.integerValue] = KIND_OF_SOON.stringClass;
returnClassStringDict[NOT_SOON.integerValue] =  NOT_SOON.stringClass;
returnClassStringDict[INACTIVE.integerValue] = INACTIVE.stringClass;

const returnString = (type, number) => {
    let output;
    if(type === "value"){
        output=returnStringDict[number];
    }
    if(type === "class"){
        output=returnClassStringDict[number];
    }
    return output;
}


export {SOON, KIND_OF_SOON, NOT_SOON, INACTIVE, returnString};
