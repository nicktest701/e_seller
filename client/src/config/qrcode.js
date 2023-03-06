const QRCode = require("qrcode");

QRCode.toString("https://me.com", function (err, url) {
  console.log(url);
});
// QRCode.toDataURL("https://me.com", function (err, url) {
//   console.log(url);
// });

