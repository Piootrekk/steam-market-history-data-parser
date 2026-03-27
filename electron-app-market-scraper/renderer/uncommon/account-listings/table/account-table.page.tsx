import ExternalLinks from "@renderer/common/components/composites/table/external-links";
import type { Column } from "@renderer/common/components/composites/table/table";
import { TableListingsPage } from "@renderer/common/components/composites/table-listings-page";
import SmartImg from "@renderer/common/components/primitives/smart-img/smart-img";
import { useSteamIdFromParam } from "../steamid.hook";
import { type Listings, useAccountTableInvoices } from "./accout-table.loader";

const ListingsColumns: Column<Listings>[] = [
  {
    key: "eventAction",
    header: "Event",
    render: (item) => item.eventAction,
  },
  {
    key: "iconHashStorage",
    header: "Icon",
    render: (item) => (
      <SmartImg src={item.iconHashStorage} alt={item.marketHashName} />
    ),
  },
  {
    key: "marketHashName",
    header: "Market Name",
    render: (item) => item.marketName,
  },
  {
    key: "game",
    header: "Game",
    render: (item) => item.game,
  },
  {
    key: "price",
    header: "Price",
    render: (item) => `${item.price} ${item.currency}`,
  },
  {
    key: "originalAmount",
    header: "Amount",
    render: (item) => `${item.originalAmount}`,
  },
  {
    key: "urlPageInspect",
    header: "External Links",
    render: (item) => <ExternalLinks {...item} />,
  },
  {
    key: "timeEvent",
    header: "Time",
    render: (item) => item.timeEvent.toLocaleString("en-GB"),
  },
];

const AccountTablePage = () => {
  const steamId = useSteamIdFromParam();

  const { listings, listingsCount } = useAccountTableInvoices();

  return (
    <TableListingsPage
      listingsCount={listingsCount}
      columns={ListingsColumns}
      data={listings}
      title={`Listings for ${steamId}.`}
      description={"Manage and filter your listings for this account."}
    />
  );
};

export default AccountTablePage;
