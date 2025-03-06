import React, { useState } from "react";
import OdClassList from '../OdClassList';
import OdClassMap from '../OdClassMap';
import OdClassHeader from '../OdClassHeader';

const OdClassContainer = () => {
    return (
        <div className="bg-gray-100 p-6 max-w-3xl mx-auto rounded-lg shadow-md">
          <OdClassHeader />
          <OdClassMap />
          <OdClassList />
        </div>
    ); 
}

export default OdClassContainer;