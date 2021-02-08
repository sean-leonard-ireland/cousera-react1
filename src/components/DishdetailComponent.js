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
        return (
          <ul key={comment.id} className="list-unstyled">
            <li className="mb-2">{comment.comment}</li>
            <li>
              -- {comment.author}{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              }).format(new Date(Date.parse(comment.date)))}
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

  render() {
    if (this.props.dish != null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-5 m-1">
              console.log(dish)
              {this.renderDish(this.props.dish)}
            </div>
            <div className="col-12 col-md-5 m-1">
              <h4>Comments</h4>
              {this.renderComments(this.props.dish)}
              console.log(dish)
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
