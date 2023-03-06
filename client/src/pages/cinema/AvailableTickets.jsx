import { Container, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllVouchersCategory } from "../../api/categoryAPI";
import AvailableCinemaTicketItem from "../../components/items/AvailableCinemaTicketItem";

function AvailableTickets() {
  const movies = useQuery({
    queryKey: ["movie-category"],
    queryFn: () => getAllVouchersCategory("cinema"),
    onSuccess: (cinemaTickets) => {
      // console.log(cinemaTickets);
    },
  });

  if (movies.isLoading || movies.isFetching) {
    return <Typography>Loading....</Typography>;
  }

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: { sm: "center", md: "flex-start" },
        alignItems:'center',
        flexWrap: "wrap",
        gap: 3,
      }}
    >
      {movies?.data.length !== 0
        ? movies?.data.map((movie) => (
            <AvailableCinemaTicketItem key={movie?._id} {...movie} />
          ))
        : null}
    </Container>
  );
}

export default AvailableTickets;
