import React, {useEffect, useState,} from "react";
import {renderRoot} from "./utils"
import axios from "axios";
import SortedTable from "./tables/SortingTable";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {
  costColumn,
  createdColumn,
  descriptionColumn,
  nameColumn,
  optionsColumn,
  quantityColumn,
} from "./tables/columns/Columns"
import Dashboard from "./dashboard/Dashboard";;
import BaseDialog from "./dialogs/SimpleDialog";
import {theme} from "./dashboard/themes/theme1";
import RegistrationDetails from "./content/RegistrationDetails";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


export const InventoryRegistration = () => {
  const [registrationCells, setRegistrationCells] = useState([]);

  const RegistrationColumns = React.useMemo(
    () => [
      descriptionColumn,
      {
        ...quantityColumn,
        Header: "productos",
        accessor: "product_quantity",
      },
      quantityColumn,
      costColumn,
      createdColumn,
      {
        ...nameColumn,
        Header: "agregado por",
        accessor: "user",
      },
      {
        ...optionsColumn,
        Cell: ({ cell: { row, value } }) => {
          const [open, setOpen] = useState(false);
          const handleClose = () => {
            setOpen(false);
          };
          const handleOpen = () => {
            setOpen(true);
          };
          return (
              <BaseDialog
                  title="Detalles del Registro"
                  buttonText="detalles"
                  MaxWidth="md"
                  theme={theme}
                  open={open}
                  openAction={handleOpen}
                  closeAction={handleClose}
                >
                <RegistrationDetails
                    RegistrationId={value}
                    closeAction={handleClose}
                />
              </BaseDialog>
          )
        }
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
       await axios.get("/inventory/api/registration/")
         .then((data) => {
           setRegistrationCells(data.data);
         })
         .catch((error) => console.log(error));
    })()
  }, []);

  return (
     <Dashboard title="Registro">
      <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                overflow: { xs: 'scroll', md: 'auto' },
                height: 'auto',
              }}
            >
              <Typography variant="h5" component="h2">
                Registro de Mercancia
              </Typography>
              <SortedTable columns={RegistrationColumns} data={registrationCells} classStyle="styled-table"/>
            </Paper>
          </Grid>
      </Grid>
     </Dashboard>
  )
}
renderRoot(InventoryRegistration, "inventoryRegistration");