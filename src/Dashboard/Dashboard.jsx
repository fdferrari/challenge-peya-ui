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
    let lat;
    let lng;
    if (this.props.location) {
      const query = queryString.parse(this.props.location.search);
      lat = query.lat;
      lng = query.lng;
    }
    const user = this.props.user;
    return (
      <div className="container-fluid dashboard">
        <div className="row margin-bottom-10px">
          <div className="col">
            <h1>
              Bienvenido! {user? user.name : null} {user?user.lastName:null}
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
            <MapSearch
              toast={this.props.toast}
              country={user?user.country.id:null}
              lat={lat}
              lng={lng}
            />
          </div>
        </div>
        <ChangeTimeCacheModal
          show={this.state.modalShow}
          ttl={user?user.ttl:null}
          onConfirm={this._confirmChangeTTL}
          onHide={() => this.setState({ modalShow: false })}
        />
      </div>
    );
  }
}

export default Dashboard;
