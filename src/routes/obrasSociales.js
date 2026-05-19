const { Router } = require("express");
const {
  getObrasSociales,
  getObraSocialById,
  createObraSocial,
  updateObraSocial,
  deleteObraSocial,
} = require("../controllers/obrasSociales.controller");

const router = Router();

router.get("/", getObrasSociales);
router.get("/:id", getObraSocialById);
router.post("/", createObraSocial);
router.put("/:id", updateObraSocial);
router.delete("/:id", deleteObraSocial);

module.exports = router;
