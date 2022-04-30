import React from "react";
import {
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Card,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  Label,
  ModalHeader,
} from "reactstrap";
import { baseUrl } from "../shared/baseUrl";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (values) => {
    console.log("submit comment", values, this.props.postComment);
    this.toggleModal();
    this.props.postComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  };

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };
  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length >= len;
    const { isModalOpen } = this.state;
    return (
      <>
        <Modal isOpen={isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Label htmlFor="rating" md={12}>
                Rating
              </Label>
              <Control.select
                model=".rating"
                id="rating"
                name="rating"
                className="form-control"
                defaultValue={"1"}
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </Control.select>
              <Label htmlFor="author" md={12}>
                Name
              </Label>
              <Control.text
                model=".author"
                id="author"
                name="author"
                className="form-control"
                validators={{
                  required,
                  minLength: minLength(2),
                  maxLength: maxLength(15),
                }}
              ></Control.text>
              <Errors
                className="text-danger"
                model=".author"
                show="touched"
                component="div"
                messages={{
                  required: "Required",
                  minLength: "Must be at least 2 characters",
                  maxLength: "Must be 15 characters or less",
                }}
              />

              <Label htmlFor="comment" md={12}>
                Comment
              </Label>
              <Control.textarea
                model=".text"
                id="text"
                name="text"
                className="form-control"
              ></Control.textarea>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModal}>
          <i className="fa fa-pencil" /> Submit Comment
        </Button>
      </>
    );
  }
}

const RenderCampsite = ({ campsite: { name, image, description } }) => {
  return (
    <div className="col-md-5 m-1">
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg top src={baseUrl + image} alt={name} />
          <CardBody>
            <CardTitle>{name}</CardTitle>
            <CardText>{description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
};

const RenderComments = ({ comments, campsiteId, postComment }) => {
  if (comments) {
    const renderedCommentsList = comments.map((comment, id) => {
      const date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(Date.parse(comment.date)));

      return (
        <Fade in key={comment.id}>
          <div>
            <p>{comment.text}</p>
            <p>
              --{comment.author} {date}
            </p>
          </div>
        </Fade>
      );
    });

    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        <Stagger in>
          {renderedCommentsList}
          <CommentForm postComment={postComment} campsiteId={campsiteId} />
        </Stagger>
      </div>
    );
  }
  return <div />;
};

const CampsiteInfo = ({
  campsite,
  comments,
  postComment,
  isLoading,
  errMess,
}) => {
  if (isLoading) {
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
  if (errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{errMess}</h4>;
          </div>
        </div>
      </div>
    );
  }
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
          <RenderComments
            comments={comments}
            postComment={postComment}
            campsiteId={campsite.id}
          />
        </div>
      </div>
    );
  }

  return <div />;
};

export default CampsiteInfo;
