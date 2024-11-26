import { useState, useEffect } from 'react';

export const StaticMapComponent = ({ staticMapBlob }: { staticMapBlob: Blob }) => {
  const [mapSrc, setMapSrc] = useState<string | null>(null);
  console.log("recebe",staticMapBlob);

  
  
  useEffect(() => {
    if (staticMapBlob) {
      const blob = new Blob([staticMapBlob], { type: 'image/png' });
      const mapUrl = URL.createObjectURL(blob); 
      console.log("tratado",mapUrl);
      
      setMapSrc(mapUrl);

      return () => URL.revokeObjectURL(mapUrl);
    }
  }, [staticMapBlob]);

  return (
    <div>
      {mapSrc ? (
        <img src={mapSrc} alt="Mapa Estático" />
      ) : (
        <p>Carregando mapa...</p>
      )}
    </div>
  );
};

export default StaticMapComponent;
