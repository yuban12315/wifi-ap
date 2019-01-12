const mongoose=require('./../mongoose')
/**wifi-ap后台储存结构
 * mapid 标识使用的地图
 * point  采集点在地图的位置
 * MAC 采集设备的MAC地址
 * APs 采集的ap数组
 * 数据库未做具体的验证,用required属性要求该项是必须的
 * */
const data_schema=new mongoose.Schema({
    mapId:{
        required:true,
        type:String
    },
    point:{
        x:{
            required:true,
            type:Number
        } ,
        y:{
            required:true,
            type:Number
        }
    },
    MAC:{
        type: String
    },
    APs:[{
        name:{
            required:true,
            type:String
        },
        MAC:{
            required:true,
            type:String
        },
        RSSI:{
            required:true,
            type:String
        },
        frequency:{
            required:true,
            type:String
        }

    }]

})

const data_model=mongoose.model('data',data_schema)

module.exports=data_model