// src/components/LanguageSelector.jsx

import { Globe } from "lucide-react";
// import { useState } from "react";
import i18n from "../i18n";

const LanguageSelector = ({ locale, setLocale }) => {
  const handleChange = (event) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <div className="flex flex-row space-x-3 items-center bg-transparent pt-1 shadow-lg">
      <Globe className="text-white w-5 h-5" aria-label="Select Language" />
      <select
        name="English"
        id="selectlang"
        value={locale}
        onChange={handleChange}
        className="bg-black text-white border border-gray-500 rounded-full px-2 py-1 focus:ring-2 focus:ring-red-100 focus:outline-none transition duration-200 ease-in-out appearance-none"
      >
        <option value="en-US">🏴 English</option>
        <option value="ja-JP">🗻 Japanese</option>
        <option value="it-IT">🍕 Italian</option>
        <option value="es-ES">🥟 Spanish</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
