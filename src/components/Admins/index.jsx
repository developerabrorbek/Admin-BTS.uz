import { Button } from "@mui/material";
// import BasicModal from "../Modal";
// import Admin from "./admin";
const Admins = () => {

	return (
		<>
			<section className="admins">
				<div className="container px-12">
					<div className="admins__inner flex flex-col justify-between gap-5">
						<h1 className="title text-lg">Admins</h1>
						<ul className="cards flex  items-center justify-between">
							<li className="card flex flex-col gap-y-4 items-center justify-center px-11 py-6 rounded-md shadow hover:shadow-lg">
								<img
									src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-1222271.jpg&fm=jpg"
									alt="Admin img"
									className="admin-img w-[140px] h-[140px] rounded-full"
								/>
								<p className="name mb-6">Admin</p>
								<span className="btns grid gap-y-2">
									<Button  variant="contained">Show profile</Button>
									<Button variant="outlined" color="error">
										Delete admin
									</Button>
								</span>
							</li>
							<li className="card flex flex-col gap-y-4 items-center justify-center px-11 py-6 rounded-md shadow hover:shadow-lg">
								<img
									src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-1222271.jpg&fm=jpg"
									alt="Admin img"
									className="admin-img w-[140px] h-[140px] rounded-full"
								/>
								<p className="name mb-6">Admin</p>
								<span className="btns grid gap-y-2">
									<Button variant="contained">Show profile</Button>
									<Button variant="outlined" color="error">
										Delete admin
									</Button>
								</span>
							</li>
							<li className="card flex flex-col gap-y-4 items-center justify-center px-11 py-6 rounded-md shadow hover:shadow-lg">
								<img
									src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-1222271.jpg&fm=jpg"
									alt="Admin img"
									className="admin-img w-[140px] h-[140px] rounded-full"
								/>
								<p className="name mb-6">Admin</p>
								<span className="btns grid gap-y-2">
									<Button variant="contained">Show profile</Button>
									<Button variant="outlined" color="error">
										Delete admin
									</Button>
								</span>
							</li>
							<li className="card flex flex-col gap-y-4 items-center justify-center px-11 py-6 rounded-md shadow hover:shadow-lg">
								<img
									src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?cs=srgb&dl=pexels-justin-shaifer-1222271.jpg&fm=jpg"
									alt="Admin img"
									className="admin-img w-[140px] h-[140px] rounded-full"
								/>
								<p className="name mb-6">Admin</p>
								<span className="btns grid gap-y-2">
									<Button variant="contained">Show profile</Button>
									<Button variant="outlined" color="error">
										Delete admin
									</Button>
								</span>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</>
	);
};

export default Admins;
