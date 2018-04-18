
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


  


  
  switch(newArray[0].toLowerCase(), 
  
	let newArray2 = newArray[0].split(":");
	let newArray3 = newArray[1].split(":");
	let newArray4 = newArray[2].split(":");
	let newArray5 = newArray[3].split(":");
  
  }
  
  //this method will filter the joined array of results for identical people
 
	for (let i=0; i<arrayFinal.length; i++){
		arrayFinal.filter(function (el){
		if (el === el + i) {
		return true;}
		}
  //Now, I'm going to take [0] of the new array and pass it into the 
  switch(newArray2[0].toLowerCase(), newArray2[1]){
	case "height":
  	  let userInputHeight = newArray2[1];
      return displayPeopleTraitResults(searchByHeight(people, userInputHeight));
}

function searchByHeight(people, userInputHeight) {
  let results = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });

  return results;
}

function displayPeople(people){
  if(people.length > 0){
    alert(header + people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n"));
  } else {
    alert("No results.")
  }
}

//STEP 1: prompt the user for the traits by which they would like to search
function searchByTraits(people) {
  let userSearchChoice = prompt("Enter the criteria you would like to search by followed by a colon and semicolon.  For example, 'height: 70; age: 45; occupation: doctor'.  Search criteria are 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

}  
//	ex: age: 40; height: 80; eyes: green;
//  ex: PROMPT
//STEP 2: split the string input from the user into an array separated by semi-colons
let userChoiceArray = userSearchChoice.split(";");
let arrayToSearch = userChoiceArray.split(":");
  newArray0[0,1] = height, 70
  newArray0[2, 3] = age, 40
  newArray0[4, 5] = eye color, blue
  newArray = [height: 70, age: 40, eye color: blue]
  newArray0 = newArray[0].split(":");
  
while (i = 0; i < userChoiceArray.length) {
  let searchArgumentArray = userChoiceArray[i].split(":");
  switch (searchArgumentArray[0].toLowerCase(), searchArgumentArray[1]) {
  
	case "height":
		let userInputHeight = searchArgumentArray[1];
		return displayPeople(searchByHeight(people, userInputHeight));
	
	case "age":
		let userInputAge = newArray_i[1];
		return displayPeople(searchByAge(people, userInputAge));
	
	case "eye color":
		let userInputEyeColor = searchArgumentArray[1].toLowerCase();
		return displayPeople(searchByEyeColor(people, userInputEyeColor));

	case "weight":
		let userInputWeight = newArray_i[1];
		return displayPeopleTraitResults(searchByWeight(people, userInputWeight));

  	case "gender":
		let userInputGender = newArray_i[1];
		return displayPeopleTraitResults(searchByGender(people, userInputGender));

  	case "occupation":
		let userInputOccupation = promptFor("What occupation does the person have? Such as 'architect', 'assistant', 'doctor', 'landscaper', 'politician', 'programmer'", chars);
		return displayPeopleTraitResults(searchByOccupation(people, userInputOccupation));

    case "quit":
		return;

    case "restart":
		return app(data);

    default:
		alert("You entered an invalid search type! Please try again.");
		return searchByTraits(people);
  }  

}
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