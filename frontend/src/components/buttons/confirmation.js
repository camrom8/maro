import React from "react";
import Grid from "@mui/material/Grid";
import BaseDialog from "../dialogs/SimpleDialog";
import {theme} from "../dashboard/themes/theme1";
import {Button} from "@mui/material";

export default function ConfirmationButtons({ value, row, acceptAction, acceptText, cancelAction, cancelText}) {
  return (
    <Grid container spacing={1}>
      <Grid item>
        <BaseDialog row={row} itemId={value} acceptFunction={acceptAction} ButtonText={acceptText} theme={theme}/>
      </Grid>
      <Grid item>
        <Button
          type="text"
          size="small"
          color="secondary"
          variant="contained"
          onClick={() => cancelAction}
        >
          {cancelText}
        </Button>
      </Grid>
    </Grid>
  )
}