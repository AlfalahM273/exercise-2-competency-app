const competencyModel = require("../model/competency");

const index = async (req, res) => {
    let sortKey = req.query.sortKey;
    let sortval = req.query.sortval;
    console.log(sortKey);
    console.log(sortval);
    return competencyModel.get().then((result) => {
        if (sortval) {
            switch (sortval) {
                case 'asc':
                    result = result.sort((a, b) => {
                        if (a[sortKey] && b[sortKey]) {
                            return ( a[sortKey] > b[sortKey]) ? 1 : -1;
                        }
                    })
                    break;
                case 'desc':
                    result = result.sort((a, b) => {
                        if (a[sortKey] && b[sortKey]) {
                            return ( a[sortKey] < b[sortKey]) ? 1 : -1;
                        }
                    })
                    break;
            }
        }
        res.status(200);
        res.json(result);
    });
}

const create = async (req, res) => {
    const {
        skill,
        level,
        selfClaim
    } = req.body;
    return competencyModel.create({
        skill: skill,
        level: level,
        selfClaim: selfClaim
    }).then((result) => {
        res.status(201);
        res.json(result);
    }).catch(error => {
        res.status(422);
        res.json({
            errors: [error.message]
        });
    });
}

const update = async (req, res) => {
    const id = req.params.id;
    const {
        skill,
        level,
        selfClaim
    } = req.body;
    return competencyModel.update(id, {
        skill: skill,
        level: level,
        selfClaim: selfClaim
    }).then((result) => {
        res.status(200);
        res.json(result);
    }).catch(error => {
        res.status(422);
        res.json({
            errors: [error.message]
        });
    });
}

const unlink = async (req, res) => {
    const id = req.params.id;
    return competencyModel.unlink(id).then((result) => {
        if (result) {
            res.status(200);
            res.json({
                message: "Success Delete"
            });
        } else {
            res.status(404);
            res.json({
                errors: ["Data Not Found"]
            });
        }
    }).catch(error => {
        res.status(500);
        res.json({
            errors: [error.message]
        });
    });
}

module.exports = {
    index,
    create,
    update,
    unlink,
};
