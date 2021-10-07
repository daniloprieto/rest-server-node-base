const { response, request } = require('express');

const usersGet = (req = request, res = response) => {

    const params = req.query
    res.status(200).json({
        msg: 'get API - controller',
        params
    })
}

const usersPost = (req, res) => {

    console.log('hola')

    const body = req.body;

    res.status(200).json({
        msg: 'post API - controller',
        body
    })
}

const usersPut = (req, res) => {

    const id = req.params;

    res.status(200).json({
        msg: 'put API - controller',
        id
    })
}

const usersDelete = (req, res) => {
    res.status(200).json({
        msg: 'delete API - controller'
    })
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
}