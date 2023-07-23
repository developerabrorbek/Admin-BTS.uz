import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import { axiosInstance } from "../../../configs/axios.config";
import { Tooltip } from "@mui/material";
import axios from "axios";
import Toaster from "../../Toaster";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "600px",
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
    console.log(error);
  }
};

const addService = (newData) => {
  axiosInstance
    .post(`technical-service/add`, newData)
    .then((res) => Toaster.notify(200, "Successfully added"))
    .catch((err) => Toaster.notify(400, err.message));
};

export default function AddServiceModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = React.useState({});
  const [attachId, setAttachId] = React.useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setMessage({
      attachId: attachId,
      description: data.get("description"),
      name: data.get("name"),
      categoryId: id,
    });
  };

  const handleImageChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    await uploadImage(formData, setAttachId);
  };

  React.useEffect(() => {
    if (open && submit) addService(message);
  }, [message, open, submit]);

  return (
    <div>
      <Tooltip onClick={handleOpen} title="add service">
        <AddToDriveIcon />
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
            Add new service
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
                  <TextField
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Service name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    id="description"
                    label="Enter description"
                    name="description"
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    type="submit"
                    size="large"
                    color="secondary"
                    component="label"
                    fullWidth
                  >
                    Upload image
                    <input
                      type="file"
                      onChange={handleImageChange}
                      hidden
                      multiple
                    />
                  </Button>
                </Grid>
                <Button
                  onClick={() => setSubmit(true)}
                  type="submit"
                  fullWidth
                  variant="contained"
                  xs={12}
                  sx={{ mt: 3, mb: 2, ml: 2 }}
                >
                  Add service
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
