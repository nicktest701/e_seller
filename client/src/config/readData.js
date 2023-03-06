import * as XLSX from "xlsx";

export const readData = (e) => {
  try {
    let files = e.target.files[0];
    let dataParse;
    let reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;
      let readData = XLSX.read(data, { type: "binary" });
      const wsname = readData.SheetNames[0];
      const ws = readData.Sheets[wsname];

      /* Convert sheet to json*/

      dataParse = XLSX.utils.sheet_to_json(ws, {
        header: 0,
      });
    };
    reader.readAsBinaryString(files);

    return { dataParse, files };
  } catch (error) {
    throw error;
  }
};
