import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import AddBoxIcon from '@mui/icons-material/AddBox';
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

export const AddSubCategoryIconCustom = () => {
  return (
    <>
    <Tooltip title="add subcategory">
        <IconButton>
          <AddBoxIcon sx={{ color: "purple", fontSize : "30px" }} />
        </IconButton>
      </Tooltip>
    </>
  )
}

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
