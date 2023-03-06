import React from "react";
import VoucherItem from "./VoucherItem";

const PrintItem = ({ info, vouchers }) => {
  return (
    <div
      style={{
        paddingTop: "16px",
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit,minmax(180px,1fr))`,
        rowGap: "24px",
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

export default PrintItem;
