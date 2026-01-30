import React, { useState, useMemo } from "react";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Spinner,
  Pagination,
} from "@nextui-org/react";

const SearchIcon = ({ size = 24, strokeWidth = 1.5, ...props }) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size}
    role="presentation"
    viewBox="0 0 24 24"
    width={size}
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

const ROWS_PER_PAGE = 75;

const formatMac = (mac) => {
  if (!mac) return "-";
  const cleaned = mac.replace(/[^a-fA-F0-9]/g, "").toLowerCase();
  return cleaned.match(/.{1,2}/g)?.join(":") || mac;
};

const normalizeMac = (mac) => {
  return mac.replace(/[^a-fA-F0-9]/g, "").toLowerCase();
};

export const WirelessDevices = ({ clients = [], loading = false, siteId }) => {
  const [searchValue, setSearchValue] = useState("");
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "hostname",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const sortedAndFilteredClients = useMemo(() => {
    let items = [...clients];

    if (searchValue) {
      const search = searchValue.toLowerCase();
      const searchMac = normalizeMac(search);
      items = items.filter((client) => {
        const ip = (client.ip || "").toLowerCase();
        const mac = normalizeMac(client.mac || "");
        const hostname = (client.hostname || "").toLowerCase();
        const username = (client.username || "").toLowerCase();

        return (
          ip.includes(search) ||
          mac.includes(searchMac) ||
          hostname.includes(search) ||
          username.includes(search)
        );
      });
    }

    if (sortDescriptor.column) {
      items.sort((a, b) => {
        let first = a[sortDescriptor.column];
        let second = b[sortDescriptor.column];
        let cmp =
          (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }

        return cmp;
      });
    }

    return items;
  }, [clients, searchValue, sortDescriptor]);

  const totalPages = Math.ceil(sortedAndFilteredClients.length / ROWS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;
    return sortedAndFilteredClients.slice(start, end);
  }, [sortedAndFilteredClients, page]);

  const handleSearchChange = (value) => {
    setSearchValue(value);
    setPage(1);
  };

  const LandingPage = () => {
    return (
      <div className="grid mt-40 px-4 place-content-center">
        <h1 className="tracking-widest text-gray-500 uppercase">
          No Site Selected | SELECT A SITE TO VIEW WIRELESS CLIENTS
        </h1>
      </div>
    );
  };

  const NoClientsMessage = () => {
    return (
      <div className="grid mt-40 px-4 place-content-center">
        <h1 className="tracking-widest text-gray-500 uppercase">
          No Wireless Clients Found at Selected Site
        </h1>
      </div>
    );
  };

  if (!siteId) {
    return <LandingPage />;
  }

  if (loading) {
    return (
      <div className="grid mt-40 px-4 place-content-center">
        <Spinner size="lg" color="success" />
        <p className="mt-4 text-gray-500">Loading wireless clients...</p>
      </div>
    );
  }

  if (clients.length === 0) {
    return <NoClientsMessage />;
  }

  return (
    <div className="mt-6 mx-auto px-8 max-w-7xl">
      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          className="w-full max-w-md"
          placeholder="Search by IP, MAC, Hostname, or Username..."
          startContent={<SearchIcon className="text-default-400" />}
          value={searchValue}
          onClear={() => handleSearchChange("")}
          onValueChange={handleSearchChange}
          variant="bordered"
        />
        <span className="text-gray-400 text-sm">
          {sortedAndFilteredClients.length} of {clients.length} clients
        </span>
      </div>

      {sortedAndFilteredClients.length === 0 ? (
        <div className="grid mt-20 px-4 place-content-center">
          <h1 className="tracking-widest text-gray-500 uppercase">
            No clients match your search
          </h1>
        </div>
      ) : (
        <>
          <Table
            className="mt-4"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
            aria-label="Wireless clients table"
            bottomContent={
              totalPages > 1 ? (
                <div className="flex w-full justify-center">
                  <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="success"
                    page={page}
                    total={totalPages}
                    onChange={setPage}
                  />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn allowsSorting key="hostname">
                Hostname
              </TableColumn>
              <TableColumn allowsSorting key="username">
                Username
              </TableColumn>
              <TableColumn allowsSorting key="ip">
                IP Address
              </TableColumn>
              <TableColumn allowsSorting key="mac">
                MAC Address
              </TableColumn>
              <TableColumn allowsSorting key="ssid">
                SSID
              </TableColumn>
              <TableColumn allowsSorting key="vlan_id">
                VLAN
              </TableColumn>
              <TableColumn allowsSorting key="band">
                Band
              </TableColumn>
              <TableColumn allowsSorting key="rssi">
                RSSI
              </TableColumn>
              <TableColumn allowsSorting key="manufacture">
                Manufacturer
              </TableColumn>
            </TableHeader>
            <TableBody>
              {paginatedItems.map((client, index) => (
                <TableRow key={client.mac || index}>
                  <TableCell>{client.hostname || "-"}</TableCell>
                  <TableCell>{client.username || "-"}</TableCell>
                  <TableCell>{client.ip || "-"}</TableCell>
                  <TableCell>{formatMac(client.mac)}</TableCell>
                  <TableCell>{client.ssid || "-"}</TableCell>
                  <TableCell>{client.vlan_id || "-"}</TableCell>
                  <TableCell>{client.band ? `${client.band} GHz` : "-"}</TableCell>
                  <TableCell>{client.rssi || "-"}</TableCell>
                  <TableCell>{client.manufacture || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-2 text-gray-500 text-sm">
            Showing {((page - 1) * ROWS_PER_PAGE) + 1} - {Math.min(page * ROWS_PER_PAGE, sortedAndFilteredClients.length)} of {sortedAndFilteredClients.length}
          </div>
        </>
      )}
    </div>
  );
};