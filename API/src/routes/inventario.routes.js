import { Router } from "express";
const router = Router();

import { getInventario ,createProducto, updateProducto, deleteProducto, getProducto  } from "../controllers/inventario.controller.js";

router.get ('/inventario', getInventario);

router.get ('/inventario/:Id', getProducto);

router.post ('/inventario', createProducto);

router.patch ('/inventario/:Id', updateProducto);

router.delete ('/inventario/:Id', deleteProducto);

export default router