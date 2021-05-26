import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import MarkRestaurantLocation from "../maps/MarkRestaurantLocation";
function MapsModal(props) {
  return (
    <div>
      <Modal
        {...props}
        size="lg"
        dialogClassName="modal-90w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Mark Location
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MarkRestaurantLocation />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={props.onHide}>
            Done
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MapsModal;
