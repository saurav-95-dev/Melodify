import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggleButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
      isRound
      size="md"
      alignSelf="flex-end"
      onClick={toggleColorMode}
      aria-label="Toggle theme"
    />
  );
};

export default ThemeToggleButton;