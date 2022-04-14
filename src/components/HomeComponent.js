import React from "react";
import {
  Container,
  Card,
  CardTitle,
  CardText,
  CardBody,
  CardImg,
} from "reactstrap";

function RenderCard({ item }) {
  console.log("Item", item);

  return (
    <Card>
      <CardImg src={item.image} alt={item.name} />
      <CardBody>
        <CardTitle>{item.name}</CardTitle>
        <CardText>{item.description}</CardText>
      </CardBody>
    </Card>
  );
}

function Home(props) {
  console.log("props", props);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md m-1">
          <RenderCard item={props.campsite} />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.promotion} />
        </div>
        <div className="col-md m-1">
          <RenderCard item={props.partner} />
        </div>
      </div>
    </div>
  );
}

export default Home;
