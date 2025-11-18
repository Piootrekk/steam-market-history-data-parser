type BasicPageInfoProps = {
  name: string;
  desc: string;
  Icon: React.ElementType;
};

const BasicPageInfo = ({ name, desc, Icon }: BasicPageInfoProps) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
          <Icon className="h-8 w-8 shrink-0" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">{name}</h1>
      </div>
      <p className="text-muted-foreground mt-2">{desc}</p>
    </>
  );
};

export default BasicPageInfo;
