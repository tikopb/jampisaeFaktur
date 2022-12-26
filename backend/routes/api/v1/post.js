const router = require("express").Router();
const controllers = require("../../../controller");

//businesspartner start
router.post("/api/v1/bp/get", controllers.businesspartner.Get);
router.post("/api/v1/bp/getById", controllers.businesspartner.GetByid);
router.post("/api/v1/bp/create", controllers.businesspartner.Generate);
router.post("/api/v1/bp/update", controllers.businesspartner.Update);
router.post("/api/v1/bp/destroy", controllers.businesspartner.Delete);
//businesspartner end

//invoice start
router.post("/api/v1/invoice/get", controllers.invoice.Get);
router.post("/api/v1/invoice/getById", controllers.invoice.GetById);
router.post("/api/v1/invoice/create", controllers.invoice.Generate);
router.post("/api/v1/invoice/update", controllers.invoice.Update);
router.post("/api/v1/invoice/delete", controllers.invoice.Delete);
//invoice end

//payment start
router.post("/api/v1/payment/get", controllers.invoice.Get);
router.post("/api/v1/payment/getById", controllers.invoice.GetById);
router.post("/api/v1/payment/create", controllers.invoice.Generate);
router.post("/api/v1/payment/update", controllers.invoice.Update);
router.post("/api/v1/payment/delete", controllers.invoice.Delete);
//payment end

module.exports = router;