import React, {useEffect, useState,} from "react";
import {renderRoot} from "./utils"
import axios from "axios";
import SortedTable from "./tables/SortingTable";
import {Button, TextField} from "@mui/material";
import {theme} from "./dashboard/themes/theme1";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import BaseDialog from "./dialogs/SimpleDialog";
import {
  costColumn,
  descriptionColumn,
  detailsColumn,
  nameColumn,
  optionsColumn,
  priceColumn, quantityColumn, totalCostColumn
} from "./tables/columns/Columns"
import ProductRegistration from "./content/ProductRegistration";
import RegistrationConfirmation from "./content/registrationConfirmation";
import Dashboard from "./dashboard/Dashboard";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


export const InventoryRegister = () => {
  const [searchCells, setSearchCells] = useState([]);
  const [registerCells, setRegisterCells] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);
  const searchColumns = React.useMemo(
    () => [
      nameColumn,
      priceColumn,
      descriptionColumn,
      detailsColumn,
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
            row.original.added?
              <Button
                size="small"
                color="primary"
                variant="contained"
                disabled
              >
                agreado
              </Button>
              :
              <BaseDialog
                  title="Agregar Registro"
                  buttonText="agregar"
                  theme={theme}
                  open={open}
                  openAction={handleOpen}
                  closeAction={handleClose}
                >
                <ProductRegistration
                    row={row}
                    itemId={value}
                    acceptFunction={addItemRegister}
                    closeAction={handleClose}
                    ButtonText="agregar"
                />
              </BaseDialog>
          )
        }
      },
    ],
    []
  );

  const RegisterColumns = React.useMemo(
    () => [
      {
        ...nameColumn,
        disableSortBy: true
      },
      {
        ...costColumn,
        disableSortBy: true
      },
      {
        ...quantityColumn,
        disableSortBy: true
      },
      {
        ...totalCostColumn,
        disableSortBy: true
      },
      {
        ...optionsColumn,
        disableSortBy: true,
        Cell: ({ cell: { row, value } }) => {
          const [open, setOpen] = useState(false);
          const handleClose = () => {
            setOpen(false);
          };
          const handleOpen = () => {
            setOpen(true);
          };
          return (
            <>
              { Boolean(value) &&
                <Grid container spacing={1}>
                  <Grid item>
                    <BaseDialog
                      title="Modificar Registro"
                      buttonText="modificar"
                      theme={theme}
                      open={open}
                      openAction={handleOpen}
                      closeAction={handleClose}
                    >
                      <ProductRegistration
                        row={row}
                        itemId={value}
                        acceptFunction={addItemRegister}
                        closeAction={handleClose}
                        ButtonText="modificar"
                      />
                    </BaseDialog>
                  </Grid>
                  <Grid item>
                    <Button
                      type="text"
                      size="small"
                      color="secondary"
                      variant="contained"
                      onClick={() => {
                        setSearchCells(searchCells);
                        addItemRegister(value, 0, 0);
                      }}
                    >
                      quitar
                    </Button>
                  </Grid>
                </Grid>
              }
            </>
          )
        }
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
       await axios.get("/inventory/api/register/")
         .then((data) => {
           setRegisterCells(data.data.items);
         })
         .catch((error) => console.log(error));
    })()
  }, []);

  const loadMoreData = (next) => {
       axios.get(next)
         .then((data) => {
           setResultData(data, false)
         })
         .catch((error) => console.log(error));
  }
  const addItemRegister = (id, cost, quantity) => {
    const payload = {
      id: id,
      cost:cost,
      quantity:quantity
    }
    axios.post(`/inventory/api/register/`, payload)
      .then((data) => {
        setRegisterCells(data.data.items);
      })
      .catch((error) => console.log(error));
  }

  const fetchResults = (e) => {
    axios.get(`/product/item-list/?q=${e.target.value}`)
      .then((data) => {
        setResultData(data)
      })
      .catch((error) => console.log(error));
  }

  const setResultData = (data, replace=true) => {
    data.data.results.forEach(item => {
      const result = registerCells.map(function(a) {return parseInt(a.id);});
      item['added'] = result.includes(item.id);
    })
    replace? setSearchCells(data.data.results): setSearchCells(searchCells.concat(data.data.results));
    setNextUrl(data.data.next)
  }

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleSubmit= (description) => {
    const payload = {
      description: description,
    }
    axios.post(`/inventory/api/registration/`, payload)
  };
  return (
    <Dashboard title="Registrar Mercancia">
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
              <form>
              <TextField
                label="Buscar Producto"
                color="secondary"
                fullWidth
                size="small"
                id="search-item"
                variant="outlined"
                onChange={fetchResults}
              />
            </form>
              {
                Boolean(searchCells.length)
                &&
                <SortedTable columns={searchColumns} data={searchCells} classStyle="styled-table"/>
              }
              {
                nextUrl && Boolean(searchCells.length)
                &&
                <Grid container justifyContent="flex-end">
                  <Button
                    color="secondary"
                    variant="contained"
                    onClick={() => loadMoreData(nextUrl)}
                  >
                    ver más
                  </Button>
                </Grid>
              }
            </Paper>
          </Grid>
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
                Productos a registrar
              </Typography>
              <SortedTable columns={RegisterColumns} data={registerCells} classStyle="primary-table"/>
              <Grid container justifyContent="flex-end">
                <BaseDialog
                      title="confirmar Registro"
                      buttonText="confirmar"
                      theme={theme}
                      open={open}
                      openAction={handleOpen}
                      closeAction={handleClose}
                >
                  <RegistrationConfirmation
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                    rows={registerCells}
                  />
                </BaseDialog>
              </Grid>
            </Paper>
          </Grid>
      </Grid>
    </Dashboard>
  )
}
renderRoot(InventoryRegister, "inventoryRegister");