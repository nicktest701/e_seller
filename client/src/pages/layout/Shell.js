import React, { Suspense, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../Dashboard";
import Login from "../Login";
import Register from "../Register";
import Layout from "./Layout";
import User from "./User";
import EVoucher from "../EVoucher";
import Prepaid from "../Prepaid";
import Airtime from "../Airtime";
import WAECChecker from "../evoucher/WAECChecker";
import SchoolPlacement from "../evoucher/SchoolPlacement";
import SecurityService from "../evoucher/SecurityService";
import UniversityForms from "../evoucher/UniversityForms";
import CinemaTickets from "../evoucher/CinemaTickets";
import StadiaTickets from "../evoucher/StadiaTickets";
import Voucher from "../evoucher/add/Voucher";
import Shop from "../evoucher/Shop";
import Checkout from "../Checkout";
import Payment from "../Payment";
import NotFound from "../NotFound";
import ErrorPage from "../ErrorPage";
import CheckerDashboard from "../evoucher/checker/CheckerDashboard";
import { PAGES } from "../../constants";
import AddChecker from "../evoucher/add";
import PayLoading from "../../components/PayLoading";
import BusTickets from "../evoucher/BusTickets";
import Bus from "../bus";
import BusPreview from "../bus/BusPreview";
// import BookTicket from "../bus/BookTicket";
import BusTicketCheckout from "../bus/BusTicketCheckout";
import Cinema from "../cinema";
import Movie from "../cinema/Movie";
import CinemaTicketCheckout from "../cinema/CinemaTicketCheckout";
import CinemaTemplateItem from "../../components/items/CinemaTemplateItem";
import Stadium from "../stadium";
import MatchTicket from "../stadium/MatchTicket";
import MatchTicketCheckout from "../stadium/MatchTicketCheckout";
import { CustomContext } from "../../context/providers/CustomProvider";
import GlobalAlert from "../../components/alert/GlobalAlert";
import PinsGenerator from "../PinsGenerator";

function Shell() {
  const { customState } = useContext(CustomContext);

  const CheckoutPrint = React.lazy(() => import("../CheckoutPrint"));
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="prepaid" element={<Prepaid />} />
          <Route path="airtime" element={<Airtime />} />

          <Route path="evoucher" element={<EVoucher />}>
            <Route index element={<Shop />} />
            <Route path="waec-checker" element={<WAECChecker />} />
            <Route path="school-placement" element={<SchoolPlacement />} />
            <Route path="security-service" element={<SecurityService />} />
            <Route path="university-form" element={<UniversityForms />} />
            {/* cinema  */}
            <Route path="cinema-ticket" element={<Cinema />}>
              <Route index element={<CinemaTickets />} />
              <Route path="movie/:id" element={<Movie />} />
              <Route path="movie/:id/buy" element={<CinemaTicketCheckout />} />
            </Route>
            {/* bus */}
            <Route path="bus-ticket" element={<Bus />}>
              <Route index element={<BusTickets />} />
              <Route path="preview" element={<BusPreview />} />
              <Route path="preview/buy/:id" element={<BusTicketCheckout />} />
            </Route>

            <Route path="stadia-ticket" element={<Stadium />}>
              <Route index element={<StadiaTickets />} />
              <Route path="match/:id" element={<MatchTicket />} />
              <Route
                path="match/:id/:stand/checkout"
                element={<MatchTicketCheckout />}
              />
            </Route>

            {/* <Route path="checker" element={<Checker />}>
            <Route index element={<CheckerDashboard />} />
          </Route> */}
          </Route>

          <Route path="/add" element={<AddChecker />}>
            <Route index element={<CheckerDashboard />} />
            <Route path="generate" element={<PinsGenerator />} />

            {PAGES.map((item, index) => {
              return (
                <Route
                  key={index}
                  path={item.route}
                  element={<Voucher {...item} />}
                />
              );
            })}
          </Route>
        </Route>
        <Route path="/user" element={<User />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="payment" element={<Payment />} />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="checkout-print"
          element={
            <Suspense fallback={<PayLoading />}>
              <CheckoutPrint />
            </Suspense>
          }
        />
        <Route path="test" element={<CinemaTemplateItem />} />
        <Route path="error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {customState.alertData.message && <GlobalAlert />}
    </>
  );
}

export default Shell;
