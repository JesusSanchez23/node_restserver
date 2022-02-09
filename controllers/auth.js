const bcryptjs = require("bcryptjs");
const { response } = require("express");
const res = require("express/lib/response");
const generarJWT = require("../helpers/generar-jwt");
const Usuario = require("../models/user");

const login = async(req, res = response) => {
    const { correo, password } = req.body;

    try {
        // verificar si el correo existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: "Usuario/contraseña no son correctos - email",
            });
        }

        // si el usuario esta activo en la base de datos
        if (usuario.estado === false) {
            return res.status(400).json({
                msg: "Usuario/contraseña no son correctos - estado: false",
            });
        }

        // verificar la contraseña

        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: "Usuario/contraseña no son correctos - password",
            });
        }

        // generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador",
        });
    }
};

module.exports = login;