import React from "react";
import { useState, useEffect } from "react";

import { useMsal } from "@azure/msal-react";
import { GizmoRequest } from "../authConfig";

import { SelectItem, Select } from "@nextui-org/react";

export const SiteDropdown = () => {
  const url = `https://${process.env.REACT_APP_API_BASEURL}/api/mist/site/summary`;

  const [siteList, setSiteList] = useState([]);
  const [siteDeviceSummary, setSiteDeviceSummary] = useState([]);
  const [siteId, setSiteId] = useState();

  const url1 = `https://${process.env.REACT_APP_API_BASEURL}/api/mist/site/${siteId?.currentKey}/devicesummary`;

  const { instance, accounts } = useMsal();
  const request = {
    ...GizmoRequest,
    account: accounts[0],
  };

  async function onCreate(e) {
    e.preventDefault();
    GetAllMistSites({
      token: await instance.acquireTokenSilent(request).then((response) => {
        return response.accessToken;
      }),
    });
  }

  useEffect(() => {
    (async () => {
      try {
        // await async "fetchBooks()" function
        GetAllMistSites({
          token: await instance.acquireTokenSilent(request).then((response) => {
            return response.accessToken;
          }),
        });
      } catch (err) {
        console.log("Error occured ");
      }
    })();
  }, []);

  async function GetAllMistSites({ token }) {
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
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function GetDeviceSummary({ token }) {
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
      })

      .catch((error) => {
        console.error("Error:", error);
      });
  }

  useEffect(() => {
    if (siteId) {
      (async () => {
        try {
          // await async "fetchBooks()" function
          GetDeviceSummary({
            token: await instance
              .acquireTokenSilent(request)
              .then((response) => {
                return response.accessToken;
              }),
          });
        } catch (err) {
          console.log("Error occured ");
        }
      })();
    }
  }, [siteId]);

  return (
    <div className="flex justify-end m-4">
      <Select
        size="small"
        placeholder="Select a Site"
        bordered={false}
        label="Select a Site"
        clearable
        width="400px"
        onSelectionChange={(value) => setSiteId(value)}
      >
        {siteList.map((site) => (
          <SelectItem
            key={site.id}
            value={JSON.stringify(site.id)}
            label={site.name}
          >
            {site.name}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
};

export default SiteDropdown;
