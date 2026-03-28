import { ExternalLink } from "../../primitives/anchor";

type ExternalLinksPops = {
  urlPageMarket: string;
  urlPageWiki?: string | null;
  urlPageWorkshop?: string | null;
  urlPageInspect?: string | null;
};

const ExternalLinks = ({
  urlPageMarket,
  urlPageWiki,
  urlPageInspect,
  urlPageWorkshop,
}: ExternalLinksPops) => {
  return (
    <div className="flex flex-row space-x-1">
      <ExternalLink href={urlPageMarket}>Market</ExternalLink>
      {urlPageInspect && (
        <ExternalLink href={urlPageInspect}>Inspect </ExternalLink>
      )}
      {urlPageWiki && <ExternalLink href={urlPageWiki}>Wiki</ExternalLink>}
      {urlPageWorkshop && (
        <ExternalLink href={urlPageWorkshop}>Workshop</ExternalLink>
      )}
    </div>
  );
};

export default ExternalLinks;
