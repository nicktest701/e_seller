import React from "react";
import { Container, Box, Stack, Typography, Divider } from "@mui/material";

import CheckerCard from "../../../components/CheckerCard";
import MaterialTable from "material-table";
import { tableIcons } from "../../../config/tableIcons";
import { checkerData } from "../../../mocks/data";
import { checkerColumns } from "../../../mocks/columns";

const CheckerDashboard = (props) => {
  const modifiedcheckerColumns = checkerColumns.map((column) => {
    return { ...column };
  });



  return (
    <Box
      sx={{
        bgcolor: "secondary.main",
        color: "#fff",
      }}
    >
      <Box
        sx={{
          paddingY: 5,
        }}
      >
        <Container>
          <Stack direction="column" paddingY={1}>
            <Typography variant="h4">Checkers & PinCodes</Typography>
            <Typography variant="body2">
              Access and Manage all your serials and pincodes here
            </Typography>
          </Stack>

          <Divider flexItem color="#fff" />
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(150px,1fr))",
              gap: 2,
              paddingY: 2,
            }}
          >
            <CheckerCard />
            <CheckerCard />
          </Box>

          <Box
            sx={{
              paddingY: 5,
            }}
          >
            <MaterialTable
              title="Checkers Information"
              icons={tableIcons}
              columns={modifiedcheckerColumns}
              data={checkerData}
              options={{
                search: false,
                //   paging: false,
              }}
              style={{
                padding: 2,
              }}
            />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

CheckerDashboard.propTypes = {};

export default CheckerDashboard;
