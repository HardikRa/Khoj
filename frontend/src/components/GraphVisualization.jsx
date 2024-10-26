// import { NVL } from '@neo4j-nvl/base'

import React, { useState } from 'react';
import './GraphVisualization.css';

import axios from 'axios';
import GraphVis from './GraphVis';

const DummyData = {
    nodes: Array.from({ length: 50 }, (_, index) => ({
      id: (index + 1).toString(), // Create nodes with ids from '1' to '50'
      name: `Node ${index + 1}`,
      ip: `192.168.1.${index + 1}`,
      location: `Location ${index + 1}`,
      risk_level: Math.floor(Math.random() * 3)
    })),
    relationships: [
      // Community 1
      { id: '1', from: '1', to: '2', name: 'Relationship 1' },
      { id: '2', from: '1', to: '3', name: 'Relationship 2' },
      { id: '3', from: '2', to: '3', name: 'Relationship 3' },
      { id: '4', from: '2', to: '4', name: 'Relationship 4' },
      { id: '5', from: '3', to: '4', name: 'Relationship 5' },
  
      // Community 2
      { id: '6', from: '6', to: '7', name: 'Relationship 6' },
      { id: '7', from: '6', to: '8', name: 'Relationship 7' },
      { id: '8', from: '7', to: '9', name: 'Relationship 8' },
      { id: '9', from: '7', to: '10', name: 'Relationship 9' },
      { id: '10', from: '8', to: '10', name: 'Relationship 10' },
  
      // Community 3
      { id: '11', from: '11', to: '12', name: 'Relationship 11' },
      { id: '12', from: '11', to: '13', name: 'Relationship 12' },
      { id: '13', from: '12', to: '14', name: 'Relationship 13' },
      { id: '14', from: '13', to: '15', name: 'Relationship 14' },
      { id: '15', from: '14', to: '16', name: 'Relationship 15' },
  
      // Inter-community connections
      { id: '16', from: '3', to: '6', name: 'Relationship 16' },
      { id: '17', from: '10', to: '3', name: 'Relationship 17' },
      { id: '18', from: '10', to: '13', name: 'Relationship 18' },
      { id: '19', from: '16', to: '7', name: 'Relationship 19' },
      { id: '20', from: '12', to: '20', name: 'Relationship 20' },
  
      // Additional random relationships to increase complexity
      { id: '21', from: '1', to: '8', name: 'Relationship 21' },
      { id: '22', from: '9', to: '3', name: 'Relationship 22' },
      { id: '23', from: '14', to: '5', name: 'Relationship 23' },
      { id: '24', from: '4', to: '11', name: 'Relationship 24' },
      { id: '25', from: '20', to: '25', name: 'Relationship 25' },
  
      // Additional relationships
      { id: '26', from: '25', to: '50', name: 'Relationship 26' },
      { id: '27', from: '48', to: '45', name: 'Relationship 27' },
      { id: '28', from: '46', to: '44', name: 'Relationship 28' },
      { id: '29', from: '49', to: '1', name: 'Relationship 29' },
      { id: '30', from: '40', to: '11', name: 'Relationship 30' },
      { id: '31', from: '38', to: '37', name: 'Relationship 31' },
      { id: '32', from: '19', to: '39', name: 'Relationship 32' },
      { id: '33', from: '18', to: '20', name: 'Relationship 33' },
      { id: '34', from: '25', to: '35', name: 'Relationship 34' },
      { id: '35', from: '30', to: '34', name: 'Relationship 35' },
      { id: '36', from: '42', to: '45', name: 'Relationship 36' },
      { id: '37', from: '41', to: '40', name: 'Relationship 37' },
      { id: '38', from: '3', to: '35', name: 'Relationship 38' },
      { id: '39', from: '33', to: '4', name: 'Relationship 39' },
      { id: '40', from: '46', to: '10', name: 'Relationship 40' },
      { id: '41', from: '47', to: '9', name: 'Relationship 41' },
      { id: '42', from: '12', to: '50', name: 'Relationship 42' },
      { id: '43', from: '12', to: '22', name: 'Relationship 43' },
      { id: '44', from: '14', to: '43', name: 'Relationship 44' },
      { id: '45', from: '19', to: '20', name: 'Relationship 45' },
      { id: '46', from: '21', to: '48', name: 'Relationship 46' },
      { id: '47', from: '44', to: '50', name: 'Relationship 47' },
      { id: '48', from: '30', to: '47', name: 'Relationship 48' },
      { id: '49', from: '34', to: '35', name: 'Relationship 49' },
      { id: '50', from: '38', to: '30', name: 'Relationship 50' },
    ],
  };

const GraphVisualization = ({ searchQuery }) => {

  const [query, setQuery] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [result, setResult] = useState(null);

// Callback function to handle search input
const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    setResult(null); // Reset error before starting a new search

    try {
      // Replace the URL with the actual API you want to query
      const response = await axios.get('https://jsonplaceholder.typicode.com/users', {
        params: { q: query }, // Add query params as needed by the API
      });

      // Assume the response contains a list of users
      const filteredResults = response.data.filter(user => 
        user.name.toLowerCase().includes(query.toLowerCase())
      );

      console.log(filteredResults);

      setResult(filteredResults);
    } catch (err) {
      setError('An error occurred while fetching data.');
      setResult(null);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (searchQuery !== query) {
    setQuery(searchQuery);
    handleSearch(searchQuery);
  }

  if (loading) {
    return (
    <div>
        <p>Loading...</p>
    </div>
    );
  }

  if (error) {
    return (
        <div>
            <p>{ error }</p>
        </div>
    );
  }

  if (result) {
    return (
        <div>
            <GraphVis data={ DummyData } />
        </div>
    );
  }
};

export default GraphVisualization;
