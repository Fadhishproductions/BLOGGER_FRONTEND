import React, { useState } from 'react';
 import { Link } from 'react-router-dom'; // For routing
import { useGetAllBlogsQuery } from '../redux/api/blogApi';

const Dashboard = () => {
  const [page, setPage] = useState(1); // State to manage current page
  const [search, setSearch] = useState(''); // State for search query

  // Fetch all blogs with pagination and search
  const { data, isLoading, isError, error } = useGetAllBlogsQuery({
    page,
    search,
  });

  // Handle the search input change
  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when search query changes
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  // Check if no blogs are available
  const blogsAvailable = data?.blogs?.length > 0;

  return (
    <div className="container mt-5">
      <h2>Blog Dashboard</h2>
      
      {/* Search Input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search blogs"
          value={search}
          onChange={handleSearch}
          style={{ width: '300px' }}
        />
      </div>

      {/* No Blogs Message */}
      {!blogsAvailable && <p>No blogs available at the moment.</p>}

      {/* Blogs List */}
      <div className="row">
        {blogsAvailable &&
          data?.blogs?.map((blog) => (
            <div key={blog._id} className="col-md-4 mb-4">
              <div className="card" style={{ height: '100%' }}>
                <img src={blog.image} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text" style={{ height: '60px', overflow: 'hidden' }}>
                    {blog.content.substring(0, 100)}...
                  </p>
                  <Link to={`/blogs/${blog._id}`} className="btn btn-primary">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {blogsAvailable && (
        <nav aria-label="Page navigation">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: data?.pages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${page === index + 1 ? 'active' : ''}`}
              >
                <button
                  className="page-link"
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${page === data?.pages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => setPage(page + 1)}
                disabled={page === data?.pages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Dashboard;
