const { Producto } = require("../db");

const getProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();

    if (productos.length > 0) {
      res.status(200).json({ success: true, data: productos });
    } else {
      res.status(404).json({ success: false, message: "No se encontraron productos." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener los productos." });
  }
};

const createProducto = async (req, res) => {
  const { nombre, precio, stock } = req.body;

  // Validación manual simple (Mejora 7)
  if (!nombre) {
    return res.status(400).json({ success: false, message: "El nombre del producto es requerido." });
  }
  if (precio === undefined || isNaN(Number(precio))) {
    return res.status(400).json({ success: false, message: "El precio es requerido y debe ser un número." });
  }

  try {
    const nuevoProducto = await Producto.create({ nombre, precio, stock });
    res.status(201).json({ success: true, message: "Producto creado con éxito!", data: nuevoProducto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al crear el producto." });
  }
};

const updateProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ success: false, message: "Producto no encontrado." });
    }

    await producto.update({ nombre, precio, stock });

    res.status(200).json({ success: true, message: "Producto actualizado correctamente.", data: producto });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al intentar actualizar el producto." });
  }
};

const deleteProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ success: false, message: "Producto no encontrado." });
    }

    await producto.destroy();

    res.status(200).json({ success: true, message: `Producto con id ${id} eliminado con éxito.` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al intentar eliminar el producto." });
  }
};

module.exports = {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
};
