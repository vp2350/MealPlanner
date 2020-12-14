import * as switchPage from "./switchPage.js";
let recipeData = {};
let userID;

function init(){
    logoutButton.onclick = switchPage.logout;
        homePageButton.onclick = switchPage.home;

        userID = window.localStorage.getItem('loginId');
        //console.log(firebase);
        // #1 - get a reference to the databse
        let database = firebase.database();

        // #2 - refer to a root node named `scores`
        let ref = database.ref('scores2');

        // #4 This is where the magic happens!
        firebase
          .database()
          .ref('scores2')
          .on('value', dataChanged, firebaseError);

        function dataChanged(data) {
          recipeData = data.val();
          //console.log(data.val());
        }

        function firebaseError(error) {
          console.log(error);
        }
        setTimeout(function () {
          //console.log(recipeData);
          const foodURL =
            'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
          for (const property in recipeData) {
            if (property == userID) {
              //console.log(property);
              for (const meal in recipeData[property]) {
                if (meal != 'userID') {
                  //console.log(meal);
                  let url = foodURL + meal;
                  getData(url);
                }
              }
            }
          }
        }, 2000);
      };


      function getData(url) {
        let xhr = new XMLHttpRequest();

        xhr.onload = dataLoaded;

        xhr.onerror = dataError;

        xhr.open('GET', url);
        xhr.send();
      }

      function dataError(e) {
        console.log('An error occured');
      }

      function dataLoaded(e) {
        let xhr = e.target;
        //console.log(xhr.responseText)

        let obj = JSON.parse(xhr.responseText).meals[0];
        //console.log(obj);
        if (!obj.meals || obj.meals.length == 0) {
          console.log('Empty');
        }
        let idUrl = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
        let url = obj.strMealThumb;

        let line = `<div class='result' id="id${obj.idMeal}"><img src = '${url}' id='img-${obj.idMeal}' title = '${obj.idMeal}' class="image"/>`;
        line += `<span><a target = '_blank' href='${idUrl + obj.idMeal}'>${
          obj.strMeal
        }</a></span><span>Category: ${
          obj.strCategory
        }</span><button class = "delete" value = ${
          obj.idMeal
        }>Delete</button></div>`;

        document.querySelector('#content').innerHTML += line;

        const images = document.querySelectorAll('.image');

        images.forEach(image => {
          image.addEventListener('click', e => {
            localStorage.setItem('recipe', e.target.id.split('-')[1]);
            window.location = 'recipe.html';
          });
        });

        const buttons = document.querySelectorAll('.delete');
        buttons.forEach(button => {
          button.addEventListener('click', e => {
            let path = 'scores2/' + userID;
            firebase.database().ref(path).child(e.target.value).remove();
            const parent = document.querySelector(`#id${e.target.value}`)
              .parentNode;
            parent.removeChild(document.querySelector(`#id${e.target.value}`));
          });
        });
      
}

export {init}