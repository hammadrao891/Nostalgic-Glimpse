const User=require('../models/User')
const router = require("express").Router();
const bcrypt=require("bcrypt")


//register
router.post("/register",async(req,res)=>{
try{
    const salt=await bcrypt.genSalt(10);
    const hashedPass=await bcrypt.hash(req.body.password,salt)

    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashedPass,
        country:req.body.country,
        // cityBefore:req.body.cityBefore,
        cityPresent:req.body.cityPresent
    })
    const user= await  newUser.save();
    res.status(200).json(user)
}
catch(err)
{
    return res.status(500).json(err)
}
})


//login
router.post("/login", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if(!user){ return res.status(404).json("user not found");}
    
      const validPassword = await bcrypt.compare(req.body.password, user.password)
     if (!validPassword) {return res.status(400).json("wrong password");}
  
      return res.status(200).json(user)
    } catch (err) {
      return res.status(500).json(err)
    }
  });

//partner
router.post('/partner',async(req,res)=>{
    try{
        const user= await User.findOne({_id:req.body._id})
        !user && res.status(404).json("No account registered")
     
        return  res.status(200).json(user)
    }
    catch(err)
    {
     res.status(500).json(err)
    }
})


module.exports=router;