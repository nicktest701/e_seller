import { AirplaneTicketRounded } from "@mui/icons-material";
import { Button, Divider, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCinema } from "../../api/cinemaAPI";
import Back from "../../components/Back";
import { currencyFormatter } from "../../constants";
import styles from "../../styles/Movie.module.css";

function Movie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [imageURL, setImageURL] = useState(null);

  const handleNavigate = () => {
    navigate(`buy`, {
      replace: true,
    });
  };

  const movie = useQuery({
    queryKey: ["movie-category"],
    queryFn: () => getCinema(id),
    enabled: !!id,
    onSuccess: (cinemaTicket) => {
      setImageURL(
        `${process.env.REACT_APP_API_LOCAL}/images/cinema/${cinemaTicket?.details?.cinema}`
      );
    },
  });

  return (
    <>
      <Back color="primary" bg="primary.contrastText" />
      <div className={styles.movie_container}>
        <img alt="album" src={imageURL} className={styles.album_image} />
        <div>
          <div className={styles.movie_content}>
            <Typography variant="h3" textAlign="center">
              {movie?.data?.details?.movie}
            </Typography>
            <Typography variant="caption">National Theatre</Typography>

            <Typography>
              {moment(new Date(movie?.data?.details?.date)).format(
                "dddd,Do MMMM YYYY"
              )}
            </Typography>
            <Divider flexItem orientation="vertical" />
            <Typography color="secondary">
              {moment(new Date(movie?.data?.details?.time)).format("h:mm a")}
            </Typography>

            <Typography variant="h5" color="error">
              {currencyFormatter(movie?.data?.price)}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<AirplaneTicketRounded />}
              onClick={handleNavigate}
            >
              Buy Ticket
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
