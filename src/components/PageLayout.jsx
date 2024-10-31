import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { Skeleton } from "@nextui-org/react";

import { callMsGraph } from "../graph";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  User,
  Image,
} from "@nextui-org/react";
import Logo from "../Images/logo.png";


/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props) => {
  const [graphData, setGraphData] = React.useState(null);
  const [imageUrl, setImageUrl] = React.useState(null);



  const isAuthenticated = useIsAuthenticated();
  const { instance, accounts } = useMsal();
  const name = accounts[0] && accounts[0].name;
  const username = accounts[0] && accounts[0].username;
  const [token, setToken] = React.useState("");

  const avatarName = name ? name.charAt(0) : "";

  function RequestProfileData() {
    const request = {
      ...loginRequest,
      account: accounts[0],
    };

    // Silently acquires an access token which is then attached to a request for Microsoft Graph data
    instance
      .acquireTokenSilent(request)

      .then((response) => {
        setToken(response.accessToken);

        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      })

      .catch((e) => {
        instance.acquireTokenPopup(request).then((response) => {
          callMsGraph(response.accessToken).then((response) =>
            setGraphData(response)
          );
        });
      });
  }

  React.useEffect(() => {
    if (isAuthenticated && !graphData) {
      RequestProfileData();
    }
  }, []);

  // const request = {
  //   ...GizmoRequest,
  //   account: accounts[0],
  // };

  // const url = "https://graph.microsoft.com/v1.0/me/photo/$value";

  // async function GetImage({ token }) {
  //   try {
  //     const response = await Axios.get(
  //       "https://graph.microsoft.com/v1.0/me/photo/$value",
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //         responseType: "blob",
  //       }
  //     );

  //     const url = window.URL || window.webkitURL;
  //     const blobUrl = url.createObjectURL(response.data);
  //     setImageUrl(blobUrl);
  //   } catch (err) {
  //     console.log({ err });
  //   }
  // }

  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       GetImage({
  //         token: await instance.acquireTokenSilent(request).then((response) => {
  //           return response.accessToken;
  //         }),
  //       });
  //     } catch (err) {
  //       console.log({ err });
  //     }
  //   })();
  // }, [accounts.length === 0]);

  // React.useEffect(() => {
  //   Axios.get("https://graph.microsoft.com/v1.0/me/photo/$value", {
  //     headers: { Authorization: `Bearer ${token}` },
  //     responseType: "blob",
  //   }).then((o) => {
  //     const url = window.URL || window.webkitURL;
  //     const blobUrl = url.createObjectURL(o.data);
  //     setImageUrl(blobUrl);
  //   });
  // }, [token]);

  const Loadinguser = () => {
    return (
      <div className="max-w-[300px] w-full flex items-center gap-3">
        <div>
          <Skeleton className="flex rounded-full w-12 h-12" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-3/5 rounded-lg" />
          <Skeleton className="h-3 w-4/5 rounded-lg" />
        </div>
      </div>
    );
  };

  return (
    <>
      <Navbar position="static" className="bg-neutral-900">
        <NavbarBrand>
          <Image width={250} alt="Logo" src={Logo} />
        </NavbarBrand>
        <NavbarContent justify="start" className="hidden sm:flex gap-8">
          <NavbarItem>
            <Link color="foreground" href="#"></Link>
          </NavbarItem>
          <NavbarItem isActive>
            <Link href="#" aria-current="page"></Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#"></Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          {isAuthenticated ? (
            <NavbarItem>
              <User
                name={name}
                description={username}
                avatarProps={{
                  fallback: avatarName,
                }}
              />
            </NavbarItem>
          ) : (
            ""
          )}

          <NavbarItem className="ml-5">
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      {props.children}
    </>
  );
};
