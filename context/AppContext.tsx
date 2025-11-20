'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Place, Review, Measurement } from '@/types';
import { places as initialPlaces } from '@/data/places';

interface AppContextType {
  places: Place[];
  latestMeasurement: Measurement | null;
  saveMeasurement: (measurement: Measurement) => void;
  addReview: (placeId: number, review: Review) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [latestMeasurement, setLatestMeasurement] = useState<Measurement | null>(null);

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

  return (
    <AppContext.Provider value={{ places, latestMeasurement, saveMeasurement, addReview }}>
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
