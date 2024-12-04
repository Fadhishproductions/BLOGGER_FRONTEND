import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
 import BlogModal from '../components/BlogModal'; // Import the BlogModal component
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCreateBlogMutation, useDeleteBlogMutation, useEditBlogMutation, useGetMyBlogsQuery } from '../redux/api/blogApi';

const MyBlogsPage = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user); // Get logged-in user from Redux store
  const [page, setPage] = useState(1); // Page state for pagination
  const [search, setSearch] = useState(''); // Search state for blog titles

  // States for Modal control
  const [blogs, setBlogs] = useState([]);//myBlogs local state
  const [showModal, setShowModal] = useState(false); // To control modal visibility
  const [isEdit, setIsEdit] = useState(false); // To determine if it's create or edit
  const [currentBlog, setCurrentBlog] = useState(null); // To store current blog being edited

  // Fetch blogs by current user
  const { data, isLoading, isError, error } = useGetMyBlogsQuery({ page, search });

  useEffect(()=>{
    if(data?.blogs)setBlogs(data.blogs)
  },[data])
  // Mutation for creating a new blog
  const [createBlog] = useCreateBlogMutation();

  // Mutation for editing a blog
  const [editBlog] = useEditBlogMutation();

  // Mutation for deleting a blog
  const [deleteBlog] = useDeleteBlogMutation();

  const handleCreateBlog = () => {
    setIsEdit(false);
    setCurrentBlog(null);
    setShowModal(true); // Show modal for creating a new blog
  };

  const handleEditBlog = (blog) => {
    setIsEdit(true);
    setCurrentBlog(blog);
    setShowModal(true); // Show modal for editing the selected blog
  };

  const handleBlogSubmit = async (blogData) => {
    if (isEdit) {
      const { blogId, updatedData } = blogData;
      const updatedBlog = await editBlog({ blogId, updatedData }).unwrap();
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog._id === blogId ? updatedBlog : blog))
      );
    } else {
      const newBlog = await createBlog(blogData).unwrap();
      setBlogs((prevBlogs) => [newBlog, ...prevBlogs]);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlog(id);
      setBlogs((prevBlogs)=>prevBlogs.filter((blog)=> blog._id !== id))
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to page 1 when search changes
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  

  return (
    <div className="container mt-5">
      <h2>My Blogs</h2>

      {/* Search input */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search your blogs"
          value={search}
          onChange={handleSearch}
        />
      </div>

      {/* Display message if no blogs are available */}
      {!blogs.length && <p>You haven't written any blogs yet.</p>}

      {/* Blog cards listing */}
      <div className="row">
        { 
          blogs?.map((blog) => (
            <div key={blog._id} className="col-md-4 mb-4">
              <div className="card">
                <img src={blog.image} className="card-img-top" alt={blog.title} />
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text" style={{ height: '60px', overflow: 'hidden' }}>
                    {blog.content.substring(0, 100)}...
                  </p>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEditBlog(blog)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* Pagination */}
      {blogs && (
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

      {/* Button to create a new blog */}
      <button className="btn btn-primary mt-4" onClick={handleCreateBlog}>
        Create Blog
      </button>

      {/* Blog Modal for Create/Edit */}
      <BlogModal
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        handleSubmit={handleBlogSubmit}
        isEdit={isEdit}
        currentBlog={currentBlog}
      />
    </div>
  );
};

export default MyBlogsPage;
