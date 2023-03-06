
import styles from "../../styles/Bus.module.css";
function BusTemplateItem({ _id, voucher, info }) {
  return (
    <div style={{ backgroundColor: "#ccc" }} className={styles.bus_container}>
      <h2>Bus Ticket</h2>

      <div className={styles.qrbox}>
        <img alt="bus" src={voucher?.qrCode} />
      </div>
      <div className={styles.content}>
        <small className={styles.item_title}>Ticket No.</small>
        <p className={styles.item_value}>{voucher?.serial || voucher?.pin}</p>

        <small className={styles.item_title}>Name</small>
        <p className={styles.item_value}>Nana Akwasi</p>

        <div className={styles.flex_wrapper}>
          <div>
            <small className={styles.item_title}>Origin</small>
            <p className={styles.item_value}>{info?.origin}</p>
          </div>
          <div>
            <small className={styles.item_title}>Destination</small>
            <p className={styles.item_value}>{info?.destination}</p>
          </div>
        </div>
        <div className={styles.flex_wrapper}>
          <div>
            <small className={styles.item_title}>Date</small>
            <p className={styles.item_value}>{info?.date}</p>
          </div>
          <div>
            <small style={{ textAlign: "right" }} className={styles.item_title}>
              Time
            </small>
            <p className={styles.item_value}>{info?.time}</p>
          </div>
        </div>
      </div>
      <div className={styles.curve}></div>

      <svg
        width="60px"
        height="60px"
        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.bus_svg}
      >
        <path
          fill="#000000"
          d="M47 145c-10 0-23 12.4-23 24.9v134.3l52.49 7.5C84.97 297 100.9 287 119 287c21 0 39 13.3 45.9 32h188.2c6.9-18.7 24.9-32 45.9-32s39 13.3 45.9 32H488v-77.2L456.5 145zm-9 14h405.6l25.6 82H296v64h-98v-64H38zm18 18v46h62v-46zm80 0v46h62v-46zm80 0v110h22V177zm40 0v110h22V177zm40 0v46h62v-46zm86.6 0v46h62.2l-14.4-46zM119 305c-17.2 0-31 13.8-31 31s13.8 31 31 31 31-13.8 31-31-13.8-31-31-31zm280 0c-17.2 0-31 13.8-31 31s13.8 31 31 31 31-13.8 31-31-13.8-31-31-31zm-280 23a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8zm280 0a8 8 0 0 1 8 8 8 8 0 0 1-8 8 8 8 0 0 1-8-8 8 8 0 0 1 8-8z"
        />
      </svg>
    </div>
  );
}

export default BusTemplateItem;
