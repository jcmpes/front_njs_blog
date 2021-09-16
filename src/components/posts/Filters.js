export default function Filters({ filters, setFilters }) {
  const handleChange = (event) => {
    event.preventDefault();
    setFilters((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div>
      {/* Filter select */}
      <div className="relative inline-block w-full p-3 text-gray-700">
        <select
          className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
          placeholder="Regular input"
          name="filter"
          value={filters.filter}
          onChange={handleChange}
        >
          <option value="date">
            Date
          </option>
          <option value="title">Title</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center px-2 pointer-events-none">
          {/* <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg> */}
        </div>
      </div>
      {/* Ordering select */}
      <div className="relative inline-block w-full p-3 text-gray-700">
        <select
          className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline"
          placeholder="Regular input"
          name="ordering"
          value={filters.ordering}
          onChange={handleChange}
        >
          <option value="asc">
            Asc
          </option>
          <option value="desc">Desc</option>
        </select>
        <div className="absolute inset-y-0 right-3 flex items-center px-2 pointer-events-none">
          {/* <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
            <path
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
              fillRule="evenodd"
            ></path>
          </svg> */}
        </div>
      </div>
    </div>
  );
}
