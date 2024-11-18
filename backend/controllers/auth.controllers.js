import { User } from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import { generateTokenAndSetCookie } from '../utils/generateTokens.js';

export async function signup(req, res) {
    try {
        const { email, password, username } = req.body;
        if (!email || !password || !username) { return res.status(400).json({ success: false, message: "All fields are required" }) }




        //to make sure that the email someone sent is valid  or not we use regular expression
        //this is called regex pattern 
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) { return res.status(400).json({ success: false, message: "Invalid Email" }) }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be atleast 6 characters" })
        }


        const existingUserByEmail = await User.findOne({ email: email })
        if (existingUserByEmail) {
            return res.status(400).json({ success: false, message: "Email already exists" })
        }

        const existingUserByUsername = await User.findOne({ username: username })
        if (existingUserByUsername) {
            return res.status(400).json({ success: false, message: "Username already exists" })
        }

        //here we will bcrypt the passwprd 
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        //Salt vs Hashed passwords 

        //Salt:
        // Randomly generated string.
        // Unique for each password.
        // Ensures that two identical passwords don't produce the same hash.
        // Not secret, but part of the final hash.


        // Hashed Password:
        // The result of hashing the combination of the original password and the salt.
        // A fixed-length string that represents the encrypted version of the password.
        // Stored in the database to validate user logins (without ever storing the original password).



        //thes eimgs will be in public folder in front end 
        const PROFILE_PIC = ["/avatar1.png", "avatar2.png", "avatar3.png"];

        //to get any random above img 
        const image = PROFILE_PIC[Math.floor(Math.random() * PROFILE_PIC.length)];

        const newUser = new User({
            email: email,
            password: hashedPassword,
            username: username,
            image: image
        })


        //    http://localhost:5000/api/v1/auth/signup
        //tried above in postman used under body, raw and json 
        //    await newUser.save(); //saves but it will keep saving until we neeche tell that successful hai ya nhi tried in postman

        //what neeche wala exactly does is , it  will shwo you all the  fields except password (  due to security reasons) in the console 

        //of the postman


        //to ghenerate token and cookie after the user is created

        generateTokenAndSetCookie(newUser._id, res); //once token created we save it to the database 
        await newUser.save();
        res.status(201).json({
            success: true, user: {
                ...newUser._doc,
                password: "",
            }
        })






        //THE CATCH BLOCK

    } catch (error) {
        console.log("Error in SignUP Controller : " + error)
        res.status(500).json({ success: false, message: "Internal server  error" })
    }
}


//login

export async function login(req, res) {
   try {
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400).json({ success: false, message: "All fields are required " })  
    }

    const user=await User.findOne({email:email})
    if(!user){
        res.status(404).json({ success: false, message: "Invalid Credentials " })  
    }

    const isPasswordCorrect=await bcryptjs.compare(password,user.password)
    if(!isPasswordCorrect){
        
        res.status(404).json({ success: false, message: "Invalid Credentials " })  
    }

    generateTokenAndSetCookie(user._id,res);
    res.status(200).json({
        success: true, user: {
            ...user._doc,
            password: "",
        }
    })


   } catch (error) {
    console.log("Error in login controller : "+error)
    
   }
}






//logoout

export async function logout(req, res) {
   try {
    res.clearCookie("jwt-netflix")
    res.status(201).json({ success: true, message: "Logged out successfully" })

   } catch (error) {
    console.log("Error in logoiut controller : "+error)
    res.status(500).json({ success: false, message: "Internal server  error" })
   }

}

// YBet3rmynGuibb5w