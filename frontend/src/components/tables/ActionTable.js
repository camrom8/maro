
import React from "react";
import { useSortBy, useTable } from "react-table";
import "../../../static/css/style.css"

export default function SortedTable({ columns, data }) {
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
    <table {...getTableProps()} className="styled-table">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} >
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps({
                      style: {
                        minWidth: column.minWidth,
                        width: column.width,
                      },
                    }))}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
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
                console.log(cell);
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
                    })}>{cell.column.currency}{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}