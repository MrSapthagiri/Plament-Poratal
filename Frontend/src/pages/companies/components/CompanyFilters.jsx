import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const CompanyFilters = ({ filters, setFilters }) => {
  const industries = [
    'Technology',
    'Finance',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Education',
    'Other',
  ];

  const statuses = ['verified', 'pending', 'rejected'];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
          placeholder="Search companies..."
          className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary sm:text-sm"
        />
      </div>

      <div>
        <select
          value={filters.industry}
          onChange={(e) => setFilters({ ...filters, industry: e.target.value })}
          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">All Industries</option>
          {industries.map((industry) => (
            <option key={industry} value={industry}>
              {industry}
            </option>
          ))}
        </select>
      </div>

      <div>
        <select
          value={filters.verificationStatus}
          onChange={(e) =>
            setFilters({ ...filters, verificationStatus: e.target.value })
          }
          className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary sm:text-sm"
        >
          <option value="">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CompanyFilters;
