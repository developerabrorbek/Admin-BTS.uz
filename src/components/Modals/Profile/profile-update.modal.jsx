import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { axiosInstance } from "../../../configs/axios.config";
import Toaster from "../../Toaster";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const uploadImage = async (formData, setId) => {
  try {
    const { data } = await axios.post(
      "https://rjavadev.jprq.live/api/v1/attach/upload",
      formData
    );
    setId(data.body.id);
    return data.id;
  } catch (error) {
    console.log(error.message);
  }
};

const updateProfile = (newData) => {
  axiosInstance
    .patch(`user/update-my`, newData)
    .then((res) => Toaster.notify(200, res.data.body.message))
    .catch((err) => Toaster.notify(404, err.response.data.message));
};

export default function ProfileUpdateModal() {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formData, setFormData] = React.useState({});
  const [image, setImage] = React.useState(null);
  const [attachId, setAttachId] = React.useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const upload = new FormData();

    upload.append("file", image);

    await uploadImage(upload, setAttachId);

    setFormData({
      attachId: attachId,
      phoneNumber: data.get("number"),
      password: data.get("password"),
      firstname: data.get("firstName"),
      username: data.get("username"),
    });

    if (attachId && submit) {
      updateProfile(formData);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Ozgartirish
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", fontSize: "28px", color: "#ff2171" }}
          >
            Update your profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                columnGap: "28px",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      textAlign: "center",
                      color: "#3aa6b9",
                      fontSize: "22px",
                    }}
                  >
                    Yangi malumotlar
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <input
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: "none" }}
                    id="file-upload"
                    type="file"
                  />
                  <label htmlFor="file-upload">
                    <Button variant="contained" component="span">
                      Upload image
                    </Button>
                  </label>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="Username"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="number"
                    label="Phone number"
                    name="number"
                    autoComplete="Phone number"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Button
                  onClick={() => setSubmit(true)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  xs={12}
                  sx={{ mt: 3, mb: 2, ml: 2 }}
                >
                  Update
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
