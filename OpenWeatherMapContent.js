/**
 * OpenWeatherMapContent
 */
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
  Image,
} = React;

var WEATHER_IMAGE_URL = 'http://openweathermap.org/img/w/';
var IMAGE_EXTENSION = '.png';


var OpenWeatherMapContent = React.createClass({

  propTypes: {
    weather: React.PropTypes.shape({
      main: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired,
      icon: React.PropTypes.string.isRequired,
    }),
    wind: React.PropTypes.shape({
      speed: React.PropTypes.number.isRequired,
      deg: React.PropTypes.number.isRequired,
    }),
    sys: React.PropTypes.shape({
      country: React.PropTypes.string.isRequired,
      area: React.PropTypes.string.isRequired,
    }),
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.details}>
          風邪の速さ: {this.props.wind.speed}
        </Text>
        <Text style={styles.details}>
          風邪の° : {this.props.wind.deg}
        </Text>
        <Text style={styles.details}>
          天気: {this.props.weather.main}
        </Text>
        <Text style={styles.details}>
          天気説明: {this.props.weather.description}
        </Text>
        <Image
          style={styles.icon}
          source={{uri: this.createIconImageUrl(this.props.weather.icon)}}
        />
        <Text style={styles.details}>
          国: {this.props.sys.country}
        </Text>
        <Text style={styles.details}>
          地域 : {this.props.sys.area}
        </Text>
      </View>
    );
  },

  createIconImageUrl: function(name: string): string {
    console.log('iconName : ' + name);
    var iconImageUrl = WEATHER_IMAGE_URL + name + IMAGE_EXTENSION;
    console.log('iconName complete URL : ' + iconImageUrl);

    // Sample : http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&appid=2de143494c0b295cca9337e1e96b00e0
    return iconImageUrl;
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    alignItems: 'center',
  },
  details: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
});

module.exports = OpenWeatherMapContent;
