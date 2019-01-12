const dataService=require('./../../libs/services/data-service')
const assert=require('assert')

const data1={
    mapId:1,
    point: {x:1,y:2},
    MAC:'',
    APs:[{name:'',MAC:'',RSSI:'',frequency:''}]
}
const data2={

}

console.log(dataService.checkData(data1))

console.log(dataService.checkData(data2))