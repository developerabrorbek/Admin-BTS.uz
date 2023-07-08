import { toast } from "react-toastify";

class Toaster {
  constructor() {}

  notify(status, message) {
    console.log(status);
    if (status == 200) toast.success(message);

    if (status == 300) toast.info(message);

    if (status == 400) toast.warning(message);

    if (status == 404) toast.error(message);
  }
}

export default new Toaster();
