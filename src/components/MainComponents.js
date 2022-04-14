import React, { Component } from "react";
import Directory from "./DirectoryComponents";
import CampsiteInfo from "./CampsiteInfoComponent";
import { CAMPSITES } from "../shared/campsites";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES,
      selectedCampsiteId: null,
    };
  }

  onCampsiteSelect(campsiteId) {
    this.setState({ selectedCampsiteId: campsiteId });
  }

  render() {
    return (
      <div>
        <Header />
        <Directory
          campsites={this.state.campsites}
          onClick={(campsiteId) => this.onCampsiteSelect(campsiteId)}
        />
        <CampsiteInfo
          campsite={
            this.state.campsites.filter(
              (campsite) => campsite.id === this.state.selectedCampsiteId
            )[0]
          }
        />
        <Footer />
      </div>
    );
  }
}

export default Main;
