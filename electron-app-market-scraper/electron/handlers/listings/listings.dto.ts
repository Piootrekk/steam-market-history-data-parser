import type { listingsRepostiory } from "./listings.repository";

const listingsDto = (
  repoResponse: Awaited<ReturnType<typeof listingsRepostiory>>
) => {
  const responseDto = repoResponse.map((repo) => {
    return {
      appId: repo.appId,
      backgroundColor: repo.backgroundColor,
      classId: repo.classId,
      currency: repo.currency,
      eventAction: repo.eventAction,
      eventType: repo.eventType,
      game: repo.game,
      id: repo.id,
      instanceId: repo.instanceId,
      listingId: repo.listingId,
      marketHashName: repo.marketHashName,
      nameColor: repo.nameColor,
      originalAmount: repo.originalAmount,
      price: repo.price,
      purchaseId: repo.purchaseId,
      snapshotId: repo.snapshotId,
      steamidActor: repo.steamidActor,
      timeEvent: repo.timeEvent,
      urlIcon: repo.urlIcon,
    };
  });
  return responseDto;
};

export { listingsDto };
