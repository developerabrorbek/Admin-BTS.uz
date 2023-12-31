import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { axiosInstance } from "../../../configs/axios.config";
import { Tooltip } from "@mui/material";
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

const uploadImages = async (formData, setId) => {
  try {
    const { data } = await axiosInstance.post("attach/uploads", formData);
    const allId = data.body.map((e) => e.id);
    setId(allId);
    return data.id;
  } catch (error) {
    console.log(error);
  }
};

const addProduct = (newData) => {
  axiosInstance
    .post(`product/add`, newData)
    .then((res) => Toaster.notify(200, "Successfully added product"))
    .catch((err) => console.log(err.name, ": ", err.message));
};

export default function AddProductModal({ id }) {
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
      price: data.get("price"),
      color: data.get("color"),
      categoryId: id,
    });
  };

  const handleImageChange = async (e) => {
    const formData = new FormData();
    if (e.target.files.length) {
      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("files", e.target.files[i]);
      }
      await uploadImages(formData, setAttachId);
    }
    console.log(formData.getAll("files"));
  };

  React.useEffect(() => {
    if (open && submit) addProduct(message, 1);
  }, [message, open, submit]);

  return (
    <div>
      <Tooltip onClick={handleOpen} title="add product">
        <LibraryAddIcon />
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
            Add new product
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
                    label="Product name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    name="price"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="color"
                    label="Color"
                    name="color"
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
                    Upload images
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
                  Add product
                </Button>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
