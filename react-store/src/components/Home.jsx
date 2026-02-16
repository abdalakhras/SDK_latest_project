import React from "react";
import { ThemeContext } from "./Context/ThemeContext.jsx";
import { useContext } from "react";

function Home() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <h1 className={theme}>welcome to TRADER home page</h1>

      <p>this a home page</p>
      <button onClick={toggleTheme}>
        change to {theme === "dark" ? "light" : "dark"} mode
      </button>
    </>
  );
}
export default Home;
