class CocktailAPI {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = "https://www.thecocktaildb.com/api/json/v1/1";

    }
    async getRandomCocktail() {
        try {
            const response = await axios.get(`${this.baseUrl}/random.php?api_key=${this.apiKey}`)
            return response.data;

        } catch (error) {
            console.log(error);
        }
    }
}
//Create cocktail API object
const cocktailsAPI = new CocktailAPI("1"); // You can use the test API key "1" during development of your app or for educational use 


// function to return object with cocktail name and associated image URL
async function getCocktail() {

    const cocktail = await cocktailsAPI.getRandomCocktail();
    return {
        cocktailName: cocktail.drinks[0].strDrink,
        cocktailImg: cocktail.drinks[0].strDrinkThumb,
        cocktailInstructions: cocktail.drinks[0].strInstructions
    }
}

export default getCocktail;