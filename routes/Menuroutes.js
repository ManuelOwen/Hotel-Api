import { getMeals, getMeal, createMeal, updateMeal, deleteMeal } from '../controllers/MenuControllers.js';
import { login, register, loginRequired } from '../controllers/AuthControllers.js';
// import Hotelroutes.js from 'server.js'
    // get meals
const Menuroutes = (app) => {
    app.route('/Meals')
        .get(loginRequired, getMeals)
        .post(loginRequired, createMeal);
    // get a single meal
    app.route('/Meal/:id')
        .put(loginRequired, updateMeal)
        .get(loginRequired, getMeal)
        .delete(loginRequired, deleteMeal);
}


export default Menuroutes;