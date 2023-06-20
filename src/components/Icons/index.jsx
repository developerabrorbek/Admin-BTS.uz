import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const EditIconCustom = () => {
  return (
    <>
      <Tooltip title="edit">
        <IconButton>
          <EditIcon sx={{ color: "green" }} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const DeleteIconCustom = () => {
  return (
    <>
      <Tooltip title="delete">
        <IconButton>
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Tooltip>
    </>
  );
};
