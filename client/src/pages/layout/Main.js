import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Menu from "@mui/icons-material/Menu";
import Fab  from "@mui/material/Fab";
import { CustomContext } from "../../context/providers/CustomProvider";

function Main() {
  const { customState, customDispatch } = useContext(CustomContext);

  return (
    <main>
      <Fab
        color="primary"
        sx={{
          display: { xs: "none", md: "block" },
          position: "fixed",
          right: "1%",
          top: "20%",
        }}
        onClick={() =>
          customDispatch({
            type: "openSidebar",
            payload: !customState.openSidebar,
          })
        }
      >
        <Menu />
      </Fab>

      <Outlet />
    </main>
  );
}

export default Main;
