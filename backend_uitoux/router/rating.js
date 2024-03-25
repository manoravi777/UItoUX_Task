const router = require('express').Router();
const ratingController = require('./../controller/rating');


router.post('/add', async (req, res) => {
    res.send(await ratingController.add(req.body));
});

router.get('/all', async (req, res) => {
    res.send(await ratingController.fetch());
});
router.get('/fetchlrating', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await ratingController.fetchdata(req.query.id);
	res.send(response);
})
router.get('/toprated', async (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	const response = await ratingController.topRatedproduct();
	res.send(response);
})
router.delete('/delete', async (req, res) => {
	const response = await ratingController.delete(req.query.id);
	res.send(response);
})
router.put('/update', async (req, res) => {
	const response = await ratingController.update(req.query.id, req.body);
	res.send(response);
})


module.exports = router;