import React from "react";
import {Stack, Typography } from "@mui/material";

import UserForm from "../components/NewUserForm";
function Register() {
  return (
    <Stack>
      {" "}
      <Typography
        variant="h4"
        gutterBottom
        sx={{ fontWeight: "bold", color: "primary.main" }}
      >
        Register
      </Typography>
      <UserForm />
    </Stack>
  );
}

export default Register;
