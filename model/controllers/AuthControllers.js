import sql from 'mssql';
import config from '../model/config.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginRequired = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};

export const register = async (req, res) => {
  const { user_name, user_password, user_email, user_id } = req.body;
  const saltRounds = 10;

  // Check if required fields are provided
  if (!user_name)  {
    return res.status(400).json({ error: 'user_name required' });
  }if(!user_password){
    return res.status(400).json({error:'user_password required'});
  }if(!user_email){
    return res.status(400).json({error:'user email required'})
  }
//register user
  try {
    const hashedPassword = await bcrypt.hash(user_password, saltRounds);
    const pool = await sql.connect(config.sql);

    const result = await pool
      .request()
      .input('user_name', sql.VarChar, user_name)
      .input('user_email', sql.VarChar, user_email)
      .input('user_password', sql.VarChar, hashedPassword)
      .query('SELECT * FROM Ussers WHERE user_name = @user_name OR user_email = @user_email OR user_password=@user_password');

    const user = result.recordset[0];

    if (user) {
      return res.status(409).json({ error: 'User already exists' });
    }

    await pool
      .request()
      .input('user_name', sql.VarChar, user_name)
      .input('user_id', sql.VarChar, user_id)
      .input('user_email', sql.VarChar, user_email)
      .input('user_password', sql.NVarChar, hashedPassword)
      .query('INSERT INTO Ussers (user_name, user_id, user_email, user_password) VALUES (@user_name, @user_id, @user_email, @user_password)');

    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error occurred while creating user' });
  } finally {
    await sql.close();
  }
};
//login user
export const login = async (req, res) => {
  const { user_name, user_password } = req.body;

  // Check if required fields are provided
  if (!user_name || !user_password) {
    return res.status(400).json({ error: 'user_name and user_password are required' });
  }

  try {
    const pool = await sql.connect(config.sql);

    const result = await pool
      .request()
      .input('User_name', sql.VarChar, user_name)
      .input('user_password', sql.VarChar, user_password)
      .query('SELECT * FROM Ussers WHERE User_name = @User_name OR user_password=@user_password');

    if (result.recordset.length === 0) {
      return res.status(401).json({ error: 'Authentication failed. Wrong name or password' });
    }

    const user = result.recordset[0];

    if (!bcrypt.compareSync(user_password, user.user_password)) {
      return res.status(401).json({ error: 'Authorization failed. Wrong credentials' });
    }

    const token = jwt.sign(
      { user_name: user.user_name, user_email: user.user_email, user_password: user.user_password },
      config.jwt_secret,
      { expiresIn: '1h' }
    );

    res.status(200).json({
      message: 'Login successful',
      user_email: user.user_email,
      user_name: user.user_name,
      user_password: user.user_password,
      token: token
    });
  } catch (error) {
    console.error('Error during login:', error);
    console.log('error')
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    await sql.close();
  }
};
