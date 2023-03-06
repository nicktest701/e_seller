import styles from "../../styles/University.module.css";
import coat_of_arms from "../../assets/images/coat_of_arms.png";
import moment from "moment";
function SecurityServiceTemplateItem({ _id, voucher, info, createdAt }) {
  return (
    <div className={styles.template}>
      <small>Receipt</small>
      <div className={styles.wrapper}>
        <div className={styles.image_container}>
          <img
            src={coat_of_arms}
            alt="logo.png"
            style={{
              width: "35px",
              height: "35px",
            }}
          />
          <h1>Frebby Tech Consults</h1>
        </div>

        <div className={styles.voucher_title}>
          <p className={styles.school}>{voucher?.voucherType}</p>
          <p className={styles.voucher}>Application Voucher</p>
        </div>

        <div>
          <div className={styles.top_container}>
            <div>
              <small>Date:</small>
              <small>
  
                {moment(new Date(createdAt)).format("Do MMMM YYYY,h:mm a")}
              </small>
            </div>
            <div>
              <small>Transaction No:</small>
              <small>{_id ?? "1"}</small>
            </div>
            <div>
              <small>Name :</small>
              <small>{info?.agentName} </small>
            </div>
            <div>
              <small>Phone No.:</small>
              <small>{info?.agentPhoneNumber}</small>
            </div>
            <div>
              <small>Email :</small>
              <small>{info?.agentEmail}</small>
            </div>
          </div>

          <div>
            <small>Particulars: </small>
            <small>
              This is a <b>DIRECT APPLICATIONS FORMS</b>.It is not transferable
              once it is registered to an applicant on the application system.
            </small>
          </div>
          <div className={styles.top_container}>
            <div>
              <small>Serial No. :</small>
              <small>{voucher?.serial}</small>
            </div>
            <div>
              <small>PIN :</small>
              <small>{voucher?.pin}</small>
            </div>
            <div>
              <small>Amount Paid :</small>
              <small>{voucher?.price}</small>
            </div>
          </div>
          <p style={{ textAlign: "center" }}>
            <i>Important Information</i>
          </p>

          <small>
            Go to{" "}
            <a href={info?.dataURL}>
              {info?.dataURL ?? ` the website of ${voucher?.voucherType}`}
            </a>{" "}
            to read Application instructions.Enter your <b> Serial No. </b>
            and your <b> Voucher PIN </b> to complete the admission application
            form.
          </small>

          <hr />
        </div>
      </div>
    </div>
  );
}

export default SecurityServiceTemplateItem;
