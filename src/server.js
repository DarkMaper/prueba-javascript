import express from 'express';
import morgan from 'morgan';
import { create } from 'express-handlebars';
import { join } from 'path';

import AlumnosRoutes from './routes/alumnos.routes';

import './database';

export default class App {
    constructor() {
        this.app = express();

        this.alumnosRoutes = new AlumnosRoutes();

        this.config();
        this.middlewares();
        this.routes();
    }

    config() {
        const hbs = create({
            partialsDir: join(__dirname, 'views', 'partials'),
            layoutsDir: join(__dirname, 'views', 'layouts'),
            defaultLayout: 'main.hbs',
            extname: '.hbs'

        })

        this.app.engine('.hbs', hbs.engine);
        this.app.set('view engine', '.hbs');
        this.app.set('views', join(__dirname, 'views'))

    }

    middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use('/alumns', this.alumnosRoutes.router);
    }

    listen(port = 3000) {
        const Port = process.env.PORT || port;
        this.app.listen(Port);
        console.log('Listening in port', Port);
    }
}