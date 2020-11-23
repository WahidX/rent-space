import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProperty } from '../actions/property';

class Filter extends Component {
  handleInputChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleSearch = (e) => {
    this.props.dispatch(fetchProperty(this.state));
  };

  render() {
    console.log('STATE:: ', this.state);
    return (
      <div id="filter-main">
        <div id="filter-container">
          <div className="filter-item">
            <div className="filter-title">
              <label htmlFor="location">Location</label>
            </div>
            <div className="filter-value">
              <select
                id="location"
                name="location"
                onChange={(e) =>
                  this.handleInputChange('location', e.target.value)
                }
              >
                <option defaultValue="null"></option>
                <option defaultValue="Kolkata">Kolkata</option>
                <option defaultValue="Chennai">Chennai</option>
                <option defaultValue="Mumbai">Mumbai</option>
                <option defaultValue="Bangalore">Bangalore</option>
                <option defaultValue="Pune">Pune</option>
              </select>
            </div>
          </div>

          <div className="filter-item">
            <div className="filter-title">
              <label>Type</label>
            </div>
            <div
              className="filter-value"
              onClick={(e) => {
                if (e.checked) e.checked = false;
              }}
              onChange={(e) => this.handleInputChange('type', e.target.value)}
            >
              <input type="radio" id="sale" defaultValue="Sale" name="type" />
              <label htmlFor="sale">Sale</label>
              &nbsp;&nbsp;
              <input type="radio" id="rent" defaultValue="Rent" name="type" />
              <label htmlFor="rent">Rent</label>
            </div>
          </div>

          <div className="filter-item">
            <div className="filter-title">
              <label htmlFor="type">Price &nbsp;₹(Lacs)</label>
            </div>
            <div className="filter-value">
              {/* prettier-ignore */}
              <input
              type="number"
              min={0}
              step=".01"
              name="start"
              placeholder='start'
              style={{ "width": '50px' }}
              required
              onChange={(e) => this.handleInputChange('start', e.target.value)}></input>
              {/* prettier-ignore */}&nbsp;-&nbsp;
              <input
                type="number"
                min={0}
                step=".01"
                name="end"
                placeholder="end"
                style={{ width: '50px' }}
                required
                onChange={(e) => this.handleInputChange('end', e.target.value)}
              ></input>
            </div>
          </div>

          <div className="filter-item">
            <div className="filter-title">
              <label>Bedrooms</label>
            </div>
            <div
              className="filter-value"
              onChange={(e) => this.handleInputChange('beds', e.target.value)}
            >
              <input type="radio" id="bed-1" defaultValue="1" name="beds" />
              <label htmlFor="bed-1">1</label>
              <input type="radio" id="bed-2" defaultValue="2" name="beds" />
              <label htmlFor="bed-2">2</label>
              <input type="radio" id="bed-3" defaultValue="3" name="beds" />
              <label htmlFor="bed-3">3</label>
              <input type="radio" id="bed-4" defaultValue="4" name="beds" />
              <label htmlFor="bed-4">4+</label>
            </div>
          </div>

          <div className="filter-item">
            <div className="filter-title">
              <label>Bathrooms</label>
            </div>
            <div
              className="filter-value"
              onChange={(e) => this.handleInputChange('baths', e.target.value)}
            >
              <input type="radio" id="bath-1" defaultValue="1" name="baths" />
              <label htmlFor="bath-1">1</label>
              <input type="radio" id="bath-2" defaultValue="2" name="baths" />
              <label htmlFor="bath-2">2</label>
              <input type="radio" id="bath-3" defaultValue="3" name="baths" />
              <label htmlFor="bath-3">3</label>
              <input type="radio" id="bath-4" defaultValue="4" name="baths" />
              <label htmlFor="bath-4">4+</label>
            </div>
          </div>
        </div>
        <button onClick={this.handleSearch}>Search</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Filter);
