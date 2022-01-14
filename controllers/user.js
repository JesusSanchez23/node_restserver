const {response} = require('express');
const res = require('express/lib/response');


const usersGet = (req, res = response) => {

    // const params = req.query;
    const {nombre, idkey} = req.query;

    res.json({
        msg: 'get API controller',
        nombre,
        idkey
    })
}

const usersPost = (req, res = response) => {
    // const body = req.body;
    const {nombre,edad,apellido} = req.body;


    res.json({
        msg: 'get API Post',
        nombre_c: nombre +" "+ apellido,
        edad
    })
}
const usersPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: 'get API Put',
        id
    })
}
const usersPatch = (req, res = response) => {
    res.json({
        msg: 'get API Patch'
    })
}
const usersDelete = (req, res = response) => {
    res.json({
        msg: 'get API Delete'
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}