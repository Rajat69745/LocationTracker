// LocationTracker.js
import React from 'react';
import { View, Text, PermissionsAndroid, StyleSheet,TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


const LocationTracker = () => {
  const [isTracking, setIsTracking] = React.useState(false);
  const [locationData, setLocationData] = React.useState([]);

  React.useEffect(() => {
    const checkPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'DriveU  needs access to your location',

            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {

          startTracking();
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    };

    if (isTracking) {
      checkPermissions();
    }
  }, [isTracking]);

  React.useEffect(() => {
    if (isTracking) {
      const watchId = Geolocation.watchPosition(
        position => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp,
          };
          setLocationData(prevData => [...prevData, newLocation]);
        },
        error => console.log(error),
        { enableHighAccuracy: true, distanceFilter: 10 }
      );

      return () => Geolocation.clearWatch(watchId);
    }
  }, [isTracking]);

  const startTracking = () => {
    setIsTracking(true);
  };

  const stopTracking = async () => {
    setIsTracking(false);

    try {
      await AsyncStorage.setItem('locationData', JSON.stringify(locationData));
    } catch (e) {
      console.error('Error saving location data:', e);
    }
  };

  const clearData = async () => {

    try {
      await AsyncStorage.removeItem('locationData');
      setLocationData([]);
    } catch (e) {
      console.error('Error clearing location data:', e);
    }
  };

  return (
    <View>
      <Text style={styles.trackingStatus}>{isTracking ? 'Tracking...' : 'Not tracking'}</Text>
      <TouchableOpacity  style={styles.btn} onPress={isTracking ? stopTracking : startTracking}>
      
      <Text style={{color:'black'}}> {isTracking ? 'Stop Tracking' : 'Start Tracking'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn}  onPress={isTracking ? stopTracking : startTracking}>
      
      <Text  onPress={clearData} style={{color:'black'}}>   Clear Data</Text>
      </TouchableOpacity>


      




     

      <FlatList
      
      data={locationData}
    
      renderItem={({item})=> (

 <View style={styles.userTrackingDetails}>
 
 <Text style={{color:'black'}} >  Latitude {item.latitude}</Text>
 <Text style={{color:'black'}} >  Longitude {item.longitude}</Text>
 <Text style={{color:'black'}} > Time and Date {new Date(item.timestamp).toLocaleString()}</Text>
 </View>

      )}

    //  keyExtractor={item => Date.now()}
      />



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

    latitude: locationData.latitude? latitude : 0,
    longitude: locationData.longitude ? longitude : 0
          
  }}

/>
    </MapView> 

    </View>
  );
};


 const styles= StyleSheet.create({

  btn:{
display:'flex',
 width:"70%",
 alignSelf:'center',
     borderWidth:1,
     borderColor:'skyblue',

alignItems:'center',
padding:10,
borderRadius:10,
marginTop:"2%"
  }
,
trackingStatus:{

  fontSize:30,
  textAlign:'center',
  color:'black'
},
userTrackingDetails:{

width:"90%",
alignSelf:'center',
marginTop:"5%"
},
map:{
  width:'100%',
  height:"50%"
}

 })

export default LocationTracker;
