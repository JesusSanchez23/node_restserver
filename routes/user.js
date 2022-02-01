const { Router } = require("express");
const { check } = require("express-validator");
const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch,
} = require("../controllers/user");
const {
    esRoleValido,
    emailExiste,
    existeUsuarioId,
} = require("../helpers/db-validators");
const validarCampos = require("../middlewares/validar_campos");

const router = Router();

router.get("/", usersGet);

router.put(
    "/:id", [
        check("id", "no es un id valido").isMongoId(),
        check("id").custom(existeUsuarioId),
        check("role").custom(esRoleValido),
        validarCampos,
    ],
    usersPut
);

router.post(
    "/", [
        check("correo", "El correo no es valido").isEmail(),
        check("correo").custom(emailExiste),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check(
            "password",
            "La contraseña es obligatoria y mayor a 6 letras"
        ).isLength({ min: 6 }),
        // check('role', 'No es un role permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check("role").custom(esRoleValido),
        validarCampos,
    ],
    usersPost
);

router.delete(
    "/:id", [
        check("id", "no es un id valido").isMongoId(),
        check("id").custom(existeUsuarioId),
        validarCampos,
    ],
    usersDelete
);
router.patch("/", usersPatch);

module.exports = router;