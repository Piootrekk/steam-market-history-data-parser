type BasePageWrapperProps = {
  children: React.ReactNode;
};

const BasicPageWrapper = ({ children }: BasePageWrapperProps) => {
  return (
    <div className="max-w-7xl mx-auto h-full overflow-hidden flex flex-col">
      {children}
    </div>
  );
};

export default BasicPageWrapper;
