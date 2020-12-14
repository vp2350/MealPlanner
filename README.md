# 330-project-3

## Meal planner

[Link to live project](https://people.rit.edu/vp2350/mealPlanner/mealPlanner/)

The app lets the user log in with their username, look up recipes based on keywords, categories or the region they originate from. 

Users can then choose to save these recipes, which persist with the user ID using the firebase web service. 

Users can access these saved recipes by clicking the saved recipes buttons. On the saved recipes page, the user can also delete the recipes that they have saved. 

On both the homepage and the saved recipes page, user can click on the recipe which takes them to a page describing the meal, the igredients required and the recipe.

### Web Services

The app uses two web services:

#### TheMealDB

TheMealDB is an API that lets the user search for different recipes based on keywords, the recipe category, or the region the recipe originates from. The API also has a patreon tier that I plan to contribute to which gives access to controls like random meals and so on. 

#### Firebase

The Firebase web service is used to store user IDs and recipes. You can add or remove recipes from particular user IDs, and if you log in with a username that does not exist, it will create a username for you.

### User Experience

#### UI State and Reset button

The UI only saves the last input user ID in the local storage and fills that in by default at the login page (The logout button should clear this storage). I want to work further with firebase in this app and have each user's recent searches stored in the database.

The Logout button functions as a reset button for the app.

The app has a very simplistic UI. It starts with a page that requests your username and has a login option, which takes you to the main page.

#### Login Page

The log in page lets you input a user ID and click on the login button to access the meal planner with that ID.

#### Meal Planner (Home) Page

This page is where the user can search for recipes using the different search options and save them to their account.

The user controls on this page are as follows:

##### Buttons (Home Page)

###### Logout (Reset)

The logout buttons takes you back to the index (login page) where you can log in using a user ID.

###### Saved Recipes

The Saved Recipes button takes you to the page that displays all the saved recipes

###### Search by Name

The search by name lets you search for a recipe based on the search input field

###### Search by Category

This button lets the user search for recipes based on the category selected 

###### Search by Region

This button lets the user search for recipes based on the region of origin selected 

###### Image links

Clicking on the image for a meal will take you to the recipe page for that meal

###### Recipes

The save button will save a recipe to the User ID

#### Saved Recipes Page

This is the page that shows the recipes that have been saved with that User ID

##### Buttons (Home Page)

###### Logout (Reset)

The logout buttons takes you back to the index (login page) where you can log in using a user ID.

###### Saved Recipes

The Saved Recipes button takes you to the page that displays all the saved recipes

##### Buttons (Saved Recipes Page)

###### Logout (Reset)

The logout buttons takes you back to the index (login page) where you can log in using a user ID.

###### Home 

The home button takes you to the home page

###### Recipes

The delete button will remove a recipe from the saved recipes page

Clicking on the image for a meal will take you to the recipe page for that meal

#### Recipes page 

The recipes page has the standard controls to go to the home page and to the saved recipes page.

### Bugs

There are currently no known bugs with the app (some were fixed after submitting the zip but are completely working on Banjo).

### Media

The html of the file is divided into several pages which are further into several different elements including divs, labels, sections and headings which are used to structure the document properly.

The css for all the files is hosted in the index.css file under the assets/styles folder

Images have a title for alternative viewing

### Code

The code is divided into ES6 modules, which are separate for each page, and all of them use the switchPage.js custom ES6 module to switch between each other (could not use ES6 for ajax since each page uses onload differently).

The recipe.js is not in an ES6 module because that page was built towards the end and I ran out of time.

The app uses XHR for loading the meals on the home page and saved recipes. Fetch is used for the recipe page for the meals since it was a much simpler page.


### Above and Beyond and Expected Grade

The project works completely as intended, with know glaring problems. It is a simplistic app that helps a user find and save meals to their accounts and access them very easily. I went with both function and form for this project and am pretty happy with how it came out.

With a couple of additions, especially the patreon tier for the API, I would be very happy to put it in my portfolio.



