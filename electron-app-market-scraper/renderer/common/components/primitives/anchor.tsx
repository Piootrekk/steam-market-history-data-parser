type ExternalLinkProps = React.ComponentProps<"a">;

const ExternalLink = ({ ...props }: ExternalLinkProps) => {
  return (
    <a
      {...props}
      className="underline cursor-pointer focus:text-ring focus-visible:outline-none"
    />
  );
};

export { ExternalLink };
