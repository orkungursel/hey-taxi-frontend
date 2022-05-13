import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import SplashPage from "./Splash";

test("renders content elements", async () => {
  render(
    <BrowserRouter>
      <SplashPage />
    </BrowserRouter>,
  );
  const linkElement = await screen.findByTestId("Splash-CTA-Button");
  const titleElement = await screen.findByTestId("Splash-Title");
  expect(linkElement).toBeInTheDocument();
  expect(titleElement).toBeInTheDocument();
});
