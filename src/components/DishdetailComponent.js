/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderComments(dish) {
    if (dish.comments != null) {
      const comments = dish.comments.map((comment) => {
        let options = { year: "numeric", month: "short", day: "numeric" };
        return (
          <ul key={comment.id} className="list-unstyled">
            <li className="mb-2">{comment.comment}</li>
            <li>
              -- {comment.author}{" "}
              {new Date(comment.date).toLocaleDateString("en-US", options)}
            </li>
          </ul>
        );
      });

      return comments;
    } else {
      return <div></div>;
    }
  }

  renderDish(dish) {
    if (dish != null)
      return (
        <Card>
          <CardImg top src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      );
    else return <div></div>;
  }

  render() {
    if (this.props.passedSelectedDish != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              {this.renderDish(this.props.passedSelectedDish)}
            </div>
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              {this.renderComments(this.props.passedSelectedDish)}
            </div>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default DishDetail;
