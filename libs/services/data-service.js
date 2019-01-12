class DataService {

    /**检查数据结构
     * {
    mapId:String,
    point: {x:Number,y:Number},
    MAC:String,
    APs:[{name:String,
    MAC:String,
    RSSI:String,
    frequency:String}]
}*/
    static checkData(data) {
        const result = {
            status: false, msg: ''
        }
        //mapId
        if (!data.hasOwnProperty('mapId')) {
            result.msg = 'mapId is required'
            return result
        }
        //point
        if (!data.hasOwnProperty('point')) {
            result.msg = 'point is required'
            return result
        } else {
            const point = data.point
            if (!point.hasOwnProperty('x') || !point.hasOwnProperty('y')) {
                result.msg = 'point.x&point.y is required'
                return result
            }
        }
        //MAC
        if (!data.hasOwnProperty('MAC')) {
            result.msg = 'MAC is required'
            return result
        }
        //APs
        if (!data.hasOwnProperty('APs')) {
            result.msg = 'APs is required'
            return result
        } else {
            if (!Array.isArray(data.APs)) {
                result.msg='data.APs should be an array'
                return result
            }
            if (data.APs.length===0) {
                result.msg='data.APs should contain at least one AP data'
                return result
            }
            for (const i in data.APs) {
                //APs.name
                if (!data.APs[i].hasOwnProperty('name')) {
                    result.msg=`APs[${i}].name is required`
                    return result
                }
                //APs.MAC
                if (!data.APs[i].hasOwnProperty('MAC')) {
                    result.msg=`APs[${i}].MAC is required`
                    return result
                }
                //APs.RSSI
                if (!data.APs[i].hasOwnProperty('RSSI')) {
                    result.msg=`APs[${i}].RSSI is required`
                    return result
                }
                //APs.frequency
                if (!data.APs[i].hasOwnProperty('frequency')) {
                    result.msg=`APs[${i}].frequency is required`
                    return result
                }
            }
        }
        result.status = true
        result.msg = '通过结构验证'
        return result
    }

    /*检验多条数据*/
    static checkMany(datas) {
        const result={
            status:false,
            msg:''
        }
        if (!Array.isArray(datas)){
            result.msg='datas should be an array'
            return result
        }
        if (datas.length===0){
            result.msg = 'datas should contains at least one data'
            return result
        }
        let i=0
        for(const data of datas) {
            i++
            const result0=this.checkData(data)
            if (!result0.status) {
                result.msg=`data[${i}] : ${result0.msg}`
                return result
            }
        }
        result.status=true
        result.msg='通过结构验证'
        return result
    }

}

module.exports = DataService