import React, { useEffect, useState, Fragment } from "react";
import {createRoot } from "react-dom/client";
import axios from "axios";
import SortedTable from "./tables/SortingTable";
import {Button, TextField, ThemeProvider} from "@mui/material";
import {theme} from "./dashboard/themes/theme1";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";


export const Inventory = () => {
  const [cells, setCells] = useState([]);
  const [nextUrl, setNextUrl] = useState([]);
  const columns = React.useMemo(
    () => [
      {
        Header: "id",
        accessor: "id", // accessor is the "key" in the data
        minWidth: 50,
        width: 90
      },
      {
        Header: "nombre",
        accessor: "name",
        minWidth: 140,
        width: 150
      },
      {
        Header: "precio",
        accessor: "price",
        minWidth: 140,
        width: 150,
        currency:"$",
      },
      {
        Header: "descripción",
        accessor: "description",
        minWidth: 150,
        width: 200
      },
      {
        Header: "detalles",
        accessor: "item_details",
        link:true,
        link_text: "ver producto",
        minWidth: 50,
        width: 150
      },
      {
        Header: "vencimiento",
        accessor: "expiration",
        minWidth: 100,
        width: 150
      },
    ],
    []
  );

  useEffect(() => {
    (async () => {
       await axios.get("/product/item-list/")
         .then((data) => {
           setCells(data.data.results);
           setNextUrl(data.data.next)}
         )
         .catch((error) => console.log(error));
    })()
  }, []);

  const loadMoreData = (next) => {
       axios.get(next)
         .then((data) => {
           setCells(cells.concat(data.data.results));
           setNextUrl(data.data.next)
         })
         .catch((error) => console.log(error));
  }

  const fetchResults = (e) => {
    axios.get(`/product/item-list/?q=${e.target.value}`)
         .then((data) => {
           setCells(data.data.results);
           setNextUrl(data.data.next)
         })
         .catch((error) => console.log(error));
  }

  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <form>
          <TextField
            color="secondary"
            fullWidth
            size="small"
            id="search-item"
            label="Buscar Producto"
            variant="outlined"
            onChange={fetchResults}
          />
        </form>
        <SortedTable columns={columns} data={cells}/>
        {
          nextUrl
          && <Button color="secondary" variant="contained" onClick={() => loadMoreData(nextUrl)} hidden={!nextUrl}>ver más</Button>
        }
      </ThemeProvider>
    </Fragment>
  )
}
// export default class Inventory extends Component {
//   constructor(props) {
//     super(props);
//   }
//
//   render() {
//     return (
//         <Dashboard title="Inventario">
//         </Dashboard>
//     );
//   }
// }

const container = document.getElementById("inventory");
const root = createRoot(container);
root.render(<Inventory/>);