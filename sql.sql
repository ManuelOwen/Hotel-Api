CREATE TABLE Meal (
  food_id VARCHAR(4),
  food_name VARCHAR(50),
  food_description VARCHAR(20),
  food_price DECIMAL(4),
  food_category VARCHAR(50),
  table_no DECIMAL(3) PRIMARY KEY
);
INSERT INTO Meal
VALUES 
  ('001', 'Chicken', 'burger', 8.99, 'Fast Food',01),
  ('002', 'Spaghetti', 'Creamy dish', 12.99, 'Italian', 02),
  ('003', 'Caesar Salad', 'Classic salad', 7.99, 'Salad',03),
  ('004', 'Beef Steak', 'Grilled steak', 18.99, 'Steak',04),
  ('005', 'Fish Tacos', 'Mexican tacos', 9.99, 'Mexican',05),
  ('006', 'Margherita Pizza', 'Traditional pizza', 10.99, 'Pizza',06),
  ('007', 'Sushi Roll', 'Japanese sushi', 14.99, 'Sushi',07);



CREATE TABLE Drink (
  Drink_name VARCHAR(10),
  Drink_qty VARCHAR(10),
  Drink_price VARCHAR(4),
  Drink_category VARCHAR(10),
  Drink_id VARCHAR(10),
  table_no DECIMAL(3),
  FOREIGN KEY (table_no) REFERENCES Meal(table_no)
);
INSERT INTO Drink-- (Drink_name, Drink_qty, Drink_price, Drink_category, Drink_id, table_no)
VALUES 
  ('Cola', 2, 1.99, 'Beverage', 'D001', 101),
  ('Orange ', 1, 2.49, 'Beverage', 'D002', 102),
  ('Iced Tea', 3, 1.79, 'Beverage', 'D003', 103);



  
 CREATE TABLE  Ussers
    (user_name VARCHAR(30),
    user_id VARCHAR (20),
  
    user_password NVARCHAR(70),
    user_email VARCHAR (30)
   )
   SELECT* FROM Meal
INSERT INTO Ussers VALUES
('john doe', 'u01',12345566, 'qwerty','johnddoe@gmail.com'),
('magie alem', 'u02',2345678, 'asdfg','magieal@gmail.com'),
('mark yuoj','u03',3456789,'xcvbnm','markyuo@gmail.com'),
('gaelmean','u04',4567890, 'fghjklkj','gaelma@gmail.com')

    CREATE TABLE Customers(
  customer_id VARCHAR (5),
  customer_name VARCHAR (15),
  customer_food VARCHAR (10),
  customer_drink VARCHAR (10),
  customer_room VARCHAR (10)
  );

INSERT INTO Customers
VALUES
  ('C001', 'John Smith', 'Chicken B', 'Cola', 'Room 101'),
  ('C002', 'Alice Joe', 'Spaghetti', 'Orange', 'Room 102'),
  ('C003', 'Michael', 'Caesar', 'Iced', 'Room 103'),
  ('C004', 'Emily Johnson', 'Veggie ', 'Water', 'Room 104'),
  ('C005', 'Daniel Brown', 'Beef ', 'Lemonade', 'Room 201'),
  ('C006', 'Olivia Davis', 'Fish ', 'Iced Tea', 'Room 202'),
  ('C007', 'Sophia Wilson', 'Pizza', 'Coke', 'Room 203');



CREATE TABLE Accomodation(
    Room_id VARCHAR(10),
    Room_name VARCHAR(10),
    Room_price VARCHAR(5),
    Room_type VARCHAR(20),
    Room_floor VARCHAR(10)
);

INSERT INTO Accomodation
VALUES
    ('101', 'Haland', '$130', 'double room', '1st'),
    ('102', 'Garden', '$150', 'double room', '1st'),
    ('201', 'Sunset', '$200', 'suite', '2nd'),
    ('202', 'Oceaniew', '$180', 'double room', '2nd'),
    ('301', 'Mounteat', '$250', 'suite', '3rd'),
    ('302', 'Cityscape', '$180', 'double room', '3rd'),
    ('401', 'Lakeside', '$220', 'suite', '4th');

  SELECT * FROM  Ussers