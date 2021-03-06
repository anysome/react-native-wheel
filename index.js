import React, {PropTypes} from 'react';
import ReactNative, {NativeModules, requireNativeComponent, View} from 'react-native';


var UIManager = NativeModules.UIManager;

var NativeWheelView = requireNativeComponent('RCTWheelView',WheelView);

var WHEELVIEW_REF = 'wheel';

var WheelView = React.createClass({
    propTypes: {
        ...View.propTypes,
        onItemChange: PropTypes.func,
        values: PropTypes.array,
        isLoop: PropTypes.bool,
        selectedIndex: PropTypes.number,
        textSize: PropTypes.number,
    },
    handleOnChange(event){
        if(this.props.onItemChange){
          this.props.onItemChange(event.nativeEvent.index)
        }
    },
    previous(){
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this.refs.wheel),
            UIManager.RCTWheelView.Commands.previous,
            null,
        );
    },
    next(){
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this.refs.wheel),
            UIManager.RCTWheelView.Commands.next,
            null,
        );
    },
    snapTo(index){
        UIManager.dispatchViewManagerCommand(
            ReactNative.findNodeHandle(this.refs.wheel),
            UIManager.RCTWheelView.Commands.snapTo,
            [index],
        );
    },
    componentWillReceiveProps(nextProps){
      //if (nextProps.selectedIndex !== this.props.selectedIndex) {
        this.snapTo(nextProps.selectedIndex);
      //}
    },
    render(){
        return <NativeWheelView {...this.props} onChange={this.handleOnChange} ref={WHEELVIEW_REF}/>;
    }
});

module.exports = WheelView;
