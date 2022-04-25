import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Loading } from "./LoadingComponent";

const RenderDirectoryItem = ({ campsite }) => {
  return (
    <Card>
      <Link to={`/directory/${campsite.id}`}>
        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
        <CardImgOverlay>
          <CardTitle>{campsite.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  );
};

const Directory = ({ campsites }) => {
  if (campsites.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Loading />
          </div>
        </div>
      </div>
    );
  }
  if (campsites.errMess) {
    <div className="container">
      <div className="row">
        <div className="col">
          <h4>campsites.errMess</h4>
        </div>
      </div>
    </div>;
  }
  const directory = campsites.campsites.map((campsite) => {
    return (
      <div key={campsite.id} className="col-md-5 m-1">
        <RenderDirectoryItem campsite={campsite} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Directory</BreadcrumbItem>
          </Breadcrumb>
          <h2>Directory</h2>
          <hr />
        </div>
      </div>
      <div className="row">{directory}</div>
    </div>
  );
};

export default Directory;
