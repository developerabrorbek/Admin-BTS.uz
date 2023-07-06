import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  AddSubCategoryIconCustom,
  DeleteIconCustom,
  EditIconCustom,
} from "../Icons";
import { axiosInstance } from "../../configs/axios.config";

const getAllCategories = async (setData) => {
  try {
    const allCategories = await axiosInstance.get("category/get/all");
    setData(allCategories.data.body);
  } catch (error) {
    console.log(error.message);
  }
};

const editCategory = async (id, newData) => {
  try {
    const data = await axiosInstance.patch(`category/update/${id}`, newData);
    return data.data;
  } catch (error) {
    console.log(error.message);
  }
};

const deleteCategory = async (id) => {
  try {
    const data = await axiosInstance.delete(`category/delete/${id}`);
    return data.data;
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
                <div
                  className="add-subcategory"
                  onClick={() => editCategory(row.id)}
                >
                  <AddSubCategoryIconCustom />
                </div>
              </TableCell>
              <TableCell align="right">
                <EditIconCustom />
              </TableCell>
              <TableCell align="right">
                <div
                  className="delete-category"
                  onClick={() => {
                    deleteCategory(row.id);
                    getAllCategories(setCategories);
                  }}
                >
                  <DeleteIconCustom />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
