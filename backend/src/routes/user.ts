import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'


export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

userRouter.post("/signup", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    try {
        const user = await prisma.user.create({
            data: {
                name: JSON.stringify(body.name),
                email: JSON.stringify(body.email),
                password: JSON.stringify(body.password),

            }
        });
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
            token
        })
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

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: JSON.stringify(body.email),
                password: JSON.stringify(body.password)
            }
        });
        console.log(user);
        if (!user) {
            c.status(403); //403 ---> status code for unauthorized!
            return c.json({
                message: "username or password incorrect"
            })
        }
        const token = await sign({ id: user?.id }, c.env.JWT_SECRET)
        return c.json({
            token
        })
    } catch (e) {
        console.log(e);
        return c.json({
            "message": "something went wrong"
        });
    }
});