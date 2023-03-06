const ejs = require("ejs");
const fs = require("fs");
const path = require("path");

module.exports = generateVoucherTemplate = async (data) => {
  console.log(data?.info?.voucherCategory);
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(process.cwd(), "/views/", `${data?.info?.voucherCategory}.ejs`),
      { encoding: "utf8" },
      (err, compiledHtmlText) => {
        if (err) reject(err);

        const compiled = ejs.compile(compiledHtmlText);
        const html = compiled(data);
        resolve(html);
      }
    );
  });
};
