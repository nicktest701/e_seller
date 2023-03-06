import StadiumTemplateItem from "../items/StadiumTemplateItem";

const StadiumTemplate = ({ _id, info, vouchers }) => {
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
            <StadiumTemplateItem
              key={voucher?.id}
              _id={_id}
              info={info}
              voucher={voucher}
            />
          );
        })
      )}
    </div>
  );
};

export default StadiumTemplate;
