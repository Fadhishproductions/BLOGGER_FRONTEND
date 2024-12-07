import apiSlice from "./apiSlice";

export const blogApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      // Get all blogs with pagination and search
      getAllBlogs: builder.query({
        query: ({ page = 1, search = '' }) => ({
          url: `/blogs?page=${page}&search=${search}`,
        }),
        providesTags: ['Blogs'],
      }),
  
      // Get a single blog by ID
      getBlogById: builder.query({
        query: (id) => ({
          url: `/blogs/${id}`,
        }),
        providesTags: (result, error, id) => [{ type: 'Blog', id }],
      }),
  
      // Create a new blog
      createBlog: builder.mutation({
        query: (newBlog) => ({
          url: '/blogs/create',
          method: 'POST',
          body: newBlog,
        }),
        invalidatesTags: ['Blogs'],
      }),
  
      // Edit an existing blog
      editBlog: builder.mutation({
        query: ({ blogId, updatedData }) => ({
          url: `/blogs/${blogId}`,
          method: 'PUT',
          body: updatedData,
        }),
        invalidatesTags: (result, error, { blogId }) => [{ type: 'Blog', id: blogId }],
      }),
  
      // Delete a blog
      deleteBlog: builder.mutation({
        query: (blogId) => ({
          url: `/blogs/delete/${blogId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Blogs'],
      }),

      //my Blogs
      getMyBlogs: builder.query({
        query: ({page,search}) => ({
          url: `/blogs/my-blogs?page=${page}&search=${search}`,
        }),
        providesTags: ['MyBlogs'],
      }),
    }),
    overrideExisting: false,
  });
  
  export const {
    useGetAllBlogsQuery,
    useGetBlogByIdQuery,
    useCreateBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation,
    useGetMyBlogsQuery
  } = blogApi;