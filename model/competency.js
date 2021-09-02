const fsPromises = require("fs").promises;
const fs = require('fs');

const DB_PATH = "./db/competency.json";
const DB_SEQ_PATH = "./db/competency_seq.json";

const get = () => {
  return fsPromises.readFile(DB_PATH).then((result) => {
    resultJson = JSON.parse(result);
    return resultJson;
  });
};

const create = async (dataObj) => {
  if (!dataObj.skill || !dataObj.level || !dataObj.selfClaim) {
    return Promise.reject("All field required");
  }
  let dataSeq = fs.readFileSync(DB_SEQ_PATH);
  var dataSeqJson = JSON.parse(dataSeq);
  dataObj.id = dataSeqJson.next_id;
  dataSeqJson.current_id = dataSeqJson.next_id;
  dataSeqJson.next_id += 1;
  fs.writeFileSync(DB_SEQ_PATH, JSON.stringify(dataSeqJson));

  return fsPromises
    .readFile(DB_PATH)
    .then((result) => {
      resultJson = JSON.parse(result);
      resultJson.push(dataObj);

      return fsPromises
        .writeFile(DB_PATH, JSON.stringify(resultJson))
        .then(() => {
          return Promise.resolve(dataObj);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const update = (id, newData) => {
  if (!newData.skill || !newData.level || !newData.selfClaim) {
    return Promise.reject("All field required");
  }
  return fsPromises.readFile(DB_PATH)
    .then((result) => {
      resultJson = JSON.parse(result);
      let filteredData = resultJson.filter(e => e.id == id);
      if (filteredData.length == 1) {
        filteredData = { id: filteredData[0].id, ...newData };
        let restData = resultJson.filter(e => e.id != id);
        restData.push(filteredData);
        return fsPromises.writeFile(DB_PATH, JSON.stringify(restData))
          .then(() => {
            return Promise.resolve(filteredData);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else {
        return Promise.resolve(null);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const unlink = (id) => {
  return fsPromises.readFile(DB_PATH)
    .then((result) => {
      resultJson = JSON.parse(result);
      let filteredData = resultJson.filter(e => e.id == id);
      if (filteredData.length == 1) {
        let restData = resultJson.filter(e => e.id != id);
        return fsPromises.writeFile(DB_PATH, JSON.stringify(restData))
          .then(() => {
            return Promise.resolve(filteredData);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      } else {
        return Promise.resolve(null);
      }
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

module.exports = {
  get,
  create,
  update,
  unlink,
};
