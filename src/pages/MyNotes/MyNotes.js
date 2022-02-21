import axios from "axios";
import React, { useEffect,useState } from "react";
import { Button, Card, Badge, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import MainLayout from "../../components/MainLayout";


const MyNotes = () => {

  const [ notes, setNotes ] = useState([]);

  const deleteHandler = (id) => {
    if(window.confirm("Are you sure ?")){
      alert("Deleted Successfull")
    }
  };

  
  const fetchNotes = async()=>{
      const {data} = await axios.get('http://localhost:5000/api/notes')
      setNotes(data);
  }
  useEffect(()=>{
    fetchNotes();
  },[]);
  return (
    <MainLayout title="Welcome Back Sirajul">
      <Link to="createnote">
        <Button size="lg">Create New Note</Button>
      </Link>
      {notes.map((note) => (
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
                
                <Accordion.Toggle
                      as={Card.Text}
                      variant="link"
                      eventKey="0"
                    >
                      {note.title}
                    </Accordion.Toggle>
              </span>
              <div>
                <Button href={`/note/${note._id}`}>Edit</Button>
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
                  Created on 12/2/22
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
