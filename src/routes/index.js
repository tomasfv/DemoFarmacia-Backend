const { Router } = require("express");
const clientesRouter = require("./clientes");
const productosRouter = require("./productos");
const obrasSocialesRouter = require("./obrasSociales");

const router = Router();

// Configurar los routers
router.use("/clientes", clientesRouter);
router.use("/productos", productosRouter);
router.use("/obras-sociales", obrasSocialesRouter);

module.exports = router;
