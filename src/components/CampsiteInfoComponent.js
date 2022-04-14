import React from "react";
import {
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Card,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

const RenderCampsite = ({ campsite: { name, image, description } }) => {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={image} alt={name} />
        <CardBody>
          <CardTitle>{name}</CardTitle>
          <CardText>{description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

const RenderComments = ({ comments }) => {
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
};

const CampsiteInfo = ({ campsite, comment }) => {
  if (campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={campsite} />
          <RenderComments comments={comment} />
        </div>
      </div>
    );
  }

  return <div />;
};

export default CampsiteInfo;
