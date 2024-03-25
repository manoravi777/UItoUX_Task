const router = require('express').Router();
const productController = require('../controller/product');
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

router.post('/add',upload.array("images"),async (req, res) => {
    res.send(await productController.add(req.body,req.files));
});

router.get('/product', async (req, res) => {
    res.send(await productController.fetch());
});

router.get('/topratedproduct', async (req, res) => {
    res.send(await productController.topRatedProducts());
});
router.get('/fetchlproduct', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await productController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/fetchlbycategory', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await productController.fetchByCategory(req.query.categoryId);
	res.send(response);
})
router.get('/specialoffer', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await productController.fetchBySploffer();
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await productController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await productController.update(req.query.id, req.body);
	res.send(response);
})

module.exports = router;