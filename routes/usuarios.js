const { Router } = require('express');

const { usuariosGet,
        usuariosPut,
        usuariosPost,
        usuariosDelete,
        usuariosPatch } = require('../controllers/usuarios');

const router = Router();

const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');

const { isValidRole } = require('../helpers/db-validators');


router.get('/', usuariosGet );

router.put('/:id', usuariosPut );

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required, min length 6 characters').isLength({ min: 6 }),
    check('email', 'Email not valid').isEmail(),
    // check('role', 'Role not exist').not().isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( isValidRole ),
    validateFields
], usuariosPost );

router.delete('/', usuariosDelete );

router.patch('/', usuariosPatch );


module.exports = router;