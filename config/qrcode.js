const QRCode = require("qrcode");

async function generateQRCode(serial) {
  try {
    const url = await QRCode.toDataURL(serial);

    return url;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = generateQRCode;
