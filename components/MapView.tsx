'use client';

import { useEffect, useRef, useState } from 'react';
import { Place } from '@/types';
import { getSoundLevelColor } from '@/utils/soundLevel';
import PlaceDetailModal from './PlaceDetailModal';

interface MapViewProps {
  places: Place[];
}

export default function MapView({ places }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let L: any;

    const initMap = async () => {
      try {
        L = (await import('leaflet')).default;

        // Leaflet CSS 동적 로드
        if (!document.getElementById('leaflet-css')) {
          const link = document.createElement('link');
          link.id = 'leaflet-css';
          link.rel = 'stylesheet';
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
          document.head.appendChild(link);
        }

        // 기본 아이콘 설정 (Leaflet 아이콘 이슈 해결)
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });

        if (!mapRef.current) return;

        // 기존 맵 인스턴스 제거
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        // 새 맵 생성
        const map = L.map(mapRef.current).setView([37.5172, 127.0473], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        mapInstanceRef.current = map;

        // 마커 추가
        places.forEach((place) => {
          const color = getSoundLevelColor(place.soundLevel);

          // 커스텀 아이콘 HTML
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: 32px;
                height: 32px;
                background-color: ${color};
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
              ">
                <span style="color: white; font-weight: bold; font-size: 14px;">
                  ${place.soundLevel}
                </span>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          });

          const marker = L.marker([place.lat, place.lng], { icon: customIcon }).addTo(map);

          marker.on('click', () => {
            setSelectedPlace(place);
          });

          marker.bindTooltip(place.name, {
            permanent: false,
            direction: 'top',
          });
        });

        setIsLoading(false);
      } catch (error) {
        console.error('Error initializing map:', error);
        setIsLoading(false);
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [places]);

  return (
    <>
      <div className="relative w-full h-full">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-[999]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">지도를 불러오는 중...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>
      {selectedPlace && (
        <PlaceDetailModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </>
  );
}
