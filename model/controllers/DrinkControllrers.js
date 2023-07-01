import sql from 'mssql';
import config from '../model/config.js';

// // Get all Drinks
export const getDrinks = async (req, res) => {
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * from Drink");
        !result.recordset[0] ? res.status(404).json({ message: 'Drinks not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        res.status(201).json({ error: 'an error occurred while retrieving Drinks' });
    } finally {
        sql.close(); // Close the SQL connection
    }
};

// // Get a single Drink
export const getDrink = async (req, res) => {
    try {
        const { id } = req.params;
        console.log (id)
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("Drink_id", sql.Int, id)
            .query("SELECT * FROM Drink WHERE Drink_id = @Drink_id");
        !result.recordset[0] ? res.status(404).json({ message: 'Drink not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
    console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving Drink' });
    } finally {
        sql.close();
    }
};

// // Create a new Drink
export const createDrink = async (req, res) => {
    try {
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
        let insertTodo = await pool.request()
            .input("description", sql.VarChar, description) // Insert the description into the SQL query
            .query("INSERT INTO Drink (description) values (@description)"); // Execute the SQL query
        res.status(201).json({ message: 'Drink created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while creating Drink' });
    } finally {
        sql.close();   // Close the SQL connection
    }
};
// // Update a Drink
export const updateDrink = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("DrinkId", sql.Int, id)
            .input("DrinkDescription", sql.VarChar, description)
            .query("UPDATE Drink SET description = @DrinkDescription WHERE id = @DrinkId");
        res.status(200).json({ message: 'Drink updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating Drink' });
    } finally {
        sql.close();
    }
};
// // Delete a Drink
export const deleteDrink = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Drink WHERE id = ${id}`;
        res.status(200).json({ message: 'Drink deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting the Drink' });
    } finally {
        sql.close();
    }
};