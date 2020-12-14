window.onload = () => {
  const idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${localStorage.getItem(
    'recipe'
  )}`;

  const home = document.querySelector('#home');
  home.addEventListener('click', () => {
    window.location = 'meal_planner.html';
  });

  const saved = document.querySelector('#saved');
  saved.addEventListener('click', () => {
    window.location = 'saved_recipes.html';
  });

  fetch(idUrl)
    .then(response => response.json())
    .then(recipe => {
      const main = document.querySelectorAll('main')[0];

      const title = document.createElement('h1');
      title.appendChild(document.createTextNode(recipe.meals[0].strMeal));
      main.appendChild(title);

      const image = document.createElement('img');
      image.src = recipe.meals[0].strMealThumb;
      image.className = 'image';
      main.appendChild(image);

      let head = document.createElement('h2');
      head.appendChild(document.createTextNode('Ingredients'));
      main.appendChild(head);
      const ingredients = document.createElement('ul');
      for (let i = 1; i <= 20; i++) {
        const text = recipe.meals[0][`strIngredient${i}`];
        if (text !== '' && text !== null) {
          const ingredient = document.createElement('li');
          ingredient.appendChild(document.createTextNode(text));
          ingredients.appendChild(ingredient);
        }
      }
      main.appendChild(ingredients);

      head = document.createElement('h2');
      head.appendChild(document.createTextNode('Instructions'));
      main.appendChild(head);
      const recipeText = document.createElement('p');
      recipeText.appendChild(
        document.createTextNode(recipe.meals[0].strInstructions)
      );
      main.appendChild(recipeText);
    });
};
