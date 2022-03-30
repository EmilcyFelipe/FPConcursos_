import React, { useContext } from "react";
import HomeProvider from "../../contexts/home";
import { HomeContext } from "../../contexts/home";
import Home from "../Home";

export default function DataHome() {
  return (
    <HomeProvider>
      <Home />
    </HomeProvider>
  );
}
