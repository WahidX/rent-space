import React from 'react';

// file imports
import { PropertyCard } from './';

function PropertyPage(props) {
  const property = props.location.property;

  return (
    <div className="single-page">
      <PropertyCard property={property} mode="single" />
    </div>
  );
}

export default PropertyPage;
