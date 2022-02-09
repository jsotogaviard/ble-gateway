export default class XiaomiMijiaThermometer {

    static XIAOMI_MIJIA_THERMOMETER_UUID = '181a'

    static toMetricData(peripheral) {

        const serviceData = peripheral.advertisement.serviceData
        const serviceDataHex = Buffer.from(serviceData[0].data).toString("hex")
        const mac = serviceDataHex.substring(0, 12)
        const temperature = parseInt(serviceDataHex.substring(12, 12 + 4), 16) / 10
        const humidity = parseInt(serviceDataHex.substring(12 + 4, 12 + 4 + 2), 16)
        const batteryPercentage = parseInt(serviceDataHex.substring(12 + 4 + 2, 12 + 4 + 2 + 2), 16)
        const batteryMillivolts = parseInt(serviceDataHex.substring(12 + 4 + 2 + 2, 12 + 4 + 2 + 2 + 4), 16)
        const counter = parseInt(serviceDataHex.substring(12 + 4 + 2 + 2 + 4, 12 + 4 + 2 + 2 + 4 + 2), 16)
        const rssi = peripheral.rssi
        const closestFiveMinutes = new Date()

        return {
            MetricData: [
                {
                    MetricName: 'temperature',
                    Dimensions: [{ Name: 'room', Value: mac }],
                    Timestamp: closestFiveMinutes,
                    Unit: 'None',
                    Value: temperature
                },
                {
                    MetricName: 'humidity',
                    Dimensions: [{ Name: 'room', Value: mac }],
                    Timestamp: closestFiveMinutes,
                    Unit: 'None',
                    Value: humidity
                },
                /* {
                    MetricName: 'batteryPercentage',
                    Dimensions: [{ Name: 'room', Value: mac }],
                    Timestamp: closestFiveMinutes,
                    Unit: 'None',
                    Value: batteryPercentage
                },
                {
                    MetricName: 'batteryMillivolts',
                    Dimensions: [{ Name: 'room', Value: mac }],
                    Timestamp: closestFiveMinutes,
                    Unit: 'None',
                    Value: batteryMillivolts
                },
                {
                    MetricName: 'counter',
                    Dimensions: [{ Name: 'room', Value: mac }],
                    Timestamp: closestFiveMinutes,
                    Unit: 'None',
                    Value: counter
                },
                {
                    MetricName: 'rssi',
                    Dimensions: [{ Name: 'room', Value: mac }],
                    Timestamp: closestFiveMinutes,
                    Unit: 'None',
                    Value: rssi
                }, */
            ],
            Namespace: 'soto.chassaigne'
        }
    }

}