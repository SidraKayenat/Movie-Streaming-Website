import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Menu, LogOut } from "lucide-react";
import { useContentStore } from "../store/content";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setisMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const { t } = useTranslation();
  const toggleMobileMenu = () => {
    setisMobileMenuOpen(!isMobileMenuOpen);
  };
  const { setContentType } = useContentStore();

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img
            // src="/netflix-logo.png"
            src="/logo2.png"
            alt="Netflix Logo"
            className="w-32 sm:w-40"
          />
        </Link>

        {/* Desktop navbar items */}
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex gap-6 items-center">
          <Link
            to="/"
            className="hover:text-red-500 transition-colors duration-300"
            onClick={() => setContentType("movie")}
          >
            {t("Movies")}
          </Link>
          <Link
            to="/"
            className="hover:text-red-500 transition-colors duration-300"
            onClick={() => setContentType("tv")}
          >
            {t("TV Shows")}
          </Link>
          <Link
            to="/history"
            className="hover:text-red-500 transition-colors duration-300"
          >
            {t("Search History")}
          </Link>
        </div>
      </div>

      <div className="flex gap-5 items-center z-50">
        <Link to={"/search"}>
          <Search className="size-6 cursor-pointer hover:text-red-500 transition-colors duration-300" />{" "}
        </Link>
        <img
          src={user.image}
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
        />
        <LogOut
          className="size-6 cursor-pointer text-white hover:text-red-500 transition-colors duration-300"
          onClick={logout}
        />

        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer hover:text-red-500 transition-colors duration-300"
            onClick={toggleMobileMenu}
          />
        </div>
      </div>

      {/* Mobile navbar items */}
      {isMobileMenuOpen && (
        <div className="w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800">
          <Link
            to="/"
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            {t("Movies")}
          </Link>
          <Link
            to="/"
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            {t("TV Shows")}
          </Link>
          <Link
            to="/history"
            className="block hover:underline p-2"
            onClick={toggleMobileMenu}
          >
            {t("Search History")}
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
