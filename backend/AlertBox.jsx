import React, { useContext } from 'react';
import { AppContext } from '../Context/AppContext';

const AlertBox = () => {
  const { alert } = useContext(AppContext);
  if (!alert.show) return null;
  return (
    <div className={`alert ${alert.type}`}>
      {alert.message}
    </div>
  );
};

export default AlertBox;
