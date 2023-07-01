import sql from 'mssql';
import config from '../model/config.js';

// // Get all Customers
export const getCustomers = async (req, res) => {
    try {
        console.log("running")
        console.log(config)
        const pool = await sql.connect(config.sql);
        const result = await pool.request().query("select * from Customers");
        !result.recordset[0] ? res.status(404).json({ message: 'customers not found' }) :
        res.status(200).json(result.recordset);
    } catch (error) {
        res.status(201).json({ error: error });
    } finally {
        sql.close(); // Close the SQL connection
    }
};

// // Get a single Customers
export const getCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("CustomerId", sql.Int, id)
            .query("select * from Customers where id = @CustomerId");
        !result.recordset[0] ? res.status(404).json({ message: 'customer not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving customer' });
    } finally {
        sql.close();
    }
};

// // Create a new Customers
export const createCustomer = async (req, res) => {
    try {
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
        let insertCustomer = await pool.request()
            .input("description", sql.VarChar, description) // Insert the description into the SQL query
            .query("INSERT INTO Customers (description) values (@description)"); // Execute the SQL query
        res.status(201).json({ message: 'customer created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating customer' });
    } finally {
        sql.close();   // Close the SQL connection
    }
};
// // Update a Customer
export const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("customer", sql.Int, id)
            .input("customerDescription", sql.VarChar, description)
            .query("UPDATE Customer SET description = @todoDescription WHERE id = @customerId");
        res.status(200).json({ message: 'customer updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating customer' });
    } finally {
        sql.close();
    }
};
// // Delete a Customer
export const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Customer WHERE id = ${id}`;
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the customer' });
    } finally {
        sql.close();
    }
};