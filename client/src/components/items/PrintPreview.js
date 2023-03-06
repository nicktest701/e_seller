import React from "react";
import VoucherItem from "./VoucherItem";

const PrintPreview = ({ info, vouchers }) => {
  return (
    <div
      style={{
        padding: "8px",
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "8px",
      }}
    >
      {vouchers?.length === 0 ? (
        <p>No data</p>
      ) : (
        vouchers?.map((voucher) => {
          return (
            <VoucherItem key={voucher?.id} info={info} voucher={voucher} />
          );
        })
      )}
    </div>
  );
};

export default PrintPreview;
