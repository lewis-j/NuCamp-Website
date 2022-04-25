import React, { useEffect } from "react";
import Directory from "./DirectoryComponents";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import About from "./AboutComponent";
import { connect } from "react-redux";
import { addComment, fetchCampsites } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};

const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) =>
    addComment(campsiteId, rating, author, text),
  fetchCampsites: () => fetchCampsites(),
};

const Main = ({
  campsites,
  comments,
  promotions,
  partners,
  addComment,
  fetchCampsites,
}) => {
  useEffect(() => {
    fetchCampsites();
  }, []);

  const CampsiteWithId = () => {
    const match = useMatch("/directory/:campsiteId");

    if (match) {
      return (
        <CampsiteInfo
          campsite={
            campsites.campsites.filter(
              (campsite) => campsite.id === +match.params.campsiteId
            )[0]
          }
          comments={comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
          addComment={addComment}
          isLoading={campsites.isLoading}
          errMess={campsites.errMess}
        />
      );
    }
  };

  const featuredCampsite = campsites.campsites.filter(
    (campsite) => campsite.featured
  )[0];

  const featuredPromotion = promotions.filter(
    (promotion) => promotion.featured
  )[0];

  const featuredPartner = partners.filter((partner) => partner.featured)[0];

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="home"
          element={
            <Home
              campsite={featuredCampsite}
              isLoading={campsites.isLoading}
              errMess={campsites.errMess}
              promotion={featuredPromotion}
              partner={featuredPartner}
            />
          }
        />
        <Route path="/directory/:campsiteId" element={<CampsiteWithId />} />
        <Route path="directory" element={<Directory campsites={campsites} />} />
        <Route path="contactus" element={<Contact />} />
        <Route path="aboutus" element={<About partners={partners} />} />

        <Route
          path="*"
          element={
            <Home
              campsite={featuredCampsite}
              isLoading={campsites.isLoading}
              errMess={campsites.errMess}
              promotion={featuredPromotion}
              partner={featuredPartner}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
