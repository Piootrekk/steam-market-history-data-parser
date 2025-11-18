type BasePageWrapperProps = {
  children: React.ReactNode;
};

const BasicPageWrapper = ({ children }: BasePageWrapperProps) => {
  return <div className="max-w-7xl mx-auto space-y-6">{children}</div>;
};

export default BasicPageWrapper;
