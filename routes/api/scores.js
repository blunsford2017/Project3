const express = require('express');
const router = express.Router();
const scoresCtrl = require('../../controllers/scores');

router.get('/', scoresCtrl.highScores);

/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));
router.post('/', scoresCtrl.create);

router.post('/', scoresCtrl.create);

module.exports = router;