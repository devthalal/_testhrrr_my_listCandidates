import fs from "fs";
import path from "path";
import { createFileSync, sendResponse } from "./utils.js";

import { env } from "node-blox-sdk";
env.init();

/**
 * List candidates request hanlder
 * @param {*} req
 * @param {*} res
 */
const listCandidates = (req, res) => {
  try {

    if (req.params["health"] === "health") {
      return sendResponse(res, 200, {
        success: true,
        msg: "Health check success",
      });
    }

    const DB_FILE = path.resolve("../localdb.json");
    createFileSync(DB_FILE);
    const data = fs.readFileSync(DB_FILE, { encoding: "utf8", flag: "r" });
    const resData = JSON.parse(data || "[]");
    sendResponse(res, 200, { status: true, data: resData, ENV: process.env });
  } catch (e) {
    sendResponse(res, 500, { status: false, msg: e.message, err: e });
  }
};
export default listCandidates;
