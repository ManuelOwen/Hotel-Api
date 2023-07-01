// import Customersroutes.js from 'server.js'
import { getCustomers, getCustomer, createCustomer, updateCustomer, deleteCustomer } from '../controllers/CustomersControllers.js';
import { login, register, loginRequired } from '../controllers/AuthControllers.js';

// get customers
const customersroutes = (app) => {
    app.route('/Customers')
        .get(loginRequired, getCustomers)
        .post(loginRequired, createCustomer);

    app.route('/Customer/:id')
        .put(loginRequired, updateCustomer)
        .get(loginRequired, getCustomer)
        .delete(loginRequired, deleteCustomer);
}


export default customersroutes;