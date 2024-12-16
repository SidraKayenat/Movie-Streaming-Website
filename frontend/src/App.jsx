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
import PaymentPage from "./pages/payments/PaymentPage.jsx";

function App() {
  const [locale, setLocale] = useState(i18n.language);

  i18n.on("languageChanged", () => setLocale(i18n.language));

  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log(user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <Loader className="animate-spin text-red-600 size-10" />
        </div>
      </div>
    );
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {/* Use LanguageSelector Component */}
      {/* <LanguageSelector locale={locale} setLocale={setLocale} /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
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
        <Route path="/payment" element={<PaymentPage />} />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to="/login" />}
        />
        <Route path="/:type/:id" element={<MoreInfoPage />} />
      </Routes>

      <Toaster />
      <Footer />
    </LocaleContext.Provider>
  );
}

export default App;
