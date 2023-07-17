import * as React from "react";
import { Button } from "@mui/material";
import { axiosInstance } from "../../configs/axios.config";
import DeleteAdminModal from "../Modals/Admins/delete-admin.modal";

const Admins = () => {
  const [admins, setAdmins] = React.useState(null);

  React.useEffect(() => {
    try {
      axiosInstance
        .get("admin/list")
        .then((res) => setAdmins(res.data.body))
        .catch((err) => console.log(err.name, ": ", err.message));
    } catch (error) {
      console.log(error.name, ": ", error.message);
    }
  }, []);

  console.log(admins);

  return (
    <>
      <section className="admins">
        <div className="container px-12">
          <div className="admins__inner flex flex-col justify-between gap-5">
            <h1 className="title text-lg">Admins</h1>
            <ul className="cards flex  items-center gap-x-8">
              {admins?.length &&
                admins.map((admin) => {
                  return (
                    <>
                      <li
                        key={admin.id}
                        className="card flex flex-col gap-y-4 items-center justify-center px-11 py-6 rounded-md shadow hover:shadow-lg"
                      >
                        <img
                          src={admin?.attach?.url}
                          alt="Admin image"
                          className="admin-img text-center flex items-center w-[140px] h-[140px] rounded-full"
                        />
                        <p className="name mb-4 text-[18px]">{admin.firstname}</p>
                        <p className="roles mb-6 text-[12px] font-semibold">
                          {admin.roleEnumList.join(" ")}
                        </p>
                        <span className="btns grid gap-y-2">
                          <Button variant="contained">Show profile</Button>
                          <DeleteAdminModal
                            id={admin.id}
                            name={admin.firstname}
                            role={admin.roleEnumList}
                          />
                        </span>
                      </li>
                    </>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default Admins;
