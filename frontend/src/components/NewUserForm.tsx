import React, { useState } from "react";
import { addUser } from "../redux/userSlice";
import { useAppDispatch } from "../hooks/hooks";
import MapComponent from "./MyMap";
import { TextField, Button, Container, Box, Grid } from "@mui/material";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

// Schéma de validation avec Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
});

const UserForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // Pour stocker les erreurs de validation
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Valider les donnees initialement avec Yup avant la soumission
      await validationSchema.validate(
        { name, email, latitude, longitude },
        { abortEarly: false }
      );
      setErrors({}); // Reinitialiser les erreurs

      if (latitude !== null && longitude !== null) {
        dispatch(addUser({ name, email, latitude, longitude }))
          .unwrap()
          .then(() => {
            enqueueSnackbar("User added successfully!", { variant: "success" });
            // Reinitialiser le formulaire après la soumission validee
            setName("");
            setEmail("");
            setLatitude(null);
            setLongitude(null);
            navigate("/users");
          })
          .catch(() => {
            enqueueSnackbar("Failed to add user.", { variant: "error" });
          });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        // Gerer les erreurs de validation
        const newErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };
// Selectionner la position directement sur la carte
  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <Container maxWidth="md">
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!!errors.name} // Afficher l'erreur
              helperText={errors.name} // Message d'erreur
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={!!errors.email} // Afficher l'erreur
              helperText={errors.email} // Message d'erreur
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="latitude"
              label="Latitude"
              name="latitude"
              autoComplete="latitude"
              value={latitude || ""}
              disabled
              error={!!errors.latitude} // Afficher l'erreur
              helperText={errors.latitude} // Message d'erreur
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              margin="normal"
              fullWidth
              id="longitude"
              label="Longitude"
              name="longitude"
              autoComplete="longitude"
              value={longitude || ""}
              disabled
              error={!!errors.longitude} // Afficher l'erreur
              helperText={errors.longitude} // Message d'erreur
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 4 }}>
          <MapComponent onLocationSelect={handleLocationSelect} />
        </Box>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
};

export default UserForm;
