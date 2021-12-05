import noble from '@abandonware/noble'
import { toMetricData } from './sensors/to-metric-data'
import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch"
import credentials from './credentials'

// create cloud watch client
const client = new CloudWatchClient({
    region:'us-east-1',
    credentials: credentials
})

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
        const command = new PutMetricDataCommand(metricData)
        await client.send(command)
    }  
}

// start scanning
noble.on('stateChange', onStateChanged)

// discover ble devices
noble.on('discover', onDiscovered)


