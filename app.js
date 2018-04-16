/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      let person = searchByName(people);
      mainMenu(person, people);
      // add functionality - if more than one person is returned, first display all results and let user determine which to display
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
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");
  let filteredPeople;

  switch(userSearchChoice) {
    case "height":
      filteredPeople = searchByHeight(people);
	  displayPeople(newArray);
      break;
    case "weight":
      filteredPeople = searchByWeight(people);
	  displayPeople(newArray);
      break;
	case "eye color":
    displayPeople(searchByEyeColor(people));
    return app(people);

	case "gender":
	 displayPeople(searchByGender(people));
   return app(people);

	case "age":
	 filteredPeople = searchByAge(people);
	case "occupation":
	 // Jake
    default:
      alert("You entered an invalid search type! Please try again.");
      searchByTraits(people);
      break;
  }  

  let foundPerson = filteredPeople[0];

  mainMenu(foundPerson, people);

}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
    // return true if el.height matches userInputHeight
  });

  return newArray;
}

function searchByEyeColor(people) {
  let userInputEyeColor = prompt("What color eyes does the person have? 'black', 'blue', 'brown', 'green', 'hazel'");
  let results = people.filter(function(el){
    return el.eyeColor === userInputEyeColor;
  })
  return results;
}

function searchByGender(people){
  let userInputGender = prompt("What gender is the person? 'male', 'female'");
  let results = people.filter(function(el){
    return el.gender === userInputGender;
  })
  return results;
}

// function searchByAge(people) {
//   let userInputAge = prompt("How old is the person?");
//   let newArray = people.filter(function (el) {
// 	  if(2018 -
// }
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
      return mainMenu(person, people);
    case "family":
	  let family = [];
	  //create a new array of the people who match the person's last name
	  for (i=0; i < people.length; i++){
	    if (people[i].parents.includes(person.id) || person.id == people[i].currentSpouse || person.parents.includes(people[i].id)) {
	    //push people who match person's last name to the new array
	    family.push(people[i]);
	    }
	  }
	  //pass the new array into the displayPeople function
	  displayPeople(family);
    // TODO: get person's family
    break;
    case "descendants":
      displayPeople(listDescendants(person, people, 0));
      return mainMenu(person, people);
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let results;

  
  results = people.filter(function (el) {
    if(el.firstName === firstName && el.lastName === lastName){
      return true;
    }
  });

  return results[0];

}

// alerts a list of people
function displayPeople(people){
  if(people.length > 0){
    alert(people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n"));
  } else {
    alert("No results.")
  }
}

function displayPerson(person){
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "DOB: " + person.dob + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  
  alert(personInfo);
}

function listDescendants(person, people, indexPeople, descendants = []){
  // MUST USE RECURSION
  if(people[indexPeople].parents.includes(person.id)){
      descendants.push(people[indexPeople]);
    }

  if(indexPeople < people.length - 1){
    // run next recursion
    return listDescendants(person, people, indexPeople + 1, descendants);
  } else {
    // return, ending recursion
    return descendants;
  }
}

// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

//determine uqniue values from data
// let arr = [];
// for(let i = 0; i < data.length; i++){
//   if(!arr.includes(data[i].eyeColor)){
//     arr.push(data[i].eyeColor);
//   }
// }
// console.log(arr);