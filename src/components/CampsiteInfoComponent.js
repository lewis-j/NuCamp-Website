import React, { Component } from "react";
import { CardImg, CardBody, CardTitle, CardText, Card } from "reactstrap";

class CampsiteInfo extends Component {
  renderCampsite(campsite) {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }

  renderComments(comments) {
    if (comments) {
      const renderedCommentsList = comments.map((comment, id) => {
        const date = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }).format(new Date(Date.parse(comment.date)));

        return (
          <div key={comment.id}>
            <p>{comment.text}</p>
            <p>
              --{comment.author} {date}
            </p>
          </div>
        );
      });

      return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>
          {renderedCommentsList}
        </div>
      );
    }
    return <div />;
  }

  render() {
    if (this.props.campsite) {
      return (
        <div className="container">
          <div className="row">
            {this.renderCampsite(this.props.campsite)}
            {this.renderComments(this.props.campsite.comments)}
          </div>
        </div>
      );
    }

    return <div />;
  }
}

export default CampsiteInfo;
