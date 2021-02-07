const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const mealIngradients = document.getElementById("mealIngradients");
const allMeal = document.getElementById("allMeal");
const detailsMeal = document.getElementById("detailsMeal");
const error = document.getElementById("error");

searchButton.addEventListener("click", () => {
  const inputValue = searchInput.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.meals);
      displayMeal(data.meals);
    });
});

const onGetMealinfo = (info) => {
  console.log(info);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${info}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const {
        strIngredient1,
        strIngredient2,
        strIngredient3,
        strIngredient4,
        strIngredient5,
        strIngredient6,
        strMeal,
        strMealThumb,
      } = data.meals[0];

      const mealDetailsHtml = `
    <img height="322" weight="588" src=${strMealThumb} alt="">
    <h3>${strMeal}</h3>
    <h5>Ingredients</h5>
    <ul id="mealIngradients">
        <li id="ingredients1">${strIngredient1}</li>
        <li  id="ingredients2">${strIngredient2}</li>
        <li  id="ingredients3">${strIngredient3}</li>
        <li  id="ingredients4">${strIngredient4}</li>
        <li  id="ingredients5">${strIngredient5}</li>
        <li  id="ingredients6">${strIngredient6}</li>
      
    </ul>`;
      detailsMeal.innerHTML = mealDetailsHtml;
    });
};
const displayMeal = (meals) => {
  if (meals?.length > 0) {
    error.innerHTML = "";
    meals.forEach((meal) => {
      const searchOutputMeal = document.createElement("div");
      searchOutputMeal.className = "col-md-3";
      const mealInfo = `<div id="mealinfo" onclick="onGetMealinfo('${meal.idMeal}')">
        <img
        src=${meal.strMealThumb}
        class="card-img-top"
        alt="..."
       />
       <div class="card-body">
        <p class="card-text">
         ${meal.strMeal}
        </p>
       </div>
       </div>`;

      searchOutputMeal.innerHTML = mealInfo;
      allMeal.appendChild(searchOutputMeal);
    });
  } else {
    const emptyMael = `<h3 class="text-danger">No Meal Found</h3>`;
    error.innerHTML = emptyMael;
  }
};

