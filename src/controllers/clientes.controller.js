const { Cliente, ObraSocial } = require("../db");
const { Op } = require("sequelize");

const getClientes = async (req, res) => {
  const nombre = req.query.nombre;

  try {
    let whereClause = {};
    if (nombre) {
      whereClause = {
        [Op.or]: [
          { nombre: { [Op.iLike]: `%${nombre}%` } },
          { apellido: { [Op.iLike]: `%${nombre}%` } },
        ],
      };
    }

    const clientes = await Cliente.findAll({
      where: whereClause,
      include: {
        model: ObraSocial,
        through: { attributes: [] },
      },
    });

    if (!clientes.length) {
      return res
        .status(404)
        .json({
          success: false,
          message: "No se encontraron clientes en la base de datos.",
        });
    }

    res.status(200).json({ success: true, data: clientes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener clientes." });
  }
};

const getClienteById = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id, {
      include: {
        model: ObraSocial,
        through: { attributes: [] },
      },
    });

    if (cliente) {
      res.status(200).json({ success: true, data: cliente });
    } else {
      res
        .status(404)
        .json({ success: false, message: "No se encontró ese cliente." });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error al obtener el cliente." });
  }
};

const createCliente = async (req, res) => {
  const {
    nombre,
    apellido,
    puntos,
    dni,
    numeroDeAfiliado,
    direccion,
    telefono,
    notas,
    obraSocial,
  } = req.body;

  if (!nombre || !apellido) {
    return res
      .status(400)
      .json({ success: false, message: "Nombre y apellido son requeridos." });
  }

  try {
    let clienteCreado = await Cliente.create({
      nombre,
      apellido,
      puntos,
      dni,
      numeroDeAfiliado,
      direccion,
      telefono,
      notas,
    });

    if (obraSocial && obraSocial.length > 0) {
      let obraSocialDb = await ObraSocial.findAll({
        where: {
          nombre: obraSocial,
        },
      });

      if (obraSocialDb.length === 0) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Algunas obras sociales no fueron encontradas",
          });
      }

      await clienteCreado.addObraSocials(obraSocialDb);
    }

    res
      .status(201)
      .json({
        success: true,
        message: "Cliente creado con éxito!",
        data: clienteCreado,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error interno del servidor" });
  }
};

const updateCliente = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    puntos,
    dni,
    numeroDeAfiliado,
    direccion,
    telefono,
    notas,
    obraSocial,
  } = req.body;

  try {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res
        .status(404)
        .json({
          success: false,
          message: `Cliente con id ${id} no encontrado.`,
        });
    }

    await cliente.update({
      nombre,
      apellido,
      puntos,
      dni,
      numeroDeAfiliado,
      direccion,
      telefono,
      notas,
    });

    if (obraSocial !== undefined) {
      let obraSocialDb = await ObraSocial.findAll({
        where: { nombre: obraSocial },
      });
      await cliente.setObraSocials(obraSocialDb);
    }

    res
      .status(200)
      .json({
        success: true,
        message: `Cliente con id ${id} actualizado con éxito.`,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error al intentar actualizar el cliente.",
      });
  }
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;

  try {
    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res
        .status(404)
        .json({
          success: false,
          message: `Cliente con id ${id} no encontrado.`,
        });
    }

    await cliente.destroy();

    res
      .status(200)
      .json({
        success: true,
        message: `Cliente con id ${id} eliminado con éxito.`,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error al intentar eliminar el cliente.",
      });
  }
};

module.exports = {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
};
