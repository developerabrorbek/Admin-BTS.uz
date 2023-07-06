import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DeleteIconCustom, EditIconCustom } from "../Icons";
import { axiosInstance } from "../../configs/axios.config";
import AddSubcategoryModal from "../Modals/Category/add-subcategory.modal";
import EditCategoryModal from "../Modals/Category/edit-category.modal";
import DeleteCategoryModal from "../Modals/Category/delete-category.modal";

const getAllCategories = async (setData) => {
  try {
    const data = await axiosInstance.get("category/get/all");
    setData(data.data.body);
  } catch (error) {
    console.log(error.message);
  }
};

// const deleteCategory = async (id) => {
//   try {
//     const data = await axiosInstance.delete(`category/delete/${id}`);
//     return data.data;
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export default function CategoryTable() {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    getAllCategories(setCategories);
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Add subcategory</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
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
                <AddSubcategoryModal id={row.id} name={row.name} />
              </TableCell>
              <TableCell align="right">
                <EditCategoryModal id={row.id} name={row.name} />
              </TableCell>
              <TableCell align="right">
                <DeleteCategoryModal id={row.id} name={row.name}/>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
