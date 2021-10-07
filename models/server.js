const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = 'api/users';

        //Middlewares
        this.middlewares();

        //Routes
        this.routes();
    }

    middlewares() {
        
        //cors
        this.app.use(cors());

        //Read and parse body
        this.app.use(express.json());

        //public
        this.app.use(express.static('public'));
    };

    routes() {
        this.app.use(this.userPath, require('../routes/users'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('servidor corriendo en puerto: ', this.port)
        })
    };
}

module.exports = Server;

