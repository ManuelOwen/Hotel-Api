import sql from 'mssql';
import config from '../model/config.js';

// // Get all Meals
export const getMeals = async (req, res) => {
    console.log("running")
    try {
      let pool = await sql.connect(config.sql);
      console.log(pool)
      const result = await pool.request().query("SELECT * FROM Meal");
        
      if (!result.recordset[0]) {
        res.status(404).json({ message: 'enjoy your meal' });
      } else {
        res.status(200).json(result.recordset);
      }
    } catch (error) {
      res.status(201).json({ error: 'an error occurred while retrieving Meals' });
    } finally {
      sql.close(); // Close the SQL connection
    }
  };
  

// // Get a single Meal
export const getMeal = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id)
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("food_Id", sql.Int, id)
            .query("SELECT * FROM Meal where food_id = @food_Id");
        !result.recordset[0] ? res.status(404).json({ message: 'food not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving food' });
    } finally {
        sql.close();
    }
};

// // Create a new Meal
export const createMeal = async (req, res) => {
    try {
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
        let insertMeal = await pool.request()
            .input("description", sql.VarChar, description) // Insert the description into the SQL query
            .query("insert into Meal (description) values (@description)"); // Execute the SQL query
        res.status(201).json({ message: 'Meal added successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while adding Meal' });
    } finally {
        sql.close();   // Close the SQL connection
    }
};
// // Update a Meal
export const updateMeal = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("MealId", sql.Int, id)
            .input("MealDescription", sql.VarChar, description)
            .query("UPDATE Meal SET description = @todoDescription WHERE id = @todoId");
        res.status(200).json({ message: 'Meal updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating Meal' });
    } finally {
        sql.close();
    }
};
// // Delete a Meal
export const deleteMeal = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Meal WHERE id = ${id}`;
        res.status(200).json({ message: 'Meal deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting Meal' });
    } finally {
        sql.close();//close sql
    }
};