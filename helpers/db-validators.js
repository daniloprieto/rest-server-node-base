const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
    const existRole = await Role.findOne({ role });
    if (!existRole) {
        throw new Error(`Role ${role} not exist`);
    }
}

//Verify if email exist

const existEmail = async (email = '') => {

    const exist = await User.findOne({ email });

    if (exist) {
        throw new Error(`The email ${email} already exists`);
    }
}

const existUserById = async (id) => {
    //Verificar si el correo existe 
    const existUser = await User.findById(id);
    
    if (!existUser) { throw new Error(`El id ${id} no existe`); }
};

module.exports = {
    isValidRole,
    existEmail,
    existUserById
}