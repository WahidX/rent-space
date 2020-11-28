import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchToggleFavourite } from '../actions/property';

class PropertyCard extends Component {
  handleFavouriteToggle = (e) => {
    this.props.dispatch(fetchToggleFavourite(this.props.property._id));
  };

  render() {
    let { property } = this.props;
    let flagFav = false;
    let flagApplied = false;

    if (this.props.favourites) {
      for (let i = 0; i < this.props.favourites.length; i++) {
        if (this.props.favourites[i]._id === property._id) {
          flagFav = true;
          break;
        }
      }
    }
    if (this.props.applied) {
      for (let i = 0; i < this.props.applied.length; i++) {
        if (this.props.applied[i]._id === property._id) {
          flagApplied = true;
          break;
        }
      }
    }

    return (
      <React.Fragment>
        <div className="property-item" id="property-{property._id}">
          <img
            alt="prop pic"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.wrGDCtxJc2rb9rgfGaQSCwHaE7%26pid%3DApi&amp;f=1"
          />

          <span className="card-title">
            {property.title.length > 70
              ? property.title.slice(0, 70) + '...'
              : property.title}
          </span>

          <div className="details-container">
            <div className="details-item">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/484/484167.svg"
                alt="location"
              />{' '}
              {property.location}
            </div>

            <div className="details-item">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/632/632339.svg"
                alt="bedrooms"
              />
              &nbsp;
              {property.beds}
            </div>

            <div className="details-item">
              <img
                src="https://www.flaticon.com/svg/static/icons/svg/3030/3030330.svg"
                alt="bathrooms"
              />
              &nbsp;
              {property.baths}
            </div>

            <div className="details-item">
              For {property.type}
              <br />₹
              <b>{property.type === 'Sale' ? property.price : property.rent}</b>
              k
            </div>
          </div>

          <div className="card-btn-container">
            <button className="normal">
              View
              <br />
              Property
            </button>
            <button className="gold" onClick={this.handleFavouriteToggle}>
              {!flagFav && 'Add to'}
              {flagFav && 'Remove from'}
              <br />
              Favourites
            </button>
            <button className="warning">
              {!flagApplied && 'Apply'}
              {flagApplied && 'Cancel'}
              <br />
              Now
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    favourites: state.auth.user.favourites,
    applied: state.auth.user.applied,
  };
}

export default connect(mapStateToProps)(PropertyCard);
