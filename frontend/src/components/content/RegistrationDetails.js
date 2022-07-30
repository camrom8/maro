import Grid from "@mui/material/Grid";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {
  costColumn,
  nameColumn,
  quantityColumn
} from "../tables/columns/Columns";
import SortedTable from "../tables/SortingTable";

export default function RegistrationDetails ({RegistrationId}) {
  const [itemCells, setItemCells] = useState([]);
  const itemsColumns = React.useMemo(
    () => [
      {
        ...nameColumn,
        accessor: "item",
        disableSortBy: true ,
      },
      {
        ...quantityColumn,
        disableSortBy: true,
      },
      {
        ...costColumn,
        disableSortBy: true,
      },
    ],
    []
  );
  useEffect(() => {
    (async () => {
       await axios.get(`/inventory/api/registration/${RegistrationId}/`)
         .then((data) => {
           console.log(data.data);
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
  return (
    <Grid
      container spacing={2}
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12}>
        <SortedTable columns={itemsColumns} data={itemCells} classStyle="primary-table"/>
      </Grid>
    </Grid>
  )
}
