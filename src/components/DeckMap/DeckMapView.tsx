import React, { useEffect } from 'react';
import StaticMap, { ViewState } from 'react-map-gl';
import DeckGL from '@deck.gl/react/typed';
import { HeatmapLayer } from '@deck.gl/aggregation-layers/typed';
import { DATA_URL, mapConfig } from './sampleData';
import { PolygonLayer } from '../../utils/types';

const INITIAL_VIEW_STATE: ViewState = {
  longitude: -80.75,
  latitude: 45.73,
  zoom: 4,
  pitch: 0,
  bearing: 0,
  padding: { top: 20, bottom: 20, right: 20, left: 20 }
};

export interface DeckMapViewProps {
  data: PolygonLayer | string,
  intensity? : number,
  threshold? : number,
  radiusPixels? :number,
  mapStyle? : string,
  mapAccessToken?: string
}

export default function DeckMapView({
  data= DATA_URL,
  intensity = 0.1,
  threshold = 0.01,
  radiusPixels = 60,
  mapStyle = mapConfig.style
}: DeckMapViewProps) {
  useEffect(()=>{
    getLayers()
  }, [data])

  const getLayers = () => {
    return ([
      new HeatmapLayer({
        data,
        id: 'heatmp-layer',
        pickable: false,
        getPosition: d => [d[0], d[1]],
        getWeight: 1,
        radiusPixels,
        intensity,
        threshold,
        colorRange: [[140, 81, 10], [140, 81, 10], [140, 81, 10], [140, 81, 10], [140, 81, 10], [140, 81, 10]]
      })
   ])
  };

  return (
    <DeckGL initialViewState={INITIAL_VIEW_STATE} controller={true} layers={getLayers()}>
      <StaticMap
        reuseMaps
        mapboxAccessToken={mapConfig.accessToken}
        mapStyle={mapStyle}
        styleDiffing={true}
      />
    </DeckGL>
  );
}
