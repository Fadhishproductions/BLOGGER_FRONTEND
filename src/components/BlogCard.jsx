import React from 'react';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ title, image, content, onEdit, onDelete }) => {
  const navigate = useNavigate()
  return (
    <div style={styles.card} onClick={()=>navigate('/blog')} >
      <img src={image} alt={title} style={styles.image} />
      <div style={styles.content}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.snippet}>{content.substring(0, 100)}...</p>
        <div style={styles.actions}>
          <button style={styles.button} onClick={onEdit}>
            Edit
          </button>
          <button style={styles.button} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    margin: '16px',
    width: '300px',
    height: '400px', // Fixed height for the card
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
  },
  content: {
    padding: '16px',
    height: 'calc(100% - 200px)', // Take the remaining height after the image
    overflow: 'hidden', // Prevent content overflow
  },
  title: {
    fontSize: '1.25rem',
    margin: '0 0 8px',
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Add ellipsis if title is too long
    whiteSpace: 'nowrap', // Prevent the title from wrapping
  },
  snippet: {
    fontSize: '1rem',
    margin: '0 0 16px',
    color: '#555',
    overflow: 'hidden',
    textOverflow: 'ellipsis', // Add ellipsis if content is too long
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '3', // Limit the number of lines to 3
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '8px 12px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default BlogCard;
