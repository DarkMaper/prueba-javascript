import AlumnosControllers from "../controllers/alumnos.controllers";
import { Router } from "express";

export default class AlumnosRoutes {
    constructor() {
        this.router = Router();
        this.alumnosControllers = new AlumnosControllers();

        this.initRoutes();
    }

    initRoutes() {
        this.router.get('/create', this.alumnosControllers.showFormCreateAlunm);
        this.router.post('/create', this.alumnosControllers.createNewAlumn);
        this.router.get('/', this.alumnosControllers.getAlumns);
    }
}