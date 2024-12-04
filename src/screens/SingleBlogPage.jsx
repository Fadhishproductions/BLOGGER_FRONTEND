import React from 'react';
import { useParams } from 'react-router-dom';
 import { Container, Row, Col, Image, Card, Spinner, Alert } from 'react-bootstrap';
import { useGetBlogByIdQuery } from '../redux/api/blogApi';

const SingleBlogPage = () => {
  const { id } = useParams(); // Get blog ID from URL params
  const { data: blog, error, isLoading } = useGetBlogByIdQuery(id); // Fetch blog by ID using RTK Query
  
  return (
    <Container fluid style={styles.container}>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card style={styles.card}>
            {isLoading && <Spinner animation="border" variant="primary" />}
            {error && <Alert variant="danger">Error fetching blog: {error?.data?.message || 'Something went wrong!'}</Alert>}
            {!isLoading && !error && blog && (
              <>
                {blog.image && (
                  <>
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fluid
                    rounded
                    style={styles.image}
                    /> 
                    </>
                )}
                <Card.Body>
                  <Card.Title style={styles.title}>{blog.title}</Card.Title>
                  <Card.Text style={styles.content}>{blog.content}</Card.Text>
                </Card.Body>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

const styles = {
  container: {
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    padding: '3rem 1rem',
  },
  card: {
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '100%',
    height: 'auto',
    marginBottom: '1rem',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: '1rem',
  },
  content: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#555',
    textAlign: 'justify',
    whiteSpace: 'pre-wrap',
  },
};

export default SingleBlogPage;
