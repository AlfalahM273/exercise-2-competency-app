const express = require('express');
const router = express.Router();
const competencyController = require("../controllers/competency");


router.route('/')
    .get(competencyController.index)
    .post(competencyController.create);

router.route('/:id')
    .patch(competencyController.update)
    .delete(competencyController.unlink);
    
module.exports = router;
