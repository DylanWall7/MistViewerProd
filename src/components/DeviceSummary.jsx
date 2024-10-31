import React from "react";

export const DeviceSummary = ({ DeviceSummaryData }) => {
  const NumberOfDevices = DeviceSummaryData.length;

  const PercentageOfDevicesDown =
    (DeviceSummaryData.filter((item) => item.status === "disconnected").length /
      NumberOfDevices) *
    100;

  const PercentageOfDevicesUp =
    (DeviceSummaryData.filter((item) => item.status === "connected").length /
      NumberOfDevices) *
    100;

  const NumDevicesDown = DeviceSummaryData.filter(
    (item) => item.status === "disconnected"
  ).length;

  const NumDevicesUp = DeviceSummaryData.filter(
    (item) => item.status === "connected"
  ).length;

  const NumSwitches = DeviceSummaryData.filter(
    (item) => item.type === "switch"
  ).length;

  const NumSwitchesDown = DeviceSummaryData.filter(
    (item) => item.type === "switch" && item.status === "disconnected"
  ).length;

  const NumAPs = DeviceSummaryData.filter((item) => item.type === "ap").length;

  const NumAPsDown = DeviceSummaryData.filter(
    (item) => item.type === "ap" && item.status === "disconnected"
  ).length;

  const sumVCMembers = DeviceSummaryData.filter(
    (item) => item.type === "switch" && item.custom.vc_member_count > 1
  )
    .map((item) => item.custom.vc_member_count)
    .reduce((acc, val) => acc + val, 0);

  const NumOfStacks = DeviceSummaryData.filter(
    (item) => item.type === "switch" && item.custom.vc_member_count > 1
  ).length;

  const Numberofphysicaldevices = NumberOfDevices + sumVCMembers - NumOfStacks;

  return (
    <>
      {DeviceSummaryData.length > 0 ? (
        <div className=" w-2/5 m-4 mt-40 ">
          <article className="rounded-lg border border-gray-800 bg-slate-300 p-6 flex flex-col justify-center m-4">
            <div className="text-center">
              <p className="text-sm text-gray-900">
                Number of Physical Devices
              </p>

              <p className="text-2xl font-medium text-gray-900">
                {NumOfStacks > 0 ? Numberofphysicaldevices : NumberOfDevices}
              </p>
            </div>
          </article>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8 justify-center ">
            <article className="rounded-lg border border-gray-800 bg-slate-300 p-6 flex flex-col justify-center m-4">
              <div className="text-center">
                <p className="text-sm text-gray-900">
                  Number of Logical Devices Up
                </p>

                <p className="text-2xl font-medium text-gray-900">
                  {NumDevicesUp}
                </p>
              </div>

              <div className="mt-1 flex gap-1 text-green-600">
                <p className="flex gap-2 text-xs">
                  <span className="font-medium">
                    {" "}
                    {PercentageOfDevicesUp.toFixed(0)}%
                  </span>

                  <span className="text-gray-700"> Percent of Devices Up </span>
                </p>
              </div>
            </article>
            <article className="rounded-lg border border-gray-800 bg-slate-300 p-6 flex flex-col justify-center m-4">
              <div className="text-center">
                <p className="text-sm text-gray-900">
                  Number of Logical Devices Down
                </p>

                <p className="text-2xl font-medium text-gray-900">
                  {NumDevicesDown}
                </p>
              </div>

              <div className="mt-1 flex gap-1 text-red-600">
                <p className="flex gap-2 text-xs">
                  <span className="font-medium">
                    {" "}
                    {PercentageOfDevicesDown.toFixed(0)}%
                  </span>

                  <span className="text-gray-700">
                    {" "}
                    Percent of Devices Down{" "}
                  </span>
                </p>
              </div>
            </article>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
            <article className="rounded-lg border border-gray-800 bg-slate-300 p-6 flex flex-col justify-center m-4">
              <div className="text-center">
                <p className="text-sm text-gray-900">
                  Number of Logical Switches
                </p>

                <p className="text-2xl font-medium text-gray-900">
                  {NumSwitches}
                </p>
              </div>

              <div className="mt-1 flex gap-1 text-red-600">
                <p className="flex gap-2 text-xs">
                  <span className="font-medium"> {NumSwitchesDown}</span>

                  <span className="text-gray-700">
                    {" "}
                    {NumSwitchesDown === 1 ? "Switch Down" : "Switches Down"}
                  </span>
                </p>
              </div>
            </article>
            <article className="rounded-lg border border-gray-800 bg-slate-300 p-6 flex flex-col justify-center m-4">
              <div className="text-center">
                <p className="text-sm text-gray-900">Number of AP's</p>

                <p className="text-2xl font-medium text-gray-900">{NumAPs}</p>
              </div>

              <div className="mt-1 flex gap-1 text-red-600">
                <p className="flex gap-2 text-xs">
                  <span className="font-medium">{NumAPsDown}</span>

                  <span className="text-gray-700">
                    {" "}
                    {NumAPsDown === 1 ? "AP Down" : "AP's Down"}{" "}
                  </span>
                </p>
              </div>
            </article>
          </div>
          <>
            {NumOfStacks > 0 ? (
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
                <article className="rounded-lg border border-gray-800 bg-slate-300 p-6 flex flex-col justify-center m-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-900">Number of Stacks</p>

                    <p className="text-2xl font-medium text-gray-900">
                      {NumOfStacks}
                    </p>
                  </div>
                </article>
                <article className="rounded-lg border border-gray-800 bg-slate-300 p-6 flex flex-col justify-center m-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-900">
                      Number of Switches in Stacks
                    </p>

                    <p className="text-2xl font-medium text-gray-900">
                      {sumVCMembers}
                    </p>
                  </div>
                </article>
              </div>
            ) : (
              ""
            )}
          </>
        </div>
      ) : (
        <div className="grid mt-40 px-4 place-content-center">
          <h1 className="tracking-widest text-gray-500 uppercase">
            Select a Site to View Device Summary
          </h1>
        </div>
      )}
    </>
  );
};

export default DeviceSummary;
