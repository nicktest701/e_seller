import React, { useState, useEffect } from "react";
import { Container, Box, Tab } from "@mui/material";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import { Report } from "@mui/icons-material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import VoucherCategory from "../../../components/tabs/VoucherCategory";
import LoadVoucher from "../../../components/tabs/LoadVoucher";
import SubHeader from "../../../components/SubHeader";
import SubCaption from "../../../components/SubCaption";
import AddCategory from "../../../components/modals/AddCategory";
import { useNavigate } from "react-router-dom";

const AddVoucher = ({ title, category, note, type }) => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("1");

  useEffect(() => {
  
    const category = localStorage.getItem("category");
    if (category !== type) {
      navigate("/add");
    }
  }, [type, navigate]);

  return (
    <>
      <SubHeader title={""} to="/add" />
      <Container>
        <Box>
          <SubCaption caption={title} note={note} />
        </Box>

        <TabContext value={tab}>
          <TabList onChange={(e, value) => setTab(value)} aria-label="Category">
            <Tab
              value="1"
              label={category}
              icon={<CategoryRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="2"
              label=" Pins & Serials"
              icon={<Report />}
              iconPosition="start"
            />
          </TabList>
          <TabPanel value="1">
            <VoucherCategory category={category} setTab={setTab} />
          </TabPanel>
          <TabPanel value="2">
            <LoadVoucher category={category} />
          </TabPanel>
        </TabContext>
      </Container>


    </>
  );
};

AddVoucher.propTypes = {};

export default AddVoucher;
