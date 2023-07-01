import sql from 'mssql';
import config from '../model/config.js';
import { login, register, loginRequired } from '../controllers/AuthControllers.js'
// // Get all rooms
export const getRooms = async (req, res) => {
    console.log('running');
    try {
        let pool = await sql.connect(config.sql);
        const result = await pool.request().query("SELECT * FROM Accomodation");
        !result.recordset[0] ? res.status(404).json({ message: 'Rooms not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
     
        res.status(201).json({ error: 'an error occurred while retrieving Rooms' });
    } finally {
        sql.close(); // Close the SQL connection
    }
};

// // Get a single rooms
export const getRoom = async (req, res) => {
    try {
        const { id } = req.params;
        let pool = await sql.connect(config.sql);
        const result = await pool.request()
            .input("Room_id", sql.Int, id)
            .query("SELECT * FROM Accomodation WHERE Room_id = @Room_id");
        !result.recordset[0] ? res.status(404).json({ message: ' Room not found' }) :
            res.status(200).json(result.recordset);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'An error occurred while retrieving Room' });
    } finally {
        sql.close();
    }
};

// // Create a new room
export const createRoom = async (req, res) => {
    try {
      const { floor } = req.body;
      if (!id) {
        res.status(400).json({ error: 'id is required' });
      } else {
        let pool = await sql.connect(config.sql);
        let insertRoom = await pool.request()
          .input("id", sql.VarChar, floor)
          .query("INSERT INTO Accomodation (id) VALUES (@id)");
  
        if (insertRoom.rowsAffected[0] === 1) {
          res.status(201).json({ message: 'Room created successfully' });
        } else {
          res.status(500).json({ error: 'An error occurred while creating Room' });
        }
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while creating Room' });
    } finally {
      sql.close();
    }
  };
  
  
// // Update a room
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        let pool = await sql.connect(config.sql);
        await pool.request()
            .input("RoomId", sql.Int, id)
            .input("RoomDescription", sql.VarChar, description)
            .query("UPDATE Room SET description = @RoomDescription WHERE id = @RoomId");
        res.status(200).json({ message: 'Room updated successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating Room' });
    } finally {
        sql.close();
    }
};
// // Delete a room
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params;
        await sql.connect(config.sql);
        await sql.query`DELETE FROM Accomodation WHERE id = ${id}`;
        res.status(200).json({ message: 'Room deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting Room' });
    } finally {
        sql.close();//close sql
    }
};