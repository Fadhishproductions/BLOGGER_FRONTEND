import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // React-Bootstrap Modal
import { handleImageUpload } from '../Utils/ImageUpload';
import { toast } from 'react-toastify';

const BlogModal = ({ showModal, handleClose, handleSubmit, isEdit, currentBlog }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [imageUrl,setImageUrl]=useState("")
  // Populate the fields with existing blog data if editing
  useEffect(() => {
    if (isEdit && currentBlog) {
      setTitle(currentBlog.title);
      setContent(currentBlog.content);
      setImageUrl(currentBlog.image || '');
    } else {
      setTitle('');
      setContent('');
      setImage('');
    }
  }, [isEdit, currentBlog]);
 
  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (image) {
        imageUrl = await handleImageUpload(image);
      }
      console.log(imageUrl)
      await handleSubmit(isEdit ? { blogId:currentBlog._id, updatedData:{ title, content, image:imageUrl }} : { title, content, image:imageUrl });
    } catch (err) {
      console.error("Error object:", err);  // Log to inspect the error
      toast.error(err?.data?.message || err?.message || "An unexpected error occurred");
    }
    handleClose()
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Blog' : 'Create Blog'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={onSubmit}>
        <Form.Group className='my-2 ' controlId='image'>
        <img
            alt="Blog"
            width="200px"
            height="200px"
            src={image ? URL.createObjectURL(image) : imageUrl }
            style={{width: '200px',height: '200px',borderRadius:'10%' ,objectFit:'cover',display:'block',margin:'0 auto',backgroundColor:'grey'}}
            ></img>
      </Form.Group>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
              required
            />
          </Form.Group>

          <Form.Group controlId="content" className="mt-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter blog content"
              required
            />
          </Form.Group>

          <Form.Group controlId="image" className="mt-3">
            <Form.Label>Image Upload</Form.Label>
            <Form.Control 
        type='file'
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
        >
        </Form.Control> 
          </Form.Group>

          <div className="mt-3">
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" className="ml-2">
              {isEdit ? 'Update Blog' : 'Create Blog'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BlogModal;
