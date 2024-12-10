import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import MoreInfoPage from "./pages/MoreInfoPage";
import i18n from "./i18n";
import LocaleContext from "./LocaleContext";

import WatchPage from "./pages/WatchPage";
import { Route, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import SearchPage from "./pages/SearchPage";
import SearchHistoryPage from "./pages/SearchHistoryPage";
import { useAuthStore } from "./store/authUser";
import { Loader } from "lucide-react";

import { Navigate } from "react-router-dom";

function App() {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on("languageChanged", () => setLocale(i18n.language)); //called when handle change function called

  const handleChange = (event) => {
    //fr or en
    i18n.changeLanguage(event.target.value);
  };

  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log(user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen ">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }
  return (
    <>
      <LocaleContext.Provider value={{ locale, setLocale }}>
        <div className="flex flex-row space-x-3 items-center justify-center bg-black pt-1 shadow-lg">
          <label className="text-white text-lg mb-2">🌍</label>
          <select
            name="English"
            id="selectlang"
            value={locale}
            onChange={handleChange}
            className="bg-black text-white border border-gray-500 rounded-full px-4 py-1 focus:ring-2 focus:ring-red-100 focus:outline-none  transition duration-200 ease-in-out"
          >
            <option value="en-US">English</option>
            <option value="ja-JP">Japanese</option>
            <option value="it-IT">Italian</option>
            <option value="es-ES">Spanish</option>
          </select>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={!user ? <LoginPage /> : <Navigate to="/" />}
          />
          {/* visit to sign up page if user not authenticated take them to sign up else to the home ooage */}
          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />

          <Route
            path="/search"
            element={user ? <SearchPage /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/history"
            element={user ? <SearchHistoryPage /> : <Navigate to={"/login"} />}
          />

          <Route
            path="/watch/:id"
            element={user ? <WatchPage /> : <Navigate to="/login" />}
          />
          <Route path="/:type/:id" element={<MoreInfoPage />} />
        </Routes>
        {/* to make toaster work */}
        <Toaster />
        <Footer />
        {/* put fpooter outside becz we want to see it on very page login sign up etc  */}
      </LocaleContext.Provider>
    </>
  );
}

export default App;
