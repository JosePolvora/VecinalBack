// const dbcvecinal = require("../models/index.models");
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'mi_secreto_super_seguro';
// const Usuario = dbcvecinal.Usuario;

// // Crear usuario (si necesitás, podés eliminar esta función si solo vas a tener el admin)
// async function createUsuario(req, res) {
//   const dataUsuarios = req.body;

//   try {
//     const hashedPassword = await bcrypt.hash(dataUsuarios.clave, 10);

//     const crearUsuario = await Usuario.create({
//       nombre: dataUsuarios.nombre,
//       apellido: dataUsuarios.apellido,
//       correo: dataUsuarios.correo,
//       clave: hashedPassword,
//       activo: false, // pendiente de aprobación
//       rol: 'comun'   // por defecto
//     });

//     res.status(201).json({
//       ok: true,
//       message: "Usuario creado con éxito",
//       usuario: crearUsuario,
//     });
//   } catch (error) {
//     res.status(500).json({ ok: false, message: error.message });
//   }
// }

// // Login
// async function loginUsuario(req, res) {
//   const { correo, clave } = req.body;

//   try {
//     const usuario = await Usuario.findOne({ where: { correo } });

//     if (!usuario) {
//       return res.status(401).json({ ok: false, message: 'Correo no encontrado' });
//     }

//     if (!usuario.activo) {
//       return res.status(403).json({
//         ok: false,
//         message: 'Cuenta inactiva. Espere aprobación del administrador.'
//       });
//     }

//     const claveValida = await bcrypt.compare(clave, usuario.clave);
//     if (!claveValida) {
//       return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
//     }

//     const token = jwt.sign(
//       {
//         id: usuario.id,             // CORREGIDO aquí
//         nombre: usuario.nombre,
//         correo: usuario.correo,
//         rol: usuario.rol,
//       },
//       SECRET_KEY,
//       { expiresIn: '2h' }
//     );

//     res.status(200).json({
//       ok: true,
//       message: 'Inicio de sesión exitoso',
//       token,
//       usuario: {
//         id: usuario.id,            // Y aquí también
//         nombre: usuario.nombre,
//         apellido: usuario.apellido,
//         correo: usuario.correo,
//         rol: usuario.rol
//       },
//     });

//   } catch (error) {
//     res.status(500).json({ ok: false, message: error.message });
//   }
// }


// // Obtener todos los usuarios
// async function getUsuarios(req, res) {
//   try {
//     const usuarios = await Usuario.findAll();
//     res.status(200).json({ ok: true, body: usuarios });
//   } catch (error) {
//     res.status(500).json({ ok: false, message: error.message });
//   }
// }

// // Obtener uno por ID
// async function getUsuarioById(req, res) {
//   const id = req.params.id;
//   try {
//     const usuario = await Usuario.findOne({ where: { usuario_id: id } });
//     res.status(200).json({ ok: true, body: usuario });
//   } catch (error) {
//     res.status(500).json({ ok: false, message: error.message });
//   }
// }

// // Actualizar usuario
// async function updateUsuario(req, res) {
//   const id = req.params.id;
//   const dataUsuarios = req.body;

//   try {
//     let nuevaClave = dataUsuarios.clave;
//     if (dataUsuarios.clave) {
//       nuevaClave = await bcrypt.hash(dataUsuarios.clave, 10);
//     }

//     const actualizaUsuario = await Usuario.update(
//       {
//         nombre: dataUsuarios.nombre,
//         apellido: dataUsuarios.apellido,
//         correo: dataUsuarios.correo,
//         clave: nuevaClave,
//         activo: dataUsuarios.activo,
//         rol: dataUsuarios.rol,
//       },
//       { where: { usuario_id: id } }
//     );

//     res.status(200).json({ ok: true, body: actualizaUsuario });
//   } catch (error) {
//     res.status(500).json({ ok: false, message: error.message });
//   }
// }

// // Eliminar usuario
// async function deleteUsuario(req, res) {
//   const id = req.params.id;

//   try {
//     await Usuario.destroy({ where: { usuario_id: id } });
//     res.status(204).json({ ok: true });
//   } catch (error) {
//     res.status(500).json({ ok: false, message: error.message });
//   }
// }

// // Crear admin (solo vos)
// const createUsuarioAdmin = async (req, res) => {
//   try {
//     const dataUsuarios = req.body;
//     const correo = dataUsuarios.correo;
//     const clavePorDefecto = correo.split('@')[0];

//     const hashedPassword = await bcrypt.hash(clavePorDefecto, 10);

//     const nuevoUsuario = await Usuario.create({
//       nombre: dataUsuarios.nombre,
//       apellido: dataUsuarios.apellido,
//       correo: correo,
//       rol: 'admin',
//       activo: true,
//       clave: hashedPassword,
//     });

//     res.status(201).json({ ok: true, message: 'Usuario admin creado con éxito', data: nuevoUsuario });

//   } catch (error) {
//     console.error('Error al crear usuario admin:', error);
//     res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
//   }
// };

// module.exports = {
//   createUsuario,
//   loginUsuario,
//   getUsuarios,
//   getUsuarioById,
//   updateUsuario,
//   deleteUsuario,
//   createUsuarioAdmin,
// };


const dbcvecinal = require("../models/index.models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'mi_secreto_super_seguro';
const Usuario = dbcvecinal.Usuario;

// Crear usuario (si necesitás, podés eliminar esta función si solo vas a tener el admin)
async function createUsuario(req, res) {
  const dataUsuarios = req.body;

  try {
    const hashedPassword = await bcrypt.hash(dataUsuarios.clave, 10);

    const crearUsuario = await Usuario.create({
      nombre: dataUsuarios.nombre,
      apellido: dataUsuarios.apellido,
      correo: dataUsuarios.correo,
      clave: hashedPassword,
      activo: true, // pendiente de aprobación
      rol: 'admin'   // por defecto
    });

    res.status(201).json({
      ok: true,
      message: "Usuario creado con éxito",
      usuario: crearUsuario,
    });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// Login
async function loginUsuario(req, res) {
  const { correo, clave } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { correo } });

    if (!usuario) {
      return res.status(401).json({ ok: false, message: 'Correo no encontrado' });
    }

    if (!usuario.activo) {
      return res.status(403).json({
        ok: false,
        message: 'Cuenta inactiva. Espere aprobación del administrador.'
      });
    }

    const claveValida = await bcrypt.compare(clave, usuario.clave);
    if (!claveValida) {
      return res.status(401).json({ ok: false, message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      SECRET_KEY,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      ok: true,
      message: 'Inicio de sesión exitoso',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
        rol: usuario.rol
      },
    });

  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// Obtener todos los usuarios
async function getUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json({ ok: true, body: usuarios });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// Obtener uno por ID
async function getUsuarioById(req, res) {
  const id = req.params.id;
  try {
    const usuario = await Usuario.findOne({ where: { id } });
    res.status(200).json({ ok: true, body: usuario });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// Actualizar usuario
async function updateUsuario(req, res) {
  const id = req.params.id;
  const dataUsuarios = req.body;

  try {
    let nuevaClave = dataUsuarios.clave;
    if (dataUsuarios.clave) {
      nuevaClave = await bcrypt.hash(dataUsuarios.clave, 10);
    }

    const actualizaUsuario = await Usuario.update(
      {
        nombre: dataUsuarios.nombre,
        apellido: dataUsuarios.apellido,
        correo: dataUsuarios.correo,
        clave: nuevaClave,
        activo: dataUsuarios.activo,
        rol: dataUsuarios.rol,
      },
      { where: { id } }
    );

    res.status(200).json({ ok: true, body: actualizaUsuario });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// Eliminar usuario
async function deleteUsuario(req, res) {
  const id = req.params.id;

  try {
    await Usuario.destroy({ where: { id } });
    res.status(204).json({ ok: true });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

// Crear admin (solo vos)
const createUsuarioAdmin = async (req, res) => {
  try {
    const dataUsuarios = req.body;
    const correo = dataUsuarios.correo;
    const clavePorDefecto = correo.split('@')[0];

    const hashedPassword = await bcrypt.hash(clavePorDefecto, 10);

    const nuevoUsuario = await Usuario.create({
      nombre: dataUsuarios.nombre,
      apellido: dataUsuarios.apellido,
      correo: correo,
      rol: 'admin',
      activo: true,
      clave: hashedPassword,
    });

    res.status(201).json({ ok: true, message: 'Usuario admin creado con éxito', data: nuevoUsuario });

  } catch (error) {
    console.error('Error al crear usuario admin:', error);
    res.status(500).json({ ok: false, message: 'Error interno del servidor.' });
  }
};

module.exports = {
  createUsuario,
  loginUsuario,
  getUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  createUsuarioAdmin,
};
