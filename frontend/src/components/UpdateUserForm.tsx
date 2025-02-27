import React, { useState } from "react";
import { updateUser } from "../redux/userSlice";
import { useAppDispatch } from "../hooks/hooks";
import MapComponent from "./MyMap"; // Adjust the import path as needed
import { TextField, Button, Container, Box } from "@mui/material";
import { useSnackbar } from "notistack";
import * as Yup from "yup";

interface UpdateUserFormProps {
  user: {
    _id: string;
    name: string;
    email: string;
    location: [number, number];
  };
  onCancel: () => void;
}

// Définir le schéma de validation avec Yup
const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  latitude: Yup.number().required("Latitude is required"),
  longitude: Yup.number().required("Longitude is required"),
});

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({ user, onCancel }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [latitude, setLatitude] = useState(user.location[0]);
  const [longitude, setLongitude] = useState(user.location[1]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Valider les données avant la soumission
    try {
      await validationSchema.validate(
        { name, email, latitude, longitude },
        { abortEarly: false }
      );
      setErrors({});

      if (latitude !== null && longitude !== null) {
        dispatch(
          updateUser({ _id: user._id, name, email, latitude, longitude })
        )
          .unwrap()
          .then(() => {
            enqueueSnackbar("User updated successfully!", {
              variant: "success",
            });
            onCancel();
          })
          .catch(() => {
            enqueueSnackbar("Failed to update user.", { variant: "error" });
          });
      }
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
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

  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
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
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="Email"
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email} // Afficher l'erreur
            helperText={errors.email} // Message d'erreur
          />
          <TextField
            margin="normal"
            fullWidth
            id="latitude"
            label="Latitude"
            name="latitude"
            autoComplete="latitude"
            autoFocus
            value={latitude || ""}
            disabled
            error={!!errors.latitude} // Afficher l'erreur
            helperText={errors.latitude} // Message d'erreur
          />
          <TextField
            margin="normal"
            fullWidth
            id="longitude"
            label="Longitude"
            name="longitude"
            autoComplete="longitude"
            autoFocus
            value={longitude || ""}
            disabled
            error={!!errors.longitude} // Afficher l'erreur
            helperText={errors.longitude} // Message d'erreur
          />

          <MapComponent onLocationSelect={handleLocationSelect} />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateUserForm;
