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
import OrderDeleteModal from "../Modals/Orders/delete-order.modal";

function createData(
	id,
	date,
	name,
	number,
	shipTo,
	paymentMethod,
	status,
	amount,
	category,
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
		"New",
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
		"Done",
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
		"canceled",
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
		"New",
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
		"Done",
	),
];
function preventDefault(event) {
	event.preventDefault();
}

export default function Orders() {

	const rows = [];
	const [user, setUser] = useState("All");

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

			<Title>Recent Orders</Title>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Date</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>Phone number</TableCell>
						<TableCell>Ship To</TableCell>
						<TableCell>Payment Method</TableCell>
						<TableCell>Status</TableCell>
						<TableCell align="left">Sale Amount</TableCell>
						<TableCell>Edit</TableCell>
						<TableCell>Delete</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{rows.map((row) => (
						<TableRow key={row.id}>
							<TableCell>{row.date}</TableCell>
							<TableCell>{row.name}</TableCell>
							<TableCell>{row.number}</TableCell>
							<TableCell>{row.shipTo}</TableCell>
							<TableCell>{row.paymentMethod}</TableCell>
							<TableCell>{row.status}</TableCell>
							<TableCell align="left">{`$${row.amount}`}</TableCell>
							<TableCell>
								<OrderUpdateModal/>
							</TableCell>
							<TableCell>
								<Tooltip data-id={row.id} title="delete">
									<OrderDeleteModal/>
								</Tooltip>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
				See more orders
			</Link>
		</React.Fragment>
	);
}
