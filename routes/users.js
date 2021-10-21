const { Router } = require('express');

const { usersGet,
        usersPut,
        usersPost,
        usersDelete,
        usersPatch
} = require('../controllers/users');
        
const {
    isValidRole,
    existEmail,
    existUserById } = require('../helpers/db-validators');

const router = Router();

const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-fields');

router.get('/', usersGet );

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    check('rol').custom(isValidRole),
    validateFields
], usersPut);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required, min length 6 characters').not().isEmpty().isLength({ min: 6 }),
    check('email', 'Email not valid').isEmail(),
    check('role').custom( isValidRole ),
    check('email').custom( existEmail ),
    validateFields
], usersPost );

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
], usersDelete);

router.patch('/', usersPatch );


module.exports = router;