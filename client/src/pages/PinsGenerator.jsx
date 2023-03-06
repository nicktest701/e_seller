import { LoadingButton } from "@mui/lab";
import { Container, Stack, TextField, Typography } from "@mui/material";
import MaterialTable from "material-table";
// import { ExportCsv, ExportPdf } from "@material-table/exporters";
import React, { useMemo, useState } from "react";
import { generatePins } from "../config/keyGenerator";
import { tableIcons } from "../config/tableIcons";
import _ from "lodash";
import Pin from "./pin&serials/Pin";
import Serial from "./pin&serials/Serials";
import SubHeader from "../components/SubHeader";

function PinsGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState("Pins & Serials");
  const [isPinChecked, setIsPinChecked] = useState(true);
  const [pinOption, setPinOption] = useState("numbers");
  const [pinNumber, setPinNumber] = useState(10);
  const [pinLength, setPinLength] = useState(10);
  const [isSerialChecked, setIsSerialChecked] = useState(true);
  const [serialOption, setSerialOption] = useState("numbers");
  const [serialNumber, setSerialNumber] = useState(10);
  const [serialLength, setSerialLength] = useState(10);

  const keysType = useMemo(() => {
    const isChecked =
      isPinChecked && isSerialChecked
        ? "both"
        : isPinChecked
        ? "pin"
        : "serial";

    return isChecked;
  }, [isPinChecked, isSerialChecked]);

  const handleGenerate = () => {
    try {
      if (keysType === "pin") {
        const pins = generatePins(pinLength, pinNumber, pinOption, "pin");
        console.log(pins);
        setData(pins);
        return;
      }
      if (keysType === "serial") {
        const serials = generatePins(
          serialLength,
          serialNumber,
          serialOption,
          "serial"
        );
        console.log(serials);
        setData(serials);
        return;
      }
      const pins = generatePins(pinLength, pinNumber, pinOption, "pin");
      const serials = generatePins(
        serialLength,
        serialNumber,
        serialOption,
        "serial"
      );

      Promise.all([pins, serials]).then((a) => {
        const both = _.values(
          _.merge(_.keyBy(a[0], "id"), _.keyBy(a[1], "id"))
        );

        setData(both);
      });
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SubHeader />
      <Container maxWidth="md">
        <Stack
          bgcolor="secondary.main"
          color="secondary.contrastText"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          padding={2}
        >
          <Typography variant="h5">Pins & Serials Generator</Typography>
          <Typography>
            Generate all your pins & serials for your vouchers
          </Typography>
        </Stack>
        <Typography sx={{ paddingY: 2, textAlign: "center" }} variant="body2">
          To generate random pin and serial, select how many you need and click
          the blue generate button
        </Typography>
        <Stack
          direction={{ sm: "column", md: "row" }}
          spacing={5}
          paddingY={2}
          width="inherit"
          justifyContent="center"
        >
          <Pin
            isPinChecked={isPinChecked}
            setIsPinChecked={setIsPinChecked}
            pinOption={pinOption}
            setPinOption={setPinOption}
            pinNumber={pinNumber}
            setPinNumber={setPinNumber}
            pinLength={pinLength}
            setPinLength={setPinLength}
          />

          <Serial
            isSerialChecked={isSerialChecked}
            setIsSerialChecked={setIsSerialChecked}
            serialOption={serialOption}
            setSerialOption={setSerialOption}
            serialNumber={serialNumber}
            setSerialNumber={setSerialNumber}
            serialLength={serialLength}
            setSerialLength={setSerialLength}
          />
        </Stack>
        <Stack justifyContent="center" paddingY={3} spacing={3}>
          <TextField
            label="Export file name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            loading={isLoading}
          >
            Generate
          </LoadingButton>

          {data.length !== 0 && (
            <MaterialTable
              title="Pins & Serials"
              icons={tableIcons}
              columns={[
                {
                  title: "id",
                  field: "id",
                  hidden: true,
                  export: true,
                },
                {
                  title: "pin",
                  field: "pin",
                  hidden: !isPinChecked,
                },
                {
                  title: "serial",
                  field: "serial",
                  hidden: !isSerialChecked,
                },
              ]}
              data={data}
              options={{
                search: false,
                exportFileName: fileName,
                exportAllData: true,
                exportButton: true,
                // exportMenu: [
                //   {
                //     label: "Export PDF",
                //     exportFunc: (cols, datas) =>
                //       ExportPdf(cols, datas, "heading"),
                //   },
                //   {
                //     label: "Export CSV",
                //     exportFunc: (cols, datas) =>
                //       ExportCsv(cols, datas, "heading"),
                //   },
                //   {
                //     label: "Export EXCEL",
                //     exportFunc: (cols, datas) => ExportCsv(cols, datas, "heading"),
                //   },
                // ],
              }}
            />
          )}
        </Stack>
      </Container>
    </>
  );
}

export default PinsGenerator;
