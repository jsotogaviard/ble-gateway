import noble from '@abandonware/noble'
import { toMetricData } from './sensors/to-metric-data'
import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";

// create cloud watch client
const client = new CloudWatchClient({
    region:'us-east-1',
    credentials: {
        accessKeyId : 'AKIAZYVMHR6B7U4QGQEA',
        secretAccessKey : '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'
    }
});

const onStateChanged = (state) => {
    if (state === 'poweredOn') {
        noble.startScanning([], true)
    } else {
        noble.stopScanning()
    }
}

const onDiscovered = async (peripheral) => {
    const metricData = toMetricData(peripheral)
    if (metricData){
        const command = new PutMetricDataCommand(metricData);
        await client.send(command);
    }  
}

// Start scanning
noble.on('stateChange', onStateChanged);

// discover ble devices
noble.on('discover', onDiscovered);


