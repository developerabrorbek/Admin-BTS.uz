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

const getAllCustomers = async (setData) => {
  try {
    const { data } = await axiosInstance.get("user/list");
    setData(data.body);
    return data.body;
  } catch (error) {
    console.log(error.message);
  }
};

export default function CustomersTable() {
  const [page, setPage] = React.useState(0);
  const [customers, setCustomers] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getAllCustomers(setCustomers);
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
            </TableRow>
          </TableHead>
          <TableBody>
            {customers &&
              customers.map((customer) => {
                return (
                  <>
                    <TableRow>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.color}</TableCell>
                      <TableCell>{customer.price}</TableCell>
                      <TableCell>{customer.description}</TableCell>
                      <TableCell>{customer.categoryId}</TableCell>
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
        count={customers?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
