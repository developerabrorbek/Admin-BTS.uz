import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { axiosInstance } from "../../../configs/axios.config";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

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

const AddCategory = (data) => {
  axiosInstance
    .post("category/add", data)
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.name, ": ", err.message));
};

export default function AddCategoryModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [message, setMessage] = React.useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setMessage({
      name: data.get("name"),
      type: data.get("type"),
    });
  };

  React.useEffect(() => AddCategory(message), []);

  return (
    <div>
      <Tooltip onClick={handleOpen} title="add category">
        <Button variant="contained" color="success">
          <IconButton>
            <AddIcon color="warning" />
          </IconButton>
          Add new category
        </Button>
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
            Add new category
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
