import React, { Suspense } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Scrollbars from "react-custom-scrollbars";
import { createTheme, ThemeProvider } from "@mui/material";
import CustomProvider from "./context/providers/CustomProvider";
import PayLoading from "./components/PayLoading";

const Shell = React.lazy(() => import("./pages/layout/Shell"));

function App() {

  
  
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        networkMode: "always",
      },
      queries: {
        networkMode: "always",
      },
    },
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: "#333",
        contrastText: "#fff",
      },
      secondary: {
        main: "#083d77",
        // main: "#008000",
        contrastText: "#fff",
      },
    },

    typography: {
      fontFamily: `"Poppins", "Arial", "Roboto", "Helvetica", sans-serif`,
      fontSize: 13,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 500,

      button: {
        textTransform: "capitalize",
        color: "#333",
      },
    },
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small",
          // fullWidth: true,
          sx: {
            fontSize: "13px",
            color: "#5F6368",
          },
        },
      },
      MuiButton: {
        defaultProps: {
          // fullWidth:true,
          disableElevation: true,
          size: "large",
          sx: {
            paddingX: 2,
            borderRadius: "8px",
            paddingY: "10px",
          },
        },
      },
      MuiFormLabel: {
        defaultProps: {
          sx: {
            color: "#333",
          },
        },
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CustomProvider>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<PayLoading />}>
              <Scrollbars autoHide style={{ minHeight: "100vh" }}>
            
                <Shell />
              </Scrollbars>
            </Suspense>
          </ThemeProvider>
        </CustomProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
