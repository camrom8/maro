
import React from "react";
import { useSortBy, useTable } from "react-table";
import "../../../static/css/style.css"
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function SortedTable({ columns, data, classStyle }) {
  // Use the useTable Hook to send the columns and data to build the table
  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow // Prepare the row (this function needs to be called for each row before getting the row props)
  } = useTable(
    {
      columns,
      data
    },
    useSortBy
  );
  return (
    <table {...getTableProps()} className={classStyle}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps({
                      style: {
                        minWidth: column.minWidth,
                        width: column.width,
                      },
                    }))}>
                {column.render("Header")}
                  {column.isSorted ?
                    (column.isSortedDesc ?
                      <ArrowDropUpIcon color="light" fontSize="small"  /> : <ArrowDropDownIcon color="light" fontSize="small"  />) : ""}

              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return cell.column.link ?
                  <td {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                      },
                    })}><a href={cell.value}>{cell.column.link_text}</a></td> :
                  <td {...cell.getCellProps({
                      style: {
                        minWidth: cell.column.minWidth,
                        width: cell.column.width,
                      },
                    })}>
                    {
                      cell.value?
                      cell.column.currency
                      :''
                    }
                    {
                      cell.column.currency && cell.value?
                      parseFloat(cell.value)
                        .toLocaleString('de-DE', {maximumFractionDigits:2, minimumFractionDigits:2})
                      :cell.render("Cell")
                    }
                  </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}