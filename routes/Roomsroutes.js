// import Roomsroutes.js from 'server.js'
import { getRooms, getRoom, createRoom, updateRoom, deleteRoom } from '../controllers/RoomsControllers.js';

import { login, register, loginRequired } from '../controllers/AuthControllers.js';
    // get rooms
const Roomsroutes = (app) => {
    app.route('/Rooms')
        .get(loginRequired, getRooms)
        .post(loginRequired, createRoom);
        //Get a single room
    app.route('/Room/:id')
        .put(loginRequired, updateRoom)
        .get(loginRequired, getRoom)
        .delete(loginRequired, deleteRoom);
}


export default Roomsroutes;