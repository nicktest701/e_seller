import { Grid, Container } from "@mui/material";
import { IMAGES } from "../../constants";
import ShopCard from "../../components/ShopCard";
import { shopRows } from "../../mocks/columns";

function Shop() {
  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingY: 5,
        backgroundImage: ` linear-gradient(to bottom, rgba(245, 246, 252, 0.52), rgba(0, 0,0, 0.5)),
        url(${IMAGES.waec2}); `,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100%",
      }}
    >
      
      <Container maxWidth="md">
        <Grid container spacing={3} paddingY={3}>
          {shopRows.map((shop) => (
            <Grid item sm={6} md={4} key={shop.id}>
              <ShopCard {...shop} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
}

export default Shop;
