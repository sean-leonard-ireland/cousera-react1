import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
const validEmail = (val) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: "",
      author: "",
      textarea: "",
      touched: {
        rating: false,
        author: false,
        textarea: false,
      },
    };

    this.toggleModal = this.toggleModal.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      isModalOpen: false,
    };
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
    //event.preventDefault();
  }

  render() {
    return (
      <div>
        <Button
          type="submit"
          value="submit"
          color="secondary"
          onClick={this.toggleModal}
        >
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comments</ModalHeader>
          <ModalBody>
            <div className="col-12 col-md-9">
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Label htmlFor="rating" md={2}>
                    <strong>Rating</strong>
                  </Label>
                </Row>
                <Row>
                  <Col md={10}>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Label htmlFor="author" md={2}>
                    <strong>Your Name</strong>
                  </Label>
                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Required ",
                    }}
                  />
                </Row>
                <Row>
                  <Col md={10}>
                    <Control.text
                      model=".author"
                      id="author"
                      name="author"
                      placeholder="Enter you Name"
                      className="form-control"
                      validators={{
                        required,
                        minLength: minLength(3),
                        maxLength: maxLength(15),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".author"
                      show="touched"
                      messages={{
                        required: "Required ",
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                </Row>

                <Row className="form-group">
                  <Label htmlFor="textarea" md={2}>
                    <strong>Comment</strong>
                  </Label>
                </Row>
                <Row>
                  <Col md={10}>
                    <Control.textarea
                      model=".textarea"
                      id="textarea"
                      name="textarea"
                      placeholder=" "
                      rows="6"
                      className="form-control"
                      validators={{
                        required,
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".textarea"
                      show="touched"
                      messages={{
                        required: "Required",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={{ size: 10 }}>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

function RenderCommentsOld({ comments }) {
  const allComments = comments.map((comment) => {
    return (
      <ul key={comment.id} className="list-unstyled">
        <li>{comment.comment}</li>
        <li>
          --{comment.author} ,{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(comment.date))}
        </li>
      </ul>
    );
  });
  if (comments != null) {
    return (
      <div>
        <h3>Comments</h3>
        {allComments}
      </div>
    );
  } else {
    return <div />;
  }
}

function RenderComments({ props }) {
  const allComments = props.comments.map((comment) => {
    return (
      <ul key={comment.id} className="list-unstyled">
        <li>{comment.comment}</li>
        <li>
          --{comment.author} ,{" "}
          {new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(comment.date))}
        </li>
      </ul>
    );
  });
  if (props.comments != null) {
    return (
      <div>
        <h3>Comments</h3>
        {allComments}
        <CommentForm props={props} />
      </div>
    );
  } else {
    return <div />;
  }
}

function RenderDish({ dish }) {
  if (dish != null)
    return (
      <div className="container">
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  else return <div></div>;
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
            <RenderComments props={props} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
