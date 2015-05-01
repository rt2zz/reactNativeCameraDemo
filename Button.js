var React = require('react-native')
var {
  View,
  Text,
  TouchableHighlight
} = React

module.exports = React.createClass({
  render: function(){
    return(
      <TouchableHighlight
        style={{width:100, height:50, backgroundColor:'black', opacity: .7}}
        underlayColor="#B5B5B5"
        onPress={this.props.onPress}>
        <Text style={{color:'white'}}>{this.props.text}</Text>
      </TouchableHighlight>
    )
  }
})
