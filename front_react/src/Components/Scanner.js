import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

// Configure the library and activate it with a license key
configure('AUe9kguUFqKzJJPPuiKHfAM5I9owDiDLkVWuBYwCse0xSfgP3wNhmGtd8f5hSrqQ+2kwwLlkCZ5WAJ15DwVBDO1xIfVscnvvMC/57gpS4EmWI2YoRBQkmBhrfaLkiik0OoTo83IzQ9TA/I2GjiLhr5ORuohwtXZ8uASQPjwXcutHeir3M4O2FgPdkxIlCZPmMTlDAehfOgX9HXfa826hFxUs6yPYQNbim3K5MCJhbA1t/KRQgqG81Nby9MCPPLb6EJtdhr/oPoEIk11FXzT4l3p0EJmTN+YKLOluBERjMDO5sOCx8DCSW0KOq5EEW2116Vly8w1POgscX/IIRzHEjihzbP/qdfz4XpFfqGHguowebn3HOGr4EZtiSYz+7F9LkrPn74GO19z9AE28JsuOmME3QGIQaQ70V20lXyGhqHxIYmomSYbutv+dklaX7YnZWJ3CmkNiuICNtTiYVoQtj69l+DYBe5eUDBlR02f4Qy5xxmTGlLE0JC4TNf5yRnBpd3lacRwnSiNl/jMT5925t7mt5JWMRrLVxHA8zlB03WkApKy9UO82sXh9Bf919SIVF8ThGCP39SmjbMroVc57xXTwjfhdW12fi9tYCqPLMxR3S7fdo1L4W7PP2MayzdrO7VQCRVjh1bUqb9mCfDdpS0X8jqpLhrsR4Sfr/2pycrzXmqVdZIqQCEey1/xooSxZ2GS6sQv+fQ4oxs7nA5ai0Qu6GDHRVUx2tDW/9s+pvj3K+Q65F9wpp7F1F7SbqyUH0dOrqi6Mi3bY3X5r9k8PBReJ193MyyxC9g==').catch(error => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(barcodePicker => {
      this.barcodePicker = barcodePicker;
      if (this.props.onScan != null) {
        barcodePicker.onScan(this.props.onScan);
      }
      if (this.props.onError != null) {
        barcodePicker.onScanError(this.props.onError);
      }
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    // These are just some examples of how to react to some possible property changes

    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default BarcodePicker;