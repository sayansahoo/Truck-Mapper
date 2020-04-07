

## Available Scripts

In the project directory, you can run:

1) cd Truck-Mapper
2) npm i
3) npm start

### `Important Note`

You would need to use your own google map API key in order to view the map properly. If you have a key, follow the below steps: 

1) cd Truck-Mapper/src/components/Map.js
2) Find the GoogleMapReact component and paste your key. Example given below: 

`    <GoogleMapReact
      bootstrapURLKeys={{ key: " Enter your key here " }}
      defaultCenter={{ lat: 30.759212493896484, lng: 76.13296508789062 }}
      defaultZoom={6}
    >
`
