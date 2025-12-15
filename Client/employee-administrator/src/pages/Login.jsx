import { useDispatch } from "react-redux";
import { useState } from "react";
import { login } from "../store/authSlice";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://localhost:44322/api/auth/login",
        {
          email: email,
          password: password,
        }
      );

      console.log(response.data);

      if (response.data.success) {
        dispatch(
          login({
            token: response.data.token,
            userName: response.data.userName,
            userRole: response.data.userRole,
            userId: response.data.userId,
          })
        );
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center ">
        <div className="w-[30%] h-[65%] border-2 border-black rounded flex flex-col justify-start items-center">
          <h1 className="text-2xl font-bold border-b-2 border-black">Log In</h1>

          <div className="w-[80%] h-70 flex flex-col gap-6 justify-center items-center">
            <div className="w-[80%] h-20 flex flex-col justify-center items-center">
              <h2>Email :</h2>
              <input
                type="email"
                placeholder="Email...."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="w-[80%] h-20 flex flex-col justify-center items-center">
              <h2>Password :</h2>
              <input
                type="password"
                placeholder="Password...."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div className="w-[80%] h-10 flex justify-center items-center">
              <button onClick={handleLogin}>Log In</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
