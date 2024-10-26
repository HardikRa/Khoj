import { InteractiveNvlWrapper } from '@neo4j-nvl/react';
import React, { useState, useEffect, useRef } from 'react';
import SearchBar from './SearchBar';

const colors = {
  user: '#6A5ACD',   // SlateBlue for user
  ip: '#6495ED',     // CornflowerBlue for IP
  card: '#7B68EE',   // MediumSlateBlue for card
  device: '#BA55D3'  // MediumOrchid for device
};
const GraphVis = ({data, onHighRiskIndividualDataRequested, onFraudDetectionDataRequested, onFraudRingDataRequested, onSearch}) => {
  const nvlRef = useRef()
  const [myNodes, setMyNodes] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [originalNodes, setOriginalNodes] = useState([]);
  const [originalRelationships, setOriginalRelationships] = useState([]);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [selectedNodeData, setSelectedNodeData] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1.6);

  useEffect(() => {
    nvlRef.current?.setZoom(zoomLevel);
  }, [zoomLevel]);

  useEffect(() => {
    const transformedNodes = data.nodes.map(node => ({
      id: node.id.toString(),
      size: 10,
      color: colors[node.type.toLowerCase()] || '#000000',
      captions: [{ value: node.ip, styles: ['bold'] }]
    }));
    console.log(transformedNodes)
    const transformedRels = data.relationships.map(rel => ({
      id: rel.id.toString(),
      from: rel.from.toString(),
      to: rel.to.toString(),
      captions: [{ value: rel.name, styles: ['italic'] }],
    }));

    setMyNodes(transformedNodes);
    setRelationships(transformedRels);
    setOriginalNodes(transformedNodes);
    setOriginalRelationships(transformedRels);
  }, [data]);

  const mouseEventCallbacks = {
    onNodeClick: (node, hitTargets, evt) => {
      const isHighlighted = highlightedNode === node.id;
      setHighlightedNode(isHighlighted ? null : node.id);
      const selectedData = data.nodes.find(nd => nd.id == node.id);
      setSelectedNodeData(isHighlighted ? null : selectedData);
    },
    onCanvasClick: () => {
      setHighlightedNode(null);
      setSelectedNodeData(null);
    },
    onNodeRightClick: (node, hitTargets, evt) => {
      evt.preventDefault();
      if (highlightedNode === node.id) {
        setMyNodes(originalNodes);
        setRelationships(originalRelationships);
        setHighlightedNode(null);
        setSelectedNodeData(null);
      } else {
        const relatedRelationships = relationships.filter(
          rel => rel.from === node.id || rel.to === node.id
        );
        const relatedNodeIds = new Set([
          node.id,
          ...relatedRelationships.map(rel => rel.from),
          ...relatedRelationships.map(rel => rel.to)
        ]);
        const relatedNodes = originalNodes.filter(n => relatedNodeIds.has(n.id));
        setMyNodes(relatedNodes);
        setRelationships(relatedRelationships);
        setHighlightedNode(node.id);
        const selectedData = data.nodes.find(nd => nd.id === node.id);
        setSelectedNodeData(selectedData);
      }
    },
    onNodeDoubleClick: (node, hitTargets, evt) => console.log('onNodeDoubleClick', node, hitTargets, evt),
    onRelationshipRightClick: (rel, hitTargets, evt) => console.log('onRelationshipRightClick', rel, hitTargets, evt),
    onRelationshipClick: (rel, hitTargets, evt) => console.log('onRelationshipClick', rel, hitTargets, evt),
    onRelationshipDoubleClick: (rel, hitTargets, evt) => console.log('onRelationshipDoubleClick', rel, hitTargets, evt),
    onDrag: (nodes) => console.log('onDrag', nodes),
    onPan: (evt) => console.log('onPan', evt),
    onZoom: (zoomLevel) => console.log('onZoom', '2.6')
  };

  const highlightedRelationships = highlightedNode
    ? relationships.filter(rel => rel.from === highlightedNode || rel.to === highlightedNode)
    : [];

  const getNodeStyle = (node) => ({
    size: highlightedNode === node.id ? 15 : 10,
    color: highlightedNode === node.id ? '#1D4ED8' : node.color
  });

  const getRelationshipStyle = (rel) => ({
    width: highlightedRelationships.includes(rel) ? 3 : 1,
    color: highlightedRelationships.includes(rel) ? '#FB923C' : '#1734d7'
  });

  const glowShadow = "0 0 50px 15px #48abe0;"

  const [areOptionsHidden,setAreOptionsHidden] = useState(false);

  const handleAreOptionsHidden = ()=>{
    setAreOptionsHidden(!areOptionsHidden)
  }

  return (
    <div className="bg-blue-50 ">
        <div className="relative">
          <div className="flex-grow bg-[#00000020] rounded-lg border border-blue-200 overflow-hidden h-[90vh] ">
            <InteractiveNvlWrapper
              ref={nvlRef}
              nodes={myNodes.map(node => ({
                ...node,
                ...getNodeStyle(node)
              }))}
              rels={relationships.map(rel => ({
                ...rel,
                ...getRelationshipStyle(rel)
              }))}
              mouseEventCallbacks={mouseEventCallbacks}
              nvlOptions={{
                useWebGL: false,
                initialZoom: zoomLevel
              }}
            />
          </div>

          {!areOptionsHidden && <div className="flex flex-col gap-6 absolute left-10 top-10">
            <div className="bg-white rounded-lg shadow-xl" style={{boxShadow:glowShadow}}>
              <SearchBar onSearch={onSearch}/>
            </div>
            <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-xl	">
              <h2 className="text-lg font-semibold text-blue-800 mb-4">Node Details</h2>
              {selectedNodeData ? (
                <div>
                  {['ip', 'location'].map((field) => (
                    <div key={field} className="mb-4">
                      <label className="text-sm text-blue-600 block mb-1">
                        {field.charAt(0).toUpperCase() + field.slice(1)}
                      </label>
                      <p className="text-sm text-gray-800">{selectedNodeData[field]}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">Select a node to see details.</p>
              )}
            </div>

            <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-xl	">
              
              <h2 className="text-lg font-semibold text-blue-800 mb-4">Controls</h2>
              <div className="flex flex-col gap-3">
                <button
                  onClick={onFraudDetectionDataRequested}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Fraud Detection
                </button>
                <button
                  onClick={onFraudRingDataRequested}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                >
                  Fraud Ring
                </button>
                <button
                  onClick={onHighRiskIndividualDataRequested}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                >
                  High Risk Individual Data
                </button>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-blue-200 p-4 shadow-xl">
      <h2 className="text-lg font-semibold text-blue-800 mb-4">Legend</h2>
      <ul className="flex flex-col gap-2">
        <li className="flex items-center">
          <span className="w-4 h-4 inline-block rounded-full mr-2" style={{ backgroundColor: '#6A5ACD' }}></span>
          <span className="text-sm text-gray-800">User</span>
        </li>
        <li className="flex items-center">
          <span className="w-4 h-4 inline-block rounded-full mr-2" style={{ backgroundColor: '#6495ED' }}></span>
          <span className="text-sm text-gray-800">IP</span>
        </li>
        <li className="flex items-center">
          <span className="w-4 h-4 inline-block rounded-full mr-2" style={{ backgroundColor: '#7B68EE' }}></span>
          <span className="text-sm text-gray-800">Card</span>
        </li>
        <li className="flex items-center">
          <span className="w-4 h-4 inline-block rounded-full mr-2" style={{ backgroundColor: '#BA55D3' }}></span>
          <span className="text-sm text-gray-800">Device</span>
        </li>
      </ul>
    </div>
          </div>}

          <div className='absolute right-7 top-7 bg-white p-2 rounded-lg cursor-pointer' onClick={handleAreOptionsHidden}>👁️‍🗨️</div>
        </div>
    </div>
  );
};

export default GraphVis;