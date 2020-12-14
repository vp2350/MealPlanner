import * as switchPage from "./switchPage.js";

let userID;
function init(){
    userID = window.localStorage.getItem('loginId');
    //console.log(userID);
    //console.log(firebase);
    // #1 - get a reference to the databse
    let database = firebase.database();

    // #2 - refer to a root node named `scores`
    let ref = database.ref('scores2');

    // #4 - send data, in this case we are adding it to the `scores` node
    document.querySelector('#search').onclick = searchButtonClicked;
    document.querySelector(
      '#searchCategory'
    ).onclick = categorySearchButtonClicked;
    document.querySelector('#searchArea').onclick = areaSearchButtonClicked;
    logoutButton.onclick = switchPage.logout;
    savedRecipesButton.onclick = switchPage.savedRecipes;
}

let offset = 0;
// 2
let displayTerm = '';

// 3
function searchButtonClicked(e) {
  console.log('searchButtonClicked() called');
  const foodURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  let url = foodURL;

  let term = document.querySelector('#searchterm').value;
  displayTerm = term;

  term = term.trim();

  term = encodeURIComponent(term);

  if (term.length < 1) return;

  url += term;

  //console.log(url);

  getData(url);
}

function categorySearchButtonClicked(e) {
  console.log('searchButtonClicked() called');
  const foodUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';

  let url = foodUrl;

  let term = document.querySelector('#categories').value;
  displayTerm = term;

  term = term.trim();

  term = encodeURIComponent(term);

  if (term.length < 1) return;

  url += term;

  //console.log(url);

  getData(url);
}

function areaSearchButtonClicked(e) {
  console.log('searchButtonClicked() called');
  const foodUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

  let url = foodUrl;

  let term = document.querySelector('#area').value;
  displayTerm = term;

  term = term.trim();

  term = encodeURIComponent(term);

  if (term.length < 1) return;

  url += term;

  //console.log(url);

  getData(url);
}

function saveButtonClicked(e) {
  console.log(e.value);
}

function getData(url) {
  let xhr = new XMLHttpRequest();

  xhr.onload = dataLoaded;

  xhr.onerror = dataError;

  xhr.open('GET', url);
  xhr.send();
}

function dataLoaded(e) {
  let xhr = e.target;
  //console.log(xhr.responseText)

  let obj = JSON.parse(xhr.responseText);
  //console.log(obj);
  if (!obj.meals || obj.meals.length == 0) {
    return;
  }
  let idUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';

  let results = obj.meals;
  //console.log('results.length = ' + results.length);
  let bigString =
    '<p>Here are ' +
    results.length +
    " results for '" +
    displayTerm +
    "'</p>";

  for (let i = 0; i < results.length; i++) {
    let result = results[i];
    //console.log(result.strCategory);
    let url = result.strMealThumb;
    let name = result.strMeal;
    let line = `<div class='result'><img id='img-${result.idMeal}' src = '${url}' title = '${result.strMeal}' class='image'/>`;
    line += `<span><a>${
      result.strMeal
    }</a></span><button class = "save" value = ${
      result.idMeal
    }>Save</button></div>`;
    //console.log(result.idMeal);
    bigString += line;
  }
    
  setTimeout(function() {
          const images = document.querySelectorAll('.image');
    //console.log(images);
    images.forEach(image => {
      image.addEventListener('click', e => {
        localStorage.setItem('recipe', e.target.id.split('-')[1]);
        window.location = 'recipe.html';
      });
    });
  }, 2000);
  document.querySelector('#content').innerHTML = bigString;

  const buttons = document.querySelectorAll('.save');
  buttons.forEach(button => {
    button.addEventListener('click', e => {
      let path = 'scores2/' + userID + '/' + e.target.value;
      firebase.database().ref(path).set({
        // over-writes old values
        mealID: e.target.value,
      });
    });
  });
}

function dataError(e) {
  console.log('An error occured');
}
export {init};