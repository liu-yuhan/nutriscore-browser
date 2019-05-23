import React, { Component } from "react";
import { render } from "react-dom";
import { ScanSettings, Barcode } from "scandit-sdk";
import ScanditBarcodeScanner from "scandit-sdk-react";

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


class Demo extends Component {

    getScanSettings = () => {
        return new ScanSettings({ enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"] });
    };

    
  render() {
    return (

        <div className='container' style={style}>
          <ScanditBarcodeScanner
          licenseKey={'AUe9kguUFqKzJJPPuiKHfAM5I9owDiDLkVWuBYwCse0xSfgP3wNhmGtd8f5hSrqQ+2kwwLlkCZ5WAJ15DwVBDO1xIfVscnvvMC/57gpS4EmWI2YoRBQkmBhrfaLkiik0OoTo83IzQ9TA/I2GjiLhr5ORuohwtXZ8uASQPjwXcutHeir3M4O2FgPdkxIlCZPmMTlDAehfOgX9HXfa826hFxUs6yPYQNbim3K5MCJhbA1t/KRQgqG81Nby9MCPPLb6EJtdhr/oPoEIk11FXzT4l3p0EJmTN+YKLOluBERjMDO5sOCx8DCSW0KOq5EEW2116Vly8w1POgscX/IIRzHEjihzbP/qdfz4XpFfqGHguowebn3HOGr4EZtiSYz+7F9LkrPn74GO19z9AE28JsuOmME3QGIQaQ70V20lXyGhqHxIYmomSYbutv+dklaX7YnZWJ3CmkNiuICNtTiYVoQtj69l+DYBe5eUDBlR02f4Qy5xxmTGlLE0JC4TNf5yRnBpd3lacRwnSiNl/jMT5925t7mt5JWMRrLVxHA8zlB03WkApKy9UO82sXh9Bf919SIVF8ThGCP39SmjbMroVc57xXTwjfhdW12fi9tYCqPLMxR3S7fdo1L4W7PP2MayzdrO7VQCRVjh1bUqb9mCfDdpS0X8jqpLhrsR4Sfr/2pycrzXmqVdZIqQCEey1/xooSxZ2GS6sQv+fQ4oxs7nA5ai0Qu6GDHRVUx2tDW/9s+pvj3K+Q65F9wpp7F1F7SbqyUH0dOrqi6Mi3bY3X5r9k8PBReJ193MyyxC9g=='}
          engineLocation="https://unpkg.com/scandit-sdk@^3.1.0/build"
        
          onReady={() => this.setState({ scannerReady: true })}
          onScan={console.log}
          onScanError={console.log}
        
          scanSettings={this.getScanSettings()}
          playSoundOnScan={true}
          vibrateOnScan={true}
        />
      </div>
    );
  }
}

export default Demo;