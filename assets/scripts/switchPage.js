function logout() {
  localStorage.clear();
  window.location = 'index.html';
}

function savedRecipes() {
  window.location = 'saved_recipes.html';
}

function home(){
    window.location = 'meal_planner.html';
}
export {logout, savedRecipes, home}