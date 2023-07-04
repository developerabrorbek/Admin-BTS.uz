import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { axiosInstance } from "../../../configs/axios.config";
import { IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

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

const deleteOrder = (newData, id) => {
  axiosInstance
    .delete(`order/delete/${id}`, {
      Headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => console.log(res.data))
    .catch((err) => console.log(err.name, ": ", err.message));
};

export default function OrderDeleteModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  React.useEffect(() => deleteOrder(1), []);

  return (
    <div>
      <Tooltip onClick={handleOpen} title="edit">
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
            sx={{ fontWeight: "bold", fontSize: "38px", color: "#ff2171" }}
          >
            Delete this order
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
