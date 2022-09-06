import Grid from "@mui/material/Grid";
import React, {useEffect, useState, useMemo} from "react";
import axios from "axios";
import {
  costColumn,
  nameColumn,
  quantityColumn,
} from "../tables/columns/Columns";
import SortedTable from "../tables/SortingTable";
import {Button, DialogActions, DialogContent, DialogContentText} from "@mui/material";

export default function RegistrationDetails ({RegistrationId, closeAction}) {
  const [itemCells, setItemCells] = useState([]);
  const [regDetails, setRegDetails] = useState('');
  const itemsColumns = React.useMemo(
    () => [
      {
        ...nameColumn,
        accessor: "item",
        disableSortBy: true ,
        width: 250
      },
      {
        ...quantityColumn,
        disableSortBy: true,
        width: 250
      },
      {
        ...costColumn,
        disableSortBy: true,
        width: 250
      },
    ],
    []
  );
  useEffect(() => {
    (async () => {
       await axios.get(`/inventory/api/registration/${RegistrationId}/`)
         .then((data) => {
           setRegDetails({...data.data});
           const total = {
             id: 0,
             item: '',
             quantity: data.data.quantity,
             cost: data.data.cost,
             registration: data.data.id,
           }
           let rows = data.data.items
           rows.push(total)
           setItemCells(rows)
         })
         .catch((error) => console.log(error));
    })()
  }, []);

  const handleClose= () => {
    closeAction()
  };
  return (
    <>
      <DialogContent>
        <DialogContentText mb={3} pl={1}>
          {regDetails.description}
        </DialogContentText>
          <Grid
            container spacing={3}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <SortedTable columns={itemsColumns} data={itemCells} classStyle="primary-table"/>
            </Grid>
          </Grid>
        <DialogContentText mb={3} mt={3} align='right'>
          {regDetails.quantity} products creados por  {regDetails.user} en {regDetails.created}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button color="secondary" variant="contained" onClick={handleClose}>Cerrar</Button>
      </DialogActions>
  </>

  )
}
