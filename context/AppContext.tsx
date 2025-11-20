'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Place, Review, Measurement } from '@/types';
import { places as seoulPlaces, placesEN as londonPlaces } from '@/data/places';

interface AppContextType {
  places: Place[];
  latestMeasurement: Measurement | null;
  language: 'ko' | 'en';
  saveMeasurement: (measurement: Measurement) => void;
  addReview: (placeId: number, review: Review) => void;
  setLanguage: (lang: 'ko' | 'en') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<'ko' | 'en'>('ko');
  const [places, setPlaces] = useState<Place[]>(seoulPlaces);
  const [latestMeasurement, setLatestMeasurement] = useState<Measurement | null>(null);

  useEffect(() => {
    // 언어에 따라 장소 데이터 변경
    setPlaces(language === 'ko' ? seoulPlaces : londonPlaces);
  }, [language]);

  const saveMeasurement = (measurement: Measurement) => {
    setLatestMeasurement(measurement);
  };

  const addReview = (placeId: number, review: Review) => {
    setPlaces((prev) =>
      prev.map((place) => {
        if (place.id === placeId) {
          const newReviews = [...place.reviews, review];
          const avgSoundLevel =
            newReviews.reduce((sum, r) => sum + r.soundLevel, 0) / newReviews.length;
          return {
            ...place,
            reviews: newReviews,
            soundLevel: Math.round(avgSoundLevel),
          };
        }
        return place;
      })
    );
  };

  const setLanguage = (lang: 'ko' | 'en') => {
    setLanguageState(lang);
  };

  return (
    <AppContext.Provider value={{ places, latestMeasurement, language, saveMeasurement, addReview, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
