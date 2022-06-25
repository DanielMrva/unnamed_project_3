import "./Encountercard.css";
import { Accordion, Card, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../../utils/mutations";

export default function Encountercardsingle(props) {
  //   let profilepic = props.profilepic;
  //   console.log("this is props", props);

  const [formData, setFormData] = useState({});
  const [saveComment, { error }] = useMutation(ADD_COMMENT);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const username = localStorage.getItem("user");
      console.log("username", username);
      const userId = localStorage.getItem("userId");
      console.log("userId", userId);

      const { data } = await saveComment({
        variables: {
          commentText: formData.commentText,
          commentUser: username,
          userId: userId
        },
      })
    } catch (err) {
      console.log(err);
    }
  };

return (
  <div className="card-container">
    <div className="card-top-flex">
      <div className="user-icon">
        <div className="pic-header-flex">
          <img
            className="profile-pic"
            src={require(`../../images/${props.userId.profilepic}.png`)}
            alt="user"
          />
        </div>
      </div>
      <div className={`card-header-encounter`}>
        <div className="username-card">{props.userId.username}</div>
        <div className="date-card" style={{ color: "black" }}>
          {props.date}
        </div>
        <div className="location-card">{props.type}</div>
        <div className="date-card">{props.category}</div>
      </div>
    </div>
    <div>
      <p
        style={{
          margin: "8px 0px",
          fontSize: "1rem",
          fontFamily: "Red rose",
          textTransform: "capitalize",
          lineHeight: "1rem",
          color: "black",
        }}
        location-card
      >
        {props.title}
      </p>
    </div>
    <div>
      <p>{props.description}</p>
    </div>
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="location-card"
          style={{
            fontFamily: "Red rose",
            textTransform: "capitalize",
            lineHeight: "0rem",
            color: "black",
          }}
        >Comment
        </Accordion.Header>
        <Accordion.Body
          style={{
            fontFamily: "Red rose",
            textTransform: "capitalize",
            lineHeight: "1rem",
            color: "black",
          }}
        >
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Control 
              size="sm" 
              type="text" 
              placeholder="leave a comment"
              defaultValue="your thoughts here"
              value={formData.commentText}
              onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
          <Button variant="light" type="submit" value="Submit!">Submit</Button>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

  </div>

);
}
