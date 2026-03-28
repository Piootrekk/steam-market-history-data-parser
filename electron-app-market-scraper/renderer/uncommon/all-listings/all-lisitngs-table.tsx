import ExternalLinks from "@renderer/common/components/composites/table/external-links";
import type { Column } from "@renderer/common/components/composites/table/table";
import { TableListingsPage } from "@renderer/common/components/composites/table-listings-page";
import { ExternalLink } from "@renderer/common/components/primitives/anchor";
import SmartImg from "@renderer/common/components/primitives/smart-img/smart-img";
import {
  type ListingsAll,
  useAllListingsInvoices,
} from "./all-listings.loader";

const ListingsAllColumns: Column<ListingsAll>[] = [
  {
    key: "eventAction",
    header: "Event",
    render: (item) => item.eventAction,
  },
  {
    key: "classId",
    header: "Class Id",
    defaultVisible: false,
    render: (item) => item.classId,
  },
  {
    key: "instanceId",
    header: "Instance Id",
    defaultVisible: false,
    render: (item) => item.instanceId,
  },
  {
    key: "newAssetId",
    header: "New AssetId",
    defaultVisible: false,
    render: (item) => item.newAssetId,
  },
  {
    key: "oldAssetId",
    header: "Old AssetId",
    defaultVisible: false,
    render: (item) => item.oldAssetId,
  },
  {
    key: "purchaseId",
    header: "Purchase Id",
    defaultVisible: false,
    render: (item) => item.purchaseId,
  },
  {
    key: "listingId",
    header: "Listing Id",
    defaultVisible: false,
    render: (item) => item.listingId,
  },
  {
    key: "steamidActor",
    header: "SteamId Buyer",
    defaultVisible: false,
    render: (item) => {
      if (item.eventAction === "Bought") return null;
      else
        return (
          <ExternalLink
            href={`https://steamcommunity.com/profiles/${item.steamidActor}`}
          >
            {item.steamidActor}
          </ExternalLink>
        );
    },
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
    header: "Market Hash Name",
    render: (item) => item.marketHashName,
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
    key: "timeEvent",
    header: "Time",
    render: (item) => item.timeEvent.toLocaleString("en-GB"),
  },
  {
    key: "steamid",
    header: "Steam Id",
    render: (item) => item.steamid,
  },
  {
    key: "urlPageInspect",
    header: "External Links",
    render: (item) => <ExternalLinks {...item} />,
  },
];

const AccoutAllTable = () => {
  const { listings, listingsCount } = useAllListingsInvoices();
  return (
    <TableListingsPage
      listingsCount={listingsCount}
      columns={ListingsAllColumns}
      data={listings}
      title={`Listings for all accounts.`}
      description={"Manage and filter your listings for all accounts."}
    />
  );
};

export default AccoutAllTable;
