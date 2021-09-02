const competencyModel = require("../model/competency");

describe("Person Get Data", () => {
  test("get all", () => {
    return competencyModel.get().then((result) => {
      expect(Array.isArray(result)).toBeTruthy();
    });
  });
});

describe("Insert Data", () => {
  test("all req field filled", () => {
    let dataObj = {
      skill: "Node",
      level: "Entry",
      selfClaim: "selfClaim",
    };
    return competencyModel.create(dataObj).then((result) => {
      expect(result).toBeTruthy();
    });
  });

  test("one of req field missing", () => {
    let dataObj = {
      skill: "Node",
      level: "Entry",
    };
    return competencyModel.create(dataObj).then((result) => {
      expect(result).toBeFalsy();
    });
  });

  test("one of req field empty", () => {
    let dataObj = {
      skill: "Node",
      level: "",
      selfClaim: "selfClaim",
    };
    return competencyModel.create(dataObj).then((result) => {
      expect(result).toBeFalsy();
    });
  });
});

describe("Update Data", () => {
  test("field is filled", () => {
    let dataObj = {
      skill: "Node",
      level: "",
      selfClaim: "selfClaim",
    };
    let id = 1;
    return competencyModel.update(id, dataObj).then((result) => {
      expect(Array.isArray(result)).toBeTruthy();
    });
  });
  test("id not found", () => {
    let dataObj = {
      skill: "Node",
      level: "",
      selfClaim: "selfClaim",
    };
    let id = -1;
    return competencyModel.update(id, dataObj).then((result) => {
      expect(Array.isArray(result)).toBeFalsy();
    });
  });
});

describe("Delete Data", () => {
  test("id found", () => {
    let id = -1;
    return competencyModel.unlink(id).then((result) => {
      expect(Array.isArray(result)).toBeTruthy();
    });
  });
  test("id not found", () => {
    let id = -1;
    return competencyModel.unlink(id).then((result) => {
      expect(Array.isArray(result)).toBeFalsy();
    });
  });
});
