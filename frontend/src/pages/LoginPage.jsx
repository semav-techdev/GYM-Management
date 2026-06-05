import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { useState } from "react";
import { loginUser } from "../services/authService";

import gym from "../assets/loginImage.png";
import logo from "../assets/logo.png";

import { User, LockKeyhole, Eye } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const login = useAuthStore((state) => state.login);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        userName,
        password,
      });

      if (response.error) {
        alert(response.error);
        return;
      }

      const authData = response.data;

      if (!authData?.user || !authData?.access_token) {
        alert("Invalid login response");
        return;
      }

      login(
        authData.user,
        authData.access_token
      );

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert("Something went wrong");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#1F1B1B] overflow-hidden">

      {/* LEFT IMAGE */}
      <div className="hidden lg:flex flex-1">
        <img
          src={gym}
          alt="Gym"
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center px-6 py-10">

        <div className="w-full max-w-md">

          {/* LOGO */}
          <div className="mb-10 flex flex-col items-center text-center">

            <img
              src={logo}
              alt="Logo"
              className="mb-6 w-52"
            />

            <h1 className="text-4xl font-bold text-white">
              WELCOME BACK!
            </h1>

            <p className="mt-4 text-[#9C9494] text-lg">
              Sign in to continue your
              <br />
              fitness journey
            </p>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* USERNAME */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-white">
                NAME
              </label>

              <div className="flex items-center rounded-full bg-[#3A3434] px-5 py-4 shadow-lg">

                <User
                  size={22}
                  className="text-red-600"
                />

                <input
                  type="text"
                  value={userName}
                  onChange={(e) =>
                    setUserName(e.target.value)
                  }
                  placeholder="Enter your name"
                  className="ml-4 w-full bg-transparent text-white outline-none placeholder:text-[#9C9494]"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-3 block text-sm font-semibold text-white">
                PASSWORD
              </label>

              <div className="flex items-center rounded-full bg-[#3A3434] px-5 py-4 shadow-lg">

                <LockKeyhole
                  size={22}
                  className="text-red-600"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  placeholder="Enter your password"
                  className="ml-4 w-full bg-transparent text-white outline-none placeholder:text-[#9C9494]"
                />

                <Eye
                  size={20}
                  className="text-gray-400 cursor-pointer"
                  onClick={()=>setShowPassword((prev)=>(!prev))}
                />
              </div>

              <div className="mt-3 text-right">
                <button
                  type="button"
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Forget password?
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-red-700 py-4 text-xl font-semibold text-white transition hover:bg-red-800"
            >
              LOG IN
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
