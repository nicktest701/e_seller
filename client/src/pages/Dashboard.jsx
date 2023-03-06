
import HomeCards from "../components/HomeCards";
import HomeSwiper from '../components/HomeSwiper'



function Dashboard() {
  return (
    <div className="dashboard">
      {/* <Jumbotron /> */}
      <HomeSwiper/>
      <HomeCards />
    </div>
  );
}

export default Dashboard;
