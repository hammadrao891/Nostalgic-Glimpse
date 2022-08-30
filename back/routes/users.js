const User=require('../models/User')
const express = require("express");
const {Router} =require('express');
const router=express.Router();
const bcrypt=require("bcrypt");

//get single user
router.get('/user/:id',async(req,res)=>{
try{
    const user=await User.findById(req.params.id)
    res.status(200).json(user)
}
catch(err)
{
    return res.status(400).json(err)
}
})

// //get a user
// router.get("/", async (req, res) => {
//   const userId = req.query.userId;
//   const username = req.query.username;
//   try {
//     const user = userId
//       ? await User.findById(userId)
//       : await User.findOne({ username: username });
//     const { password, updatedAt, ...other } = user._doc;
//     res.status(200).json(other);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });



// update user
router.put('/update/:id',async(req,res)=>{
    try{
        if(  req.body.userId === req.params.id)
        {
            if(req.body.password)
            {
                const salt=await bcrypt.genSalt(10);
                req.body.password=await bcrypt.hash(req.body.password,salt);
            }
            const user=await User.findByIdAndUpdate(req.body.userId,{
                $set:req.body
            })
        }
        res.status(200).json("Account Updated");
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
})

//delete user
router.delete("/delete/:id",async(req,res)=>{
    try
    {
        if(req.body.userId === req.params.id && req.body.password === req.params.params)
        {
            const user=await User.findOneAndDelete(req.body.userId)
            
        }
        res.status(200).json("Account has been deleted");
    }
    catch(err)
    {
        return res.status(400).json(err)
    }
})



//get all users
router.get('/',async(req,res)=>
{
    try{
        const users=await User.find({});
        res.status(200).json(users)
    }
    catch(err)
    {
        res.status(400).json(err)
    }
    
})

//get friends
router.get("/friends/:userId", async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      const friends = await Promise.all(
        user.friends.map((friendId) => {
          return User.findById(friendId);
        })
      );
      let friendList = [];
      friends.map((friend) => {
        const { _id, username, profilePicture } = friend;
        friendList.push({ _id, username, profilePicture });
      });
      res.status(200).json(friendList)
    } catch (err) {
      res.status(500).json(err);
    }
  });
  


//makefriend
router.put("/follow/:id", async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.friends.includes(req.body.userId)) {
          await user.updateOne({ $push: { friends: req.body.userId } });
          await currentUser.updateOne({ $push: { friends: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  });
module.exports=router;