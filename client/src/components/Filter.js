import React, { Component } from 'react';

class Filter extends Component {
  render() {
    return (
      <div id="filter-main">
        <div id="filter-container">
          <div className="filter-item">
            <div className="filter-title">
              <label for="location">Location</label>
            </div>
            <div className="filter-value">
              <select id="location" name="location">
                <option value="none" selected>
                  Select
                </option>
                <option value="Kolkata">Kolkata</option>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
          </div>

          <div className="filter-item">
            <div className="filter-title">
              <label>Type</label>
            </div>
            <div className="filter-value">
              <input type="radio" id="rent" value="Rent" name="type" />
              <label for="rent">Sale</label>
              <input type="radio" id="sale" value="Sale" name="type" />
              <label for="sale">Rent</label>
            </div>
          </div>

          <div className="filter-item">
            <div className="filter-title">
              <label for="type">Price &nbsp;₹(Lacs)</label>
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
              <input type="radio" id="bed-1" value="1" name="beds" />
              <label for="bed-1">1</label>
              <input type="radio" id="bed-2" value="2" name="beds" />
              <label for="bed-2">2</label>
              <input type="radio" id="bed-3" value="3" name="beds" />
              <label for="bed-3">3</label>
              <input type="radio" id="bed-4" value="4" name="beds" />
              <label for="bed-4">4+</label>
            </div>
          </div>

          <div className="filter-item">
            <div className="filter-title">
              <label>Bathrooms</label>
            </div>
            <div className="filter-value">
              <input type="radio" id="bath-1" value="1" name="baths" />
              <label for="bath-1">1</label>
              <input type="radio" id="bath-2" value="2" name="baths" />
              <label for="bath-2">2</label>
              <input type="radio" id="bath-3" value="3" name="baths" />
              <label for="bath-3">3</label>
              <input type="radio" id="bath-4" value="4" name="baths" />
              <label for="bath-4">4+</label>
            </div>
          </div>
        </div>
        <button>Search</button>
      </div>
    );
  }
}

export default Filter;
