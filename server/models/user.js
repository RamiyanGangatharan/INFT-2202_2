"use strict";
import mongoose from 'mongoose';
import passportLocalMongoose from "passport-local-mongoose";
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    DisplayName: String,
    EmailAddress: String,
    Username: String,
    Created: {
        type: Date,
        default: Date.now()
    }
}, {
    collection: "users"
});
UserSchema.plugin(passportLocalMongoose);
const Model = mongoose.model("User", UserSchema);
export default Model;
//# sourceMappingURL=user.js.map