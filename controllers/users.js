const { response, request } = require('express');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const usersGet = async(req = request, res = response) => {

    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    const { limit = 10, skip = 0 } = req.query;

    const query = { status: true }

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .limit(Number(limit))
            .skip(Number(skip))
    ])

    res.json({
        total,
        users
    });
}

const usersPost = async (req, res = response) => {
    
    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });

    //generate hash
    const salt = bcrypt.genSaltSync();

    //Encrypt password + hash
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.json({
        user
    });
}

const usersPut = async(req, res = response) => {

    const { id } = req.params;

    const { _id, password, google, email, ...all } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync();
        all.password = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, all)
    
    res.json({
        msg: 'put API - usersPut',
        user
    });
}

const usersPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - usersPatch'
    });
}

const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, { status: false });
    
    res.json({
        msg: 'delete API - usersDelete'
    });
}




module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}