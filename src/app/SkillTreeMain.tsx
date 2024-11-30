"use client";
import { useState } from 'react';
import Image from 'next/image';
import nodes from './data/merged_nodes2.json';

const SkillTreeMain = () => {
    const [tooltip, setTooltip] = useState<any>(null); // For showing node details

    // Tooltip close
    const closeTooltip = () => setTooltip(null);

    const IMAGE_WIDTH = 2750; // Python script's processed image width
    const IMAGE_HEIGHT = 2864; // Python script's processed image height

    // Function to show the tooltip
    const showToolTip = () => {
        const node = tooltip.node
        return (
            <div
                className="absolute bg-black bg-opacity-80 text-white p-2 rounded-lg w-64 flex flex-col z-50 pointer-events-none"
                style={{
                    left: `${node.x * 87.5}%`,
                    top: `${node.y * 90}%`,
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <h3 className="text-xl text-center mb-2">{node?.name || 'Unknown Node'}</h3>
                <ul className="list-disc pl-5 text-blue-600">
                    {tooltip.nodeDesc?.map((stat: string, index: number) => (
                        <li key={index} className="text-sm text-green-400 mb-2">{stat}</li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Background Image */}
            <Image
                src="/skill-tree2.png" // Ensure this is the same file used in Python
                alt="Skill Tree"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                className="relative z-1"  // Background with lower z-index
            />

            {/* Nodes Overlay */}
            {nodes.keystones.map((node) => {
                const col = node.stats.length > 0 ? "border-green-600/75 shadow-inner shadow-green-500" : "border-blue-600/25"
                return (
                    <div
                        key={node.id}
                        className={`absolute cursor-pointer rounded-full bg-transparent border-2 ${col}`}
                        style={{
                            left: `${node.x * 100}%`,
                            top: `${node.y * 100}%`,
                            transform: 'translate(-50%, -50%)',
                            width: '15px',
                            height: '15px',
                        }}
                        onMouseEnter={() => setTooltip({node: node, nodeDesc: node.stats })}
                        onMouseLeave={closeTooltip}
                    />
                );
            })}

            {nodes.notables.map((node) => {
                const col = node.stats.length > 0 ? "border-green-600/75 shadow-inner shadow-green-500" : "border-blue-600/25"
                return (
                    <div
                        key={node.id}
                        className={`absolute cursor-pointer rounded-full bg-transparent border-2 ${col}`}
                        style={{
                            left: `${node.x * 100}%`,
                            top: `${node.y * 100}%`,
                            transform: 'translate(-50%, -50%)',
                            width: '7.5px',
                            height: '7.5px',
                        }}
                        onMouseEnter={() => setTooltip({node: node, nodeDesc: node.stats })}
                        onMouseLeave={closeTooltip}
                    />
                );
            })}

            {nodes.small.map((node) => {
                const col = node.stats.length > 0 ? "border-green-600/75 shadow-inner shadow-green-500" : "border-blue-600/25"
                return (
                    <div
                        key={node.id}
                        className={`absolute cursor-pointer rounded-full bg-transparent border-2 ${col}`}
                        style={{
                            left: `${node.x * 100}%`,
                            top: `${node.y * 100}%`,
                            transform: 'translate(-50%, -50%)',
                            width: '5px',
                            height: '5px',
                        }}
                        onMouseEnter={() => setTooltip({node: node, nodeDesc: node.stats })}
                        onMouseLeave={closeTooltip}
                    />
                );
            })}

            {/* Tooltip (Positioned outside of nodes) */}
            {tooltip && showToolTip()}
        </div>
    );
};

export default SkillTreeMain;
