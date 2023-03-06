import CinemaTemplateItem from "../items/CinemaTemplateItem";

const CinemaTemplate = ({ _id, info, vouchers }) => {
  return (
    <div
      style={{
        padding: "16px",
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
            <CinemaTemplateItem
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

export default CinemaTemplate;
