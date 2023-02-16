const {body} = require('express-validator');

module.exports = {
    registerValidation:[
        body('email',"Notogri email Kiritildi").isEmail(),
        body('password', 'Parol Xato Kiritildi').isLength({ min: 5 }),
        body('fullName','Full Name Xato Kiritildi').isLength({ min: 3 }),
        body('avatarUrl','Rasm manzili notogri').optional().isURL()
    ],
    loginValidation:[
        body('email',"Notogri email Kiritildi").isEmail(),
        body('password', 'Parol Xato Kiritildi').isLength({ min: 5 }),
    ],
    createPostValidation:[
        body('title', 'Titledi kiriting').isLength({ min:5 }).isString(),          
        body('text', 'textdi kirting').isLength({min:5}).isString(),
        body('tags', 'Taglardi kiriting, (ular massiv bolsin)').optional().isString(),
        body('imageUrl', 'Rasm manzili notogri').optional().isString()
    ]                               
}

