import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { Text } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { fontFamily } from '../../assets/Fonts';
import images from '../../assets/Images';
import BookingCard from '../../components/BookingCard';
import TopHeader from '../../components/Topheader';
import { height, width } from '../../utilities';
import { colors } from '../../utilities/colors';
import { fontSizes } from '../../utilities/fontsizes';

const HomeDriver = () => {
  const navigation = useNavigation<any>();
  const [isOnline, setIsOnline] = useState(false);
  const animatedValue = useState(new Animated.Value(0))[0];
  const mapRef = useRef<MapView>(null);

  const toggleOnline = () => {
    const toValue = isOnline ? 0 : 1;
    Animated.timing(animatedValue, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsOnline(!isOnline);
  };

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#fff', '#B00020'],
  });

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000', '#fff'],
  });

  const iconTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [width * 0.31, 10],
  });

  const textTranslateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, width * 0.15],
  });

  return (
    <View style={styles.containerSec}>
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 40.7003,
          longitude: -73.9967,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        scrollEnabled
        zoomEnabled
        rotateEnabled
        pitchEnabled
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: 40.7003, longitude: -73.9967 }}
          title="Brooklyn Bridge Park"
          description="New York"
        />
      </MapView>
      <View style={styles.overlay}>
        <View style={styles.headerContainer}>
          <TopHeader isMenu={true} />

          <View style={styles.notificationContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('notification')}
              style={styles.notificationButton}
            >
              <Image source={images.notification} />
            </TouchableOpacity>
          </View>

          <View style={styles.rideContainer}>
            <View>
              <Text style={styles.alex}>Hi Alex!</Text>
              <Text style={styles.ride}>Need A Ride?</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={1}
          onPress={toggleOnline}
          style={styles.toggleContainer}
        >
          <Animated.View style={[styles.toggleButton, { backgroundColor }]}>
            <Animated.View
              style={[
                styles.carBackground,
                {
                  transform: [
                    { translateX: iconTranslateX },
                    { translateY: -height * 0.025 },
                  ],
                },
              ]}
            >
              <Image
                source={images.CarIcon}
                style={[
                  styles.toggleIcon,
                  { tintColor: isOnline ? '#B00020' : '#B00020' },
                ]}
                resizeMode="contain"
              />
            </Animated.View>
            <Animated.Text
              style={[
                styles.toggleText,
                {
                  color: textColor,
                  transform: [{ translateX: textTranslateX }],
                },
              ]}
            >
              {isOnline ? 'Turn Online' : 'Turn Offline'}
            </Animated.Text>
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.bookingScrollContainer}>
          <ScrollView
            contentContainerStyle={styles.bookingContainer}
            showsVerticalScrollIndicator={false}
          >
            <BookingCard
              type="Book Now"
              passengerName="Adam James"
              passengerImage="https://randomuser.me/api/portraits/men/1.jpg"
              distance="10 miles"
              fare="$60.00"
              onCancel={() => console.log('Cancel Book Now')}
              onAccept={() => navigation.navigate('RideArriving')}
              onBid={() => navigation.navigate('RideDetails')}
            />
            <BookingCard
              type="Book Now"
              passengerName="Adam James"
              passengerImage="https://randomuser.me/api/portraits/men/1.jpg"
              distance="10 miles"
              fare="$60.00"
              onCancel={() => console.log('Cancel Book Now')}
              onAccept={() => navigation.navigate('RideArriving')}
              onBid={() => navigation.navigate('RideDetails')}
            />
            <BookingCard
              type="Book Now"
              passengerName="Adam James"
              passengerImage="https://randomuser.me/api/portraits/men/1.jpg"
              distance="10 miles"
              fare="$60.00"
              onCancel={() => console.log('Cancel Pre-Booking')}
              onAccept={() => navigation.navigate('RideArriving')}
              onBid={() => navigation.navigate('RideDetails')}
            />
            <BookingCard
              type="Book Now"
              passengerName="Adam James"
              passengerImage="https://randomuser.me/api/portraits/men/1.jpg"
              distance="10 miles"
              fare="$60.00"
              onCancel={() => console.log('Cancel Pre-Booking')}
              onAccept={() => navigation.navigate('RideArriving')}
              onBid={() => navigation.navigate('RideDetails')}
            />
            <BookingCard
              type="Book Now"
              passengerName="Adam James"
              passengerImage="https://randomuser.me/api/portraits/men/1.jpg"
              distance="10 miles"
              fare="$60.00"
              onCancel={() => console.log('Cancel Book Now')}
              onAccept={() => navigation.navigate('RideArriving')}
              onBid={() => navigation.navigate('RideDetails')}
            />
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerSec: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  headerContainer: {
    position: 'absolute',
    top: height * 0.01,
    width: '100%',
    zIndex: 1000,
  },
  toggleContainer: {
    position: 'absolute',
    top: height * 0.12,
    width: '100%',
    zIndex: 1000,
  },
  bookingScrollContainer: {
    position: 'absolute',
    top: height * 0.199, // Start below the toggle button
    bottom: 0, // Take remaining space
    width: '100%',
    paddingHorizontal: 15,
    zIndex: 1000,
  },
  bookingContainer: {
    // position: 'absolute',
    // top: height * 0.19,
    // width: '100%',
    // paddingHorizontal: 15,
    paddingBottom: 20, // Add some bottom padding
  },
  notificationContainer: {
    position: 'absolute',
    top: height * 0.027,
    right: width * 0.09,
    zIndex: 1000,
  },
  notificationButton: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },

  container: {
    padding: 15,
    top: -height * 0.01,
  },
  toggleButton: {
    height: height * 0.07,
    marginHorizontal: width * 0.28,
    borderRadius: 40,
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.splitGray,
  },
  toggleText: {
    fontSize: fontSizes.sm2,
    fontFamily: fontFamily.SfProDisplayMedium,
    position: 'absolute',
    zIndex: 3,
  },
  carBackground: {
    backgroundColor: colors.splitGray,
    height: height * 0.05,
    width: height * 0.05,
    borderRadius: 100,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    zIndex: 2,
  },
  toggleIcon: {
    width: 20,
    height: 20,
  },
  alex: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontWeight: '700',
    color: colors.black,
    fontSize: 17,
  },
  ride: {
    fontFamily: fontFamily.SfProDisplayBold,
    fontWeight: '600',
    color: colors.black,
  },
  rideContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: colors.white,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1,
    borderColor: colors.darkGray,
    height: height * 0.08,
    width: width * 0.73,
    borderRadius: 20,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: width * 0.22,
    marginTop: -height * 0.065,
    zIndex: 1,
  },
});

export default HomeDriver;
