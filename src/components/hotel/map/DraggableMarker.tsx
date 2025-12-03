'use client'
import { useTranslations } from "next-intl";
import { useState, useRef, useMemo, useCallback } from "react";
import {Marker, Popup} from 'react-leaflet';
  
interface Props {
    position: [number, number],
    setPosition: (position: [number, number]) => void;
}

export default function DraggableMarker({ position, setPosition }: Props) {
    const t = useTranslations('Public.Hotel');
    const [draggable, setDraggable] = useState(false)
    const [positionUpdate, setPositionUpdate] = useState(position);

    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker: any = markerRef.current
          if (marker != null) {
            const newPos = marker.getLatLng()
            setPositionUpdate(newPos);
            setPosition(newPos)
            //setFieldValue('lat', newPos.lat);
            //setFieldValue('lng', newPos.lng);
          }
        },
      }),
      [position],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
    
    return (
      <Marker
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={positionUpdate}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? t("marker_draggable")
              : t("click_cursor")}
          </span>
        </Popup>
      </Marker>
    )
  }