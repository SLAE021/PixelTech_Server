const router = require("express").Router();

const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { verifyToken, verifyAdmin } = require("../middlewares/auth.middlewares");

// POST "/api/auth/signup" => recibe credenciales de usuario y lo crea en la DB
router.post("/signup", async (req, res, next) => {
  console.log(req.body);
  const { email, password, username } = req.body;

  // Validaciones de backend

  // 1. Los campos son obligatorios
  if (!email || !password || !username) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return; // esto detiene la funcion. Actuando como clausula de guardia.
  }

  // 2. la contraseña deberia ser lo suficientemente fuerte
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$/gm;
  if (!regexPassword.test(password)) {
    res
      .status(400)
      .json({
        message:
          "La contraseña debe tener al menos, una mayuscula, una minuscula, un numero y entre 8 y 16 caracteres",
      });
    return; // esto detiene la funcion. Actuando como clausula de guardia.
  }

  //! 3. el email debe tener un estructura correcta // pendiente por implementar

  try {
    // 4. No haya otro usuario con el mismo email // todo
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(400).json({ message: "Usuario ya registrado con ese email" });
      return; // esto detiene la funcion. Actuando como clausula de guardia.
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    await User.create({
      email,
      password: hashPassword,
      username,
    });

    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

// POST "/api/auth/login" => recibe credenciales de usario y lo autentica. Envia Token (llave virtual)
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);

  // que todos los campos tenga información
  if (!email || !password) {
    res.status(400).json({ message: "Todos los campos son requeridos" });
    return;
  }

  try {
    // validar que ese usuario exista en la DB
    const foundUser = await User.findOne({ email: email });
    console.log(foundUser);
    if (!foundUser) {
      res.status(400).json({ message: "Usuario no encontrado con ese email" });
      return;
    }

    // validar que la contraseña sea correcta
    const isPasswordCorrect = await bcrypt.compare(
      password,
      foundUser.password
    );
    if (!isPasswordCorrect) {
      res.status(400).json({ message: "Contraseña no es correcta" });
      return;
    }

    // ya hemos autenticado al usuario => enviarle su llave virtual
    const payload = {
      _id: foundUser._id,
      email: foundUser.email,
      role: foundUser.role,
      // cualquier propiedad que identifique al usuario o le de poder especiales debe estar acá
    };

    const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
      algorithm: "HS256",
      expiresIn: "7d",
    });

    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// GET "/api/auth/verify" => recibe el Token y lo valida. Ruta para cuando el usuario vuelve a la app.
router.get("/verify", verifyToken, (req, res) => {
  console.log(req.payload);
  //! de ahora en adelante cada ruta que use el middleware verifyToken tendrá acceso a saber quien es el usuario que hace las llamadas (req.payload)

  res.status(200).json(req.payload);
  //! con esto el frontend sabe quien es el usuario que está navegando por la web
});

// ejemplo de una llamada privada como /user/mi-perfil
router.get("/user/perfil", verifyToken, (req, res) => {
  // todas las llamadas que sean privada DEBERAN tener el verifyToken

  res.json({ message: "aqui tienes tu información privada" });
});

// ejemplo de una llamada privada y de admin como /user/mi-perfil
router.get("/user/admin", verifyToken, verifyAdmin, (req, res) => {
  // todas las llamadas que sean privada DEBERAN tener el verifyToken

  res.json({ message: "esta es tu data de admin" });
});

router.get("/users", verifyToken, verifyAdmin, async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
