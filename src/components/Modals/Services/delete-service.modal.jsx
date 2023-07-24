import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { axiosInstance } from "../../../configs/axios.config";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Toaster from "../../Toaster";

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

const deleteService = async (id) => {
  try {
    const data = await axiosInstance.delete(`technical-service/delete/${id}`);
    Toaster.notify(200, "Deleted successfully");
    return data.data;
  } catch (error) {
    console.log(error.message);
  }
};

export default function DeleteServiceModal({ id, name }) {
  const [open, setOpen] = React.useState(false);
  const [submit, setSubmit] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  React.useEffect(() => {
    if (open && submit) deleteService(id);
  }, [id, open, submit]);

  return (
    <div>
      <Tooltip onClick={handleOpen} title="delete service">
        <IconButton>
          <DeleteForeverIcon color="error" />
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
            sx={{
              fontWeight: "bold",
              fontSize: "28px",
              color: "#ca3c25",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            Do you really want to delete{" "}
            <span className="text-[#1d1a05]">{name}</span> service
          </Typography>
          <Button
            onClick={() => {
              setTimeout(() => setOpen(false), 1000);
              setSubmit(true);
              Toaster.notify(300, "Request send");
            }}
            type="submit"
            fullWidth
            variant="contained"
            xs={12}
            sx={{ mt: 3, mb: 2, ml: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
