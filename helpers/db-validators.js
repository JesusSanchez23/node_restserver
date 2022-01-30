const Role = require('../models/role');
const Usuario = require('../models/user')

const esRoleValido = async(role= '') => {
    const existeRol = await Role.findOne({ role });
    if(!existeRol){
        throw new Error(`El ${role} no esta registrado en la BD`);
    }
}


const emailExiste = async(correo = '')  =>{
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
       throw new Error(`el correo: ${correo} ya esta registrado`);
    }

}



module.exports = {
    esRoleValido,
    emailExiste
}