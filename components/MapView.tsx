'use client';

import { useEffect, useRef, useState } from 'react';
import { Place } from '@/types';
import { getSoundLevelColor } from '@/utils/soundLevel';
import PlaceDetailModal from './PlaceDetailModal';

interface MapViewProps {
  places: Place[];
  language: 'ko' | 'en';
}

export default function MapView({ places, language }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const userMarkerRef = useRef<any>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([latitude, longitude], 15);
          }
        },
        (error) => {
          console.error('Location error:', error);
          alert('위치 정보를 가져올 수 없습니다. 위치 권한을 확인해주세요.');
        }
      );
    } else {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
    }
  };

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

        // 새 맵 생성 - 언어에 따라 중심 좌표 설정
        const center = language === 'ko' ? [37.5172, 127.0473] : [51.5074, -0.1278];
        const map = L.map(mapRef.current).setView(center as [number, number], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        mapInstanceRef.current = map;

        // 마커 추가
        places.forEach((place) => {
          const color = getSoundLevelColor(place.soundLevel);

          // 이모지 선택
          let emoji = '🤫';
          if (place.soundLevel > 70) emoji = '😆';
          else if (place.soundLevel > 50) emoji = '☕';
          else if (place.soundLevel > 30) emoji = '📚';

          // 커스텀 아이콘 HTML
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="
                width: 40px;
                height: 40px;
                background: linear-gradient(135deg, ${color} 0%, ${color}dd 100%);
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                position: relative;
              ">
                <span style="font-size: 20px; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));">
                  ${emoji}
                </span>
                <div style="
                  position: absolute;
                  bottom: -2px;
                  right: -2px;
                  background: white;
                  border-radius: 10px;
                  padding: 1px 4px;
                  font-size: 9px;
                  font-weight: bold;
                  color: ${color};
                  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                ">
                  ${place.soundLevel}
                </div>
              </div>
            `,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
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
  }, [places, language]);

  // 사용자 위치 마커 표시
  useEffect(() => {
    if (!userLocation || !mapInstanceRef.current) return;

    const loadLeaflet = async () => {
      const L = (await import('leaflet')).default;

      // 기존 사용자 마커 제거
      if (userMarkerRef.current) {
        userMarkerRef.current.remove();
      }

      // 사용자 위치 마커 추가
      const userIcon = L.divIcon({
        className: 'user-location-marker',
        html: `
          <div style="
            width: 20px;
            height: 20px;
            background-color: #3b82f6;
            border: 3px solid white;
            border-radius: 50%;
            box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
      }).addTo(mapInstanceRef.current);

      userMarkerRef.current.bindTooltip('현재 위치', {
        permanent: false,
        direction: 'top',
      });
    };

    loadLeaflet();
  }, [userLocation]);

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

        {/* 현재 위치 버튼 */}
        <button
          onClick={handleLocationClick}
          className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-[1000]"
          title="내 위치로 이동"
        >
          <svg
            className="w-6 h-6 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </div>
      {selectedPlace && (
        <PlaceDetailModal place={selectedPlace} onClose={() => setSelectedPlace(null)} />
      )}
    </>
  );
}
