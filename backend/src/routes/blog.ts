import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
}>();



//middleware for authentication in hono
blogRouter.use('/*', async (c, next) => {

    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
        return c.json({
            message: "unauthorized"
        })
    }
    const token = authHeader?.split(' ')[1]

    const response = await verify(token, c.env.JWT_SECRET);
    if (!response.id) {
        c.status(403);
        return c.json({
            message: "unauthorized"
        })
    }
    
    c.set('userId', response.id);
    await next();
});


blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    
    //@ts-ignore
    const authorId = c.get("userId");

    try{
        const blog  = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId
            }
        })
        return c.json({
            id: blog.id
        })
    }catch(e){
        console.log(e);
        c.status(500);
        return c.json({
            message: "Something went wrong while posting the blog"
        })
    }
});


blogRouter.put("/", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body  = await c.req.json()
    //@ts-ignore
    const authorId = c.get("userId");

    try{
        const blog = await prisma.post.update({
            where: {
                id: body.id
            },
            data: {
                title: body.title,
                content: body.content
    
            }
        })
        return c.json({
            id: blog.id
        })
    }catch(e){
        console.log(e);
        c.status(500);
        return c.json({
            message: "something went wrong"
        })
    
    }
})

blogRouter.get("/:id", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body  = await c.req.param('id')

    try{
        const   blog = await prisma.post.findFirst({
            where:{
                id: body
            }
        })
        return c.json({
            blog
        })
    }catch(e){
        console.log(e);
        c.status(500);
        return c.json({
            message: "Error while fetching blog"
        })
    }
})

//pagination should be implemented!
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blogs = await prisma.post.findMany();
        return c.json({
            blogs: blogs.map((blog: {id: string;
                title: string;
                content: string;
                published: boolean;
                authorId: string; })=>blog.title)
        })
    }catch(e){
        console.log(e);
        c.status(500);
        return c.json({
            message: "Something went wrong"
        })
        }
})
