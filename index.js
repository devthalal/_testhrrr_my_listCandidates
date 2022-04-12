import fs from "fs";
import path from "path";
import { createFileSync, sendResponse, shieldApi } from "./utils.js";

/**
 * List candidates request hanlder
 * @param {*} req
 * @param {*} res
 */
const listCandidates = (req, res) => {
  try {
    
    let shieldUser;
    axios
      .get(`${shieldApi}/get-user-id`)
      .then(function (response) {
        shieldUser = response.data?.data?.user_id;
      })
      .catch(function (err) {
        sendResponse(res, 401, {
          status: false,
          msg: "Unauthorized access",
          err,
        });
        return;
      });

    const DB_FILE = path.resolve("../localdb.json");
    createFileSync(DB_FILE);
    const data = fs.readFileSync(DB_FILE, { encoding: "utf8", flag: "r" });
    const resData = JSON.parse(data || "[]");
    sendResponse(res, 200, { status: true, data: resData });
  } catch (e) {
    sendResponse(res, 500, { status: false, msg: e.message, err: e });
  }
};
export default { listCandidates };
