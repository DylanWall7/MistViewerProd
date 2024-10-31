import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Button } from "@nextui-org/react";

function handleLogin(instance) {
  instance.loginRedirect(loginRequest).catch((e) => {
    console.error(e);
  });
}

/**
 * Renders a button which, when selected, will redirect the page to the login prompt
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  return (
    <Button
      className="m-2"
      variant="ghost"
      color="success"
      onClick={() => handleLogin(instance)}
    >
      Sign in
    </Button>
  );
};
