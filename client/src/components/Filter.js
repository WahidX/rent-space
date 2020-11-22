import React, { Component } from 'react';

class Filter extends Component {
  render() {
    return (
      <div id="filter-main">
        <div id="filter-container">
          <div className="filter-item">
            <div className="filter-title">
              <label htmlFor="location">Location</label>
            </div>
            <div className="filter-value">
              <select id="location" name="location">
                <option defaultValue="none">Select</option>
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
            <div className="filter-value">
              <input type="radio" id="rent" defaultValue="Rent" name="type" />
              <label htmlFor="rent">Sale</label>
              &nbsp;&nbsp;
              <input type="radio" id="sale" defaultValue="Sale" name="type" />
              <label htmlFor="sale">Rent</label>
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
            ></input>
              {/* prettier-ignore */}&nbsp;-&nbsp;
              <input
                type="number"
                min={0}
                step=".01"
                name="end"
                placeholder="end"
                style={{ width: '50px' }}
                required
              ></input>
            </div>
          </div>

          <div className="filter-item">
            <div className="filter-title">
              <label>Bedrooms</label>
            </div>
            <div className="filter-value">
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
            <div className="filter-value">
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
        <button>Search</button>
      </div>
    );
  }
}

export default Filter;
