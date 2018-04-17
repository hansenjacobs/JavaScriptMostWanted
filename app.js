function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes', 'no' or 'quit'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      return mainMenu(searchByName(people), people);
    case 'no':
      return searchByTraits(people);
    case 'quit':
      return;
    default:
      alert("Wrong! Please try again, following the instructions dummy. :)");
      app(people);
    break;
  }
}

function searchByTraits(people) {
  let userSearchChoice = prompt("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.");

  switch(userSearchChoice) {
    case "height":
      displayPeopleTraitResults(searchByHeight(people));
      return;

    case "weight":
      displayPeopleTraitResults(searchByWeight(people));
      return;

  	case "eye color":
      displayPeopleTraitResults(searchByEyeColor(people));
      return;

  	case "gender":
      displayPeopleTraitResults(searchByGender(people));
      return;

  	case "age":
      displayPeopleTraitResults(searchByAge(people));
      return;

  	case "occupation":
      displayPeopleTraitResults(searchByOccupation(people));
      return;

    default:
      alert("You entered an invalid search type! Please try again.");
      return searchByTraits(people);
  }  

}

function searchByHeight(people) {
  let userInputHeight = prompt("How tall is the person?");

  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });

  return newArray;
}

function searchByWeight(people) {
  let userInputWeight = prompt("How much does the person weigh?");

  let newArray = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
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

function searchByAge(people) {
	let userInputAge = prompt("What age is the person?");

  let results = people.filter(function(el){
   return calculateAge(new Date(el.dob)) == userInputAge;
  })
  return results;
}

function calculateAge(dob){
  let now = new Date();
  let age = now - dob;

  age = Math.floor(age/1000/60/60/24/365.25);

  return age
}

function searchByOccupation(people){
  let userInputOccupation = prompt("What occupation does the person have? Such as 'architect', 'assistant', 'doctor', 'landscaper', 'politician', 'programmer'");
  let results = people.filter(function(el){
    return el.occupation === userInputOccupation;
  })
  return results;
}


function mainMenu(person, people){

  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
      displayPerson(person);
      return mainMenu(person, people);
    case "family":
	  let family = [];
  	  for (i=0; i < people.length; i++){
  	    if (people[i].parents.includes(person.id) || person.id == people[i].currentSpouse || person.parents.includes(people[i].id)) {
  	    family.push(people[i]);
  	    }
  	  }
  	  displayPeople(family);
      break;
    case "descendants":
      displayPeople(listDescendants(person, people, 0));
      return mainMenu(person, people);
    case "restart":
      app(people);
      break;
    case "quit":
      return;
    default:
      return mainMenu(person, people);
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

function displayPeople(people){
  if(people.length > 0){
    alert(people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n"));
  } else {
    alert("No results.")
  }
}

function displayPeopleTraitResults(people){
  let userInput;

  if(people.length > 0){
    userInput = prompt(people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n") + "\n\nTo narrow results further, enter the trait you would like to search by - 'height', 'weight', 'eye color' 'gender', 'age', 'occupation' - or enter 'restart' or 'quit'");
  } else {
    userInput = prompt("No results.\n\nEnter 'restart' or 'quit'.")
  }

  switch(userInput) {
    case "height":
      displayPeopleTraitResults(searchByHeight(people));
      return app(people);

    case "weight":
      displayPeopleTraitResults(searchByWeight(people));
      return app(people);

    case "eye color":
      displayPeopleTraitResults(searchByEyeColor(people));
      return app(people);

    case "gender":
      displayPeopleTraitResults(searchByGender(people));
      return app(people);

    case "age":
      displayPeopleTraitResults(searchByAge(people));
      return app(people);

    case "occupation":
      displayPeopleTraitResults(searchByOccupation(people));
      return app(people);

    case "restart":
      return app(data);

    case "quit":
      break;

    default:
      alert("You entered an invalid search type! Please try again.");
      return searchByTraits(people);
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
  if(people[indexPeople].parents.includes(person.id)){
      descendants.push(people[indexPeople]);
    }

  if(indexPeople < people.length - 1){
    return listDescendants(person, people, indexPeople + 1, descendants);
  } else {
    return descendants;
  }
}


function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}


function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no" || input.toLowerCase() == "quit";
}

function chars(input){
  return true;
}