var express = require('express');
var productController = require('../controller/product.controller');
const authorize = require('../middleware/authorize');
const router = express.Router();
const upload = require('../middleware/upload');

router.get('/products', authorize(), productController.getProductList);
router.post("/products/save",authorize(), productController.productSchema, productController.saveProduct);
router.post("/products/uploadFile",authorize(), upload.single("file"), productController.saveProduct);
router.get("/products/details/:productId",authorize(), productController.getProductDetails);
router.put("/products/update/:productId",authorize(), productController.productSchema, productController.updateProduct);
router.put("/products/update/quantity/uploadFile",authorize(), upload.single("file"), productController.updateProduct);
router.delete("/products/delete/:productId",authorize(), productController.deleteProduct);
router.get('/products/zeroQuantity', authorize(), productController.getZeroQuantity);

module.exports = router