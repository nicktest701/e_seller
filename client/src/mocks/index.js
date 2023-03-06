/* eslint-disable import/no-anonymous-default-export */
import { checkerData } from "./data";
import {
  checkerColumns,
  voucherTypeColumns,
  voucherTypeTwoColumns,
  shopRows,
  voucherCategoryColumns,
  universityCategoryColumns,
  busTicketColumns,
  stadiumTicketColumns,
  cinemaTicketColumns,
  UNIVERSITY_FORM_TYPE,
  STADIUM_STANDS,
  MATCH_TYPE,
} from "./columns";
import { towns } from "./towns";
import { cities, cities_regions } from "./cities";

export default {
  //Data
  checkerData,

  shopRows,
  towns,
  cities,
  cities_regions,

  //Columns
  checkerColumns,
  voucherTypeColumns,
  voucherTypeTwoColumns,
  voucherCategoryColumns,
  universityCategoryColumns,
  busTicketColumns,
  stadiumTicketColumns,
  cinemaTicketColumns,

  //
  UNIVERSITY_FORM_TYPE,
  //
  STADIUM_STANDS,
  MATCH_TYPE,
};
