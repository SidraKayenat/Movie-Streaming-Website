import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const AuthScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const HandleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
    console.log(email);
    setEmail("");
  };

  return (
    <div className="hero-bg relative">
      {/* Navbar */}

      <header className="max-w-6xl mx-auto flex items-center justify-between p-4 pb-10">
        <img
          src="/netflix-logo.png"
          alt="netflix logo"
          className="w-32 sm:w-52"
        />
        <Link to={"/login"} className="text-white bg-red-600 py-1 px-2 rounded">
          {t("Sign In")}
        </Link>
      </header>

      {/* hero section */}
      <div className="flex flex-col items-center justify-center  text-center py-40 text-white max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl mb-4 font-bold">
          {t("Unlimited movies, TV shows and more")}
        </h1>
        <h1 className="text-lg mb-4">{t("Watch anywhere. Cancel anytime")}</h1>
        <h1 className="mb-4">
          {t(
            "Ready to watch? Enter your email to create or restart your membership"
          )}
        </h1>

        <form
          className="flex flex-col md:flex-row gap-4 w-1/2"
          onSubmit={HandleFormSubmit}
        >
          {/* for email */}
          <input
            type="email"
            placeholder="Email Address"
            className=" p-2 rounded flex-1 bg-black/80 border border-gray-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="bg-red-600 text-xl lg:text-2xl px-2 lg:px-6 py-1 md:py-2 rounded flex justify-center items-center">
            {t("Get Started")}
            <ChevronRight className="size-8 md:size-10" />
          </button>
        </form>
      </div>

      {/* separator */}

      <div className="h-2 w-full bg-[#232323] " aria-hidden="true" />

      {/* 1st section */}

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left side */}
          {/* when do flex 1 it takeshalf of the parent */}
          <div className="flex-1 text-center md:text-left ">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              {t("Enjoy on your TV")}
            </h2>
            <p className="text-lg md:text-xl">
              {t(
                "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players and more"
              )}
            </p>
          </div>

          {/* right side */}
          <div className="flex-1 relative">
            <img src="/tv.png" alt="Tv image " className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-0"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* 2nd separator */}

      <div className="h-2 w-full bg-[#232323] " aria-hidden="true" />

      {/* 2nd section */}
      <div className="py-10 bg-black text-white ">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          {/* Left side */}
          <div className="flex-1  ">
            <div className="relative">
              <img
                src="/stranger-things-lg.png"
                alt="Stranger things "
                className="mt-4 "
              />
              {/* gif wali cheezx  */}
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md px-2 ">
                <img
                  src="/stranger-things-sm.png"
                  alt="image"
                  className="h-full"
                />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">
                      {t("Stranger Things")}
                    </span>
                    <span className="text-sm text-blue-500">
                      {t("Downloading...")}
                    </span>
                  </div>
                  <img src="/download-icon.gif" alt="gif" className="h-12" />
                </div>
              </div>
            </div>
          </div>

          {/* right side  */}
          <div className="flex-1 md:text-left text-center ">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-balance">
              {t("Download your shows to watch offline")}
            </h2>
            <p className="text-lg md:text-xl">
              {t(
                "Save your favorites easily and always have something to watch."
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="h-2 w-full bg-[#232323] " aria-hidden="true" />

      {/* 3rd section */}

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          {/* Left side */}
          {/* when do flex 1 it takeshalf of the parent */}
          <div className="flex-1 text-center md:text-left ">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              {t("Watch Everywhere")}
            </h2>
            <p className="text-lg md:text-xl">
              {t(
                "Stream unlimited Movies and Tv shows on your phone, tablet, laptop, and TV."
              )}
            </p>
          </div>

          {/* right side */}
          <div className="flex-1 relative overflow-hidden">
            <img
              src="/device-pile.png"
              alt="Tv image "
              className="mt-4 z-20 relative"
            />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-10 max-w-[63%]"
              playsInline
              autoPlay={true}
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}

      <div className="h-2 w-full bg-[#232323] " aria-hidden="true" />

      {/* 4th section */}

      <div className="py-10 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center flex-col-reverse md:flex-row px-4 md:px-2 ">
          {/* left side */}

          <div className="flex-1 relative">
            <img src="/kids.png" alt="enjoy on your tv" className="mt-4" />
          </div>

          {/* rigth side */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              {t("Create profiles for kids")}
            </h2>
            <p className="text-lg md:text-xl">
              {t(
                "Send kids on adventures with their favorite characters in a space made just for them—free with your membership."
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
