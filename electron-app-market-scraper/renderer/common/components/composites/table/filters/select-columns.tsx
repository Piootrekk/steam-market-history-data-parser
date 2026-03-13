type SelectColumnsProps = {
  columns: string[];
};

const SelectColumns = ({ columns }: SelectColumnsProps) => {
  return (
    <>
      <h3 className="mb-3 font-semibold text-foreground text-sm">
        Show/Hide Columns
      </h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {columns.map((column) => (
          <label
            key={String(column)}
            className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-secondary dark:hover:bg-secondary/50"
          >
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-ring"
            />
            <span className="text-foreground text-sm">{column}</span>
          </label>
        ))}
      </div>
    </>
  );
};

export default SelectColumns;
