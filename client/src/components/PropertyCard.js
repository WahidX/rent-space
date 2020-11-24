import React, { Component } from 'react';

class PropertyCard extends Component {
  render() {
    let { property } = this.props;
    return (
      <React.Fragment>
        <div className="property-item" id="property-{property._id}">
          <img
            alt="prop pic"
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.wrGDCtxJc2rb9rgfGaQSCwHaE7%26pid%3DApi&amp;f=1"
          />

          <span className="card-title">{property.title}</span>

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
                src="https://www.flaticon.com/svg/static/icons/svg/2863/2863197.svg"
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
              <b>{property.type == 'Sale' ? property.price : property.rent}</b>k
            </div>
          </div>

          <div className="card-btn-container">
            <button>
              View
              <br />
              Property
            </button>
            <button>
              Add to
              <br />
              Favourite
            </button>
            <button>
              Apply
              <br />
              Now
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default PropertyCard;
