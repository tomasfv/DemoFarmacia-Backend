const { Router } = require("express");
const {
  getClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente,
} = require("../controllers/clientes.controller");

const router = Router();

router.get("/", getClientes);
router.get("/:id", getClienteById);
router.post("/", createCliente);
router.put("/:id", updateCliente);
router.delete("/:id", deleteCliente);

module.exports = router;
