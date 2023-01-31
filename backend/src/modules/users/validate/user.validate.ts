import { check } from 'express-validator'

const userValidate = [
    check('name')
        .isString()
        .withMessage('field need to be string')
        .notEmpty()
        .withMessage('field need to be filled'),
    check('email')
        .isString()
        .withMessage('field need to be string')
        .isEmail()
        .withMessage('field need to be valid email')
        .notEmpty()
        .withMessage('field need to be filled'),
    check('password')
        .isString()
        .withMessage('field need to be string')
        .isStrongPassword()
        .withMessage('field need to be strong')
        .notEmpty()
        .withMessage('field need to be filled'),
    check('address')
        .isString()
        .withMessage('field need to be string')
        .notEmpty()
        .withMessage('field need to be filled'),
    check('city')
        .isString()
        .withMessage('field need to be string')
        .notEmpty()
        .withMessage('field need to be filled'),
    check('state')
        .isString()
        .withMessage('field need to be string')
        .notEmpty()
        .withMessage('field need to be filled'),
    check('cep')
        .isString()
        .withMessage('field need to be string')
        .notEmpty()
        .withMessage('field need to be filled'),
    check('birth_day')
        .isString()
        .withMessage('field need to be string')
        .isDate()
        .withMessage('field need to be date type')
        .notEmpty()
        .withMessage('field need to be filled'),
]

export default userValidate
