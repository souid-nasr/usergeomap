import React from "react";
import { Grid, Stack } from "@mui/material";
import Map from "../components/Geolocalisation";
import UserList from "../components/UserList";
function List() {
  return (
    <Stack>

      <Grid container  style={{ height: "70vh" }}>
        {/* Section Carte : 70% */}
        <Grid
          item
          xs={8}
          style={{ borderRight: "1px solid #ccc", height: "100%" }}
        >
          <Map />
        </Grid>

        {/* Section Gestion des users : 30% */}
        <Grid item xs={4} style={{  padding: "10px" }}>
          <UserList />
        </Grid>
      </Grid>
    </Stack>
  );
}

export default List;
