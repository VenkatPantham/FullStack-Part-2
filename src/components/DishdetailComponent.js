import React, { Component } from "react";
import {
  Button,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  render() {
    return (
      <div>
        <Button
          type="submit"
          outline
          color="secondary"
          onClick={this.toggleModal}
        >
          <span className="fa fa-pencil"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group">
                <Col sm={12}>
                  <Label htmlFor="rating">Rating</Label>
                </Col>
                <Col sm={12}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={12}>
                  <Label htmlFor="yourname">Your Name</Label>
                </Col>
                <Col sm={12}>
                  <Control.text
                    model=".yourname"
                    id="yourname"
                    name="yourname"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    model=".yourname"
                    show="touched"
                    messages={{
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={12}>
                  <Label htmlFor="comment">Comment</Label>
                </Col>
                <Col sm={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col sm={12}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg top src={dish.image} alt={dish.name} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments }) {
  if (comments != null) {
    const Comments = comments.map((comment) => {
      return (
        <div key={comment.id} className="col-12">
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},&nbsp;
            {new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }).format(new Date(comment.date))}
          </p>
        </div>
      );
    });
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-unstyled">{Comments}</ul>
        <CommentForm />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
