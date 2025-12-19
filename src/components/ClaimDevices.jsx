import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Button,
  Divider,
} from "@nextui-org/react";
import { useMsal } from "@azure/msal-react";
import { GizmoRequest } from "../authConfig";

export const ClaimDevices = () => {
  const [devices, setDevices] = useState([{ id: 1, claimCode: "" }]);
  const [loading, setLoading] = useState(false);
  const [claimResult, setClaimResult] = useState(null);
  const fileInputRef = React.useRef(null);

  const { instance, accounts } = useMsal();
  const request = {
    ...GizmoRequest,
    account: accounts[0],
  };

  const handleAddDevice = () => {
    const newDevice = {
      id: devices.length + 1,
      claimCode: "",
    };
    setDevices([...devices, newDevice]);
  };

  const handleInputChange = (id, value) => {
    setDevices(
      devices.map((device) =>
        device.id === id ? { ...device, claimCode: value } : device
      )
    );
  };

  const handleRemoveDevice = (id) => {
    if (devices.length > 1) {
      setDevices(devices.filter((device) => device.id !== id));
    }
  };

  const handleImportCSV = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter((line) => line !== "");

      if (lines.length > 0) {
        const newDevices = lines.map((code, index) => ({
          id: index + 1,
          claimCode: code,
        }));
        setDevices(newDevices);
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  };

  const handleClaimDevices = async () => {
    const claimCodes = devices
      .map((device) => device.claimCode.trim())
      .filter((code) => code !== "");

    if (claimCodes.length === 0) {
      alert("Please enter at least one claim code");
      return;
    }

    try {
      setLoading(true);
      const token = await instance
        .acquireTokenSilent(request)
        .then((response) => response.accessToken);

      const url = `https://${process.env.REACT_APP_API_BASEURL}/api/mist/claim`;
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);
      headers.append("Content-Type", "application/json");

      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify(claimCodes),
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        setClaimResult(data);
        setDevices([{ id: 1, claimCode: "" }]);
      } else {
        alert(`Error: ${data.message || "Failed to claim devices"}`);
      }
    } catch (err) {
      console.error("Error claiming devices:", err);
      alert("Error claiming devices. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-9">
      <Card shadow className="w-full max-w-2xl m-3">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center w-full">
            Claim Devices
          </h1>
        </CardHeader>
        <CardBody>
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.id} className="flex gap-2 items-center">
                <Input
                  label="Device Claim Code"
                  placeholder="Enter claim code"
                  variant="bordered"
                  value={device.claimCode}
                  onChange={(e) => handleInputChange(device.id, e.target.value)}
                  className="flex-1"
                />
                {devices.length > 1 && (
                  <Button
                    color="danger"
                    variant="flat"
                    onClick={() => handleRemoveDevice(device.id)}
                  >
                    Remove
                  </Button>
                )}
              </div>
            ))}
            <div className="flex gap-2 mt-4">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImportCSV}
                accept=".csv"
                style={{ display: "none" }}
              />
              <Button
                color="default"
                variant="bordered"
                onClick={() => fileInputRef.current?.click()}
                className="flex-1"
                isDisabled={loading}
              >
                Import CSV
              </Button>
              <Button
                color="success"
                variant="bordered"
                onClick={handleAddDevice}
                className="flex-1"
                isDisabled={loading}
              >
                Add Device
              </Button>
              <Button
                color="primary"
                className="flex-1"
                onClick={handleClaimDevices}
                isLoading={loading}
              >
                Claim Devices
              </Button>
            </div>
          </div>
        </CardBody>
      </Card>

      {claimResult && (
        <Card shadow className="w-full max-w-2xl m-3">
          <CardHeader>
            <h2 className="text-xl font-bold">Claim Results</h2>
          </CardHeader>
          <CardBody>
            {claimResult.added && claimResult.added.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  Successfully Added ({claimResult.added.length})
                </h3>
                <div className="text-sm">
                  {claimResult.added.map((code, index) => (
                    <div key={index}>{code}</div>
                  ))}
                </div>
                <Divider className="my-3" />
              </div>
            )}

            {claimResult.duplicated && claimResult.duplicated.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  Already Claimed ({claimResult.duplicated.length})
                </h3>
                <div className="text-sm">
                  {claimResult.duplicated.map((code, index) => (
                    <div key={index}>{code}</div>
                  ))}
                </div>
                <Divider className="my-3" />
              </div>
            )}

            {claimResult.inventory_duplicated &&
              claimResult.inventory_duplicated.length > 0 && (
                <div className="mb-4">
                  <h3 className="font-semibold mb-2">
                    Device Details ({claimResult.inventory_duplicated.length})
                  </h3>
                  <div className="space-y-3">
                    {claimResult.inventory_duplicated.map((device, index) => (
                      <div key={index} className="border border-gray-700 rounded p-3">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Model: {device.model}</div>
                          <div>Serial: {device.serial}</div>
                          <div>MAC: {device.mac}</div>
                          <div>Type: {device.type}</div>
                          <div className="col-span-2">Claim Code: {device.magic}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Divider className="my-3" />
                </div>
              )}

            {claimResult.error && claimResult.error.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">
                  Errors ({claimResult.error.length})
                </h3>
                <div className="text-sm">
                  {claimResult.error.map((error, index) => (
                    <div key={index}>{error}</div>
                  ))}
                </div>
              </div>
            )}

            <Button
              size="sm"
              variant="light"
              onClick={() => setClaimResult(null)}
              className="mt-2"
            >
              Clear Results
            </Button>
          </CardBody>
        </Card>
      )}
    </div>
  );
};
