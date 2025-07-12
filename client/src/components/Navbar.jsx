import { assets } from "../assets/assets";
import { useAppContext } from "../../context/AppContext";
import MenuIcon from "@mui/icons-material/Menu";
import EastIcon from "@mui/icons-material/East";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const { navigate, token, setToken, setUser } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    navigate("/");
    toast.success("Logout Successfully");
  };

  return (
    <div className="flex justify-between items-center cursor-pointer py-5 mx-8 sm:mx-20 xl:mx-32">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="w-32 sm:w-44"
      />

      <div className="md:hidden relative">
        <MenuIcon
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-4xl text-primary font-bold w-2xl h-2.5"
        />

        {isMenuOpen && (
          <div className="absolute md:hidden top-full right-0 bg-white border  border-primary/30 rounded shadow-md p-2 flex flex-col gap-2 z-50">
            {token ? (
              <>
                <button
                  onClick={() => navigate("/admin")}
                  className="flex justify-around items-center gap-2 rounded-full text-sm cursor-pointer hover:bg-primary bg-primary/75 text-white px-5 py-2"
                >
                  Dashboard
                  <EastIcon />
                </button>

                <button
                  onClick={handleLogout}
                  className="flex justify-around items-center gap-2 rounded-full text-sm
                cursor-pointer hover:bg-primary bg-primary/75 transition text-white px-5 py-2"
                >
                  Logout
                  <ExitToAppIcon />
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="flex justify-around items-center gap-2 rounded-full text-sm cursor-pointer hover:bg-primary bg-primary/75 text-white px-4 py-2"
                >
                  Login
                  <VpnKeyIcon />
                </button>

                <button
                  onClick={() => navigate("/signup")}
                  className="flex justify-around items-center gap-2 rounded-full text-sm
                cursor-pointer hover:bg-primary bg-primary/75 transition text-white px-4 py-2"
                >
                  Signup
                  <ExitToAppIcon />
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex items-center gap-5">
        {/* Auth */}
        {token ? (
          <>
            <button
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
            >
              Dashboard
              <img src={assets.arrow} alt="arrow" className="w-3" />
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
            >
              Logout
              <img src={assets.arrow} alt="arrow" className="w-3" />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => navigate("/login")}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
            >
              Login
              <img src={assets.arrow} alt="arrow" className="w-3" />
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5"
            >
              SignUp
              <img src={assets.arrow} alt="arrow" className="w-3" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
