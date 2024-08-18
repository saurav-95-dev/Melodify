import React from "react";
import { Input, Box, useColorMode } from "@chakra-ui/react";

const SearchBar = ({ onSearch }) => {
  const { colorMode } = useColorMode();
  const inputBg = colorMode === "light" ? "white" : "gray.700";
  const inputColor = colorMode === "light" ? "black" : "white";

  return (
    <Box mb={4} width="100%" maxWidth="400px">
      <Input
        bg={inputBg}
        color={inputColor}
        placeholder="Search songs..."
        borderRadius="md"
        onChange={(e) => onSearch(e.target.value)}
        boxShadow="sm"
      />
    </Box>
  );
};

export default SearchBar;