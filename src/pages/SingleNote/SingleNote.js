 
import { useHistory,useParams } from 'react-router-dom'; 

import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, updateNoteAction } from "../../actions/notesAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ReactMarkdown from "react-markdown";
import MainLayout from "../../components/MainLayout";

const SingleNote = ({match}) => {
  const [title, setTitle] = useState();
  const [content, setContent] = useState(); 
  const [category, setCategory] = useState();
  const [date, setDate] = useState("");
  const { editId } = useParams();

  const history = useHistory();
  const dispatch = useDispatch();

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };
 
  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/notes/${editId}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      setDate(data.updatedAt);
    };

    fetching();
  }, [editId, date]);

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(editId, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history.push("/mynotes");
  };


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history.push("/mynotes");
  };
  
  return (
    <MainLayout title="Edit Note">
    <Card>
      <Card.Header>Edit your Note</Card.Header>
      <Card.Body>
        <Form onSubmit={updateHandler}>

        {loadingDelete && <Loading />}
            {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
            {errorDelete && (
              <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
            )}
          
          <Form.Group controlId="title"> 
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="title"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter the content"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Group>
          {content && (
            <Card>
              <Card.Header>Note Preview</Card.Header>
              <Card.Body>
                <ReactMarkdown>{content}</ReactMarkdown>
              </Card.Body>
            </Card>
          )}

          <Form.Group controlId="content">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="content"
              placeholder="Enter the Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          {loading && <Loading size={50} />}
          <Button variant="primary" type="submit">
            Update Note
          </Button>
          <Button
            className="mx-2"
            variant="danger"
            onClick={() => deleteHandler(editId)}
          >
            Delete Note
          </Button>
        </Form>
      </Card.Body>

      <Card.Footer className="text-muted">
        Updated on - {date.substring(0, 10)}
      </Card.Footer>
    </Card>
  </MainLayout>
  );
};

export default SingleNote;