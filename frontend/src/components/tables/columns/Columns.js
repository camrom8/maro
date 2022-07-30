const moneyWidth = {
  minWidth: 80,
  width: 90,
}

const quantityWidth = {
  minWidth: 50,
  width: 80
}

const shortTextWidth = {
  minWidth: 80,
  width: 100
}

const normalTextWidth = {
  minWidth: 150,
  width: 200
}

const largeTextWidth = {
  minWidth: 200,
  width: 250
}


export const nameColumn = {
  Header: "nombre",
  accessor: "name",
  ...shortTextWidth
};

export const priceColumn = {
  Header: "precio",
  accessor: "price",
  currency:"$",
  ...moneyWidth
};

export const costColumn = {
  ...priceColumn,
  Header: "costo",
  accessor: "cost",
}

export const totalCostColumn = {
  ...priceColumn,
  Header: "costo total",
  accessor: "total_cost",
}



export const quantityColumn = {
  Header: "cantidad",
  accessor: "quantity",
  ...quantityWidth
};

export const descriptionColumn =   {
  Header: "descripción",
  accessor: "description",
  ...normalTextWidth
};

export const detailsColumn = {
  Header: "detalles",
  accessor: "item_details",
  link:true,
  link_text: "ver",
  ...shortTextWidth
};

export const optionsColumn = {
  Header: "",
  accessor: "id",
  disableSortBy: true,
  sticky: "right",
}

export const createdColumn = {
  Header: "fecha",
  accessor: "created",
  type: "date",
  ...shortTextWidth
}