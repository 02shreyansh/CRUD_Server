const express=require("express");
const Router=express.Router();
const {createData,readData,updateData,deleteData} =require("./ServerData")
Router.route('/product/new').post(createData)
Router.route('/products').get(readData)
Router.route('/product/:id').put(updateData);
Router.route('/product/:id').delete(deleteData);
module.exports=Router