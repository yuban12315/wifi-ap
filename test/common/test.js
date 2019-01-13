const datas=[1,2,3]
const _=require('lodash')
const chunk=require('lodash.chunk')
const dataArray=_.chunk(datas,200)
console.log(dataArray)