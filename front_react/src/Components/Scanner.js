import React, {Component} from 'react';
import ScanditBarcodeScanner from "scandit-sdk-react"
import {
    Barcode,
    BarcodePicker,
    CameraAccess,
    CameraSettings,
    ScanSettings,
    ImageSettings,
} from "scandit-sdk";
import config from "./configScan";



export default class Scanner extends Component {
    constructor(props) {
        super(props);
        this.licenseKey = config.scandit.licenceKey;
        // ImageSettings({height: 100, width : 100});

        this.state = {
            cameraSettings: {height: 100, width : 100},
        };
    }

    getScanSettings = () => {
        return new ScanSettings({
            enabledSymbologies: [
                Barcode.Symbology.CODE128,
                Barcode.Symbology.EAN13,
                Barcode.Symbology.EAN8,
                Barcode.Symbology.UPCE,
                Barcode.Symbology.UPCA],
            // searchArea: {x: 0, y: 0, height: 0.5, width: 0.5}
        });
    };

    // getImageSettings = () => {
    //     return ImageSettings({
    //         height: 100,
    //         width : 100,
    //     })
    // };

    render() {
        return (
            <ScanditBarcodeScanner
                // Library licensing & configuration options (see https://docs.scandit.com/stable/web/globals.html#configure)
                licenseKey={this.licenseKey}
                engineLocation="https://unpkg.com/scandit-sdk@^3.1.0/build" // could also be a local folder, e.g. "build"

                // Picker events
                onReady={() => this.setState({ scannerReady: true })}
                onScan={console.log}
                onScanError={console.log}

                // Picker options
                scanSettings={this.getScanSettings()}
                cameraSettings={this.state.cameraSettings}
            />
        )
    }


}