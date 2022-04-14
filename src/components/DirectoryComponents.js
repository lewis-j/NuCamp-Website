import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
import CampsiteInfo from "./CampsiteInfoComponent";

const RenderDirectoryItem = ({ campsite }) => {
  return (
    <Card>
      <CardImg width="100%" src={campsite.image} alt={campsite.name} />
      <CardImgOverlay>
        <CardTitle>{campsite.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
};

const Directory = ({ campsites, onClick }) => {
  const directory = campsites.map((campsite) => {
    return (
      <div key={campsite.id} className="col-md-5 m-1">
        <RenderDirectoryItem campsite={campsite} onClick={onClick} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{directory}</div>
    </div>
  );
};

export default Directory;
