import React, { Component } from "react";
import { ScanSettings} from "scandit-sdk";
import ScanditBarcodeScanner from "scandit-sdk-react";
import Navbar from "./navbar";
import Footer from "./tabBar";
import Axios from "axios";
import config from './configScan';
import "./res_style.css";

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

        <div className='scan_container' style={style}>
        <Navbar/>
          <ScanditBarcodeScanner
          licenseKey={config.scandit.licenceKey}
          engineLocation="https://unpkg.com/scandit-sdk@^3.1.0/build"
        
          onReady={() => this.setState({ scannerReady: true })}
          onScan={this.scanReussi}
          onScanError={console.log}
        
          scanSettings={this.getScanSettings()}
          playSoundOnScan={true}
          vibrateOnScan={true}
        />
        <Footer/>
      </div>
    );
  }
}

export default Scan;