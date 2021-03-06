import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./About";
import Home from "./Home";
import AccountsRoutes from "./accounts";
import AppLayout from "components/AppLayout";
import LoginRequiredPage from "utils/LoginRequiredPage";

function Root() {
  return (
    <AppLayout>
      <Routes>
        <Route element={<LoginRequiredPage />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/accounts/*" element={<AccountsRoutes />} />
      </Routes>
    </AppLayout>
  );
}

export default Root;
