import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { axiosInstance } from "../../../configs/axios.config";
import axios from "axios";
import Toaster from "../../Toaster";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const getRoles = (setRoles) => {
  try {
    axiosInstance
      .get("admin/get/roles")
      .then((data) => {
        setRoles(data.data.body);
      })
      .catch((err) => console.log(err.message));
  } catch (error) {
    console.log(error.message);
  }
};

const addAdmin = (data) => {
  try {
    axiosInstance
      .post("admin/add", data)
      .then(() => Toaster.notify(200, "Successfully added!"))
      .catch((err) => console.log(err.name, ": ", err.message));
  } catch (error) {
    console.log(error.message);
  }
};

const uploadImage = async (formData, setId) => {
  try {
    const { data } = await axios.post(
      "https://rjavadev.jprq.live/attach/upload",
      formData
    );
    setId(data.body.id);
    return data.id;
  } catch (error) {
    console.log(error.message);
  }
};

export default function AddAdminModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [submit, setSubmit] = React.useState(false);
  const [data, setData] = React.useState({});
  const [roles, setRoles] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [attachId, setAttachId] = React.useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const upload = new FormData();

    upload.append("file", image);

    uploadImage(upload, setAttachId);

    setData({
      attachId: attachId,
      phoneNumber: formData.get("number"),
      password: formData.get("password"),
      firstname: formData.get("firstName"),
      lastname: formData.get("lastName"),
      roles: [formData.get("role")],
      regionId: 0,
      middleName: "",
      username: formData.get("username"),
      birtDate: formData.get("birthDate"),
    });

    if (submit && attachId) addAdmin(data);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  React.useEffect(() => getRoles(setRoles), []);

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add admin
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
            Enter admin&apos;s information
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
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
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
                  <label
                    htmlFor="role"
                    className="mr-4 text-[18px] font-semibold"
                  >
                    Select role
                  </label>
                  <Select
                    id="role"
                    name="role"
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    {roles.length &&
                      roles.map((role) => {
                        return (
                          <MenuItem key={role} value={role}>
                            {role}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="birthDate"
                    label="Birth Date"
                    name="birthDate"
                    autoComplete="Birth-date"
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
                  onClick={() => {
                    setTimeout(() => setOpen(false), 1000);
                    setSubmit(true);
                    Toaster.notify(300, "Successfully send!");
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  xs={12}
                  sx={{ mt: 3, mb: 2, ml: 2 }}
                >
                  Add
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
