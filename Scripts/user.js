"use strict";
class User {
    FirstName;
    LastName;
    Address;
    PhoneNumber;
    EmailAddress;
    Username;
    Password;
    constructor(firstName = "", lastName = "", address = "", phoneNumber = "", emailAddress = "", username = "", password = "") {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.Address = address;
        this.PhoneNumber = phoneNumber;
        this.EmailAddress = emailAddress;
        this.Username = username;
        this.Password = password;
    }
    toString() {
        return `First Name: ${this.FirstName}\nLast Name: ${this.LastName}\n
             Email Address: ${this.EmailAddress}\nUsername: ${this.Username}`;
    }
    toJSON() {
        return {
            "FirstName": this.FirstName,
            "LastName": this.LastName,
            "Address": this.Address,
            "PhoneNumber": this.PhoneNumber,
            "EmailAddress": this.EmailAddress,
            "Username": this.Username,
            "Password": this.Password
        };
    }
    fromJSON(data) {
        this.FirstName = data.FirstName;
        this.LastName = data.LastName;
        this.Address = data.Address;
        this.PhoneNumber = data.PhoneNumber;
        this.EmailAddress = data.EmailAddress;
        this.Username = data.Username;
        this.Password = data.Password;
    }
    serialize() {
        if (this.FirstName !== "" && this.LastName !== "" && this.Address !== "" && this.PhoneNumber !== ""
            && this.EmailAddress !== "" && this.Username !== "" && this.Password !== "") {
            return `${this.FirstName}, ${this.LastName}, ${this.Address}, ${this.PhoneNumber}, ${this.EmailAddress}, ${this.Username}, ${this.Password}`;
        }
        console.error("One or more of the user properties are missing or invalid");
        return null;
    }
    deserialize(data) {
        let propertyArray = data.split(", ");
        this.FirstName = propertyArray[0];
        this.LastName = propertyArray[1];
        this.Address = propertyArray[2];
        this.PhoneNumber = propertyArray[3];
        this.EmailAddress = propertyArray[4];
        this.Username = propertyArray[5];
        this.Password = propertyArray[6];
    }
}
//# sourceMappingURL=user.js.map