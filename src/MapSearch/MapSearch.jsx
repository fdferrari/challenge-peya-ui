import React from "react";
import { Spinner } from "react-bootstrap";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import "./MapSearch.css";
import searchService from "../services/SearchService";

const MAX_RESULT = 20;
const LAT_DEFAULT = -34.90549;
const LNG_DEFAULT = -56.181319;
class MapSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spinnerMap: false,
      spinnerInfo: false,
      lat: null,
      lng: null,
      data: []
    };
  }

  componentDidMount() {
    if (this.props.lat && this.props.lng) {
      //se obtienen valores por url
      this._search(this.props.country, this.props.lat, this.props.lng);
      return;
    }
    if (navigator && navigator.geolocation) {
      //se obtienen valores por geolocalización
      navigator.geolocation.getCurrentPosition(position => {
        this._search(this.props.country, position.coords.latitude, position.coords.longitude);
      },(code, message) => this._search(this.props.country, LAT_DEFAULT, LNG_DEFAULT));
      return;
    }
    //búsqueda por default para valores LAT_DEFAULT, LNG_DEFAULT
    this._search(this.props.country, LAT_DEFAULT, LNG_DEFAULT);
  }

  /**
   * Método para obtener los restaurantes de acuerdo a la posicion del usuario.
   */
  _search = (country, lat, lng) => {
    this.setState({ spinnerMap: true, spinnerInfo: true });
    searchService
      .search(country, lat, lng)
      .then(result => result.data)
      .then(response => {
        this.props.toast.success("Search done successfully.");
        this.setState({
          lat:lat,
          lng:lng,
          data: response.data,
          spinnerMap: false,
          spinnerInfo: false
        });
      })
      .catch(err => {
        console.error(err);
        this.props.toast.error(err.response.data.message);
      });
  };

  /**
   * Método para capturar el click en el mapa del usuario y generar una nueva búsqueda.
   */
  mapClicked = (mapProps, map, clickEvent) => {
    this._search(this.props.country, clickEvent.latLng.lat(), clickEvent.latLng.lng());
  };

  _parseCoordinates = coordinates => {
    const obj = {};
    const splitCoordinates = coordinates.split(",");
    obj["lat"] = parseFloat(splitCoordinates[0]);
    obj["lng"] = parseFloat(splitCoordinates[1]);
    return obj;
  };

  /**
   * Método para ubicar las coordenadas en el mapa.
   */
  displayMarkers = (start = 0, end = MAX_RESULT) => {
    const markers = this.state.data
      .slice(start, end)
      .map(store => {
        const coordinates = this._parseCoordinates(store.coordinates);
        return {
          ...store,
          lat: parseFloat(coordinates.lat),
          lng: parseFloat(coordinates.lng)
        };
      })
      .map((store, index) => {
        return (
          <Marker
            key={index}
            id={index}
            position={{
              lat: store.lat,
              lng: store.lng
            }}
            icon={{
              url: "/restaurant.png",
              anchor: new this.props.google.maps.Point(32, 32),
              scaledSize: new this.props.google.maps.Size(32, 32)
            }}
            onClick={() => this.props.toast(store.name)}
          />
        );
      });
    return markers;
  };

  /**
   * Método para obtener la info de los restaurants
   */
  displayInfo = (start = 0, end = MAX_RESULT) => {
    return this.state.data.slice(start, end).map((store, index) => {
      return (
        <li key={index} className="removeBullet">
          <div>
            <img
              className="lazyload imagen"
              alt=""
              data-src={`${process.env.REACT_APP_IMAGE}${store.logo}`}
            />
            <a
              href={`${process.env.REACT_APP_PERFIL}${store.link}-menu`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {store.name}
            </a>
            {` - ${store.ratingScore} comida - ${store.deliveryTimeMaxMinutes} min. entrega - ${store.topCategories} cat.`}
          </div>
        </li>
      );
    });
  };
  render() {
    const markers = this.displayMarkers();
    const infoMarkers = this.displayInfo();
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col">
            {this.state.spinnerMap ? (
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            ) : (
              <Map
                id="myMap"
                google={this.props.google}
                style={{
                  width: "80%",
                  height: "500px"
                }}
                zoom={15}
                onClick={this.mapClicked}
                initialCenter={{ lat: this.state.lat, lng: this.state.lng }}
                center={{ lat: this.state.lat, lng: this.state.lng }}
              >
                <Marker
                  position={{
                    lat: this.state.lat,
                    lng: this.state.lng
                  }}
                  icon={{
                    url: "/blue-dot.png",
                    anchor: new this.props.google.maps.Point(32, 32),
                    scaledSize: new this.props.google.maps.Size(32, 32)
                  }}
                />
                {markers}
              </Map>
            )}
          </div>
          <div className="col">
            <div className="infoContainer">
              {this.state.spinnerInfo ? (
                <Spinner animation="border" role="status">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              ) : (
                <ul>{infoMarkers}</ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY_GOOGLE
})(MapSearch);
