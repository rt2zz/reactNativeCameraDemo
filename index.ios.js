var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var Camera = require('react-native-camera')
var Button = require('./Button')

var deviceScreen = require('Dimensions').get('window')
var fullWidth = deviceScreen.width
var fullHeight = deviceScreen.height

var reactNativeCameraDemo = React.createClass({

  getInitialState() {
    return {
      stage: 'capture'
    }
  },

  captureBase64(){
    this.refs.cam.takePicture((err, base64) => {
      this.setState({
        stage: 'preview',
        image: {
          type: 'base64',
          uri: base64,
        },
      })
    })
  },

  captureToDisk(){
    this.refs.cam.capturePictureToDisk((err, path) => {
      this.setState({
        stage: 'preview',
        image: {
          type: 'file',
          uri: path,
        },
      })
    })
  },

  setStage(stage){
    this.setState({
      stage: stage
    })
  },

  render: function() {
    var main
    if(this.state.stage === 'capture'){
      main = <Camera
        ref="cam"
        aspect="Fit"
        type="Front"
        orientation="Portrait"
        style={{height: fullHeight-200, width: fullWidth}}
        />
    }
    else if(this.state.stage === 'preview'){
      // isStatic = this.state.image.type === 'file' ? false : true
      var uri = this.state.image.type === 'file' ? this.state.image.uri : 'data:image/jpeg;base64,'+this.state.image.uri
      console.log('preview', uri)
      main = <Image
        ref="preview"
        style={{
          width:fullWidth/2,
          height:fullHeight/2,
        }}
        source={{
          isStatic: true,
          uri: uri
        }}
        />
    }

    return (
      <View style={styles.container}>
        {main}
        <View>
          {this.state.stage === 'capture' ? <Button text="Capture base64" onPress={this.captureBase64} /> : undefined }
          {this.state.stage === 'capture' ? <Button text="Capture to disk" onPress={this.captureToDisk} /> : undefined }
          {this.state.stage === 'preview' ? <Button text="Reset" onPress={this.setStage.bind(this, 'capture')} /> : undefined }
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('reactNativeCameraDemo', () => reactNativeCameraDemo);
