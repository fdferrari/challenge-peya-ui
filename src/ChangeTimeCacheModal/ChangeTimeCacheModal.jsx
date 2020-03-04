import React from "react";
import { Button, Modal } from "react-bootstrap";

class ChangeTimeCacheModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ttl: this.props.ttl };
  }

  render() {
    return (
      <Modal
        show={this.props.show}        
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change time in store cache
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>
            TTL (min):
            <input
              type="text"
              name="ttl"
              value={this.state.ttl}
              onChange={(e) =>  this.setState({ ttl: e.target.value })}
            />
          </label>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={(e) => this.props.onConfirm(e, this.state.ttl)}>Confirm</Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ChangeTimeCacheModal;
