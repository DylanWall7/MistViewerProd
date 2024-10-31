import React, { useEffect } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
} from "@nextui-org/react";
import { useAsyncList } from "@react-stately/data";

const statusColorMap = {
  connected: "success",
  disconnected: "danger",
};

export const AccessPoints = ({ DeviceSummary }) => {
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

  let list = useAsyncList({
    async load({ signal }) {
      return {
        items: DeviceSummary,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp =
            (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  const uptimetodhm = (uptime) => {
    let days = Math.floor(uptime / 86400);
    let hours = Math.floor((uptime % 86400) / 3600);
    let minutes = Math.floor(((uptime % 86400) % 3600) / 60);

    let uptimeString = `${days}d ${hours}h ${minutes}m`;
    return uptimeString;
  };

  useEffect(() => {
    //update the list when the data changes
    list.reload();
  }, [DeviceSummary]);

  const LadningPage = () => {
    return (
      <div className="grid mt-40 px-4 place-content-center">
        <h1 className="tracking-widest text-gray-500 uppercase">
          No Site Selected | SELECT A SITE TO VIEW AP's
        </h1>
      </div>
    );
  };

  const NAPMessage = () => {
    const hasAPs = list.items.some((ap) => ap.type === "ap");

    if (!hasAPs && DeviceSummary.length > 0) {
      return (
        <div className="grid mt-40 px-4 place-content-center">
          <h1 className="tracking-widest text-gray-500 uppercase">
            No Mist AP's at Selected Site
          </h1>
        </div>
      );
    }
  };

  const NumAPs = DeviceSummary.filter((item) => item.type === "ap").length;

  return (
    <>
      {DeviceSummary.length === 0 ? (
        <LadningPage />
      ) : (
        <>
          {NumAPs > 0 ? (
            <Table
              className="mt-9"
              sortDescriptor={list.sortDescriptor}
              onSortChange={list.sort}
              aria-label="Example static collection table"
            >
              <TableHeader>
                <TableColumn allowsSorting key="status">
                  Status
                </TableColumn>
                <TableColumn key="name" allowsSorting>
                  Name
                </TableColumn>
                <TableColumn key="notes">Notes</TableColumn>
                <TableColumn>IP Address</TableColumn>
                <TableColumn>MAC</TableColumn>
                <TableColumn>Up Time</TableColumn>
                <TableColumn>Model</TableColumn>
                <TableColumn>Serial Number</TableColumn>
                <TableColumn>No. Clients</TableColumn>
                <TableColumn>LLDP Neighbor</TableColumn>
                <TableColumn>LLDP Neighbor Port</TableColumn>
              </TableHeader>
              <TableBody>
                {list.items.map(
                  (ap) =>
                    ap.type === "ap" && (
                      <TableRow key={ap.mac}>
                        {renderCell(ap.status, "status")}
                        <TableCell>{ap.name}</TableCell>
                        <TableCell>{ap.notes}</TableCell>
                        <TableCell>{ap.ip}</TableCell>
                        <TableCell>{ap.mac}</TableCell>
                        <TableCell>
                          {ap.status === "connected"
                            ? uptimetodhm(ap.uptime)
                            : null}
                        </TableCell>
                        <TableCell>{ap.model}</TableCell>
                        <TableCell>{ap.serial}</TableCell>
                        <TableCell>{ap.num_clients}</TableCell>

                        <TableCell>{ap.lldp_stat?.system_name}</TableCell>
                        <TableCell>{ap.lldp_stat?.port_id}</TableCell>
                      </TableRow>
                    )
                )}
              </TableBody>
            </Table>
          ) : (
            <NAPMessage />
          )}
        </>
      )}
    </>
  );
};
