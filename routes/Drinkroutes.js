// import Drinksroutes.js from 'server.js'
import { getDrinks, getDrink, createDrink, updateDrink, deleteDrink } from '../controllers/DrinkControllrers.js';
import { login, register, loginRequired } from '../controllers/AuthControllers.js';


const Drinkroutes = (app) => {
    app.route('/Drink')
        .get(loginRequired, getDrinks)
        .post(loginRequired, createDrink);

    app.route('/Drink/:id')
        .put(loginRequired, updateDrink)
        .get(loginRequired, getDrink)
        .delete(loginRequired, deleteDrink);
}


export default Drinkroutes;