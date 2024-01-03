import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const Map = ({coordinates}) => {
    return (
       
        <MapView

        style={styles.map}
      
        provider={PROVIDER_GOOGLE}
      
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0,
          longitudeDelta: 0.05,
        }}
      >
      
      <Marker
      
      
        coordinate={{
      
          latitude: coordinates.latitude? latitude : 0,
          longitude: coordinates.longitude ? longitude : 0
                
        }}
      
      />
          </MapView> 
    );
}

const styles = StyleSheet.create({

    map:{
        width:'100%',
        height:"50%"
      }
})

export default Map;
