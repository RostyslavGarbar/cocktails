// Define variables
const ginBtn = document.getElementById('gin-btn');
const vodkaBtn = document.getElementById('vodka-btn');
const whiskeyBtn = document.getElementById('whiskey-btn');
const cocktailUl = document.getElementById('cocktail-ul');

// Define event listeners for alcohol type buttons
ginBtn.addEventListener('click', () => {
  getCocktails('gin');
});

vodkaBtn.addEventListener('click', () => {
  getCocktails('vodka');
});

whiskeyBtn.addEventListener('click', () => {
  getCocktails('whiskey');
});

// Function to get cocktails based on alcohol type
function getCocktails(alcoholType) {
  // Clear previous cocktail list
  cocktailUl.innerHTML = '';

  // Make API request
  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${alcoholType}`
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      const response = JSON.parse(xhr.responseText);
      const cocktails = response.drinks;
      if (cocktails) {
        // Loop through cocktails and display them
        cocktails.forEach((cocktail) => {
          const cocktailLi = document.createElement('li');
          cocktailLi.classList.add('cocktail-li');

          const cocktailImg = document.createElement('img');
          cocktailImg.classList.add('cocktail-img');
          cocktailImg.src = cocktail.strDrinkThumb;
          cocktailImg.alt = cocktail.strDrink;

          const cocktailName = document.createElement('h3');
          cocktailName.classList.add('cocktail-name');
          cocktailName.textContent = cocktail.strDrink;

          cocktailLi.appendChild(cocktailImg);
          cocktailLi.appendChild(cocktailName);

          cocktailUl.appendChild(cocktailLi);
        });
      } else {
        // No cocktails found
        const noCocktailsLi = document.createElement('li');
        noCocktailsLi.textContent = 'No cocktails found.';
        cocktailUl.appendChild(noCocktailsLi);
      }
    } else {
      // Error getting cocktails
      const errorLi = document.createElement('li');
      errorLi.textContent = 'Error getting cocktails.';
      cocktailUl.appendChild(errorLi);
    }
  };
  xhr.send();
}
