const fsPromises = require("fs").promises;

const DB_PATH = "./db/competency.json";

const get = () => {
  return fsPromises.readFile(DB_PATH).then((result) => {
    resultJson = JSON.parse(result);
    return resultJson;
  });
};

const create = (dataObj) => {
  if (!dataObj.skill || !dataObj.level || !dataObj.selfClaim) {
    return Promise.resolve(false);
  }

  return fsPromises
    .readFile(DB_PATH)
    .then((result) => {
      resultJson = JSON.parse(result);
      resultJson.push(dataObj);

      return fsPromises
        .writeFile(DB_PATH, JSON.stringify(resultJson))
        .then(() => {
          return personJson;
        })
        .catch((err) => {
          return err;
        });
    })
    .catch((err) => {
      throw err;
    });
};

const update = (id, newData) => {};

const unlink = (id) => {};

module.exports = {
  get,
  create,
  update,
  unlink,
};
