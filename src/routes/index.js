const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('uuid/v4');

let json_pacientes = fs.readFileSync('src/pacientes.json', 'utf-8');
const pacientes = JSON.parse(json_pacientes);
let json_examenes = fs.readFileSync('src/examen.json', 'utf-8');
const examenes = JSON.parse(json_examenes);
let titulo;
router.get('/', (req, res) => {
    res.render('index', {
        pacientes
    });
});

router.get('/paciente', (req, res) => {
    res.render('Paciente');
});

router.get('/examen/:id', (req, res) => {
    let idp = req.params.id;
    let puert = require('../serial');
    console.log(puert);
    res.render('examen', {
        pacientes,
        idp
    });
});




router.get('/examenes/:id', (req, res) => {
    let idp = req.params.id;
    res.render('examenes', {
        pacientes,
        examenes,
        idp
    });
});

router.post('/examen', (req, res) => {
    let { IdPaciente, NivelEzfuerzo, Posicion, Fecha, Nota, Latidos, Diagnostico } = req.body;
    let nuevoExamen = {
        id: uuid(),
        IdPaciente,
        NivelEzfuerzo,
        Posicion,
        Fecha: Fecha,
        Nota: Nota.trim(),
        Latidos,
        Diagnostico
    };
    examenes.push(nuevoExamen);

    json_examenes = JSON.stringify(examenes);
    fs.writeFileSync('src/examen.json', json_examenes, 'utf-8');

    res.redirect('/examenes/' + IdPaciente);
});

router.post('/paciente', (req, res) => {
    console.log(req.body);
    const { Nombre, Apellido, Edad, Sexo, Fuma, HorasEjercicio } = req.body;
    let newPaciente = {
        id: uuid(),
        Nombre,
        Apellido,
        Edad,
        Sexo,
        Fuma,
        HorasEjercicio
    };
    if (!Nombre || !Apellido || !Edad || !Sexo || !Fuma || !HorasEjercicio) {
        res.status(400).send('Error Campos Vacios');
        return;
    }

    pacientes.push(newPaciente);

    json_pacientes = JSON.stringify(pacientes);
    fs.writeFileSync('src/pacientes.json', json_pacientes, 'utf-8');

    res.redirect('/');
});



module.exports = router;