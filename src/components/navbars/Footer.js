import React, { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import "../../styles/Footer.css";
import Button from "react-bootstrap/esm/Button";
import ShowLocation from "../maps/ShowLocation";
import Modal from "react-bootstrap/Modal";

function Footer({ restaurant }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Container fluid className="Footer">
        <h5>{restaurant?.data.name}</h5>
        <h6>Contact: {restaurant?.data.email}</h6>
        <hr />
        Food Categories:{" "}
        {restaurant?.data.foodCategories.map((category) => {
          return <span className="popularFoodCategory">{category}</span>;
        })}
        <br />
        <br />
        <Button
          onClick={() => {
            if (restaurant) handleShow();
          }}
          variant="danger"
        >
          Find On Map
        </Button>
        <Modal
          show={show}
          onHide={handleClose}
          size="lg"
          dialogClassName="modal-90w"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              Find On Map
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ShowLocation viewOnly={true} restaurants={[restaurant]} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
}

export default Footer;
