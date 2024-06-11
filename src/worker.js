const { excelToJson } = require("./lib/helpers");

addEventListener("message",async (event) => {
  postMessage(await excelToJson(event.data));
});