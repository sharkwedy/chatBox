const User = require('../models/user');
const userCtrl = {};

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userCtrl.createUser = async (req, res) => {
   const user = new User({
       userName: req.body.userName,
       password: req.body.password
   });
   await user.save();
    res.json({
       'status': 'User saved'
    });
}

userCtrl.getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

userCtrl.editUser = async (req, res) => {
    const { id } =  req.params;
    const user = {
        name: req.body.name,
        year: req.body.year
    };
    await User.findByIdAndUpdate(id, {$set: user}, {new: true});
    res.json({status: 'User Updated'});
}

userCtrl.deleteUser = async (req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({status: 'Userd deleted'});
}

module.exports = userCtrl;
