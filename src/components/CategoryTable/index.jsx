import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { axiosInstance } from "../../configs/axios.config";
import AddSubcategoryModal from "../Modals/Category/add-subcategory.modal";
import EditCategoryModal from "../Modals/Category/edit-category.modal";
import DeleteCategoryModal from "../Modals/Category/delete-category.modal";
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';

const getAllCategories = async (setData) => {
  try {
    const data = await axiosInstance.get("category/get/all");
    console.log(data.data.body);
    setData(data.data.body);
  } catch (error) {
    console.log(error.message);
  }
};

export default function CategoryTable() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    getAllCategories(setCategories);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table  sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{backgroundColor : "#A4D0A4"}}>
          <TableRow>
            <TableCell sx={{fontWeight : "bold",fontSize : "17px", color: "#213363"}}>Name</TableCell>
            <TableCell sx={{fontWeight : "bold",fontSize : "17px", color: "#213363"}} align="center">Type</TableCell>
            <TableCell sx={{fontWeight : "bold",fontSize : "17px", color: "#213363"}} align="center">Parent ID</TableCell>
            <TableCell sx={{fontWeight : "bold",fontSize : "17px", color: "#213363"}} align="center">Add product</TableCell>
            <TableCell sx={{fontWeight : "bold",fontSize : "17px", color: "#213363"}} align="center">Add service</TableCell>
            <TableCell sx={{fontWeight : "bold",fontSize : "17px", color: "#213363"}} align="center">Add subcategory</TableCell>
            <TableCell sx={{fontWeight : "bold",fontSize : "17px", color: "#213363"}} align="right">Edit</TableCell>
            <TableCell sx={{fontWeight : "bold",fontSize : "17px", color: "#213363"}} align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.type}</TableCell>
              <TableCell align="center">
                {row?.parentId || "Mavjud emas"}
              </TableCell>
              <TableCell align="center">
                <LibraryAddIcon id={row.id} name={row.name} />
              </TableCell>
              <TableCell align="center">
                <AddToDriveIcon id={row.id} name={row.name} />
              </TableCell>
              <TableCell align="center">
                <AddSubcategoryModal id={row.id} name={row.name} />
              </TableCell>
              <TableCell align="right">
                <EditCategoryModal id={row.id} name={row.name} />
              </TableCell>
              <TableCell align="right">
                <DeleteCategoryModal id={row.id} name={row.name} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
