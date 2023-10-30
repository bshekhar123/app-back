const { model, Schema } = require('mongoose');

const addressModel = new Schema({
    addressLine: { type: String, required: false },
    city: { type: String, required: false },
    state: { type: String, required: false },
    country: { type: String, required: false },
    pin: { type: Number, required: false },
})

const customerSchema = new Schema({
    name: { type: String, required: false },
    phone: { type: Number, required: false },
    email: { type: String, required: false },
    profileComplete: { type: Boolean, default: false },
    //1 Mr
    //2 Mrs.
    gender: { type: Number, required: false },
    profileImage: { type: String, required: false },
    address: { type: [addressModel], required: false },
});

const customerModel = model('Customer', customerSchema);
const addressMod = model('Address', addressModel);
module.exports = {
    customerModel,
    addressMod
};
