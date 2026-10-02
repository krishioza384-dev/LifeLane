import { useState, useRef, useCallback, useEffect } from 'react';

interface TransformState {
  panX: number;
  panY: number;
  zoom: number;
}

interface UseMapTransformOptions {
  minZoom?: number;
  maxZoom?: number;
  zoomStep?: number;
  initialZoom?: number;
  initialPanX?: number;
  initialPanY?: number;
}

export function useMapTransform(options: UseMapTransformOptions = {}) {
  const {
    minZoom = 0.8,
    maxZoom = 2.4,
    zoomStep = 0.2,
    initialZoom = 1.0,
    initialPanX = 0,
    initialPanY = 0,
  } = options;

  const [transform, setTransform] = useState<TransformState>({
    panX: initialPanX,
    panY: initialPanY,
    zoom: initialZoom,
  });

  const isDraggingRef = useRef(false);
  const dragStartPosRef = useRef({ x: 0, y: 0 });
  const transformStartRef = useRef<TransformState>({ panX: 0, panY: 0, zoom: 1 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Helper to clamp pan boundaries so map never gets lost
  const clampTransform = useCallback(
    (panX: number, panY: number, zoom: number): TransformState => {
      const clampedZoom = Math.min(maxZoom, Math.max(minZoom, zoom));
      // Max allowable pan based on zoom level
      const maxPanX = 350 * clampedZoom;
      const maxPanY = 250 * clampedZoom;

      return {
        zoom: clampedZoom,
        panX: Math.min(maxPanX, Math.max(-maxPanX, panX)),
        panY: Math.min(maxPanY, Math.max(-maxPanY, panY)),
      };
    },
    [minZoom, maxZoom]
  );

  const zoomIn = useCallback(() => {
    setTransform((prev) => clampTransform(prev.panX, prev.panY, prev.zoom + zoomStep));
  }, [clampTransform, zoomStep]);

  const zoomOut = useCallback(() => {
    setTransform((prev) => clampTransform(prev.panX, prev.panY, prev.zoom - zoomStep));
  }, [clampTransform, zoomStep]);

  const recenter = useCallback(() => {
    setTransform({ panX: initialPanX, panY: initialPanY, zoom: initialZoom });
  }, [initialPanX, initialPanY, initialZoom]);

  // Pointer drag listeners
  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    // Only left click or single touch
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    dragStartPosRef.current = { x: e.clientX, y: e.clientY };
    transformStartRef.current = { ...transform };

    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  }, [transform]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartPosRef.current.x;
    const deltaY = e.clientY - dragStartPosRef.current.y;

    setTransform(() =>
      clampTransform(
        transformStartRef.current.panX + deltaX,
        transformStartRef.current.panY + deltaY,
        transformStartRef.current.zoom
      )
    );
  }, [clampTransform]);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (containerRef.current && containerRef.current.hasPointerCapture(e.pointerId)) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  }, []);

  // Wheel zoom listener
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 0.1 : -0.1;
      setTransform((prev) => clampTransform(prev.panX, prev.panY, prev.zoom + zoomFactor));
    },
    [clampTransform]
  );

  return {
    containerRef,
    panX: transform.panX,
    panY: transform.panY,
    zoom: transform.zoom,
    transformString: `translate(${transform.panX}px, ${transform.panY}px) scale(${transform.zoom})`,
    isDefaultView: transform.panX === initialPanX && transform.panY === initialPanY && transform.zoom === initialZoom,
    zoomIn,
    zoomOut,
    recenter,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleWheel,
  };
}
