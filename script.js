// https://www.themealdb.com/api/json/v1/1/search.php?s=cake


let btn = document.querySelector('.btn');
let recipeContainer = document.querySelector('.section');
let searchBox = document.querySelector('.text');

let closebtn = document.querySelector(".ClosePopUp")

let recipeDetailsContent = document.querySelector(".recipeDetailsContent")


const fetchRecipes = async (query) => {
try {
        
    
    recipeContainer.innerHTML="<h2>Fetching recipe...</h2>";
    let data  = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)

    let response = await data.json();
    let recipes =  response.meals;
    
    const filteredMeals = recipes.filter(meal => meal.idMeal !== '53088');

    console.log(filteredMeals);

    recipeContainer.innerHTML=""
    filteredMeals.forEach((recipe) => {
        
        const recipeDiv = document.createElement('div')
        recipeDiv.classList.add('recipeCard');

        const img = document.createElement('img');

        // img.src = recipe.strMealThumb; // image URL
        // img.alt = recipe.strMeal;      // name as alt text
                
        img.setAttribute("src", recipe.strMealThumb); // Set image source
    
        // name of the recipe
        const name = document.createElement('h3');
        name.innerHTML= recipe.strMeal
        name.classList.add('name');

        // Area of the recipe
        const area = document.createElement('p');
        area.innerHTML = recipe.strArea + ' Dish'
        area.classList.add('area');

         // category of the recipe

        const category = document.createElement('p');
        category.innerHTML = recipe.strCategory 
        category.classList.add('category');


        // button for view recipe

        const viewRecipe = document.createElement('button')
         viewRecipe.innerHTML =" View Recipe"
         viewRecipe.classList.add('viewRecipe')

        recipeDiv.appendChild(img);   
        recipeDiv.appendChild(name);
        recipeDiv.appendChild(area);
        recipeDiv.appendChild(category);
        recipeDiv.appendChild(viewRecipe);

         viewRecipe.addEventListener('click',function(){
        
        
            popUpPage(recipe);
       })


       recipeContainer.appendChild(recipeDiv);

    });

} catch (error) {
    recipeContainer.innerHTML="<h2>Recipe not found!</h2>";
        
    }
    
    
}


function popUpPage(recipe) {


    recipeDetailsContent.parentElement.style.display='block'

    recipeDetailsContent.innerHTML = `
     <h2>${recipe.strMeal}</h2>
     <h3 id='ingre' >Ingerdients:</h3>
     <ul id='list'>${fetchIngrients(recipe)}  </ul>
     

    `

    closebtn.addEventListener('click', function(){
    console.log("close");
    
    recipeDetailsContent.parentElement.style.display='none'


})
}



// function to fetch iNGERIENT OF RECIPE
const fetchIngrients = (recipe) =>{
    let IngerdientsList = '';
    for (let i = 1; i <= 20; i++) {
       const ingerdients = recipe[`strIngredient${i}`] ;

        if (ingerdients) {
            const measure = recipe[`strMeasure${i}`]
            IngerdientsList += `<li> ${measure} ${ingerdients} </li>`
        }
        else{
            break;
        }
        
    }
    return IngerdientsList;
    


    
}





btn.addEventListener('click',function(e){
    e.preventDefault();
    

    let searchInput = searchBox.value.trim()
    

    fetchRecipes(searchInput);
    
    

})