import React, {useMemo, useState} from "react";
import {Button, DialogActions, DialogContent, DialogContentText, TextField} from "@mui/material";

export default function RegistrationConfirmation ({handleClose, handleSubmit, rows}) {
  const initialFormData = useMemo(() => ({
    cost: rows.at(-1).total_cost,
    quantity: rows.at(-1).quantity,
    description: ""
  }), []);

  const handleAccept = () => {
    handleSubmit(formData.description)
  }
  const [formData, setFormData] = useState(initialFormData);
  return (
    <>
    <DialogContent>
      <DialogContentText mb={3}>
        {`Al confirmar se registraran un total de ${formData.quantity}  ${formData.quantity > 1? "productos": 'producto'} con un costo total de $${parseFloat(formData.cost).toLocaleString('de-DE', {maximumFractionDigits:2, minimumFractionDigits:2})}`}
      </DialogContentText>
      <TextField
        id="standard-multiline-static"
        label="Descripción"
        multiline
        fullWidth
        rows={4}
        onChange={(e) => {
          setFormData({...formData, description: e.target.value})
        }}
        defaultValue=""
        variant="filled"
      />
    </DialogContent>
    <DialogActions>
      <Button variant="contained" onClick={handleClose} color="secondary">Cancelar</Button>
      <Button variant="contained" onClick={handleAccept} href="/inventory-registration/">Guardar</Button>
    </DialogActions>
</>
  )
}