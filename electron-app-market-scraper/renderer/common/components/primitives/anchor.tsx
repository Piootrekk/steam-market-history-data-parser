type ExternalLinkProps = React.ComponentProps<"a">;

const ExternalLink = ({ ...props }: ExternalLinkProps) => {
  return (
    <a
      {...props}
      className="cursor-pointer underline focus:text-ring focus-visible:outline-none"
    />
  );
};

export { ExternalLink };
