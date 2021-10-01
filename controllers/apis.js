const Item = require('../model/items')
const User = require('../model/users')
const jwt = require('jsonwebtoken')


const getUser = (req, res)=>{
    User.findOne({ _id: req.query.usr_id }, (err, userInfo) => {
        if (err) return res.json({ success: false, err });
        res.json(userInfo)
    })
}

const getAllItems =  (req, res)=>{
    Item.find()
        .then((data)=>res.json(data))
        .catch((err)=>res.send(err))
}

const getItem =  (req, res)=>{
    Item.findById(String(req.params.id))
        .then((data)=>res.json(data))
        .catch((err)=>res.status(404).json({msg:'Product not Found!'}))
}

const addItem =  async(req, res)=>{
    const item = new Item(req.body);
    try{
        await item.save()
        console.log('ITEM ADDED!')
        return res.json({ok:true})
    } catch(err){
        console.log('ITEM NOT ADDED!', err)
        return res.status(400).send('Error. Try again!')
    }
}

const removeFromCart = async(req, res)=>{
    User.findOneAndUpdate(
        { _id: req.query.usr_id },
        {
            "$pull":
                { "cart": { "id": req.query.prodId } }
        },
        { new: true },
        (err, userInfo) => {
            if (err) return res.json({ success: false, err });
            res.json(userInfo.cart)
        }
    )
}

const decrementCart = async(req, res)=>{
    Item.findOne({ _id: req.query.prodId }, (error, item)=>{
        if (error) return res.json({ success: false, error });
        User.findOneAndUpdate(
            { _id: req.query.usr_id, "cart.id": req.query.prodId },
            { $inc: { "cart.$.quantity": -1 } },
            { new: true },
            (err, userInfo) => {
                if (err) return res.json({ success: false, err });
                res.json(userInfo.cart)
            }
        )
    })    
}


const addToCart =  async(req, res)=>{

    Item.findOne({ _id: req.query.prodId }, (error, item)=>{
        if (error) return res.json({ success: false, error });
        User.findOne({ _id: req.query.usr_id }, (err, userInfo) => {

            let duplicate = false;

            if(userInfo.cart.length > 0){
                userInfo.cart.forEach((itm) => {
                    if (itm.id === req.query.prodId) {
                        duplicate = true;
                    }
                })
            }

            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.query.usr_id, "cart.id": req.query.prodId },
                    { $inc: { "cart.$.quantity": 1 } },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.json({ success: false, err });
                        res.json(userInfo.cart)
                    }
                )
            } else {
                User.findOneAndUpdate(
                    { _id: req.query.usr_id },
                    {
                        $push: {
                            cart: {
                                id: req.query.prodId,
                                name: item.itemName,
                                img: item.img,
                                price: item.itemPrice,
                                quantity: 1,
                                date: Date.now()
                            }
                        }
                    },
                    { new: true },
                    (err, userInfo) => {
                        if (err) return res.json({ success: false, err });
                        res.json(userInfo.cart)
                    }
                )
            }
        })
    })    
}

const register = async(req,res)=>{
    const {name, phno, email, pwd} = req.body;
    if(!name) return res.status(400).send('Name is Required!')
    if(!phno || phno.length!=10) return res.status(400).send('Phone Number is Required and should be 10 characters long!')
    if(!pwd || pwd.length < 6) return res.status(400).send('Password is Required and should be minimum 6 characters long!')

    let emailExists = await User.findOne({email}).exec()
    let phnoExists = await User.findOne({phno}).exec()
    if(emailExists) return res.status(400).send('Email already exists!')
    if(phnoExists) return res.status(400).send('Phone Number already exists!')

    const usr = new User(req.body)
    try{
        await usr.save()
        console.log('REGISTRATION SUCCESS')
        return res.json({ok:true})
    } catch(err){
        console.log('REGISTRATION FAILED', err)
        return res.status(400).send('Error. Try again!')
    }
}

const login = async(req,res)=>{
    const {email, pwd} = req.body;
    if(!email) return res.status(400).send('Email is Required!')
    if(!pwd) return res.status(400).send('Password is Required!')

    try {
        let usr = await User.findOne({email}).exec()
        if(!usr) return res.status(400).send('User with Email doesn\'t exists!')

        usr.comparePassword(pwd, (err, match)=>{
            if(!match || err) return res.status(400).send('Wrong Password!')
            let token = jwt.sign({_id: usr._id}, process.env.JWT_SECRET, 
                {expiresIn:'1d'})
            console.log('LOGIN SUCCESS')
            res.json({token, usr})
        })    
    } catch (err){ 
        console.log('LOGIN FAILED', err)
        return res.status(400).send('Error. Try again!')
    }
}

const showMsg = (req, res)=>{
    res.status(400).send(`${req.params.msg}`)
}

module.exports = {
    getAllItems, 
    addItem,
    showMsg, 
    register, 
    login, 
    addToCart, 
    removeFromCart,
    decrementCart,
    getItem, 
    getUser
}