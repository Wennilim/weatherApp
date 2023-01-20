import React, {useState, useCallback} from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import axios from 'axios';
import dayjs from 'dayjs';
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: 'column',
  },
  textInput: {
    borderBottomWidth: 2,
    padding: 15,
    paddingVertical: 20,
    marginVertical: 40,
    marginHorizontal: 8,
    backgroundColor: '#ffffff',
    fontSize: 19,
    borderRadius: 18,
    borderBottomColor: '#1D213A',
  },
  infoView: {
    alignItems: 'center',
  },
  cityCountryText: {
    color: '#ffffff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#ffffff',
    fontSize: 38,
    marginVertical: 10,
    fontWeight: '500',
    fontFamily: 'PTSanNarrow-Regular',
  },
  dateText2: {
    color: '#ffffff',
    fontSize: 15,
    marginVertical: 10,
    fontWeight: '500',
    fontFamily: 'roboto',
  },
  tempText: {
    fontSize: 45,
    color: '#ffffff',
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: '#ffffff',
    marginVertical: 10,
    fontWeight: '500',
  },
  dateTimeText: {
    fontFamily: 'roboto',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

const App = () => {
  const [input, setInput] = useState('');
  const [loading, setLaoding] = useState(false);
  const [data, setData] = useState([]);
  // var date = new Date().toLocaleString('en-MY');
  const week_date = dayjs().format('ddd, MMM DD');
  const time = dayjs().format('HH:mm');
  // const date = dayjs().format('YYYY-MM-DD HH:MM');
  const api = {
    key: 'a8a1d6125c0f8267107d1b915e6eb6eb',
    baseURL: 'https://api.openweathermap.org/data/2.5/',
  };
  const fetchDataHandler = useCallback(() => {
    setLaoding(true);

    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${api.key}`,
    })
      .then(res => {
        console.log(res.data);
        setData(res.data);
      })
      .catch(e => console.dir(e))
      .finally(() => setLaoding(false));
    setInput('');
  }, [api.key, input]);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('./assets/bg.jpeg')}
        resizeMode="cover"
        style={styles.image}>
        <View>
          <View style={styles.dateTimeText}>
            <Text style={styles.dateText}>{time}</Text>
            <Text style={styles.dateText2}>{week_date}</Text>
          </View>

          <TextInput
            placeholder="Enter a city name..."
            onChangeText={text => setInput(text)} //set user input into setInput()
            value={input}
            placeholderTextColor={'#1D213A'}
            style={styles.textInput}
            onSubmitEditing={fetchDataHandler} //fire a function when press 'return'
          />
        </View>
        {loading && (
          <View>
            <ActivityIndicator size={'large'} color="#000" />
          </View>
        )}
        {data && (
          <View style={styles.infoView}>
            <Text
              style={
                styles.cityCountryText
              }>{`${data?.name}, ${data.sys?.country}`}</Text>
            <Text style={styles.tempText}>
              {`${K_to_Celsius(data?.main?.temp).toFixed(0)}`}°C
            </Text>
            <Text style={styles.minMaxText}>
              {`Min ${K_to_Celsius(data?.main?.temp_min).toFixed(
                0,
              )}°C / Max ${K_to_Celsius(data?.main?.temp_max).toFixed(0)}°C`}
            </Text>
          </View>
        )}
      </ImageBackground>
    </View>
  );
};

export default App;

function K_to_Celsius(kTemp) {
  const celsius = kTemp - 273.15;
  return celsius;
}
