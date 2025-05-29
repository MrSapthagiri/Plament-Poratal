import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page not found</p>
        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
