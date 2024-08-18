import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import ThemeToggleButton from "./components/ThemeToggleButton";
import Player from "./components/Player";
import Playlist from "./components/Playlist";
import SearchBar from "./components/SearchBar";
import Recommendations from "./components/ Recommendations";

const AppContent = () => {
  return (
    <VStack p={4} spacing={4}>
      <ThemeToggleButton />
      <Box w="full" maxW="1200px">
        <Recommendations />
        <SearchBar />
        <Player />
        <Playlist />
      </Box>
    </VStack>
  );
};

export default AppContent;