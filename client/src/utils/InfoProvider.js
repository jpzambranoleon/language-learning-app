import { createContext, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export const InfoContext = createContext();

export const InfoProvider = (props) => {
  const [status, setStatus] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setStatus((prevState) => ({
      ...prevState,
      open: false,
    }));
  };
  return (
    <InfoContext.Provider
      value={{
        setStatus,
      }}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={status.open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          severity={status.severity}
          sx={{ width: "100%" }}
        >
          {status.message}
        </MuiAlert>
      </Snackbar>

      {props.children}
    </InfoContext.Provider>
  );
};
