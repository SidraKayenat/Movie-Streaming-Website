import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          {t("Built by")}
          <span className="ml-1">
            <a
            href="https://github.com/SidraKayenat/Movie-Streaming-Website.git"
              target="_blank"
              className="font-medium underline underline-offset-4"
            >
              SMAART
            </a>
          </span>
          {t(". The source code is available on")}
          <a
            href="https://github.com/SidraKayenat/Movie-Streaming-Website.git"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4 ml-1"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
export default Footer;
