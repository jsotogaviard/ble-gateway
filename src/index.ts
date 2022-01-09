import noble from '@abandonware/noble'
import { toMetricData } from './sensors/to-metric-data'
import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch"
import credentials from './credentials'

let timer, i = 0

// create cloud watch client
const client = new CloudWatchClient({
    region:'us-east-1',
    credentials: credentials
})

const periodicTask = () => {
    noble.stopScanning()
    noble.startScanning([], false)
    timer = setTimeout(periodicTask, 60 * 1000)
}

const onStateChanged = (state) => {
    if (state === 'poweredOn') {
        periodicTask()
    } else {
        clearTimeout(timer)
        noble.stopScanning()
    }
}

const onDiscovered = async (peripheral) => {
    const metricData = toMetricData(peripheral)
    if (metricData){
        console.log(i++)
        const command = new PutMetricDataCommand(metricData)
        await client.send(command)
    }  
}

// start scanning
noble.on('stateChange', onStateChanged)

// discover ble devices
noble.on('discover', onDiscovered)


