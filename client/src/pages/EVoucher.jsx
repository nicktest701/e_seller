
import { Outlet } from "react-router-dom";
import VoucherPaymentDetails from "../components/modals/VoucherPaymentDetails";

function EVoucher() {
  return (
    <>
      <Outlet />
      <VoucherPaymentDetails />
    </>
  );
}

export default EVoucher;
