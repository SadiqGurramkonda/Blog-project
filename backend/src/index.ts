import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/api/v1/signup",(c)=>{
  return c.json({
    message: "user successfully created"
  })
})

app.post("/api/v1/signin",(c)=>{
  return c.json({
    message: "user successfully created"
  })
})

app.post("/api/v1/blog",(c)=>{
  return c.json({
    message: "user successfully created"
  })
});

app.put("/api/v1/blog",(c)=>{
  return c.json({

  })
})

app.get("/api/v1/blog:id",(c)=>{
  return c.json({
    msg: "blogs"
  })
})
export default app
