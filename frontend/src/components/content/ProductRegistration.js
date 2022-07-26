import Grid from "@mui/material/Grid";
import {Button, FormControl, Input, InputAdornment, InputLabel} from "@mui/material";
import React, {useMemo, useState} from "react";
import Typography from "@mui/material/Typography";

export default function ProductRegistration ({row, itemId, acceptFunction, ButtonText, closeAction, ...props}) {
  const initialFormData = useMemo(() => ({
    cost: row.original.cost || 0,
    quantity: row.original.quantity || 1,
  }), []);

  const [formData, setFormData] = useState(initialFormData);


  const onChangeField =  (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleAccept = () => {
    row.original.added = true
    acceptFunction(itemId, formData.cost, formData.quantity )
    closeAction()
  };
  return (
    <Grid
      container spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h5" component="h3" color="secondary" mb={3}>
          {row.original.name}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="cost">Costo</InputLabel>
          <Input
            id="cost"
            name="cost"
            defaultValue={formData.cost}
            onChange={onChangeField}
            label="cost"
            type="number"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="quantity">Cantidad</InputLabel>
          <Input
            id="quantity"
            name="quantity"
            defaultValue={formData.quantity}
            onChange={onChangeField}
            label="quantity"
            type="number"
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} pb={4}>
        <Button
          color="secondary"
          variant="contained"
          onClick= {handleAccept}
        >
          {ButtonText}
        </Button>
      </Grid>
    </Grid>
  )
}
