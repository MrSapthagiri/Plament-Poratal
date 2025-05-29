import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const JobFilters = ({ filters, setFilters }) => {
  const jobTypes = ['full_time', 'part_time', 'internship'];
  const experienceLevels = ['0', '1', '2', '3', '5', '7', '10'];
  const salaryRanges = [
    '300000',
    '500000',
    '700000',
    '1000000',
    '1500000',
    '2000000',
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <div className="relative rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) =>
            setFilters({ ...filters, searchQuery: e.target.value })
          }
          placeholder="Search jobs..."
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <select
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">All Job Types</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
            </option>
          ))}
        </select>
      </div>

      <div>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          placeholder="Location"
          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <select
          value={filters.experience}
          onChange={(e) =>
            setFilters({ ...filters, experience: e.target.value })
          }
          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">All Experience Levels</option>
          {experienceLevels.map((level) => (
            <option key={level} value={level}>
              {level}+ Years
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={filters.salary}
          onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">All Salary Ranges</option>
          {salaryRanges.map((range) => (
            <option key={range} value={range}>
              ₹{parseInt(range) / 100000}L+
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default JobFilters;
