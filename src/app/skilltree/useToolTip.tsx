import { useState, useCallback } from 'react';

interface TooltipState {
  node: any;
  nodeDesc?: string[];
  cursorXPercent: number;
  cursorYPercent: number;
}

export const useTooltip = (zoomRef: any) => {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const showToolTip = useCallback(() => {
    if (!tooltip) return null;

    const scale = zoomRef?.current?.instance?.transformState?.scale || 1;
    const node = tooltip.node;
    const { cursorXPercent, cursorYPercent } = tooltip;
    const isRightSide = cursorXPercent > 0.5;
    const isTopHalf = cursorYPercent < 0.5;
    const tooltipScale = Math.min(Math.max(1 / scale, 0.5), 1);
  
    const leftOffset = isRightSide
      ? `${Math.min(cursorXPercent * 100 - 9 + scale - (scale < 1.2 ? 1 : 0))}%`
      : `${Math.max(cursorXPercent * 100 + 9 - scale + (scale < 1.2 ? 1 : 0))}%`;
  
    const topOffset = isTopHalf
      ? `${Math.max(cursorYPercent * 100)}%`
      : `${Math.min(cursorYPercent * 100)}%`;
  
    return (
      <div
        className="absolute bg-gradient-to-tl from-gray-900 to-background text-white p-0 rounded-2xl w-72 flex flex-col pointer-events-none"
        style={{
          left: leftOffset,
          top: topOffset,
          zIndex: 99999,
          transform: `translate(-50%, -50%) scale(${tooltipScale})`,
          maxWidth: "18rem",
          backfaceVisibility: "hidden"
        }}
      >
        <div className="bg-gradient-to-b from-red-600 to-background px-4 py-1 mt- rounded-3xl">
          <h3 className="text-xl text-center bg-gradient-to-r from-yellow-300 via-red-100 pb-1 to-yellow-700 bg-clip-text text-transparent">
            {node?.name || "Unknown Node"}
          </h3>
        </div>
        <div className="p-4 space-y-2 gap-2 flex flex-col">
          {node.stats?.map((stat: string[], index: number) => (
            <div key={index}>
              <span className="text-white text-md font-semibold text-md">{stat}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }, [tooltip]);

  const handleTooltipShow = useCallback((node: any, event: React.MouseEvent) => {
    const imageContainer = document.getElementById("image-container");
    const rect = imageContainer?.getBoundingClientRect();
    if (!rect) return;
    
    const cursorXPercent = (event.clientX - rect.left) / rect.width;
    const cursorYPercent = (event.clientY - rect.top) / rect.height;
    
    setTooltip({
      node,
      nodeDesc: node.stats,
      cursorXPercent,
      cursorYPercent,
    });
  }, []);

  const handleTooltipHide = useCallback(() => {
    setTooltip(null);
  }, []);

  return {
    showToolTip,
    handleTooltipShow,
    handleTooltipHide,
  };
};