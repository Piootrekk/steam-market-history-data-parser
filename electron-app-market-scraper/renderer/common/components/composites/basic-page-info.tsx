type BasicPageInfoProps = {
  name: string;
  desc: string;
  Icon: React.ElementType;
};

const BasicPageInfo = ({ name, desc, Icon }: BasicPageInfoProps) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-primary-foreground">
          <Icon className="h-8 w-8 shrink-0" />
        </div>
        <h1 className="font-bold text-3xl text-foreground">{name}</h1>
      </div>
      <p className="text-muted-foreground">{desc}</p>
    </>
  );
};

export default BasicPageInfo;
