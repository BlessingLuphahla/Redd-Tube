/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";
import { MediaQueryBreakPoints } from "../utils/Theme";

const ScreenContext = createContext();

export const ScreenProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < parseInt(MediaQueryBreakPoints.mobile)
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < parseInt(MediaQueryBreakPoints.mobile));
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ScreenContext.Provider value={{ isMobile }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => useContext(ScreenContext);
