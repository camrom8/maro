import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  ThemeProvider
} from "@mui/material";

export default function BaseDialog({ title, theme, buttonText, open, openAction, closeAction, children}) {

  const handleClickClose = () => {
    closeAction();
  };
  const handleClickOpen = () => {
    openAction();
  };
  return (
    <ThemeProvider theme={theme}>
      <Button color="primary" variant="contained" size="small" onClick={handleClickOpen}>
        {buttonText}
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        onClose={handleClickClose}
        open={open}
      >
        <DialogTitle>{title}</DialogTitle>
        {children}
      </Dialog>
    </ThemeProvider>
  );
}