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
      <ExternalLink href={urlPageMarket} target="_blank">
        Market
      </ExternalLink>
      {urlPageInspect && (
        <ExternalLink href={urlPageInspect} target="_blank">
          Inspect{" "}
        </ExternalLink>
      )}
      {urlPageWiki && (
        <ExternalLink href={urlPageWiki} target="_blank">
          Wiki
        </ExternalLink>
      )}
      {urlPageWorkshop && (
        <ExternalLink href={urlPageWorkshop} target="_blank">
          Workshop
        </ExternalLink>
      )}
    </div>
  );
};

export default ExternalLinks;
