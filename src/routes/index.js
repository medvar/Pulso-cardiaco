const { Router } = require('express');
const router = Router();
const fs = require('fs');
const uuid = require('uuid/v4');

const json_pacientes = fs.readFileSync('src/pacientes.json', 'utf-8');
const pacientes = JSON.parse(json_pacientes);
const json_examenes = fs.readFileSync('src/examen.json', 'utf-8');
const examenes = JSON.parse(json_examenes);

let idp = "";

router.get('/', (req, res) => {
    res.render('index', {
        pacientes
    });
});

router.get('/paciente', (req, res) => {
    res.render('Paciente');
});

router.get('/examen/:id', (req, res) => {
    //console.log(req.params);
    idp = req.params.id;
    res.render('examen', {
        pacientes,
        idp
    });
});

router.post('/Paciente', (req, res) => {
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

    const json_pacientes = JSON.stringify(pacientes);
    fs.writeFileSync('src/pacientes.json', json_pacientes, 'utf-8');

    res.redirect('/');
});



module.exports = router;