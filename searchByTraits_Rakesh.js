
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes', 'no' or 'quit'", yesNoQuit).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    break;
    case 'no':
    searchByTraits(people);
    break;
    default:
    alert("Wrong! Please try again, following the instructions dummy. :)");
    app(people); // restart app
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("Enter the criteria you would like to search by followed by a colon and semicolon.  For example, 'height: 70; age: 45; occupation: doctor'.  Search criteria are 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;
  let newArray = userSearchChoice.split(";");
  //console.log(newArray);
  let newArray2 = newArray[0].split(":");
  //console.log(newArray2);
}
//STEP 1: prompt the user for the traits by which they would like to search
//	ex: age: 40; height: 80; eyes: green;
//  ex: PROMPT
//STEP 2: split the string input from the user into an array separated by semi-colons
//  ex: newArray = [age: 40, height: 80, eyes: green] 
//  this array has a length of 3
//  SPLIT
//STEP 3: look at the first index of the newArray
//  ex: age:40
//  Question: how will I read the data types on either side of the colon?
//  MAP
//STEP 4: determine what trait that index wants to search by
//  ex: read that user entered "age" in newArray[0]
//  FUNCTION
//STEP 5: determine what value of that trait user wants to search by
//  ex: read that user entered "40" in newArray[0]
//  FUNCTION
//STEP 6: pass the argument for trait and value into the appropriate search by trait function
//  ex: take "age" and "40" from newArray[0] and pass as separate variables into a function that calls the appropriate trait function
//  FUNCTION
//STEP 7: create a function that maps the newArray and passes those arguments into a new function that sends them out to the appropriate searchByTrait function

// function searchByTraits(people) {
  // let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  // let filteredPeople;

  // switch(userSearchChoice) {
    // case "height":
      // filteredPeople = searchByHeight(people);
      // break;
    // case "weight":
      // filteredPeople = searchByWeight(people);
      // break;
    //so on and so forth
    // default:
      // alert("You entered an invalid search type! Please try again.");
      // searchByTraits(people);
      // break;
  // } 
// }  


function promptFor(question, valid){
  let validInput = false;
  do{
    var response = prompt(question).trim();
    validInput = response && valid(response);
    if(!validInput){
      alert("'" + response + "' is not a valid input.  Please try again.")
    }
  } while(!validInput);
  return response;
}

function yesNoQuit(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no" || input.toLowerCase() == "quit";
}

function chars(input){
  return true;
}

function numbers(input){
  return !isNaN(input);
}

function gender(input){
  return input.toLowerCase() === "male" || input.toLowerCase() === "female";
}