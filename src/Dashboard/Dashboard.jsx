import React from "react";
import { ButtonToolbar, Button } from "react-bootstrap";
import "./Dashboard.css";
import MapSearch from "../MapSearch/MapSearch";
import ChangeTimeCacheModal from "../ChangeTimeCacheModal/ChangeTimeCacheModal";
import adminService from "../services/AdminService";
import queryString from "query-string";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false };
  }

  _confirmChangeTTL = (e, value) => {
    e.preventDefault();
    adminService
      .changeTTL(value)
      .then(result => result.data)
      .then(response => {
        //save user updated
        this.props.toast.success("Operation Successfully");
        this.props.saveUser(response);
        this.setState({ modalShow: false });
      })
      .catch(err => {
        console.error(err);
        this.props.toast.error(err.response.data.message);
      });
  };

  render() {
    const query = queryString.parse(this.props.location.search);
    const lat = query.lat;
    const lng = query.lng;
    return (
      <div className="container-fluid dashboard">
        <div className="row margin-bottom-10px">
          <div className="col">
            <h1>
              Bienvenido! {this.props.user.name} {this.props.user.lastName}
            </h1>
          </div>
          <div className="col">
            <ButtonToolbar className="buttonToolbar">
              <Button
                className="actionButton"
                variant="primary"
                onClick={() => this.setState({ modalShow: true })}
              >
                Change time cache
              </Button>
              <Button
                className="actionButton"
                variant="secondary"
                onClick={this.props.logout}
              >
                Logout
              </Button>
            </ButtonToolbar>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <MapSearch toast={this.props.toast} country={this.props.user.country.id} lat={lat} lng={lng}/>
          </div>
        </div>
        <ChangeTimeCacheModal
          show={this.state.modalShow}
          ttl={this.props.user.ttl}
          onConfirm={this._confirmChangeTTL}
          onHide={() => this.setState({ modalShow: false })}
        />
      </div>
    );
  }
}

export default Dashboard;
