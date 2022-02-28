import { useState } from "react";

function useUserProvider() {
  const [title, setTitle] = useState("");
  return { title, setTitle };
}

export default useUserProvider;
