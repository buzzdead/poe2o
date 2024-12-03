import Fuse from 'fuse.js';
import filterNodesData from "../data/combined_filtered_nodes.json";

const fuse = new Fuse(filterNodesData.nodes, {
  keys: ['name', 'description'],
  threshold: 0.3,
  includeScore: true,
});

self.onmessage = (event) => {
  const query = event.data;

  const results = fuse.search(query)
    .map(result => result.item.name)
    .slice(0, 10);

  self.postMessage(results);
};

export {};