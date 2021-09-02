const fsPromises = require("fs").promises;
const fs = require('fs');

const competencyModel = require("../model/competency");



describe("Get Data", () => {
  test("get all", () => {
    return competencyModel.get().then((result) => {
      expect(Array.isArray(result)).toBeTruthy();
    });
  });
});

describe("Insert Data", () => {
  beforeEach(() => {
    const DB_PATH = "./db/competency.json";
    const DB_SEQ_PATH = "./db/competency_seq.json";
    let dataSeqJson = { current_id: 0, next_id: 1 }
    fs.writeFileSync(DB_SEQ_PATH, JSON.stringify(dataSeqJson));
    fs.writeFileSync(DB_PATH, JSON.stringify([]));
  });
  test("all req field filled", async () => {
    let dataObj = {
      skill: "Node",
      level: "Entry",
      selfClaim: "selfClaim",
    };
    await expect(competencyModel.create(dataObj)).resolves.toBeDefined();
    await competencyModel.create(dataObj).then((result) => {
      expect(result.skill).toBe("Node");
    });
  });

  test("one of req field missing", async () => {
    let dataObj = {
      skill: "Node",
      level: "Entry",
    };
    await expect(competencyModel.create(dataObj)).rejects.toBeDefined();
    await competencyModel.create(dataObj).catch((err) => {
      expect(err.message).toBe("All field required");
    });
  });

  test("one of req field empty", async () => {
    let dataObj = {
      skill: "Node",
      level: "",
      selfClaim: "selfClaim",
    };
    await expect(competencyModel.create(dataObj)).rejects.toBeDefined();
    await competencyModel.create(dataObj).catch((err) => {
      expect(err.message).toBe("All field required");
    });
  });
});

describe("Update Data", () => {
  beforeEach(() => {
    const DB_PATH = "./db/competency.json";
    const DB_SEQ_PATH = "./db/competency_seq.json";
    let dataSeqJson = { current_id: 1, next_id: 2 }
    fs.writeFileSync(DB_SEQ_PATH, JSON.stringify(dataSeqJson));
    fs.writeFileSync(DB_PATH, JSON.stringify([
      {
        id: 1,
        skill: "Node",
        level: "Level",
        selfClaim: "selfClaim",
      }
    ]));
  });
  test("field is filled", async () => {
    let dataObj = {
      skill: "Node Update",
      level: "Level Update",
      selfClaim: "selfClaim Update",
    };
    let id = 1;
    await expect(competencyModel.update(id, dataObj)).resolves.toBeDefined();
    await competencyModel.update(id, dataObj).then((result) => {
      expect(result).toBeDefined();
      expect(result.skill).toEqual("Node Update");
    });
  });

  test("id not found", async () => {
    let dataObj = {
      skill: "Node",
      level: "Level Update",
      selfClaim: "selfClaim",
    };
    let id = -1;
    await expect(competencyModel.update(id, dataObj)).resolves.toBeNull();
  });

  test("one of req field missing", async () => {
    let dataObj = {
      skill: "Node",
      level: "",
      selfClaim: "selfClaim",
    };
    let id = -1;
    await expect(competencyModel.update(id, dataObj)).rejects.toBeDefined();
    await competencyModel.update(id, dataObj).catch((err) => {
      expect(err.message).toBe("All field required");
    });
  });
});

describe("Delete Data", () => {
  beforeEach(() => {
    const DB_PATH = "./db/competency.json";
    const DB_SEQ_PATH = "./db/competency_seq.json";
    let dataSeqJson = { current_id: 1, next_id: 2 }
    fs.writeFileSync(DB_SEQ_PATH, JSON.stringify(dataSeqJson));
    fs.writeFileSync(DB_PATH, JSON.stringify([
      {
        id: 1,
        skill: "Node",
        level: "Level",
        selfClaim: "selfClaim",
      }
    ]));
  });
  test("id found", async () => {
    let id = 1;
    await competencyModel.unlink(id).then((result) => {
      expect(result).toBeTruthy();
    });
  });
  test("id not found", async () => {
    let id = -1;
    await competencyModel.unlink(id).then((result) => {
      expect(result).toBeNull();
    });
  });
});
