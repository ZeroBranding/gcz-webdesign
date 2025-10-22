import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ContrastContextType {
  contrast: number;
  setContrast: (value: number) => void;
}

const ContrastContext = createContext<ContrastContextType | undefined>(undefined);

export const ContrastProvider = ({ children }: { children: ReactNode }) => {
  const [contrast, setContrastValue] = useState<number>(() => {
    const saved = localStorage.getItem("zdf_contrast");
    return saved ? parseInt(saved, 10) : 100;
  });

  const setContrast = (value: number) => {
    const clamped = Math.max(0, Math.min(100, value));
    setContrastValue(clamped);
    localStorage.setItem("zdf_contrast", clamped.toString());
    
    // Apply contrast filter to root
    document.documentElement.style.filter = `contrast(${clamped}%)`;
  };

  useEffect(() => {
    document.documentElement.style.filter = `contrast(${contrast}%)`;
  }, [contrast]);

  return (
    <ContrastContext.Provider value={{ contrast, setContrast }}>
      {children}
    </ContrastContext.Provider>
  );
};

export const useContrast = () => {
  const context = useContext(ContrastContext);
  if (!context) {
    throw new Error("useContrast must be used within ContrastProvider");
  }
  return context;
};
