import React, { Component } from "react";
import { ScanSettings} from "scandit-sdk";
import ScanditBarcodeScanner from "scandit-sdk-react";
import Header from "./header";
import Axios from "axios";
import config from './configScan';

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


class Scan extends Component {

    constructor(props){
      super(props);
      this.scanReussi=this.scanReussi.bind(this);
    }

    getScanSettings = () => {
        return new ScanSettings({ enabledSymbologies: ["qr", "ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf"] });
    };

    scanReussi(result){
      const token = localStorage.getItem('jwToken')
      Axios.post('http://localhost:5000/api/product/'+result.barcodes[0].data, null, {headers: {"x-auth-token": token}})
      
      this.props.history.push('/result/'+result.barcodes[0].data)
     
    }
    
  render() {
    return (

        <div className='container' style={style}>
            <Header />
          <ScanditBarcodeScanner
          licenseKey={config.scandit.licenceKey}
          engineLocation="https://unpkg.com/scandit-sdk@^3.1.0/build"
          accessCamera={true}
          enablePinchToZoom={true}
          enableTapToFocus={true}
          onReady={() => this.setState({ scannerReady: true })}
          onScan={this.scanReussi}
          singleImageMode = {{ desktop: { always: false, allowFallback: true }, mobile: { always: false, allowFallback: true } }}
          onScanError={console.log}
          setTorchEnabled={true}
          scanSettings={this.getScanSettings()}
          playSoundOnScan={true}
          vibrateOnScan={true}
        />
      </div>
    );
  }
}

export default Scan;