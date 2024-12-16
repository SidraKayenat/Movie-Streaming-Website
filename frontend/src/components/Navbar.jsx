import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { Search, Menu, LogOut, X, ArrowUpRight, ArrowDown } from "lucide-react";
import { useContentStore } from "../store/content";
import { useTranslation } from "react-i18next";
import LanguageSelector from "./languageSelector";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(""); // State to track active link
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleLearnMoreModal = () =>
    setIsLearnMoreModalOpen(!isLearnMoreModalOpen);

  const handleUpgradeSubscription = async () => {
    if (user?.subscriptionPlan === "Basic") {
      navigate("/payment", {
        state: { email: user.email, username: user.username, plan: "Premium" },
      });
      try {
        const response = await fetch("/api/v1/payment/update-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            email: user?.email,
            subscriptionPlan: "Premium",
          }),
        });
        if (response.ok) {
          const { subscriptionPlan } = await response.json();
          useAuthStore.setState((state) => ({
            user: {
              ...state.user,
              subscriptionPlan,
            },
          }));
          window.location.reload();
        }
      } catch (error) {
        console.error("Error upgrading subscription:", error);
      }
    }
  };

  const handleDowngradeSubscription = async () => {
    if (user?.subscriptionPlan === "Premium") {
      try {
        const response = await fetch("/api/v1/payment/update-subscription", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
          body: JSON.stringify({
            email: user?.email,
            subscriptionPlan: "Basic",
          }),
        });
        if (response.ok) {
          const { subscriptionPlan } = await response.json();
          useAuthStore.setState((state) => ({
            user: {
              ...state.user,
              subscriptionPlan,
            },
          }));
          alert("Downgraded to Basic plan successfully.");
          setIsModalOpen(false);
          window.location.reload();
        }
      } catch (error) {
        console.error("Error downgrading subscription:", error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await fetch("/api/v1/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ email: user?.email }),
      });
      if (response.ok) {
        alert("Account deleted successfully.");
        logout();
      } else {
        const errorData = await response.json();
        alert(`Failed to delete account: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(
        "An error occurred while trying to delete your account. Please try again."
      );
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex items-center gap-10 z-50">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="w-32 sm:w-40" />
        </Link>
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex gap-6 items-center">
          <Link
            to="/"
            className={`hover:text-red-500 ${
              activeLink === "movies" ? "text-red-500 font-bold" : "text-white"
            }`}
            onClick={() => {
              setContentType("movie");
              setActiveLink("movies");
            }}
          >
            {t("Movies")}
          </Link>
          <Link
            to="/"
            className={`hover:text-red-500 ${
              activeLink === "tv" ? "text-red-500 font-bold" : "text-white"
            }`}
            onClick={() => {
              setContentType("tv");
              setActiveLink("tv");
            }}
          >
            {t("TV Shows")}
          </Link>
          <Link
            to="/history"
            className={`hover:text-red-500 ${
              activeLink === "history" ? "text-red-500 font-bold" : "text-white"
            }`}
            onClick={() => setActiveLink("history")}
          >
            {t("Search History")}
          </Link>
        </div>
      </div>

      <div className="flex gap-5 items-center z-50">
        {/* Language Selector Added Here */}
        <LanguageSelector className="cursor-pointer" />
        <Link to="/search">
          <Search className="size-6 cursor-pointer hover:text-red-500" />
        </Link>
        <img
          src="/avatar2.png"
          alt="Avatar"
          className="h-8 rounded cursor-pointer"
          onClick={toggleModal}
        />
        <LogOut
          className="size-6 cursor-pointer hover:text-red-500"
          onClick={logout}
        />

        {/* <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer hover:text-red-500" />
        </div> */}
        {/* Burger menu icon */}
        <div className="sm:hidden">
          <Menu
            className="size-6 cursor-pointer hover:text-red-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle menu visibility
          />
        </div>
      </div>

      {/* Mobile Menu - Toggle visibility based on isMenuOpen */}
      {isMenuOpen && (
        <div
          className={`sm:hidden absolute top-0 right-0 bg-black text-white p-4 h-full flex flex-col items-center gap-6 z-50 transition-transform duration-300 ease-in-out`}
          style={{
            width: "50%",
            transform: isMenuOpen ? "translateX(0)" : "translateX(100%)", // Starts off-screen and moves in
          }}
        >
          <X
            className="cursor-pointer text-white absolute top-4 right-4"
            onClick={(e) => {
              e.stopPropagation(); // Prevents clicks from being intercepted by parent elements
              setIsMenuOpen(false);
            }}
          />
          <Link
            to="/"
            className={`hover:text-red-500 ${
              activeLink === "movies" ? "text-red-500 font-bold" : "text-white"
            }`}
            onClick={() => {
              setContentType("movie");
              setActiveLink("movies");
              setIsMenuOpen(false);
            }}
          >
            {t("Movies")}
          </Link>
          <Link
            to="/"
            className={`hover:text-red-500 ${
              activeLink === "tv" ? "text-red-500 font-bold" : "text-white"
            }`}
            onClick={() => {
              setContentType("tv");
              setActiveLink("tv");
              setIsMenuOpen(false);
            }}
          >
            {t("TV Shows")}
          </Link>
          <Link
            to="/history"
            className={`hover:text-red-500 ${
              activeLink === "history" ? "text-red-500 font-bold" : "text-white"
            }`}
            onClick={() => {
              setActiveLink("history");
              setIsMenuOpen(false);
            }}
          >
            {t("Search History")}
          </Link>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div className="bg-black text-white p-10 rounded-lg w-[80%] max-w-4xl flex relative shadow-lg border-2 border-white">
            <X
              className="absolute top-4 right-4 cursor-pointer text-white"
              onClick={() => setIsModalOpen(false)}
            />

            <div className="w-full lg:w-1/2 pr-6 border-r border-gray-700">
              <h2 className="text-3xl font-bold text-white mb-10 text-center">
                {t("Update Subscription")}
              </h2>
              <p className="text-gray-400 mb-4 text-center">
                {t("Current Plan:")}{" "}
                <span className="font-bold text-white">
                  {user?.subscriptionPlan || "Basic"}
                </span>
              </p>

              <div className="text-center mb-10">
                <Link
                  to="#"
                  onClick={toggleLearnMoreModal}
                  className="text-sm text-red-500 underline hover:text-red-700 mb-10"
                >
                  {t("Learn More about Subscriptions")}
                </Link>
              </div>

              {user?.subscriptionPlan === "Basic" ? (
                <button
                  onClick={handleUpgradeSubscription}
                  className="w-full py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowUpRight className="w-5 h-5" />
                  {t("Pay & Upgrade to Premium")}
                </button>
              ) : (
                <button
                  onClick={handleDowngradeSubscription}
                  className="w-full py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                >
                  <ArrowDown className="w-5 h-5" />
                  {t("Downgrade to Basic")}
                </button>
              )}
            </div>

            <div className="w-full lg:w-1/2 pl-6 mt-8 lg:mt-0 ">
              <h2 className="text-3xl font-bold text-white mb-10 text-center">
                {t("Account Details")}
              </h2>
              <p className="text-gray-400 mb-4 text-center">
                {t("Username")}:{" "}
                <span className="font-bold text-white">{user?.username}</span>
              </p>
              <p className="text-gray-400 mb-10 text-center">
                {t("Email")}:{" "}
                <span className="font-bold text-white mb-10">
                  {user?.email}
                </span>
              </p>
              <div className="mt-6">
                <button
                  onClick={handleDeleteAccount}
                  className="w-full py-3 bg-red-600 rounded hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  {t("Delete Account")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* {isLearnMoreModalOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
    <div className="bg-black text-white p-10 rounded-lg w-[80%] max-w-4xl flex flex-col relative shadow-lg">
      <X
        className="absolute top-4 right-4 cursor-pointer text-white"
        onClick={toggleLearnMoreModal}
      />
      <h2 className="text-4xl font-semibold text-center text-red-500 mb-6">{t("Learn More about Subscription Plans")}</h2>
      <div className="text-lg text-gray-400">
        <p className="mb-4">{t("The Basic plan includes ads, while the Premium plan is ad-free.")}</p>
        <p className="mb-4">{t("Premium subscribers enjoy faster streaming and an overall better experience.")}</p>
      </div>
    </div>
  </div>
)} */}

      {isLearnMoreModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-black text-white rounded-lg max-w-md p-8 space-y-6 shadow-lg border-2 border-y-red-600">
            <h2 className="text-2xl font-extrabold text-center">
              {t("Learn More about Subscription Plans")}
            </h2>

            {/* Basic Plan Section */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t("Basic Plan")}</h3>
              <p className="text-sm">
                {t("Enjoy a free plan with limited access:")}
              </p>
              <ul className="list-disc list-inside text-sm">
                <li>{t("Contains ads and a slower streaming experience")}</li>
              </ul>
            </div>

            {/* Premium Plan Section */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">{t("Premium Plan")}</h3>
              <p className="text-sm">
                {t("For a seamless experience, choose the Premium Plan:")}
              </p>
              <ul className="list-disc list-inside text-sm">
                <li>{t("Ad-free streaming at just Rs. 1000 per month")}</li>
                <li>{t("Faster streaming with no buffering")}</li>
              </ul>
            </div>

            {/* Close Button */}
            <button
              onClick={toggleLearnMoreModal}
              className="w-full py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-lg font-semibold transition-all duration-300"
            >
              {t("Close")}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
