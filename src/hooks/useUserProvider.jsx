import { useState } from "react";
import { toast } from "react-toastify";

function useUserProvider() {
  const [title, setTitle] = useState("");
  const [addOrEdit, setAddOrEdit] = useState([]);
  const notify = (message, type) =>
    toast[type](message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return {
    addOrEdit,
    setAddOrEdit,
    notify,
    title,
    setTitle,
  };
}

export default useUserProvider;
