import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { axiosInstance } from "../../configs/axios.config";
import UpdateProductModal from "../Modals/Products/update-product.modal";
import DeleteProductModal from "../Modals/Products/delete-product.modal";

const getAllProducts = async (setData) => {
  try {
    const { data } = await axiosInstance.get("product/get/all");
    setData(data.body);
    return data.body;
  } catch (error) {
    console.log(error.message);
  }
};

export default function ProductsTable() {
  const [page, setPage] = React.useState(0);
  const [products, setProducts] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getAllProducts(setProducts);
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => {
                return (
                  <>
                    <TableRow>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.color}</TableCell>
                      <TableCell>{product.price}</TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{product.categoryId}</TableCell>
                      <TableCell>
                        <UpdateProductModal id={product.id} />
                      </TableCell>
                      <TableCell>
                        <DeleteProductModal
                          id={product.id}
                          name={product.name}
                        />
                      </TableCell>
                    </TableRow>
                  </>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 100]}
        component="div"
        count={products?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
