import { Chip, Container, ListItemText } from "@mui/material";
import { currencyFormatter, IMAGES } from "../constants";
import moment from "moment";

export const MATCH_TYPE = [
  "FRIENDLY MATCH",
  "LEAGUE MATCH",
  "LEAGUE CUP",
  "LEAGUE CUP FINAL",
  "CUP FINAL",
  "CHARITY MATCH",
];

export const STADIUM_STANDS = [
  "RED STAND",
  "YELLOW STAND",
  "GREEN STAND",
  "VIP STAND",
  "VVIP STAND",
  "POPULAR STAND",
  "NORTH STAND",
  "SOUTH STAND",
  "EAST STAND",
  "WEST STAND",
];

export const UNIVERSITY_FORM_TYPE = [
  "Undergraduate",
  "Postgraduate",
  "Distance Education",
  "Sandwich",
  "Evening",
  "Diploma",
  "Diploma Top Up",
];

export const shopRows = [
  {
    id: 1,
    title: "WAEC RESULTS CHECKERS & SCHOOL PLACEMENT",
    img: IMAGES.waec2,
    content: `Buy school placement check with ease with just a single click`,
    path: "waec-checker",
  },

  {
    id: 2,
    title: "UNIVERSITY & POLYTECHNIC FORMS",
    img: IMAGES.university2,
    content: `Buy school placement check with ease with just a single click`,
    path: "university-form",
  },
  {
    id: 3,
    title: "SECURITY SERVICE FORMS",
    img: IMAGES.security_service,
    content: `Buy school placement check with ease with just a single click`,
    path: "security-service",
  },
  {
    id: 4,
    title: "CINEMA TICKETS",
    img: IMAGES.cinema_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "cinema-ticket",
  },

  {
    id: 5,
    title: "BUS TICKETS",
    img: IMAGES.bus_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "bus-ticket",
  },
  {
    id: 6,
    title: "STADIUM TICKETS",
    img: IMAGES.stadia_ticket,
    content: `Buy school placement check with ease with just a single click`,
    path: "stadia-ticket",
  },
];

export const checkerColumns = [
  {
    title: "#",
    field: "id",
  },
  {
    title: "Checker",
    field: "checker",
  },
  {
    title: "Price",
    field: "price",
  },
  {
    title: "Total",
    field: "total",
    type: "numeric",
  },
  {
    title: "Used",
    field: "used",
    type: "numeric",
  },
  {
    title: "Available",
    field: "available",
    type: "numeric",
  },
];

export const voucherCategoryColumns = [
  {
    title: "#",
    field: "_id",
    hidden: true,
  },
  {
    title: "Voucher Type",
    field: "voucherType",
    // render: (rowData) => {
    //   if (rowData.category === "stadium") {
    //     return `${rowData?.details?.home} Vs ${rowData?.details?.away} (${rowData.voucherType}) `;
    //   }
    //   if (rowData.category === "bus") {
    //     return `${rowData?.details?.from} - ${rowData?.details?.to} (${rowData.voucherType}) `;
    //   }

    //   return rowData.voucherType;
    // },
  },
  {
    title: "Category",
    field: "category",
  },
  {
    title: "Price",
    field: "price",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },

  // {
  //   title: "Total",
  //   field: "total",
  //   type: "numeric",
  // },
  // {
  //   title: "Used",
  //   field: "used",
  //   type: "numeric",
  // },
  // {
  //   title: "Available",
  //   field: "available",
  //   type: "numeric",
  // },
];

export const voucherTypeColumns = [
  {
    title: "#",
    field: "_id",
    hidden: true,
  },
  {
    title: "Voucher",
    field: "voucher",
  },
  {
    title: "Pin",
    field: "pin",
  },
  {
    title: "Serial",
    field: "serial",
  },

  {
    title: "Status",
    field: "active",
    render: (rowData) => (
      <Chip
        variant="filled"
        color={rowData.active ? "success" : "error"}
        size="small"
        label={rowData.active ? "Active" : "Used"}
      />
    ),
  },
];

export const voucherTypeTwoColumns = [
  {
    title: "#",
    field: "_id",
    hidden: true,
  },
  {
    title: "Voucher",
    field: "voucher",
  },
  {
    title: "Pin",
    field: "pin",
  },

  {
    title: "Status",
    field: "active",
    render: (rowData) => (
      <Chip
        variant="filled"
        color={rowData.active ? "success" : "error"}
        size="small"
        label={rowData.active ? "Active" : "Used"}
      />
    ),
  },
];

export const universityCategoryColumns = [
  {
    title: "#",
    field: "_id",
    hidden: true,
  },
  {
    title: "Voucher Type",
    field: "voucherType",
  },
  {
    title: "Form Type",
    field: "formType",
    hidden: true,
  },
  {
    title: "Category",
    field: "category",
  },
  {
    title: "Price",
    field: "price",
    type: "currency",
    currencySetting: {
      currencyCode: "GHS",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  },
];

export const busTicketColumns = [
  {
    field: "id",
    title: "ID",
    hidden: true,
  },
  {
    field: "journey",
    title: "Journey",
  },
  {
    field: "date",
    title: "Date/Time",
    render: (rowData) => (
      <ListItemText
        primary={moment(new Date(rowData.date)).format("dddd,Do MMMM YYYY")}
        secondary={moment(new Date(rowData.time)).format("h:mm a")}
      />
    ),
  },
  {
    field: "price",
    title: "Fare",
    render: (rowData) => currencyFormatter(rowData.price),
  },
];
export const cinemaTicketColumns = [
  {
    field: "id",
    title: "ID",
    hidden: true,
  },
  {
    field: "movie",
    title: "Movie Title",
  },
  {
    field: "theatre",
    title: "Theatre",
    render: (rowData) => (
      <ListItemText primary={rowData?.theatre} secondary={rowData?.location} />
    ),
  },
  {
    field: "date",
    title: "Date",
    render: (rowData) => (
      <ListItemText
        primary={moment(new Date(rowData.date)).format("dddd,Do MMMM YYYY")}
        secondary={moment(new Date(rowData.time)).format("h:mm a")}
      />
    ),
  },
  {
    field: "price",
    title: "Price",
    render: (rowData) => currencyFormatter(rowData.price),
  },
];
export const stadiumTicketColumns = [
  {
    field: "id",
    title: "ID",
    hidden: true,
  },
  {
    field: "matchType",
    title: "Type",
  },
  {
    field: "match",
    title: "Match",
  },
  {
    field: "stand",
    title: "Stand",
    textAlign: "center",
    render: ({ stands }) => (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {stands !== undefined && stands?.length !== 0
          ? stands.map((item) => (
              <Chip
                key={item?.id}
                color="primary"
                label={`${item?.stand}-${currencyFormatter(item?.price)}`}
              />
            ))
          : null}
      </Container>
    ),
  },
  {
    field: "venue",
    title: "Venue",
  },
  {
    field: "date",
    title: "Date",
    render: (rowData) => (
      <ListItemText
        primary={moment(new Date(rowData.date)).format("dddd,Do MMMM YYYY")}
        secondary={moment(new Date(rowData.time)).format("h:mm a")}
      />
    ),
  },
  // {
  //   field: "price",
  //   title: "Price",
  //   render: (rowData) => currencyFormatter(rowData.price),
  // },
];
