import axios from "axios";
import React, { useEffect } from "react";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link,useHistory } from "react-router-dom";
import { deleteNoteAction, listNotes } from "../../actions/notesAction";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import MainLayout from "../../components/MainLayout";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success:successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading:loadingDelete, error: errorDelete , success: successDelete } = noteDelete;

  

  useEffect(() => {
    dispatch(listNotes());
    if( !userInfo ){
      history.push("/");
    }
  }, [dispatch, successCreate, userInfo,history,successUpdate,successDelete]);
  
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(deleteNoteAction(id));
    }
  };
  
  return (
    <MainLayout title={`Welcome Back ${userInfo.name}`}>
      <Link to="createnote">
        <Button size="lg">Create New Note</Button>
      </Link>
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      { errorDelete && <ErrorMessage>{errorDelete}</ErrorMessage>}
      {loading && <Loading />}
      {notes?.reverse().filter((filteredNote)=>(
        filteredNote.title.toLowerCase().includes(search.toLowerCase())
      )).map((note) => (
        <Accordion key={note._id}>
          <Card className="my-2">
            <Card.Header
              className="d-flex mt-2"
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <span
                style={{
                  color: "black",
                  textDecoration: "none",
                  flex: 1,
                  cursor: "pointer",
                  alignSelf: "center",
                  fontSize: 18,
                }}
              >
                <Accordion.Toggle as={Card.Text} variant="link" eventKey="0">
                  {note.title}
                </Accordion.Toggle>
              </span>
              <div>
                <Link to={`/note/${note._id}`}><Button >Edit</Button></Link>
                <Button
                  variant="danger"
                  className="mx-2"
                  onClick={() => deleteHandler(note._id)}
                >
                  Delete
                </Button>
              </div>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <h4>
                  <strong>Category</strong>
                  <Badge variant="success">-{note.category}</Badge>
                </h4>
                <blockquote className="blockquote mb-0">
                  <p>{note.content}</p>
                  <footer className="blockquote-footer">
                    Created on {" "}
                    <cite title="Source Title">
                      {note.createdAt.substring(0,10)}
                    </cite>
                  </footer>
                </blockquote>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      ))}
    </MainLayout>
  );
};

export default MyNotes;
