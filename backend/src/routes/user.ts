import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@sadiqgurramkonda/medium-common";
import bcrypt from "bcryptjs"


export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        currentUser: any;
    }
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const {success} = signupInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({
            message: "Invalid inputs"
        })
    }
    const userPassword = JSON.stringify(body.password);
    const hashedPassword = await bcrypt.hash(userPassword,10);
    const existingUser = await prisma.user.findUnique({
        where:{
            email: JSON.stringify(body.email)
        }
    })

    try {
        if(existingUser){
            c.status(409);
            return c.json({ 
                message: "User already exists with this email, please login!" 
            });
        } 
        const user = await prisma.user.create({
            data: {
                name: JSON.stringify(body.name),
                email: JSON.stringify(body.email),
                password: hashedPassword

            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
          userDetails: {
            email: user.email.replace(/["/]/g, ""),
            username: user.name?.replace(/["/]/g, "") || "Anonymous",
          },
          token,
        });
    } catch (e) {
        console.log(e)
        c.status(411);
        return c.json({
            message: "Something went wrong"
        });
    }
})

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({
      message: "Invalid Inputs",
    });
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: JSON.stringify(body.email),
      },
    });
    const passwordValidation = await bcrypt.compare(JSON.stringify(body.password),user?.password || "");
    console.log(body.password,user?.password);
    if (!passwordValidation) {
      c.status(403); //403 ---> status code for unauthorized!
      return c.json({
        message: "username or password incorrect",
      });
    }
    const token = await sign({ id: user?.id }, c.env.JWT_SECRET);
    return c.json({
      userDetails: {
        email: user!.email.replace(/["/]/g, ""),
        username: user!.name?.replace(/["/]/g, "") || "Anonymous",
      },
      token,
    });
  } catch (e) {
    console.log(e);
    return c.json({
      message: "something went wrong",
    });
  }
});

userRouter.get("/user",async(c)=>{
    console.log(c)

   try{
    const currentUser = await c.get("currentUser");
    c.status(200);
    return c.json({
        status: "success",
        currentUser 
    })
   }catch(e:any){
    c.status(400);
    c.json({
        status: "fail",
        message: e.message
    })
   }
})