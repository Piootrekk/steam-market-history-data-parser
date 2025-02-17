import "./filters.css";

type TItemFilter = {
  label: string;
  isChecked?: boolean;
};

type TGroupFilter = {
  title: string;
  onHandler: (label: string) => void;
  items: TItemFilter[];
};

type FilterProps = {
  groups: TGroupFilter[];
};

const Filters: React.FC<FilterProps> = ({ groups }) => {
  return (
    <div className="event-filters">
      {groups.map((group, index) => (
        <>
          <span className="filter-label" key={index}>
            {group.title}
          </span>
          <div className="checkbox-group">
            {group.items.map((item) => (
              <label key={item.label} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => group.onHandler(item.label)}
                  className="checkbox-input"
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </>
      ))}
    </div>
  );
};

export default Filters;
export type { TItemFilter, TGroupFilter };
