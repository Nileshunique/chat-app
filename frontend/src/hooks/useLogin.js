import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (values) => {
    const success = handleInputErrors(values);
    if (!success) return;
    try {
      setLoading(true);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values)
      })

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }

      // seting data to localstorage 
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data); // seting context here

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login }
}

export default useLogin

const handleInputErrors = (values) => {
  const { username, password } = values;
  if (!username || !password) {
    toast.error('Please enter all required fields');
    return false;
  }

  if (password.length < 6) {
    toast.error('Password must be at least 6 characters');
    return false;
  }
  return true;
}