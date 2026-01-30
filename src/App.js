import React, { useState, useEffect, useMemo, useCallback } from "react";
import { PageLayout } from "./components/PageLayout";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import { GizmoRequest } from "./authConfig";

import { NextUIProvider } from "@nextui-org/react";

import { Tabs, Tab } from "@nextui-org/react";
import { AccessPoints } from "./components/AccessPoints";
import { Routers } from "./components/Routers";
import { ClaimDevices } from "./components/ClaimDevices";
import { Switch48p } from "./components/Switch48p";
import RouterLoadingModal from "./components/RouterLoadingModal";
import SwitchLoadingModal from "./components/SwitchLoadingModal";
import APLoadingModal from "./components/APLoadingModal";
import { SignInButton } from "./components/SignInButton";
import { DeviceSummary } from "./components/DeviceSummary";
import SumLoadingModal from "./components/SumLoadingModal";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import SummaryIconPNG from "./Images/SummaryIcon.png";
import WIFIIcon from "./Images/WIFIIcon.png";
import CautionIcon from "./Images/CautionIcon.png";
import SwitchIconPNG from "./Images/SwitchIcon.png";
import { Button } from "react-bootstrap";
import { WiredDevices } from "./components/WiredDevices";
import { WirelessDevices } from "./components/WirelessDevices";

import { Tooltip } from "@nextui-org/react";

function App() {
  const RouterIcon = () => (
    <svg
      fill="currentColor"
      viewBox="0 0 34 34"
      data-reactroot=""
      role="img"
      style={{ width: "24px", height: "24px" }}
    >
      <g
        id="icon"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g
          id="router"
          transform="translate(1.000000, 1.000000)"
          stroke="#748893"
          stroke-width="3"
        >
          <path
            d="M32.0000772,12 C32.0185689,21.5945056 25.3645995,29.9119673 16.0000386,32 C6.63547767,29.9119673 -0.0184916759,21.5945056 0,12 L0,4 C0,1.790861 1.79089961,0 4.00003861,0 L28.0000386,0 C30.2091776,0 32.0000772,1.790861 32.0000772,4 L32.0000772,12 Z"
            id="Path"
          ></path>
          <line
            x1="16.0000386"
            y1="10"
            x2="16.0000386"
            y2="22"
            id="Path"
          ></line>
          <line
            x1="10.0000386"
            y1="16"
            x2="22.0000386"
            y2="16"
            id="Path"
          ></line>
        </g>
      </g>
    </svg>
  );

  const APIcon = () => (
    <svg
      aria-hidden="true"
      focusable="false"
      height="24"
      role="presentation"
      width="24"
      fill="#243a94"
      viewBox="0 0 346.311 346.311"
    >
      <path d="M182.852,289.008c-2.083-31.938-15.606-62.201-38.077-85.219c-22.433-22.977-52.293-37.223-84.081-40.113 c-0.854-0.076-1.704-0.117-2.523-0.117c-7.166,0-11.276,3.063-11.276,8.398v16.504c0,8.73,6.758,9.09,10.006,9.264 c0.419,0.023,0.811,0.043,1.16,0.076c48.38,4.635,86.442,43.156,90.504,91.592l0.036,0.463c0.217,2.846,0.724,9.51,8.743,9.51 h17.334c2.985,0,5.21-0.771,6.61-2.293c2.047-2.225,1.788-5.338,1.616-7.399C182.884,289.437,182.866,289.215,182.852,289.008z"></path>
      <path d="M203.337,146.185c-37.652-38.457-87.815-61.477-141.246-64.822c-0.352-0.021-0.732-0.049-1.135-0.08 c-1.227-0.09-2.619-0.193-4.068-0.193c-6.631,0-9.994,2.465-9.994,7.328v18.293c0,7.938,9.289,8.559,14.279,8.893l0.958,0.066 c91.745,6.85,164.294,81.326,168.754,173.236c0.139,2.859,0.509,10.459,7.958,10.459h19.333c1.973,0,3.577-0.629,4.768-1.867 c2.188-2.277,2.306-5.898,2.204-8.424C262.999,235.443,241.048,184.699,203.337,146.185z"></path>
      <path d="M346.283,286.422c-2.803-73.885-32.938-143.805-84.852-196.883C209.599,36.547,140.521,4.863,66.923,0.33l-0.77-0.049 c-1.588-0.102-3.564-0.229-5.589-0.229c-9.071,0-13.671,2.828-13.671,8.408v17.25c0,8.715,9.939,8.785,16.518,8.832 c1.332,0.008,2.591,0.018,3.623,0.09c134.23,9.412,239.567,117.92,245.024,252.397c0.013,0.311,0.019,0.65,0.025,1.008 c0.067,3.678,0.206,11.328,9.425,11.328h16c2.501,0,4.523-0.783,6.012-2.33C346.25,294.201,346.404,289.619,346.283,286.422z"></path>
    </svg>
  );

  const url = `https://${process.env.REACT_APP_API_BASEURL}/api/mist/site/summary`;

  const [siteList, setSiteList] = useState([]);
  const [siteDeviceSummary, setSiteDeviceSummary] = useState([]);
  const [wiredClients, setWiredClients] = useState([]);
  const [wirelessClients, setWirelessClients] = useState([]);
  const [siteId, setSiteId] = useState();
  const [selectedKey, setSelectedKey] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clientsLoading, setClientsLoading] = useState(false);

  const url1 = `https://${process.env.REACT_APP_API_BASEURL}/api/mist/site/${siteId}/devicesummary`;
  const wiredClientsUrl = `https://${process.env.REACT_APP_API_BASEURL}/api/mist/site/${siteId}/wiredclientstats`;
  const wirelessClientsUrl = `https://${process.env.REACT_APP_API_BASEURL}/api/mist/site/${siteId}/wirelessclientstats`;

  const { instance, accounts } = useMsal();

  const request = useMemo(
    () => ({
      ...GizmoRequest,
      account: accounts[0],
    }),
    [accounts],
  );

  const GetAllMistSites = useCallback(
    async ({ token }) => {
      const headers = new Headers();
      const bearer = `Bearer ${token}`;

      headers.append("Authorization", bearer);
      headers.append("Content-Type", "application/json");

      const options = {
        method: "GET",
        headers: headers,
      };

      return fetch(url, options)
        .then(async (response) => {
          let text = await response.json();

          setSiteList(text);
          setIsLoading(false);
        })

        .catch((error) => {
          console.error("Error:", error);
          setIsLoading(false);
        });
    },
    [url],
  );

  const GetDeviceSummary = useCallback(
    async ({ token }) => {
      const headers = new Headers();
      const bearer = `Bearer ${token}`;

      headers.append("Authorization", bearer);
      headers.append("Content-Type", "application/json");

      const options = {
        method: "GET",
        headers: headers,
      };

      return fetch(url1, options)
        .then(async (response) => {
          let text = await response.json();

          JSON.stringify(text);
          setSiteDeviceSummary(text);
          setLoading(false);
        })

        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
        });
    },
    [url1],
  );

  const GetWiredClients = useCallback(
    async ({ token }) => {
      const headers = new Headers();
      const bearer = `Bearer ${token}`;

      headers.append("Authorization", bearer);
      headers.append("Content-Type", "application/json");

      const options = {
        method: "GET",
        headers: headers,
      };

      return fetch(wiredClientsUrl, options)
        .then(async (response) => {
          let data = await response.json();
          setWiredClients(data);
        })
        .catch((error) => {
          console.error("Error fetching wired clients:", error);
        });
    },
    [wiredClientsUrl],
  );

  const GetWirelessClients = useCallback(
    async ({ token }) => {
      const headers = new Headers();
      const bearer = `Bearer ${token}`;

      headers.append("Authorization", bearer);
      headers.append("Content-Type", "application/json");

      const options = {
        method: "GET",
        headers: headers,
      };

      return fetch(wirelessClientsUrl, options)
        .then(async (response) => {
          let data = await response.json();
          setWirelessClients(data);
        })
        .catch((error) => {
          console.error("Error fetching wireless clients:", error);
        });
    },
    [wirelessClientsUrl],
  );

  useEffect(() => {
    if (!accounts[0]) {
      setIsLoading(false);
      return;
    }

    (async () => {
      setIsLoading(true);
      try {
        await GetAllMistSites({
          token: await instance.acquireTokenSilent(request).then((response) => {
            return response.accessToken;
          }),
        });
      } catch (err) {
        console.log({ err });
        setIsLoading(false);
      }
    })();
  }, [accounts, instance, request, GetAllMistSites]);

  const SearchIcon = ({
    size = 24,
    strokeWidth = 1.5,
    width,
    height,
    ...props
  }) => (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );

  useEffect(() => {
    if (siteId) {
      (async () => {
        try {
          setLoading(true);
          setClientsLoading(true);
          const token = await instance
            .acquireTokenSilent(request)
            .then((response) => response.accessToken);

          // Fetch all data in parallel
          await Promise.all([
            GetDeviceSummary({ token }),
            GetWiredClients({ token }),
            GetWirelessClients({ token }),
          ]);
          setClientsLoading(false);
        } catch (err) {
          console.log("Error occured ");
          setLoading(false);
          setClientsLoading(false);
        }
      })();
    }
  }, [siteId, instance, request, GetDeviceSummary, GetWiredClients, GetWirelessClients]);

  const SortSiteList = siteList.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
  });

  const onSelectionChange = (id) => {
    setSiteId(id);
  };

  const handleButtonClick = () => {
    (async () => {
      try {
        setLoading(true);
        setClientsLoading(true);
        const token = await instance
          .acquireTokenSilent(request)
          .then((response) => response.accessToken);

        // Refresh all data in parallel
        await Promise.all([
          GetDeviceSummary({ token }),
          GetWiredClients({ token }),
          GetWirelessClients({ token }),
        ]);
        setClientsLoading(false);
      } catch (err) {
        console.log("Error occured ");
        setLoading(false);
        setClientsLoading(false);
      }
    })();
  };

  return (
    <NextUIProvider>
      <main className="dark text-foreground bg-background">
        <PageLayout>
          <AuthenticatedTemplate>
            {/* <div className="px-4 py-3 text-black bg-yellow-500">
              <p className="text-sm font-medium text-center">
                This tool is currently under development. Modifications will be
                made frequently and you may encounter bugs.
              </p>
            </div> */}

            <div className=" flex justify-end m-4 ">
              <Tooltip
                className="bg-black rounded-lg"
                content={
                  <div className="bg-black text-green-600 rounded-lg">
                    <div className="text-small font-bold text-center">
                      Refresh
                    </div>
                    <div className="text-tiny">
                      1 minute interval to refresh data
                    </div>
                  </div>
                }
              >
                <Button
                  className="bg-inherit m-3"
                  isIconOnly
                  onClick={handleButtonClick}
                >
                  {siteId ? (
                    <svg
                      fill="none"
                      height="24"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.8883 13.5C21.1645 18.3113 17.013 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C16.1006 2 19.6248 4.46819 21.1679 8"
                        stroke="green"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3"
                        stroke="green"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  ) : (
                    ""
                  )}
                </Button>
              </Tooltip>
              <div className="flex justify-center w-3/12 ">
                <Autocomplete
                  defaultItems={SortSiteList}
                  isDisabled={isLoading}
                  label="Select a Site"
                  menuTrigger="input"
                  placeholder="SiteCode"
                  className="max-w-sm"
                  variant="bordered"
                  onInputChange={(value) => {}}
                  onSelectionChange={onSelectionChange}
                  startContent={
                    <SearchIcon
                      className="text-default-400"
                      strokeWidth={2.5}
                      size={20}
                    />
                  }
                >
                  {(site) => (
                    <AutocompleteItem
                      value={JSON.stringify(site.id)}
                      key={site.id}
                    >
                      {site.name}
                    </AutocompleteItem>
                  )}
                </Autocomplete>
              </div>
            </div>

            <Tabs
              className="flex justify-center"
              aria-label="Options"
              color="success"
              variant="bordered"
            >
              <Tab
                key="summary"
                className="flex justify-center"
                title={
                  <div className="flex items-center space-x-2">
                    <img
                      width="30"
                      height="30"
                      src={SummaryIconPNG}
                      alt="summary-list"
                    />
                    <span> Summary</span>
                  </div>
                }
              >
                <SumLoadingModal loading={loading} />
                <DeviceSummary DeviceSummaryData={siteDeviceSummary} />
              </Tab>
              <Tab
                key="routers"
                title={
                  <div className="flex items-center space-x-2">
                    <RouterIcon />

                    <span>Routers</span>
                  </div>
                }
              >
                <RouterLoadingModal loading={loading} />
                <Routers DeviceSummary={siteDeviceSummary} />
              </Tab>
              <Tab
                key="switches"
                title={
                  <div className="flex items-center space-x-2">
                    {/* <SwitchIcon /> */}
                    <img
                      width="30"
                      height="30"
                      src={SwitchIconPNG}
                      alt="switch"
                    />

                    <span>Switches</span>
                  </div>
                }
              >
                <SwitchLoadingModal loading={loading} />
                <Switch48p DeviceSummary={siteDeviceSummary}></Switch48p>
              </Tab>
              <Tab
                key="videos"
                title={
                  <div className="flex items-center space-x-2">
                    <APIcon />
                    <img
                      width="30"
                      height="30"
                      src={WIFIIcon}
                      alt="wi-fi-connected"
                    />
                    <span>Access Points</span>
                  </div>
                }
              >
                <APLoadingModal loading={loading} />
                <AccessPoints DeviceSummary={siteDeviceSummary} />
              </Tab>
              <Tab
                key="wiredDevices"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Wired Clients</span>
                  </div>
                }
              >
                <WiredDevices clients={wiredClients} loading={clientsLoading} siteId={siteId} />
              </Tab>
              <Tab
                key="wirelessDevices"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Wireless Clients</span>
                  </div>
                }
              >
                <WirelessDevices clients={wirelessClients} loading={clientsLoading} siteId={siteId} />
              </Tab>
              <Tab
                key="claim-devices"
                title={
                  <div className="flex items-center space-x-2">
                    <span>Claim Devices</span>
                  </div>
                }
              >
                <ClaimDevices />
              </Tab>
            </Tabs>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <div className="grid mt-40 px-4 place-content-center">
              <div className="text-center  ">
                <div className="flex justify-center">
                  <img
                    width="64"
                    height="64"
                    src={CautionIcon}
                    alt="Caution Icon"
                  />
                </div>

                <p className="text-2xl font-bold tracking-tight text-gray-400 sm:text-4xl">
                  You are not signed in
                </p>

                <p className="mt-4 text-gray-500">
                  Please sign in to view devices.{" "}
                </p>

                <SignInButton></SignInButton>
              </div>
            </div>
          </UnauthenticatedTemplate>
        </PageLayout>
      </main>
    </NextUIProvider>
  );
}

export default App;
