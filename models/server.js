const express = require('express')
const cors = require('cors'); 
require('dotenv').config();


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // middlewares
        this.middlewares();

        // Rutas de mi aplicacion
        this.router();
    }

    middlewares(){
        // cors

        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // directorio publico
        this.app.use(express.static('public'));
    }

    router() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log('Running', this.port);

        })
    };

}



module.exports = Server;
