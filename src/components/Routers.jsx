import React from "react";

import {
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Divider,
  CardHeader,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import CloudIcon from "../Images/CloudIcon.png";
import { SRXPortUP } from "./PortTypes";
import { SRXPortDown } from "./PortTypes";
import { VcpPortUp } from "./PortTypes";
import { FiberPortUp } from "./PortTypes";
import { FiberPortDown } from "./PortTypes";
import { CopperPortErr } from "./PortTypes";
import { FiberPortErr } from "./PortTypes";
import NetworkCable from "../Images/NetworkCable.png";

const uptimetodhm = (uptime) => {
  let days = Math.floor(uptime / 86400);
  let hours = Math.floor((uptime % 86400) / 3600);
  let minutes = Math.floor(((uptime % 86400) % 3600) / 60);

  let uptimeString = `${days}d ${hours}h ${minutes}m`;
  return uptimeString;
};

const statusColorMap = {
  connected: "success",
  disconnected: "danger",
};

const renderCell = (cellValue, columnKey) => {
  if (columnKey === "status") {
    return (
      <TableCell>
        <Chip
          size="md"
          variant="flat"
          className="capitalize"
          color={statusColorMap[cellValue]}
        >
          {cellValue}
        </Chip>
      </TableCell>
    );
  }
  return <TableCell>{cellValue}</TableCell>;
};
const renderMistCell = (cellValue, columnKey) => {
  if (
    columnKey === "config_status" &&
    cellValue !== "" &&
    cellValue !== null &&
    cellValue !== undefined
  ) {
    return (
      <TableCell>
        <img width="30" height="30" src={CloudIcon} alt="Cloud Icon" />
      </TableCell>
    );
  }

  return <TableCell>{cellValue}</TableCell>;
};

const RouterSummary = ({ DeviceSummary }) => {
  const NumGateways = DeviceSummary.filter(
    (item) => item.type === "gateway"
  ).length;

  return (
    <>
      {NumGateways > 0 ? (
        <Card shadow className="m-3">
          <CardBody>
            <Table aria-label="router list" data={DeviceSummary}>
              <TableHeader>
                <TableColumn span={2}>Status</TableColumn>
                <TableColumn span={2}>Name</TableColumn>
                <TableColumn span={2}>IP</TableColumn>

                <TableColumn span={2}>Mac</TableColumn>
                <TableColumn span={2}>Model</TableColumn>
                <TableColumn span={2}>Serial</TableColumn>
                <TableColumn span={2}>Uptime</TableColumn>
                <TableColumn span={2}>Version</TableColumn>

                <TableColumn span={2}></TableColumn>
              </TableHeader>
              <TableBody>
                {DeviceSummary.map(
                  (DeviceSummary) =>
                    DeviceSummary.type === "gateway" && (
                      <TableRow key={DeviceSummary?.id}>
                        {renderCell(DeviceSummary?.status, "status")}
                        <TableCell span={2}>{DeviceSummary?.name}</TableCell>
                        <TableCell span={2}>{DeviceSummary?.ip}</TableCell>
                        <TableCell span={2}>{DeviceSummary?.mac}</TableCell>
                        <TableCell span={2}>{DeviceSummary?.model}</TableCell>
                        <TableCell span={2}>{DeviceSummary?.serial}</TableCell>

                        <TableCell span={2}>
                          {!DeviceSummary?.uptime
                            ? ""
                            : uptimetodhm(DeviceSummary?.uptime)}
                        </TableCell>
                        <TableCell span={2}>{DeviceSummary?.version}</TableCell>

                        {renderMistCell(
                          DeviceSummary?.config_status,
                          "config_status"
                        )}
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      ) : (
        ""
      )}
    </>
  );
};

const PortInterfaces = ({ DeviceSummary }) => {
  const Gateways = DeviceSummary.filter((item) => item?.type === "gateway");

  const PortIDList = [
    "ge-0/0/0.0",
    "ge-0/0/1.0",
    "ge-0/0/2.0",
    "ge-0/0/3.0",
    "ge-0/0/4.0",
    "ge-0/0/5.0",
    "ge-0/0/6.0",
    "ge-0/0/7.0",
    "ge-0/0/8.0",
    "ge-0/0/9.0",
    "ge-0/0/10.0",
    "ge-0/0/11.0",
    "ge-0/0/12.0",
    "ge-0/0/13.0",
    "ge-0/0/14.0",
    "ge-0/0/15.0",
    "xe-0/0/16.0",
    "xe-0/0/17.0",
    "xe-0/0/18.0",
    "xe-0/0/19.0",
  ];

  return (
    <div className="flex flex-col justify-center">
      {Gateways?.map((gatewayDetails) => (
        <div className="flex justify-center">
          <Card shadow className="m-3">
            <CardHeader>
              <div className="flex justify-center align-middle">
                {gatewayDetails?.status === "connected" ? (
                  <h1 className="text-center text-xl font-bold text-green-500">
                    {gatewayDetails?.hostname}
                  </h1>
                ) : (
                  <h1 className="text-center text-xl font-bold text-red-500">
                    {gatewayDetails?.hostname}
                  </h1>
                )}
              </div>

              <div className="m-1 flex flex-row  ">
                {PortIDList?.map((port) => (
                  <div
                    key={gatewayDetails.if_stat[port]?.port_id}
                    className="m-1"
                  >
                    <Tooltip
                      showArrow={false}
                      content={
                        <div>
                          {gatewayDetails.status !== "disconnected" ? (
                            <Card className="max-w-[410px]">
                              <CardHeader className=" flex justify-around gap-3">
                                <div className="flex justify-start">
                                  <dt className="font-medium text-gray-900">
                                    {gatewayDetails.if_stat[port]?.port_id}
                                  </dt>
                                </div>
                                <div className="flex justify-end">
                                  <img
                                    width="24"
                                    height="24"
                                    src={NetworkCable}
                                    alt="network-cable"
                                  />
                                  <p className="text-md m-1 text-center ">
                                    Wired Client
                                  </p>
                                </div>
                              </CardHeader>
                              <Divider />

                              <CardBody>
                                <div className="flow-root">
                                  <dl className="-my-3 divide-y divide-gray-100 text-sm">
                                    {gatewayDetails.if_stat[port]
                                      ?.servp_info ? (
                                      <div className="grid grid-cols-1 gap-1 py-1 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">
                                          IP Address
                                        </dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                          {gatewayDetails.if_stat[port]?.ips}
                                        </dd>
                                      </div>
                                    ) : (
                                      ""
                                    )}

                                    <div className="grid grid-cols-1 gap-1 py-1 sm:grid-cols-3 sm:gap-4">
                                      <dt className="font-medium text-gray-900">
                                        Port Usage
                                      </dt>
                                      <dd className="text-gray-700 sm:col-span-2">
                                        {
                                          gatewayDetails.if_stat[port]
                                            ?.port_usage
                                        }
                                      </dd>
                                    </div>

                                    {gatewayDetails.if_stat[port]
                                      ?.servp_info ? (
                                      <div className="grid grid-cols-1 gap-1 py-1 sm:grid-cols-3 sm:gap-4">
                                        <dt className="font-medium text-gray-900">
                                          ISP
                                        </dt>
                                        <dd className="text-gray-700 sm:col-span-2">
                                          {
                                            gatewayDetails.if_stat[port]
                                              ?.servp_info.org
                                          }
                                        </dd>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    <div className="grid grid-cols-1 gap-1 py-1 sm:grid-cols-3 sm:gap-4">
                                      <dt className="font-medium text-gray-900">
                                        RX GB
                                      </dt>
                                      <dd className="text-gray-700 sm:col-span-2">
                                        {gatewayDetails.if_stat[port]
                                          ?.rx_bytes / 1000000000}
                                      </dd>
                                    </div>
                                    <div className="grid grid-cols-1 gap-1 py-1 sm:grid-cols-3 sm:gap-4">
                                      <dt className="font-medium text-gray-900">
                                        TX GB
                                      </dt>
                                      <dd className="text-gray-700 sm:col-span-2">
                                        {gatewayDetails.if_stat[port]
                                          ?.tx_bytes / 1000000000}
                                      </dd>
                                    </div>
                                  </dl>
                                </div>
                              </CardBody>
                            </Card>
                          ) : (
                            "No Data Available"
                          )}
                        </div>
                      }
                    >
                      <div>
                        {gatewayDetails.if_stat[port]?.port_id ? (
                          <div
                            key={gatewayDetails.if_stat[port]}
                            className="m-1"
                          >
                            {gatewayDetails.if_stat[port]?.up &&
                            gatewayDetails.status !== "disconnected" ? (
                              <SRXPortUP />
                            ) : (
                              ""
                            )}

                            {!gatewayDetails.if_stat[port]?.up ? (
                              <SRXPortDown />
                            ) : (
                              ""
                            )}

                            {gatewayDetails.if_stat[port]?.up &&
                            gatewayDetails.status === "disconnected" ? (
                              <SRXPortDown />
                            ) : (
                              ""
                            )}

                            <div className="text-center">
                              <p className="text-xs">
                                {gatewayDetails.if_stat[port]?.port_id.slice(
                                  7,
                                  9
                                )}
                              </p>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

const LadningPage = () => {
  return (
    <div className="grid mt-40 px-4 place-content-center">
      <h1 className="tracking-widest text-gray-500 uppercase">
        No Site Selected | Select a Site to View Routers
      </h1>
    </div>
  );
};
const NoRouters = () => {
  return (
    <div className="grid mt-40 px-4 place-content-center">
      <h1 className="tracking-widest text-gray-500 uppercase">
        No Router Found for Selected Site
      </h1>
    </div>
  );
};

export const Routers = ({ DeviceSummary }) => {
  const NumRouters = DeviceSummary.filter(
    (item) => item.type === "gateway"
  ).length;

  return (
    <>
      {NumRouters === 0 && DeviceSummary.length !== 0 ? <NoRouters /> : ""}

      {DeviceSummary.length === 0 ? (
        <LadningPage />
      ) : (
        <>
          <RouterSummary DeviceSummary={DeviceSummary} />
          <PortInterfaces DeviceSummary={DeviceSummary} />
        </>
      )}
    </>
  );
};

export default Routers;
