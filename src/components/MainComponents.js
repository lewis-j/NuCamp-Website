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
import {
  postComment,
  fetchCampsites,
  fetchComments,
  fetchPromotions,
} from "../redux/ActionCreators";
import { actions } from "react-redux-form";

const mapStateToProps = (state) => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions,
  };
};

const mapDispatchToProps = {
  postComment: (campsiteId, rating, author, text) =>
    postComment(campsiteId, rating, author, text),
  fetchCampsites: () => fetchCampsites(),
  resetFeedbackForm: () => actions.reset("feedbackForm"),
  fetchComments: () => fetchComments(),
  fetchPromotions: () => fetchPromotions(),
};

const Main = ({
  campsites,
  comments,
  promotions,
  partners,
  postComment,
  fetchCampsites,
  fetchComments,
  fetchPromotions,
  resetFeedbackForm,
}) => {
  useEffect(() => {
    fetchCampsites();
    fetchComments();
    fetchPromotions();
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
          comments={comments.comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
          commentsErrMess={comments.errMess}
          isLoading={campsites.isLoading}
          errMess={campsites.errMess}
          postComment={postComment}
        />
      );
    }
  };

  const featuredCampsite = campsites.campsites.filter(
    (campsite) => campsite.featured
  )[0];

  const featuredPromotion = promotions.promotions.filter(
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
              campsitesLoading={campsites.isLoading}
              campsitesErrMess={campsites.errMess}
              promotion={featuredPromotion}
              promotionLoading={promotions.isLoading}
              promotionErrMess={promotions.errMess}
              partner={featuredPartner}
            />
          }
        />
        <Route path="/directory/:campsiteId" element={<CampsiteWithId />} />
        <Route path="directory" element={<Directory campsites={campsites} />} />
        <Route
          path="contactus"
          element={<Contact resetFeedbackForm={resetFeedbackForm} />}
        />
        <Route path="aboutus" element={<About partners={partners} />} />

        <Route
          path="*"
          element={
            <Home
              campsite={featuredCampsite}
              campsitesLoading={campsites.isLoading}
              campsitesErrMess={campsites.errMess}
              promotion={featuredPromotion}
              promotionLoading={promotions.isLoading}
              promotionErrMess={promotions.errMess}
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
