const { response } = require("express");
const res = require("express/lib/response");
const Usuario = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = async(req, res = response) => {
    // const params = req.query;
    const { id } = req.query;
    const { password, google, ...resto } = req.body;

    //Todo validar contra base de datos
    if (password) {
        // encriptar pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "get API controller",
        nombre,
        idkey,
    });
};

// Para insertar nuevos datos
const usersPost = async(req, res = response) => {
    // const body = req.body;
    const { nombre, correo, password, role } = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        role,
    });

    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // guardar en BD

    await usuario.save();
    res.json({
        msg: "get API Post",
        usuario,
    });
};
const usersPut = async(req, res = response) => {
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //Todo validar contra base de datos
    if (password) {
        // encriptar pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: "get API Putss",
        usuario,
    });
};

const usersPatch = (req, res = response) => {
    res.json({
        msg: "get API Patch",
    });
};
const usersDelete = (req, res = response) => {
    res.json({
        msg: "get API Delete",
    });
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
};