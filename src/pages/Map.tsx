import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { polygonRequest } from '../redux/features/polygonsSlice';
import { map as _map } from 'lodash';
import DeckMapView from '../components/DeckMap/DeckMapView';
import { DATA_URL, mapConfig } from '../components/DeckMap/sampleData';
import { Polygon, PolygonLayer } from '../utils/types';
import { polygonLayerRequest } from '../redux/features/polygonLayerSlice';


export default function Map() {
  const [mapData, setMapData] = useState<PolygonLayer | []>([]);
  const [options, setOptions] = useState<Polygon[] | []>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const dispatch = useAppDispatch()
  const { data } = useAppSelector(state => state.polygons)

  useEffect(() => {
    dispatch(polygonRequest())
      .unwrap()
      .then(() => {
        setOptions(data)
      })
  }, [data])

  const handlePolygenChange = (id: number) => {
    dispatch(polygonLayerRequest(DATA_URL as string)).unwrap()
      .then((res) => {
        console.log({ res })
        res && refactorPolygonData(res, id)
      })
  }

  const refactorPolygonData = (arr: PolygonLayer, selectedIndex: number) => {
    setMapData(
      arr.map((element: number[]) => {
        return [element[0] - selectedIndex, element[1] + selectedIndex, element[2]]
      })
    )
  }
  return (
    <>
      <div className="autocomplete">
        <Autocomplete
          getOptionLabel={option => {
            return option.title;
          }}
          onChange={(event, newValue: Polygon | null) => {
            console.log({ newValue })
            newValue && handlePolygenChange(newValue.id);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select Polygon" />}
        />
      </div>

      <div className="map-view">
        <DeckMapView 
          data={mapData} 
          mapStyle={mapConfig.style}
          intensity = {1}
          threshold = {0.01}
          radiusPixels = {30}
          mapAccessToken={mapConfig.accessToken}
        />
      </div>
    </>
  );
}
