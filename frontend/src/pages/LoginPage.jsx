import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authUser";
import { useTranslation } from "react-i18next";
import LanguageSelector from "../components/languageSelector";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();
  const { t } = useTranslation();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password }, t);
  };
  return (
    <div className="h-screen w-full hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to={"/"} className="mt-2">
          <img src="/logo.png" alt="logo" className="w-32 sm:w-52" />
        </Link>
        <LanguageSelector className="cursor-pointer" />
      </header>

      {/* //hold the mail username etc  */}
      <div className="flex justify-center items-center mt-20 mx-3">
        <div className="w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md">
          <h1 className="text-center text-white text-2xl font-bold mb-4">
            {t("LogIn")}
          </h1>

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* for email */}
            <div>
              <label
                htmlFor="email"
                className="text-gray-300 block text-sm font-medium"
              >
                {t("Email")}
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder="you@example.com"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* for password */}
            <div>
              <label
                htmlFor="password"
                className="text-gray-300 block text-sm font-medium"
              >
                {t("Password")}
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring"
                placeholder={t("Enter your password")}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring">
              {t("LogIn")}
            </button>
          </form>

          <div className="text-center text-gray-400">
            <span className="mr-2">{t("Dont have an account?")}</span>
            <Link to={"/signup"} className="text-red-500 hover:underline">
              {t("SignUp")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
