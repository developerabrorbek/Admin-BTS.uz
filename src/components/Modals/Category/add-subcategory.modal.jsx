import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { axiosInstance } from "../../../configs/axios.config";
import { IconButton, Tooltip } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
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
    return data.body.id;
  } catch (error) {
    console.log(error.message);
  }
};

const AddSubcategory = (data) => {
  try {
    axiosInstance
      .post("category/add", data)
      .then(() => Toaster.notify(200, "Subcategory added successfully!"))
      .catch((err) => Toaster.notify(400, err.response.data.message));
  } catch (error) {
    console.log(error);
  }
};

export default function AddSubcategoryModal({ id, name }) {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = React.useState({});
  const [image, setImage] = React.useState(null);
  const [attachId, setAttachId] = React.useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const upload = new FormData();

    upload.append("file", image);

    const photoId = await uploadImage(upload, setAttachId);

    setMessage({
      parentId: id,
      attachId: photoId,
      name: data.get("name"),
      type: data.get("type"),
    });

    if (submit && photoId) AddSubcategory(message);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <Tooltip onClick={handleOpen} title="add subcategory">
        <IconButton>
          <AddBoxIcon sx={{ color: "purple", fontSize: "30px" }} />
        </IconButton>
      </Tooltip>
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
            Add new subcategory to{" "}
            <span className="text-[#1d1a05]">{name}</span>
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
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Category Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="type"
                    label="Category type"
                    name="type"
                    autoComplete="family-name"
                  />
                </Grid>

                <Button
                  onClick={() => {
                    setTimeout(() => setOpen(false), 3000);
                    setSubmit(true);
                    Toaster.notify(300, "Request send");
                  }}
                  type="submit"
                  fullWidth
                  variant="contained"
                  xs={12}
                  sx={{ mt: 3, mb: 2, ml: 2 }}
                >
                  Add subcategory
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
