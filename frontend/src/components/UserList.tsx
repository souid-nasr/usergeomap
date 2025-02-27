import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { fetchUsers } from "../redux/userSlice";
import NewUpdateUserForm from "./UpdateUserForm";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Slide,
  Divider,
  Pagination,
  Modal,
  Backdrop,
  Fade,
  Typography,
  Paper,
} from "@mui/material";
import { Edit, LocationOn } from "@mui/icons-material";
import { styled } from "@mui/system";

//  User interface 
interface User {
  _id: string;
  name: string;
  email: string;
  location: [number, number];
}

// Card pour User Item
const UserItemCard = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderRadius: "12px",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.2s, box-shadow 0.2s",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
}));

// Nembre des users par page
const ITEMS_PER_PAGE = 3;

const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch users 
  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .catch((error: Error) => {
        console.error("Failed to fetch users:", error.message);
      });
  }, [dispatch]);

  // Handle edit on click 
  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  // Handle cancel editing
  const handleCancel = () => {
    setEditingUser(null);
  };

  // Handle change page 
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  // Calcule users dans la page
  const paginatedUsers = users.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <Box sx={{ padding: 3 }}>
      <List>
        {paginatedUsers.map((user) => (
          <Slide
            direction="up"
            in={true}
            mountOnEnter
            unmountOnExit
            key={user._id}
          >
            <UserItemCard elevation={3}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: "primary.main" }}>
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {user.name}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography variant="body2" color="text.secondary">
                        {user.email}
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 1 }}
                      >
                        <LocationOn fontSize="small" color="action" />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ ml: 1 }}
                        >
                          {`${user.location[0]}, ${user.location[1]}`}
                        </Typography>
                      </Box>
                    </>
                  }
                />
                <IconButton
                  color="primary"
                  onClick={() => handleEdit(user)}
                  sx={{ ml: 2 }}
                >
                  <Edit />
                </IconButton>
              </ListItem>
              <Divider sx={{ my: 1 }} />
            </UserItemCard>
          </Slide>
        ))}
      </List>

      {/* Pagination */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Pagination
          count={Math.ceil(users.length / ITEMS_PER_PAGE)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          shape="rounded"
        />
      </Box>

      {/* Modal pour Edit User*/}
      <Modal
        open={!!editingUser}
        onClose={handleCancel}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={!!editingUser}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              borderRadius: "12px",
            }}
          >
            {editingUser && (
              <NewUpdateUserForm user={editingUser} onCancel={handleCancel} />
            )}
          </Box>
        </Fade>
      </Modal>
    </Box>
  );
};

export default UserList;
