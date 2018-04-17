function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes', 'no' or 'quit'", yesNoQuit).toLowerCase();
  switch(searchType.toLowerCase()){
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
  let userSearchChoice = promptFor("What would you like to search by? 'height', 'weight', 'eye color', 'gender', 'age', 'occupation'.", chars);

  switch(userSearchChoice.toLowerCase()) {
    case "height":
	  let userInputHeight = promptFor("How tall is the person?", chars);
	  let userInputHeightString = "PEOPLE WHO HAVE A HEIGHT OF " + userInputHeight + ":" + "\n";
      displayPeopleTraitResults(searchByHeight(people, userInputHeight), userInputHeightString);
      return;

    case "weight":
	  let userInputWeight = promptFor("How much does the person weigh?", chars);
	  let userInputWeightString = "PEOPLE WHO HAVE A WEIGHT OF " + userInputWeight + ":" + "\n";
      displayPeopleTraitResults(searchByWeight(people, userInputWeight), userInputWeightString);
      return;

  	case "eye color":
	  let userInputEyeColor = promptFor("What color eyes does the person have? 'black', 'blue', 'brown', 'green', 'hazel'", chars);
	  let userInputEyeColorString = "PEOPLE WHO HAVE An EYE COLOR OF " + userInputEyeColor + ":" + "\n";
      displayPeopleTraitResults(searchByEyeColor(people, userInputEyeColor), userInputEyeColorString);
      return;

  	case "gender":
	  let userInputGender = promptFor("What gender is the person? 'male', 'female'", gender);
	  let userInputGenderString = "PEOPLE WHO IDENTIFY AS " + userInputGender + ":" + "\n";
      displayPeopleTraitResults(searchByGender(people, userInputGender), userInputGenderString);
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


function searchByHeight(people, userInputHeight) {
  let newArray = people.filter(function (el) {
    if(el.height == userInputHeight) {
      return true;
    }
  });

  return newArray;
}


function searchByWeight(people, userInputWeight) {
  let results = people.filter(function (el) {
    if(el.weight == userInputWeight) {
      return true;
    }
  });

  return results;
}

function searchByEyeColor(people, userInputEyeColor) {
  let results = people.filter(function(el){
    return el.eyeColor.toLowerCase() === userInputEyeColor.toLowerCase();
  })
  return results;
}

function searchByGender(people, userInputGender){
  let results = people.filter(function(el){
    return el.gender.toLowerCase() === userInputGender.toLowerCase();
  })
  return results;

}

function searchByAge(people) {
	let userInputAge = promptFor("What age is the person? Ex. '62'", numbers);

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
  let userInputOccupation = promptFor("What occupation does the person have? Such as 'architect', 'assistant', 'doctor', 'landscaper', 'politician', 'programmer'", chars);
  let results = people.filter(function(el){
    return el.occupation.toLowerCase() === userInputOccupation.toLowerCase();
  })
  return results;
}


function mainMenu(person, people){

  if(!person){
    alert("Could not find that individual.");
    return app(people);
  }

  var displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);

  switch(displayOption.toLowerCase()){
    case "info":
      displayPerson(person, "INFO: \n");
      return mainMenu(person, people);
    case "family":
      alert("FAMILY: \n" + listFamily(person, people));
      return mainMenu(person, people);
    case "descendants":
      displayPeople(listDescendants(person, people, 0), "DESCENDANTS: \n");
      return mainMenu(person, people);
    case "restart":
      return app(people);
    case "quit":
      return;
    default:
      return mainMenu(person, people);
  }
}

function listFamily(person, people) {
  let parents = [];
  let siblings = [];
  let children = [];
  let spouse;
  let output = ""

    for (let i = 0; i < people.length; i++){
      if(person.id !== people[i].id){
        if(people[i].parents.includes(person.id)){
          children.push(people[i]);
        } else if(person.parents.includes(people[i].id)){
          parents.push(people[i]);
        } else if(person.id === people[i].currentSpouse){
          spouse = people[i];
        } else {
          for(let index = 0; index < person.parents.length && !siblings.includes(people[i]); index++){
            if(people[i].parents.includes(person.parents[index])){
              siblings.push(people[i])
            }
          }
        }
      }
    }

  output += "PARENTS\n" + listPeopleAsString(parents) + "\n\n";
  output += "SIBLINGS\n" + listPeopleAsString(siblings) + "\n\n";
  if(spouse !== undefined){
    output += "SPOUSE\n" + spouse.firstName + " " + spouse.lastName + "\n\n";
  } else {
    output += "SPOUSE\nNo results.\n\n"
  }
  output += "CHILDREN\n" + listPeopleAsString(children);

  return output;
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
  let results;

  
  results = people.filter(function (el) {
    if(el.firstName.toLowerCase() === firstName.toLowerCase() && el.lastName.toLowerCase() === lastName.toLowerCase()){
      return true;
    }
  });

  return results[0];

}

function listPeopleAsString(people){
  let string;
  if(people.length > 0){
    string = people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n");
  } else {
    string = "No results."
  }
  return string;
}

function displayPeople(people, header){
  if(people.length > 0){
    alert(header + people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n"));
  } else {
    alert("No results.")
  }
}

function displayPeopleTraitResults(people, header){
  let userInput;

  if(people.length > 0){
    userInput = promptFor(header + people.map(function(person){
      return person.firstName + " " + person.lastName;
    }).join("\n") + "\n\nTo narrow results further, enter the trait you would like to search by - 'height', 'weight', 'eye color' 'gender', 'age', 'occupation' - or enter 'restart' or 'quit'", chars);
  } else {
    userInput = promptFor(header + "No results.\n\nEnter 'restart' or 'quit'.", chars)
  }

  switch(userInput.toLowerCase()) {
    case "height":
	  let userInputHeight = promptFor("How tall is the person?", chars);
	  let userInputHeightString = "PEOPLE WHO HAVE A HEIGHT OF " + userInputHeight + ":" + "\n";
      displayPeopleTraitResults(searchByHeight(people, userInputHeight), userInputHeightString);
      return app(people);

    case "weight":
      let userInputWeight = promptFor("How much does the person weigh?", chars);
	  let userInputWeightString = "PEOPLE WHO HAVE A WEIGHT OF " + userInputWeight + ":" + "\n";
      displayPeopleTraitResults(searchByWeight(people, userInputWeight), userInputWeightString);
      return app(people);

    case "eye color":
      let userInputEyeColor = promptFor("What color eyes does the person have? 'black', 'blue', 'brown', 'green', 'hazel'", chars);
	  let userInputEyeColorString = "PEOPLE WHO HAVE An EYE COLOR OF " + userInputEyeColor + ":" + "\n";
      displayPeopleTraitResults(searchByEyeColor(people, userInputEyeColor), userInputEyeColorString);
      return app(people);

    case "gender":
      let userInputGender = promptFor("What gender is the person? 'male', 'female'", gender);
	  let userInputGenderString = "PEOPLE WHO IDENTIFY AS " + userInputGender + ":" + "\n";
      displayPeopleTraitResults(searchByGender(people, userInputGender), userInputGenderString);
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
  personInfo += "DOB: " + person.dob + " (" + calculateAge(new Date(person.dob)) + " years old)\n";
  personInfo += "Height: " + person.height + "\"\n";
  personInfo += "Weight: " + person.weight + "lbs\n";
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
  return isNaN(input);
}

function gender(input){
  return input.toLowerCase() === "male" || input.toLowerCase() === "female";
}