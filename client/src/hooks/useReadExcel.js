import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

const useReadExcel = (e) => {
  const [path, setPath] = useState("");
  const [error, setError] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    if (e !== null) {
      let files = e.target.files[0];

      try {
        let reader = new FileReader();
        reader.onload = function (e) {
          const data = e.target.result;
          let readData = XLSX.read(data, { type: "binary" });
          const wsname = readData.SheetNames[0];
          const ws = readData.Sheets[wsname];

          /* Convert sheet to json*/

          const dataParse = XLSX.utils.sheet_to_json(ws, {
            header: 0,
          });
          setPath(files.name);
          setData(dataParse);
        };
        reader.readAsBinaryString(files);
      } catch (error) {
        setError(error.message);
      }
    }
  }, [e]);

  return { path, data, error };
};

export default useReadExcel;
