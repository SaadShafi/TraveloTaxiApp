import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import images from '../assets/Images';
import { height, width } from '../utilities';
import { colors } from '../utilities/colors';

const GOOGLE_PLACES_API_KEY = 'AIzaSyBawSRqVMUy7fdgz5F8MAt_rxt-baAvi-U';

interface Suggestion {
  placeId: string;
  text: string;
}

interface PlaceDetails {
  lat: number;
  lng: number;
  formattedAddress: string;
}

export default function PlacesAutocompleteNew({
  onSelect,
  style,
  inputStyle,
  listStyle,
  containerStyle,
  placeholder,
}: {
  onSelect: (details: PlaceDetails) => void;
  style?: any;
  inputStyle?: any;
  listStyle?: any;
  containerStyle?: any;
  placeholder?: any;
}) {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Fetch autocomplete suggestions
  const fetchSuggestions = async (text: string) => {
    if (!text) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const url = 'https://places.googleapis.com/v1/places:autocomplete';
      const body = { input: text };

      const resp = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
        },
        body: JSON.stringify(body),
      });

      const json = await resp.json();

      if (json.error) {
        setError(json.error.message || 'Error fetching suggestions');
        setSuggestions([]);
      } else {
        const suggestionsOut: Suggestion[] = (json.suggestions || []).map(
          (s: any) => ({
            placeId: s.placePrediction?.placeId || '',
            text: s.placePrediction?.text?.text || '',
          }),
        );
        setSuggestions(suggestionsOut);
      }
    } catch (err: any) {
      console.error('Autocomplete fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlaceDetails = async (
    placeId: string,
  ): Promise<PlaceDetails | null> => {
    try {
      const url = `https://places.googleapis.com/v1/places/${placeId}?key=${GOOGLE_PLACES_API_KEY}`;
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          'X-Goog-FieldMask': 'id,displayName,formattedAddress,location',
        },
      });
      const json = await resp.json();

      if (json.error) {
        console.error('Place details error:', json.error);
        return null;
      }

      return {
        lat: json.location?.latitude,
        lng: json.location?.longitude,
        formattedAddress: json.formattedAddress || json.displayName?.text || '',
      };
    } catch (err) {
      console.error('Details fetch error:', err);
      return null;
    }
  };

  const onSelectSuggestion = async (suggestion: Suggestion) => {
    if (!suggestion.placeId) return;

    // 1️⃣ Keep selected place name visible in input
    setInput(suggestion.text);
    setSuggestions([]); // hide list after selection

    // 2️⃣ Fetch details for map or other uses
    const details = await fetchPlaceDetails(suggestion.placeId);
    if (details) {
      onSelect(details); // send to parent (e.g., to move map)
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (input.trim().length > 0 && suggestions.length === 0) {
        fetchSuggestions(input);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [input]);

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.searchContainer, containerStyle]}>
        <Image source={images.Location} style={styles.location} />
        <TextInput
          style={[styles.textInput, inputStyle]}
          placeholder={placeholder || 'Search Here ....'}
          placeholderTextColor={colors.black}
          value={input}
          onChangeText={setInput}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <FlatList
        style={[styles.list, listStyle]}
        data={suggestions}
        keyExtractor={item => item.placeId + item.text}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectSuggestion(item)}
            style={styles.item}
          >
            <Text style={{ color: colors.black }}>{item.text}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 30,
    paddingHorizontal: width * 0.055,
    height: height * 0.07,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  container: {
    width: '100%',
  },
  textInput: {
    height: height * 0.08,
    paddingHorizontal: 8,
    borderColor: colors.darkGray,
    color: colors.black,
  },
  list: {
    backgroundColor: colors.white,
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.gray,
  },
  errorText: {
    color: '#ff0000ff',
    paddingHorizontal: 8,
  },
  location: {
    width: width * 0.03,
    height: height * 0.03,
    resizeMode: 'contain',
  },
});
