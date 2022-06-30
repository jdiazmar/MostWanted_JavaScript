/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) {
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            let personInfo = displayPerson(person[0]);
            alert(personInfo);
            break;
        case "family":
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            let personDescendants = findPersonDescendants(person[0], people);
            alert(personDescendants);
            break;
        case "restart":
            app(people);
            break;
        case "quit":
            return;
        default:
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
    return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(
            people
                .map(function (person) {
                    return `${person.firstName} ${person.lastName}`;
                })
                .join("\n")
        );
}
    
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `Date of Birth: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `Current Spouse: ${person.currentSpouse}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
        return personInfo;
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
// End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

/**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
function chars(input) {
    return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line 👇. Happy Coding! 😁

function findPersonInfo(person){
    return displayPerson(person);
}


function Relation(arr, relationship){
    arr.forEach((person) =>{
        person.relationship = relationship;
    });
    return arr;
}


function findPersonFamily(person, people){
   let family = [];
   let spouse = people.filter(function(element){
    return element.id === person.currentSpouse;
   });
   spouse = Relation(spouse, 'Spouse');
   
   let parents = people.filter(function(element){
    return element.parents.includes(person.id);
   });
   parents = Relation(parents, 'Parents');

   let siblings = people.filter(function(element){
    if(element != person){
        return person.parents.includes(element.parents[0] || element.parents[1]);
    }
   });
   siblings = Relation(siblings, 'Siblings');

   family = [...spouse , ...parents, ...siblings];

   displayPeople(family);
}


function addDescendants(arr, relationship){
    arr.forEach((person) =>{
        person.relationship = relationship;
    });
    return arr;
}

function findPersonDescendants(person, descendants = []){
    let getDescendants = person.parents;
    descendants = [];
    if(getDescendants?.length || 0){
        return('This Person Has No Descendants');
    }
    for(let i = 0; i < getDescendants.length; i++){
        getDescendants = getDescendants.concat(
            findPersonDescendants(getDescendants[i])
        );
        return descendants;
    };
    // familyDescendants = addDescendants(familyDescendants, 'Descendants');
   
    // displayPeople(familyDescendants);
    
}

function searchByTraits(people){
    let userInput = prompt(
        "Please Select Trait You Would Like to Search By: height\nweight\neyeColor\noccupation\ngender\ndob?"
    );
    let userInputVal = prompt("Please Enter Value of the Selected Attribute: ");
    let foundByTrait = people.filter(function(traits){
        try{
            if(traits[userInput].includes(userInputVal)){
                return true;
            }
        }
        catch(error){
            console.log(error);
        }
        finally{
            if(traits[userInput] === parseInt(userInputVal)){
                return true;
            }
        }
    });
    return foundByTrait;
}

// Switch Case Practice
// function searchByTraits(person){
//     let userInput = prompt(
//         'Please Select The Trait You Would Like to Search By: height\nweight\neyeColor\noccupation\ngender\ndob?'
//     );
//     switch(userInput) {
//         case 'height':
//             let heightResults = findPersonHeight(person)
//             alert(heightResults);
//             break;
//         case 'weight':
//             let personWeight = people.find(function(element){
//                 return element.id === people.weight;
//             });
//             alert(personWeight);
//             break;
//         case 'eyeColor':
//             let personEyeColor = people.find(function(element){
//                 return element.id === people.eyeColor;
//             });
//             alert(personEyeColor);
//             break;
//         case 'occupation':
//             let personOccupation = people.find(function(element){
//                 return element.id === people.occupation;
//             });
//             alert(personOccupation);
//             break;
//         case 'gender':
//             let personGender = people.find(function(element){
//                 return element.id === people.gender;
//             });
//             alert(personGender);
//             break;
//         case '':
//             let personDob = people.find(function(element){
//                 return element.id === people.dob;
//             });
//             alert(personDob);
//             break;
        
//     }
//     displayPeople(person);
// }

// function findPersonHeight(people){
//     let userInputVal = prompt('Enter the height: ');
//     let foundHeight = people.filter(function(traits){
//         try{
//             if(traits[searchByTraits.userInput].includes(userInputVal)){
//                 return true;
//             }
//         }
//         catch(error){
//             console.log(error);
//         }
//         finally{
//             if(traits[searchByTraits.userInput] === parseInt(userInputVal)){
//                 return true;
//             }
//         }
//     });
//     return foundHeight;
    // let foundHeight = people.filter(function(person){
    //     if (person[searchByTraits.userInput] === parseInt(userInputVal)){
    //         return results;
    //     }
    // });
    // console.log(foundHeight);
// }









