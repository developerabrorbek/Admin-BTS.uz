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
import UpdateServiceModal from "../Modals/Services/update-service.modal";
import DeleteServiceModal from "../Modals/Services/delete-service.modal";

const getAllServices = async (setData) => {
  try {
    const { data } = await axiosInstance.get("technical-service/get/all");
    setData(data.body);
    return data.body;
  } catch (error) {
    console.log(error.message);
  }
};

export default function ServicesTable() {
  const [page, setPage] = React.useState(0);
  const [services, setServices] = React.useState(null);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getAllServices(setServices);
  }, []);

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 840 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services &&
              services.map((service) => {
                return (
                  <>
                    <TableRow>
                      <TableCell>{service.name}</TableCell>
                      <TableCell>{service.description}</TableCell>
                      <TableCell>{service?.image}</TableCell>
                      <TableCell>{service.categoryId}</TableCell>
                      <TableCell>
                        <UpdateServiceModal id={service.id} />
                      </TableCell>
                      <TableCell>
                        <DeleteServiceModal
                          id={service.id}
                          name={service.name}
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
        count={services?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
