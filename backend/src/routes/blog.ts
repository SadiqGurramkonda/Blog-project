import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@sadiqgurramkonda/medium-common";


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

    const authHeader = c.req.header("Authorization") || "";
    if (!authHeader) {
        return c.json({
            message: "unauthorized"
        })
    }
    try {
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
    } catch (e) {
        c.status(403);
        console.log(e);
        return c.json({
            message: "something went wrong in authentication"
        })
    }
});


blogRouter.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const authorId = c.get("userId");

    const {success} = createBlogInput.safeParse(body);
    if(!success){
        return c.json({
            message: "Invalid Inputs"
        })
    }
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


blogRouter.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json()
    const authorId = c.get("userId");

    const { success } = updateBlogInput.safeParse(body);
     console.log(success);
    if (!success) {
        return c.json({
            message: "Invalid Inputs"
        })
    }
    try {
        const blog = await prisma.post.update({
            where: {
                id: Number(body.id),
                authorId: authorId
            },
            data: {
                title: body.title,
                content: body.content

            }
        })
        return c.json({
            id: blog.id
        })
    } catch (e) {
        console.log(e);
        c.status(500);
        return c.json({
            message: "something went wrong"
        })

    }
});

//pagination should be implemented!
blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try{
        const blogs = await prisma.post.findMany();
        return c.json({
            blogs: blogs.map((blog: {id: number;
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

blogRouter.get("/:id", async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id  = Number(c.req.param('id'))

    try{
        const   blog = await prisma.post.findFirst({
            where:{
                id: id
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


