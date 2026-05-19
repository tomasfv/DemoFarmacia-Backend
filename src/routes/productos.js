const { Router } = require("express");
const {
  getProductos,
  createProducto,
  updateProducto,
  deleteProducto,
} = require("../controllers/productos.controller");

const router = Router();

router.get("/", getProductos);
router.post("/", createProducto);
router.put("/:id", updateProducto);
router.delete("/:id", deleteProducto);

module.exports = router;
