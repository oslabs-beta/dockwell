import React, { useState, useEffect } from 'react';
import CPU from '../components/metrics/Cpu.jsx';
import Memory from '../components/metrics/Memory.jsx';

const systemMetrics = () => {
  return (
    <div className="SystemMetrics">
      <CPU />
      <Memory />
    </div>
  );
};

export default systemMetrics;
