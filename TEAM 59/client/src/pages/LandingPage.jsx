import { useNavigate , Link } from "react-router-dom";
import react from "react";
import Navbars from "../Components/Navbars";
import img from "../assest/logo.png"


function LandingPage() {
  return (
   <>
      <Navbars />
      <div className="flex">
        <div className="w-full p-10">
          <h1 className="mb-12 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
              Vowels Of
            </span><br></br>
              People Association.
          </h1>
          <p className="mb-12 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
          Vowels of the People Association aka VOPA provides joyous, meaningful education with self-respect and equal opportunity.
          </p>
          <Link to="/signup">
            <button
              type="button"
              className="w-auto mb-8 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-3 text-center"
            >
              Sign Up
            </button>
          </Link>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Already a Member?
          </p>
          <Link to="/login">
            <button
              type="button"
              className="w-auto text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-6 py-3 text-center"
            >
              Log In
            </button>
          </Link>
        </div>
        <div className="hidden lg:block lg:w-1/2 p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
            <p><img src={img}></img></p>
          </h1>
        </div>
      </div>

   </>
  );
}

export default LandingPage;
