import React from "react";
import UniversityTemplateItem from "../items/UniversityTemplateItem";

const UniversityTemplate = ({ _id, info, vouchers, createdAt }) => {
  return (
    <div
      style={{
        padding: "16px",
      }}
    >
      {vouchers?.length === 0 ? (
        <p>No data</p>
      ) : (
        vouchers?.map((voucher) => {
          return (
            <UniversityTemplateItem
              _id={_id}
              key={voucher?.id}
              info={info}
              voucher={voucher}
              createdAt={createdAt}
            />
          );
        })
      )}
    </div>
  );
};

export default UniversityTemplate;
