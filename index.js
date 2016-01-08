/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableNativeFeedback,
} = React;

var SearchBar = require('SearchBar');
var OpenWeatherMapContent = require('./OpenWeatherMapContent');

var API_URL = 'http://api.openweathermap.org/data/2.5/weather';
var API_KEY = '2de143494c0b295cca9337e1e96b00e0';

var OpenWeatherMap = React.createClass({
  getInitialState: function() {
    return {
      isLoading: false,
      canShow: false,
      weather: {
        id: -1,
        main: '',
        description: '',
        icon: '',
      },
    };
  },

  componentDidMount: function() {
    // default initParam : Tokyo
    this._searchWeather('Tokyo');
  },

  render: function() {
    console.log('this.state.weather.id : ' + this.state.weather.id);
    var addContent = this.state.weather.id === -1 ?
      <Text style={styles.welcome}>
        loading!!!
      </Text>
      :
      <OpenWeatherMapContent
        weather={this.state.weather}
        wind={this.state.wind}
        sys={this.state.sys}
        />;

    return (
      <View style={styles.container}>
        <SearchBar
          onSearchChange={this.onSearchChange}
          isLoading={this.state.isLoading}
          onFocus={() =>
            this.refs.listview && this.refs.listview.getScrollResponder().scrollTo(0, 0)}
        />
        <View style={styles.separator} />
        <Text style={styles.welcome}>
          天気検索
        </Text>
        <SearchButton onPress={() => {
            console.log('button clicked' + this.isLoading);
            this.setState((loading : string) => (
              {loading: !this.props.loading}
            ));
          }}>
        </SearchButton>
        {addContent}
      </View>
    );
  },

  _searchWeather: function(query: string) {
    fetch(this._urlForQueryAndPage(query, 1))
      .then((response) => response.json())
      .catch((error) => {
        this.setState({
          isLoading: false,
          canShow: false
        });
      })
      .then((responseData) => {
        console.log('responseData : ' + responseData);

        this.setState({
          isLoading: false,
          canShow: true
        });

        if (!responseData || !responseData.weather || responseData.weather.length == 0)
        {
            console.log("responseData.weather :" + responseData.weather);
            return;
        }

        this.setState({
          weather: {
            main: responseData.weather[0].main,
            description: responseData.weather[0].description,
            icon: responseData.weather[0].icon,
          },
          wind: {
            speed: responseData.wind.speed,
            deg: responseData.wind.deg,
          },
          sys: {
            country: responseData.sys.country,
            area: responseData.name,
          },
        });
      })
      .done();
  },

  _urlForQueryAndPage: function(query: string): string {
    console.log('query : ' + query);
    var url = API_URL + '?q=' + encodeURIComponent(query) + '&appid=' + API_KEY;
    console.log('complete URL : ' + url);

    // Sample : http://api.openweathermap.org/data/2.5/weather?q=Tokyo,jp&appid=2de143494c0b295cca9337e1e96b00e0
    return url;
  },

  onSearchChange: function(event: Object) {
    var area = event.nativeEvent.text.toLowerCase();

    console.log('search changed text ' + area);

    if (this._isEmpty(area))
    {
      this.setState({canShow: false});
      return;
    }

    this._searchWeather(area)
  },

  _isEmpty: function(str: string): bool {
    return (!str || 0 === str.length);
  }
});

var SearchButton = React.createClass({
  propTypes: {
    onPress: React.PropTypes.func,
  },

  render: function() {
    var TouchableElement = TouchableHighlight;
    // if (Platform.OS === 'android') {
    //  TouchableElement = TouchableNativeFeedback;
    // }

    return (
      <TouchableElement
        onPress={this.props.onPress}
        style={styles.button}>
          <Text style={styles.welcome}>Button!</Text>
      </TouchableElement>
    );
  },
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
/*
    justifyContent: 'center',
    alignItems: 'center',
*/
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: '#eeeeee',
  },
  button: {
    borderColor: '#696969',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d3d3d3',
  },
});

AppRegistry.registerComponent('OpenWeatherMap', () => OpenWeatherMap);
