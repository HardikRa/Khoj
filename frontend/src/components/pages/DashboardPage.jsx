import React, { useEffect, useState } from 'react';
import GraphVis from '../GraphVis';
import SearchBar from  '../SearchBar';
import axios from 'axios';

const FRAUD_DETECTION = "FRAUD_DETECTION";
const FRAUD_RING = "FRAUD_RING";
const HIGH_RISK = "HIGH_RISK";
const NORMAL = "NORMAL";

const DashboardPage = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [type, setTypeState] = useState(NORMAL);

  useEffect(() => {
    refreshData()
  }, [type, query])

  const refreshData = async () => {
    setLoading(true)
    setError(null)
    setData(null)

    try {
      if (query) {
        const response = await axios.get("http://10.1.210.150:8000/llm", {
          params: { userPrompt: query },
        });
        setData(response.data)
      } else {
        let endpoint = ""
        if (type === FRAUD_DETECTION) {
          endpoint = "http://10.1.210.150:8000/fraudulent_users"
        } else if (type === FRAUD_RING) {
          endpoint = ""
        } else if (type === HIGH_RISK) {
          endpoint = ""
        } else if (type === NORMAL) {
          endpoint = "http://10.1.210.150:8000/get_all_user_data"
        }

        const response = await axios.get(endpoint);
        setData(response.data)
      }
    } catch(e) {
      setError(e.toString())
      setData(null)            
    } finally {
      setLoading(false);
    } 
  }

  return (
    <div className="bg-blue-50w-[100%]">
      <div className="mx-auto w-full">
        {/* <div className="mb-8">
          <SearchBar  />
        </div> */}

        <div>
          {loading && <p className="text-center text-blue-600">Loading...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}
          {data && 
            <GraphVis 
              data={data} 
              onSearch={(q) => {
                setQuery(q)
                refreshData()
              }}
              onHighRiskIndividualDataRequested={() => {
                setTypeState(HIGH_RISK)
                refreshData()
              }} 
              onFraudDetectionDataRequested={() => {
                setTypeState(FRAUD_DETECTION)
                refreshData()
              }}
              onFraudRingDataRequested={() => {
                setTypeState(FRAUD_RING)
                refreshData()
              }}
            />
          }
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;