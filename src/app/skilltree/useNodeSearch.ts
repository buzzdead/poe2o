// useNodeSearch.ts
import { useState, useEffect, useCallback } from "react";


export const useNodeSearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNodes, setFilteredNodes] = useState<string[]>([]);
  
    useEffect(() => {
      // Create worker
      const worker = new Worker(new URL('./searchWorker.ts', import.meta.url));
  
      // Handler for worker messages
      const handleWorkerMessage = (event: MessageEvent) => {
        setFilteredNodes(event.data);
      };
  
      worker.addEventListener('message', handleWorkerMessage);
  
      // Send search request to worker
      if (searchQuery.trim().length >= 2) {
        worker.postMessage(searchQuery);
      } else {
        setFilteredNodes([]);
      }
  
      // Cleanup
      return () => {
        worker.removeEventListener('message', handleWorkerMessage);
        worker.terminate();
      };
    }, []);
  
    const handleSearchChange = useCallback((query: string) => {
      setSearchQuery(query);
    }, []);
  
    return {
      filterNodes: filteredNodes,
      searchQuery,
      handleSearchChange,
    };
  };