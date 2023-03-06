import { MovieCreation } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { CINEMA_IMAGES } from "../constants";

import styles from "../styles/Movie.module.css";
function MovieSwiperContent({ id, content }) {
  const navigate = useNavigate();

  const url =
    content?.cinema !== null || content?.cinema !== undefined
      ? `${process.env.REACT_APP_API_LOCAL}/images/cinema/${content?.cinema}`
      : CINEMA_IMAGES.poster_1;
  return (
    <>
      <div className={styles.swiper_content}>
        <Typography variant="h4">{content?.movie}</Typography>
        <Typography variant="caption">{content?.theatre}</Typography>
        <Typography variant="body2">
          {moment(new Date(content?.date)).format("Do MMMM YYYY")}
        </Typography>
        <Typography variant="body2">
          {moment(new Date(content?.time)).format("h:mm a")}
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          endIcon={<MovieCreation />}
          onClick={() => navigate(`movie/${id}`)}
        >
          Buy Ticket
        </Button>
      </div>
      <img src={url} alt="swiper-img" />
    </>
  );
}
export default MovieSwiperContent;
