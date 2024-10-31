import React from "react";

import {
  Card,
  CardBody,
  CheckboxGroup,
  Checkbox,
  Tooltip,
  cn,
  baseStyles,
  extendVariants,
  RadioGroup,
  Radio,
  CardFooter,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Switch,
  Button,
  Divider,
} from "@nextui-org/react";
import { Chip } from "@nextui-org/react";
import { Switch48p } from "./Switch48p";
import NewTestData from "./NewTestData";

const switchData = [
  {
    id: "00000000-0000-0000-1000-58e4346eaa93",
    name: "KBMWASEASWA02",
    site_id: "3d6948e4-5773-428e-8703-cb1642a1b4ca",
    org_id: "7d3024bf-55a4-4964-8db1-d66ae92f85b9",
    created_time: 1674748575,
    modified_time: 1674748598,
    map_id: null,
    mac: "58e4346eaa93",
    status: "connected",
    serial: "NW3622341254",
    model: "EX3400-24P",
    hw_rev: "E",
    type: "switch",
    tag_uuid: "7d3024bf-55a4-4964-8db1-d66ae92f85b9",
    tag_id: 2800286,
    evpntopo_id: null,
    st_ip_base: "",
    deviceprofile_id: null,
    clients: [
      {
        hostname: "KBMWASEASWA02",
        device_mac: "58e4346eaa93",
        port_id: "ge-0/0/23",
        mac: "b8f01575b403",
      },
      {
        hostname: "KBMWASEASWA02",
        device_mac: "58e4346eaa93",
        port_id: "ge-0/0/12",
        mac: "a8537d83eb2f",
      },
    ],
    ports: {
      "ge-0/0/23.0": {
        tx_pkts: 80115395,
        rx_pkts: 20814042,
        rx_bytes: 4268143176,
        port_id: "ge-0/0/23",
        up: true,
        tx_bytes: 20299909974,
      },
      "ge-0/0/20.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/20",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/21.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/21",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/22.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/22",
        up: false,
        tx_bytes: 0,
      },

      "ge-0/0/12.0": {
        tx_pkts: 406996,
        rx_pkts: 4176175,
        rx_bytes: 1392217296,
        port_id: "ge-0/0/12",
        up: true,
        tx_bytes: 214468927,
      },
      "ge-0/0/13.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/13",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/14.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/14",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/15.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/15",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/16.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/16",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/17.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/17",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/18.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/18",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/19.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/19",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/5.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/5",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/6.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/6",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/3.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/3",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/4.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/4",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/9.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/9",
        up: false,
        tx_bytes: 0,
      },

      "ge-0/0/7.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/7",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/10.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/10",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/8.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/8",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/11.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/11",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/1.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/1",
        up: false,
        tx_bytes: 0,
      },
      "ge-0/0/2.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/2",
        up: false,
        tx_bytes: 0,
      },

      "ge-0/0/0.0": {
        tx_pkts: 0,
        rx_pkts: 0,
        rx_bytes: 0,
        port_id: "ge-0/0/0",
        up: false,
        tx_bytes: 0,
      },
    },
  },
];

const MyCheckBox = extendVariants(Checkbox, {
  variants: {
    // <- modify/add variants

    isDisabled: {
      true: {
        wrapper: "before:border-gray-500",
        label: "text-danger",
      },
      false: {
        wrapper: "before:border-success",
        label: "text-success",
      },
    },
    isInvalid: {
      true: {
        wrapper: "before:border-danger",
        label: "text-danger",
      },
    },
  },
  defaultVariants: {
    // <- modify/add default variants
    isDisabled: true,
  },
  compoundVariants: [
    // <- modify/add compound variants
    {
      isDisabled: true,
    },
  ],
});

const clientData = switchData.map((switchData) => switchData.clients);

// const ports2 = switchData.ports.map((port) => port);

const ports = switchData.map((switchData) => switchData.ports);

const portData = [];

ports.forEach((port) => {
  Object.keys(port).forEach((key) => {
    portData.push(port[key]);
  });

  //sort the ports by port_id

  portData.sort((a, b) => a.port_id - b.port_id);

  //convert port_id to number

  portData.forEach((port) => {
    port.port_id = parseInt(port.port_id.replace(/\D/g, ""));
  });

  portData.sort((a, b) => {
    const aIsEven = a.port_id % 2 === 0;
    const bIsEven = b.port_id % 2 === 0;
    if (aIsEven && !bIsEven) {
      return -1;
    } else if (!aIsEven && bIsEven) {
      return 1;
    } else {
      return a.port_id - b.port_id;
    }
  });
});

//sort all ports even numbers first then odd numbers

//sort ports by port_id value with all even ports first then odd ports after

//convert port_id to number
// ports.forEach((port) => {
//   port.port_id = parseInt(port.port_id.replace(/\D/g, ""));
// });

const SwitchCard = (
  { setGroupSelected, groupSelected, DeviceSummary },
  index
) => {
  //convert port_id to number in switchData

  //now sort all ports by port_id value with all even ports first then odd ports after and merge them

  const [isSelected, setIsSelected] = React.useState(false);

  const generateRandomKey =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const ClientIcon = (
    <svg
      fill="#000000"
      height="200px"
      width="200px"
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 297 297"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path d="M194.388,69.011c-3.922,3.917-3.924,10.271-0.005,14.192c26.363,26.382,26.347,69.324-0.038,95.724 c-3.918,3.923-3.916,10.275,0.004,14.194c1.961,1.958,4.527,2.938,7.096,2.938c2.569,0,5.139-0.982,7.099-2.942 c34.202-34.224,34.219-89.895,0.037-124.103C204.664,65.095,198.308,65.091,194.388,69.011z"></path>{" "}
          <path d="M156.868,97.801c-3.921,3.916-3.923,10.271-0.005,14.191c10.51,10.519,10.509,27.633-0.002,38.151 c-3.918,3.92-3.916,10.275,0.005,14.193c1.959,1.959,4.527,2.937,7.094,2.937c2.57,0,5.14-0.98,7.099-2.942 c18.329-18.341,18.33-48.186,0.002-66.526C167.144,93.882,160.788,93.88,156.868,97.801z"></path>{" "}
          <path d="M253.01,24.56c-3.918-3.922-10.272-3.924-14.192-0.006c-3.922,3.918-3.924,10.273-0.005,14.193 c50.854,50.887,50.832,133.707-0.052,184.618c-3.919,3.92-3.917,10.275,0.004,14.193c1.96,1.958,4.526,2.938,7.095,2.938 c2.568,0,5.139-0.982,7.099-2.942C311.661,178.82,311.684,83.27,253.01,24.56z"></path>{" "}
          <path d="M73.015,195.793c25.803-1.778,46.258-23.349,46.258-49.627c0-27.437-22.297-49.757-49.704-49.757 c-27.407,0-49.705,22.32-49.705,49.757c0,26.276,20.454,47.847,46.259,49.627c-19.32,0.743-36.335,7.723-48.193,19.86 C5.747,228.122-0.444,245.386,0.025,265.581c0.127,5.449,4.581,9.803,10.033,9.803H129.07c5.452,0,9.907-4.354,10.033-9.805 c0.469-20.196-5.724-37.462-17.907-49.931C109.339,203.514,92.331,196.536,73.015,195.793z M39.936,146.166 c0-16.367,13.293-29.685,29.633-29.685c16.34,0,29.632,13.317,29.632,29.685c0,16.37-13.292,29.688-29.632,29.688 C53.229,175.854,39.936,162.536,39.936,146.166z M20.559,255.311c1.307-10.39,5.233-18.983,11.729-25.63 c8.75-8.956,21.99-13.888,37.279-13.888c15.288,0,28.524,4.93,37.272,13.884c6.495,6.646,10.423,15.242,11.729,25.634H20.559z"></path>{" "}
        </g>
      </g>
    </svg>
  );

  // const DisplayCheckboxBasedonModel = () => {

  //   if (switchData.model === "EX3400-24P") {
  //     return (
  //       <>
  //         <MyCheckBox
  //           color="success"

  //           isDisabled={port.up === false}
  //           isInvalid={port.rx_pkts === 1}
  //           checked={groupSelected.includes(port.port_id)}
  //           onChange={() => {
  //             if (groupSelected.includes(port.port_id)) {
  //               setGroupSelected(
  //                 groupSelected.filter((item) => item !== port.port_id)
  //               );

  //               console.log(groupSelected);
  //             } else {
  //               setGroupSelected([...groupSelected, port.port_id]);
  //               console.log(groupSelected);
  //             }
  //           }}

  //         ></MyCheckBox>
  //       </>
  //     )
  //   }
  //   else if (switchData.model === "EX3400-48P") {
  //     return (
  //       <>
  //         <MyCheckBox
  //           color="success"

  //           isDisabled={port.up === false}
  //           isInvalid={port.rx_pkts === 1}
  //           checked={groupSelected.includes(port.port_id)}
  //           onChange={() => {
  //             if (groupSelected.includes(port.port_id)) {
  //               setGroupSelected(
  //                 groupSelected.filter((item) => item !== port.port_id)
  //               );

  //               console.log(groupSelected);
  //             } else {
  //               setGroupSelected([...groupSelected, port.port_id]);
  //               console.log(groupSelected);
  //             }
  //           }

  //           }

  //         ></MyCheckBox>
  //       </>
  //     )
  //   }
  //   else {
  //     return (
  //       <>
  //         <MyCheckBox
  //           color="success"

  //           isDisabled={port.up === false}
  //           isInvalid={port.rx_pkts === 1}
  //           checked={groupSelected.includes(port.port_id)}
  //           onChange={() => {
  //             if (groupSelected.includes(port.port_id)) {
  //               setGroupSelected(
  //                 groupSelected.filter((item) => item !== port.port_id)
  //               );

  //               console.log(groupSelected);
  //             } else {
  //               setGroupSelected([...groupSelected, port.port_id]);
  //               console.log(groupSelected);
  //             }
  //           }

  //           }

  //         ></MyCheckBox>
  //       </>
  //     )
  //   }
  // }

  const NoClientIcon = (
    <svg fill="#d61f1f" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        <path
          d="M11.477 3.11a6 6 0 0 0-8.367 8.367l8.367-8.368zm1.414 1.413l-8.368 8.368a6 6 0 0 0 8.367-8.367zM8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0z"
          fill-rule="evenodd"
        ></path>
      </g>
    </svg>
  );

  const CreateClass = () => {
    if (switchData.ports > 24) {
      return "max-w-[930px] ";
    } else if (switchData.ports < 24) {
      return "max-w-[1030px] ";
    } else {
      return " ";
    }
  };

  return (
    <>
      {/* <Switch
        color="success"
        size="lg"
        startContent={ClientIcon}
        endContent={NoClientIcon}
        className="m-5"
        isSelected={isSelected}
        onValueChange={() => {
          setIsSelected(!isSelected);
        }}
        key={switchData.name}
      >
        Show Connected Clients
      </Switch>
      {switchData.map((switchData) => (
        <Card className=" flex m-5 ">
          <p key={switchData.name} className="text-center mt-1">
            <Chip
              size="md"
              variant="flat"
              className="capitalize"
              color={switchData.status === "connected" ? "success" : "danger"}
            >
              {switchData.name}
            </Chip>

            <br />
            {switchData.model}
          </p>

          <CardBody className={CreateClass()}>
            <div className="flex flex-row ">
              {portData
                .filter((port) => port.port_id % 2 === 0)
                .map((port) => (
                  <div className="m-2">
                    <MyCheckBox
                      className="justify-content-center"
                      color="success"
                      isDisabled={port.up === false}
                      isInvalid={port.rx_pkts === 1}
                      checked={groupSelected.includes(port.port_id)}
                      onChange={() => {
                        if (groupSelected.includes(port.port_id)) {
                          setGroupSelected(
                            groupSelected.filter(
                              (item) => item !== port.port_id
                            )
                          );

                          console.log(groupSelected);
                        } else {
                          setGroupSelected([...groupSelected, port.port_id]);
                          console.log(groupSelected);
                        }
                      }}
                    ></MyCheckBox>
                    <p>{port.port_id}</p>
                  </div>
                ))}
            </div>
            <Divider className="my-1" />
            <div className="flex flex-row">
              {portData
                .filter((port) => port.port_id % 2 !== 0)
                .map((port) => (
                  <div className="m-2">
                    <MyCheckBox
                      color="success"
                      isDisabled={port.up === false}
                      isInvalid={port.rx_pkts === 1}
                      checked={groupSelected.includes(port.port_id)}
                      onChange={() => {
                        if (groupSelected.includes(port.port_id)) {
                          setGroupSelected(
                            groupSelected.filter(
                              (item) => item !== port.port_id
                            )
                          );

                          console.log(groupSelected);
                        } else {
                          setGroupSelected([...groupSelected, port.port_id]);
                          console.log(groupSelected);
                        }
                      }}
                    ></MyCheckBox>
                    <Tooltip
                      content={
                        <div className="px-1 py-2">
                          <div className="text-small font-bold"></div>
                          <div className="text-tiny">
                            <div className="text-tiny">
                              Device Connected MAC:
                              <br />
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <p>{port.port_id}</p>
                    </Tooltip>
                  </div>
                ))}
            </div>
          </CardBody>

          <CardFooter>
            {isSelected ? (
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>PORT</TableColumn>
                  <TableColumn>CLIENT MAC</TableColumn>
                  <TableColumn>SWITCH NAME</TableColumn>
                </TableHeader>
                <TableBody>
                  {switchData.clients.map((client) => (
                    <TableRow key={client.mac}>
                      <TableCell>{client.port_id}</TableCell>
                      <TableCell>{client.mac}</TableCell>
                      <TableCell>{client.hostname}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : null}
          </CardFooter>
        </Card>
      ))} */}
      <Switch48p DeviceSummary={DeviceSummary} />
    </>
  );
};

//convert port_id to number
// ports.forEach((port) => {
//   port.port_id = parseInt(port.port_id.replace(/\D/g, ""));
// });
// const evenPorts = ports.filter((port) => port.port_id % 2 === 0);

// const oddPorts = ports.filter((port) => port.port_id % 2 !== 0);

// const sortedEvenPorts = evenPorts.sort((a, b) => a.port_id - b.port_id);

// const sortedOddPorts = oddPorts.sort((a, b) => a.port_id - b.port_id);

// const sortedPorts = sortedEvenPorts.concat(sortedOddPorts);
// console.log(sortedPorts);

export const SwitchPanel = ({}) => {
  const [groupSelected, setGroupSelected] = React.useState([]);

  return (
    <>
      <SwitchCard
        groupSelected={groupSelected}
        setGroupSelected={setGroupSelected}
      >
        <Card className="max-w-[930px] justify-center ">
          <CardBody className="max-w-[930px]"></CardBody>
        </Card>
      </SwitchCard>
    </>
  );
};

//  <Card className="max-w-[930px] justify-center mt-1">
//    <p className="text-center">Selected Ports</p>
//    <div className="flex flex-row">
//      <CardBody className="max-w-[930px] flex flex-row">
//        <Tooltip
//          content={
//            <div className="px-1 py-2">
//              <div className="text-small font-bold"></div>
//              <div className="text-tiny">
//                {clientData.map((client) => {
//                  return (
//                    <div className="text-tiny">
//                      Device Connected MAC: {client.mac}
//                      <br />
//                    </div>
//                  );
//                })}
//              </div>
//            </div>
//          }
//        >
//          <Chip>{groupSelected}</Chip>
//        </Tooltip>
//      </CardBody>
//    </div>
//  </Card>;

export default SwitchPanel;
