import * as React from "react";
import PropTypes from "prop-types";
// import Box from "@mui/material/Box";
// import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { DeleteIconCustom, EditIconCustom } from "../Icons";
import { axiosInstance } from "../../configs/axios.config";

// function createData(name, type, edit, deleteIcon) {
//   return {
//     name,
//     type,
//     edit,
//     deleteIcon,
//     history: [
//       {
//         name: "Iphone",
//         date: "2020-01-05",
//         customerId: "White",
//         amount: 3,
//       },
//       {
//         name: "Iphone 14",
//         date: "2020-01-02",
//         customerId: "Red",
//         amount: 1,
//       },
//     ],
//   };
// }

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row?.name}
        </TableCell>
        <TableCell align="right">{row?.type}</TableCell>
        <TableCell align="right">
          <EditIconCustom id={row?.id} />
        </TableCell>
        <TableCell align="right">
          <DeleteIconCustom id={row?.id} />
        </TableCell>
      </TableRow>
      {/* <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Products
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Color</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell>{historyRow.name}</TableCell>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount  * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow> */}
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    type: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

// const rows = [
//   createData(
//     "Televizor",
//     159,
//     <EditIconCustom />,
//     <DeleteIconCustom />,
//     4.0,
//     3.99
//   ),
//   createData(
//     "Telefon",
//     237,
//     <EditIconCustom />,
//     <DeleteIconCustom />,
//     4.3,
//     4.99
//   ),
//   createData(
//     "Konditsioner Samsung",
//     262,
//     <EditIconCustom />,
//     <DeleteIconCustom />,
//     6.0,
//     3.79
//   ),
//   createData(
//     "Kir mashina",
//     305,
//     <EditIconCustom />,
//     <DeleteIconCustom />,
//     4.3,
//     2.5
//   ),
//   createData(
//     "Holodilnik",
//     356,
//     <EditIconCustom />,
//     <DeleteIconCustom />,
//     3.9,
//     1.5
//   ),
// ];

const getAllCategories = async (setData) => {
  try {
    const allCategories = await axiosInstance.get("category/get/all");
    setData(allCategories.data.body);
    console.log(allCategories)
  } catch (error) {
    console.log(error.message);
  }
};

export default function CategoryTable() {
  const [categories, setCategories] = React.useState([]);
  

  React.useEffect(() => {
    getAllCategories(setCategories);
  }, []);

  console.log(categories);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Category Name</TableCell>
            <TableCell align="right">Products amount</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <Row key={category.id} row={category} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
