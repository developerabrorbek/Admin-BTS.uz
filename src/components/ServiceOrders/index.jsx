import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Title from "../Title";
import OrderUpdateModal from "../Modals/Orders/orders-update.modal";
import { axiosInstance } from "../../configs/axios.config";

function createData(
  id,
  date,
  name,
  number,
  shipTo,
  paymentMethod,
  status,
  amount,
  category
) {
  return {
    id,
    date,
    name,
    number,
    shipTo,
    paymentMethod,
    status,
    amount,
    category,
  };
}

const users = [
  createData(
    0,
    "16 Mar, 2019",
    "Elvis Presley",
    "+998 93 612 12 12",
    "Tupelo, MS",
    "VISA ⠀•••• 3719",
    "delivered",
    312.44,
    "New"
  ),
  createData(
    1,
    "16 Mar, 2019",
    "Paul McCartney",
    "+998 93 612 12 12",
    "London, UK",
    "VISA ⠀•••• 2574",
    "rejected",
    866.99,
    "Done"
  ),
  createData(
    2,
    "16 Mar, 2019",
    "Tom Scholz",
    "+998 93 612 12 12",
    "Boston, MA",
    "MC ⠀•••• 1253",
    "status",
    100.81,
    "canceled"
  ),
  createData(
    3,
    "16 Mar, 2019",
    "Michael Jackson",
    "+998 93 612 12 12",
    "Gary, IN",
    "AMEX ⠀•••• 2000",
    "status",
    654.39,
    "New"
  ),
  createData(
    4,
    "15 Mar, 2019",
    "Bruce Springsteen",
    "+998 93 612 12 12",
    "Long Branch, NJ",
    "VISA ⠀•••• 5919",
    "status",
    212.79,
    "Done"
  ),
];
const getOrders = async (setOrders) => {
  const serviceOrders = await axiosInstance.get("order-for-service/get/all");
  setOrders(serviceOrders.data.body);
  return "ok";
};

export default function ServiceOrders() {
  const rows = [];
  const [user, setUser] = useState("All");
  const [orders, setOrders] = useState(null);

  function funOrder(user) {
    if (user == "All") {
      rows.push(...users);
    } else {
      users.forEach((item) => {
        if (item.category == user) {
          rows.push(item);
        }
      });
    }
  }
  funOrder(user);

  React.useEffect(() => {
    getOrders(setOrders);
  }, []);

  return (
    <React.Fragment>
      <Stack
        onClick={(e) => {
          setUser(e.target.textContent);
        }}
        spacing={2}
        direction="row"
      >
        <Button fullWidth variant="contained">
          New
        </Button>
        <Button fullWidth variant="contained" color="success">
          Done
        </Button>
        <Button fullWidth variant="contained" color="error">
          canceled
        </Button>
        <Button fullWidth variant="contained" color="secondary">
          All
        </Button>
      </Stack>

      <Title>Service Orders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Phone number</TableCell>
            <TableCell>Ship To</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="left">Sale Amount</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.length &&
            orders.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.name || "noaniq"}</TableCell>
                <TableCell>{row.number || "noaniq"}</TableCell>
                <TableCell>{row.address || "noaniq"}</TableCell>
                <TableCell>{row.orderStatus}</TableCell>
                <TableCell align="left">{`$${row.order.price}`}</TableCell>
                <TableCell title="update">
                  <OrderUpdateModal id={row.id} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={getOrders} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}
