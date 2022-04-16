import React from "react";
import Directory from "./DirectoryComponents";

import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";
import { PARTNERS } from "../shared/partners";
import { PROMOTIONS } from "../shared/promotions";
import CampsiteInfo from "./CampsiteInfoComponent";
import About from "./AboutComponent";

const Main = () => {
  //can implement useState but these values do not change with state
  //using react-router-dom V6
  const campsites = CAMPSITES;
  const comments = COMMENTS;
  const partners = PARTNERS;
  const promotions = PROMOTIONS;

  const CampsiteWithId = () => {
    const match = useMatch("/directory/:campsiteId");

    if (match) {
      return (
        <CampsiteInfo
          campsite={
            campsites.filter(
              (campsite) => campsite.id === +match.params.campsiteId
            )[0]
          }
          comments={comments.filter(
            (comment) => comment.campsiteId === +match.params.campsiteId
          )}
        />
      );
    }
  };

  const featuredCampsite = campsites.filter((campsite) => campsite.featured)[0];

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

export default Main;
