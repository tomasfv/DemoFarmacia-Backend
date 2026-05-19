const { ObraSocial } = require("../db");
const { Op } = require("sequelize");

const getObrasSociales = async (req, res) => {
  const nombre = req.query.nombre;

  try {
    let whereClause = {};
    if (nombre) {
      whereClause = {
        nombre: {
          [Op.iLike]: `%${nombre}%`
        }
      };
    }

    const obrasSociales = await ObraSocial.findAll({ where: whereClause });

    if (obrasSociales.length > 0) {
      res.status(200).json({ success: true, data: obrasSociales });
    } else {
      res.status(404).json({ success: false, message: "No se encontraron obras sociales." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener obras sociales." });
  }
};

const getObraSocialById = async (req, res) => {
  const { id } = req.params;

  try {
    const obraSocial = await ObraSocial.findByPk(id);

    if (obraSocial) {
      res.status(200).json({ success: true, data: obraSocial });
    } else {
      res.status(404).json({ success: false, message: "No se encontró esa obra social." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener la obra social." });
  }
};

const createObraSocial = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ success: false, message: "El nombre de la obra social es requerido." });
  }

  try {
    const nuevaObraSocial = await ObraSocial.create({ nombre });
    res.status(201).json({ success: true, message: "Obra Social creada con éxito!", data: nuevaObraSocial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al crear la obra social." });
  }
};

const updateObraSocial = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ success: false, message: "El nombre de la obra social es requerido." });
  }

  try {
    const obraSocial = await ObraSocial.findByPk(id);

    if (!obraSocial) {
      return res.status(404).json({ success: false, message: "Obra social no encontrada." });
    }

    await obraSocial.update({ nombre });

    res.status(200).json({ success: true, message: `Obra Social con id ${id} actualizada con éxito.`, data: obraSocial });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al intentar actualizar la obra social." });
  }
};

const deleteObraSocial = async (req, res) => {
  const { id } = req.params;

  try {
    const obraSocial = await ObraSocial.findByPk(id);

    if (!obraSocial) {
      return res.status(404).json({ success: false, message: `Obra Social con id ${id} no encontrada.` });
    }

    await obraSocial.destroy();

    res.status(200).json({ success: true, message: `Obra Social con id ${id} eliminada con éxito.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al intentar eliminar la obra social." });
  }
};

module.exports = {
  getObrasSociales,
  getObraSocialById,
  createObraSocial,
  updateObraSocial,
  deleteObraSocial,
};
