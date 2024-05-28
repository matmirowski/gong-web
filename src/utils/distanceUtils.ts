export const convertKmToMeters = (distanceInKm: string): number => {
  return parseFloat(distanceInKm) * 1000;
};

export const convertMetersToKm = (distanceInMeters: number): string => {
  return (distanceInMeters / 1000).toFixed(2);
};
