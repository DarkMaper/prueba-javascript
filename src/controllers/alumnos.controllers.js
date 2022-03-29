import Alumno from "../models/Alumno";

export default class AlumnosControllers {
    constructor() {
        this.alumnoModel = Alumno;
    }

    async showFormCreateAlunm(req, res) {
        
        res.render('createAlumn');
       
    }

    async createNewAlumn(req, res) {
        const {
            nombre,
            apellido1,
            apellido2,
            dni,
            n_expediente,
            email,
            telefono,
            password,
            delegado
        } = req.body;

        const last_digists_dni = dni.slice(-4).substring(0,3);

        const nombre_usuario = (nombre[0] + apellido1.substring(0,3) + apellido2.substring(0,3) + last_digists_dni).toLowerCase();

        const alumnoPayload = {
            nombre,
            apellido1,
            apellido2,
            dni,
            n_expediente,
            email,
            telefono,
            nombre_usuario,
            password,
            delegado
        };

        const newAlumno = Alumno(alumnoPayload);

        await newAlumno.save();

        res.redirect('/alumns/create');
    }

    async getAlumns(req, res) {
        const alumns = await Alumno.find().lean();

        const listAlumns = [...alumns];

        res.render('showAlumns', { alumns: listAlumns });
    }
}