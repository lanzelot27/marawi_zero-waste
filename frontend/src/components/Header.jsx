import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import LandingNavbar from "./LandingNavbar";
import { useState } from "react";
import { MdClose, MdMenu } from "react-icons/md";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);

  return (
    <header className="fixed top-0 left-0 m-auto max_padd_container w-full bg-green-900 ring-1 ring-slate-500/5 z-10">
      <div className="px-4 flexBetween py-3 max-xs:px-2">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img src={logo} alt="Logo" height={50} width={50} />
          </Link>
          <div className="flex items-center space-x-2">
            <h1
              className="text-2xl text-white mr-4"
              style={{ fontFamily: "Calistoga, sans-serif" }}
            >
              MARAWI Zero-Waste
            </h1>
            <p
              className="text-s text-white hidden md:block"
              style={{
                fontFamily: "Caladea, serif",
                lineHeight: "2rem",
              }}
            >
              Reduce, Reuse, Recycle: Waste Less, Live More!
            </p>
          </div>
        </div>

        {/* Buttons and navbar */}
        <div className="flex items-center gap-x-6 bold-16">
          {/* Render navbar for desktop */}
          <div className="hidden md:flex gap-x-5 x1:gap-x-10 medium-15">
            <LandingNavbar />
          </div>

          {/* Hamburger menu for mobile */}
          {!menuOpened ? (
            <MdMenu
              className="md:hidden cursor-pointer hover:text-8FC796 mr-2 p-1 ring-1 ring-8FC796/30 h-8 w-8 rounded-full hover:ring-8FC796"
              onClick={toggleMenu}
            />
          ) : (
            <MdClose
              className="md:hidden cursor-pointer hover:text-8FC796 mr-2 p-1 ring-1 ring-8FC796/30 h-8 w-8 rounded-full hover:ring-8FC796"
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>

      {/* Navbar for mobile */}
      {menuOpened && (
        <div className="flex flex-col gap-y-12 fixed top-20 right-8 p-12 bg-black rounded-3xl shadow-md w-64 medium-16 ring-1 ring-slate-900/5 transition-all duration-300">
          <LandingNavbar />
        </div>
      )}
    </header>
  );
};

export default Header;
