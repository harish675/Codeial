module.exports.index = function(req,res){
      
    return res.json(200,{
       massage:"List of Posts at V2",
       posts:[]
    })
}