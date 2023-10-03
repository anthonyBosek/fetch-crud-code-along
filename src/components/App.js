import { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkModeClick = () => setIsDarkMode((isDarkMode) => !isDarkMode);

  return (
    <div className={"App " + (isDarkMode ? "dark" : "light")}>
      <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
      <ShoppingList />
    </div>
  );
};

export default App;
