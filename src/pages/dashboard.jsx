import React from 'react';
import Cards from '../components/cards';
import OrderTable from '../components/ordertable';
import TopProducts from '../components/topproduct';
import TopWorkers from '../components/topworkers';

function Dashboard() {
  return (
    <div className="dashboard">
      <Cards />
      <OrderTable />
      <TopProducts />
      <TopWorkers />
    </div>
  );
}

export default Dashboard;
