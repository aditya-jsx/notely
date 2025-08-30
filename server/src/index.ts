import express = require("express");
import mongoose = require("mongoose");
import jwt = require("jsonwebtoken");
import z = require("zod");
import bcrypt = require("bcrypt");
import { UserModel } from "./db";
import { NoteModel } from "./db";
import { Auth } from "./middleware";
import { JWT_USER_PASSWORD } from "./config";
import { MONGO_URL } from "./config";

const app = express();
app.use(express.json());


app.post("/api/v1/signup", async (req, res)=>{

    const requiredBody = z.object({
        email: z.string().email(),
        password: z
         .string()
         .min(8, "Password must contain at least 8 characters")
         .regex(/[A-Z]/, "Must contain an uppercase character")
         .regex(/[a-z]/, "Must contain a lowercase character"),
    })

    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({
            msg: "Invalid Format",
            error: parsedData.error.flatten()
        })
    }

    const { email, password } = parsedData.data;

    try{

        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await UserModel.findOne({ email: email })
        if(existingUser){
            return res.status(400).json({
                msg: "User with this email already exists"
            })
        }

        await UserModel.create({
            email: email,
            password: hashedPassword
        })

        return res.status(200).json({
            msg: "Signup Completed"
        })

    }catch(e){

        console.error("Database error occured during signup", e);
        if (e instanceof Error) {
        return res.status(500).json({
            msg: "An unexpected error occurred during signup",
            error: e.message 
        })

        }else{

        return res.status(500).json({
            msg: "An unexpected and unknown error occurred",
            error: String(e)
        });

        }
    }
});

app.post("/api/v1/signin", async (req, res)=>{

    const { email, password } = req.body;

    try{

        const user = await UserModel.findOne({email: email});
    
        if(!user){

            return res.status(403).json({
                msg: "Invalid email or password"
            })

        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);

        if(passwordMatch){

            if (!JWT_USER_PASSWORD) {
                console.error("JWT secret is not configured.");
                return res.status(500).json({
                    msg: "Server configuration error."
                });
            }
            
            const token = jwt.sign({
                userId: user._id.toString() 
            }, JWT_USER_PASSWORD);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', // use secure in production for https
                maxAge: 1000 * 60 * 60,
                sameSite: 'lax', // protects against CSRF
            })

            return res.status(200).json({
                msg: "Sign in successful",
                token: token 
            });

        }else{

            return res.status(403).json({
                msg: "Invalid email or password"
            })

        }

    }catch(e){

        console.error("Error during signin:", e);

        if (e instanceof Error) {
            
            return res.status(500).json({
                msg: "An unexpected error occurred during signin",
                error: e.message
            });

        } else {

            return res.status(500).json({
                msg: "An unexpected and unknown error occurred",
                error: String(e)
            });

        }
    }

});




app.post("/api/v1/note", Auth, async (req, res)=>{

    const contentBody = z.object({
        title: z.string().min(1),
        content: z.string(),
    })

    const parsedData = contentBody.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({
            msg: "Invalid input format",
            error: parsedData.error.flatten()
        });
    }

    const { title, content } = parsedData.data;

    try{

        const newContent = await NoteModel.create({
            title: title,
            content: content,
            userId: req.userId  // this we got from the auth middleware
        })

        return res.status(201).json({
            msg: "Content created successfully",
            content: newContent,

        })

    }catch(e){

        console.error("Error creating content: ", e);
        return res.status(500).json({
            msg: "An internal server error occured",
        });
        
    }
});

app.delete("/api/v1/note/:noteId", Auth,  async (req, res)=>{

    const { noteId } = req.params
    const userId = req.userId;

    try{
        
        const deleteNote = await NoteModel.deleteOne({ 
            _id: noteId,
            userId: userId
         });

        if(deleteNote.deletedCount === 0){
            return res.status(404).json({
                msg: "Content not found or you do not have permission to delete this note",
            });
        }

        return res.status(200).json({
            msg: "Content deleted Successfully"
        })

    }catch(e){

        console.error("Error during content deletion: ", e)
        return res.status(500).json({
            msg: "An internal server error occurred"
        });

    }
});





// app.get("/api/v1/note", Auth, async (req, res)=>{

//     const userId = req.userId;

//     try{

//         const content = await NoteModel.find({
//             userId: userId
//         })
//         .populate("userId", "email")

//         return res.status(200).json({
//             content
//         })

//     }catch(e){

//         return res.status(403).json({
//             msg: "Failed to get the contents"
//         })

//     }
// });





const main = async () => {
    if (!MONGO_URL) {
        console.error("FATAL ERROR: MONGO_URL is not defined in environment variables.");
        process.exit(1);
    }

    try{
        await mongoose.connect(MONGO_URL);
        app.listen(3000);
    }catch(e){
        console.log("Error connecting to DB");
    }
};

main();