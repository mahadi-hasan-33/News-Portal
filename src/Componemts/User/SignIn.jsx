import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import Swal from "sweetalert2/dist/sweetalert2.all";
import useTitle from "../../Hock/useTitle";

const SignIn = () => {
  const navigate = useNavigate();
  const { loginWithEmail } = useContext(AuthContext);
  const [error, setError] = useState();
  useTitle("Login");

  const location = useLocation();
  const from = location.state?.from?.pathname || "/home";
  const login = (event) => {
    event.preventDefault();

    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginWithEmail(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        Swal.fire("Login Successfully", "Thanks for join with us", "success");
        setError("");
        form.reset();
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        form.reset();
      });
  };
  return (
    <div className="flex justify-center my-20">
      <div className="flex flex-col lg:w-8/12 max-w-md p-6 rounded-md sm:p-10 bg-gray-900 text-gray-100">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log in</h1>
          <p className="text-sm text-gray-400">Log in to access your account</p>
        </div>
        <form onSubmit={login}>
          <div className="mb-1 sm:mb-2">
            <label className="inline-block mb-1 font-medium">E-mail</label>
            <input
              placeholder="mahadi@example.org"
              required
              type="email"
              className="flex-grow w-full h-12 px-4 mb-2 transition  text-black duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
              id="email"
              name="email"
            />
          </div>
          <div className="mb-1 sm:mb-2">
            <label className="inline-block mb-1 font-medium">Password</label>
            <input
              placeholder="******"
              required
              type="password"
              className="flex-grow w-full h-12 px-4 mb-2 transition  text-black duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-purple-400 focus:outline-none focus:shadow-outline"
              id="password"
              name="password"
            />
          </div>
          <p className="text-xs text-red-500">{error}</p>
          <div className="mt-4 mb-2 sm:mb-4">
            <button
              type="submit"
              className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
            >
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-400 sm:text-sm">
            Don't have an account yet?{" "}
            <Link className="ml-2 text-blue-500" to={"/register"}>
              Registration Now
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
