import {
  busTicketColumns,
  cinemaTicketColumns,
  stadiumTicketColumns,
  voucherCategoryColumns,
  universityCategoryColumns,
} from "../mocks/columns";

export function getColumns(category) {
  switch (category) {
    case "university":
      return universityCategoryColumns;
    case "bus":
      return busTicketColumns;
    case "cinema":
      return cinemaTicketColumns;
    case "stadium":
      return stadiumTicketColumns;
    default:
      return voucherCategoryColumns;
  }
}
