const supertest = require("supertest")
const app = require("../app")
require('../models')
const Category = require("../models/Category")

const BASE_URL = '/api/v1/products'
const BASE_URL_LOGIN = '/api/v1/users/login'
let TOKEN;
let productId;
let category;

beforeAll(async() => {
    const user = {
        email: "andrequin887@gmail.com",
        password: "Futuro"
    }
    const res = await supertest(app)
    .post(BASE_URL_LOGIN)
    .send(user)
    
    TOKEN = res.body.token
})

test("POST -> 'URL_BASE', should return status code 201 and res.body.title === product.title", async() => {

    const categoryBody = {
        name : "Tech"
    }

    category = await Category.create(categoryBody)

    const product = {
        title: "Samsung",
        description: "The product is a product international",
        price: "1200.000",
        categoryId: category.id
    }

    const res = await supertest(app)
    .post(BASE_URL)
    .send(product)
    .set("Authorization", `Bearer ${TOKEN}`)
    
    productId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.title).toBe(product.title)
});


test("GET -> 'URL_BASE' should status code 200, res.body.length === 1 and res.body[0] to be defined",async()=>{
 
    const res = await supertest(app)
        .get(BASE_URL)
          
    expect(res.status).toBe(200)
    expect(res.body[0].category).toBeDefined()
});

test("GET ONE -> 'URL_BASE/:id' should status code 200 and res.body.title === samsung",async()=>{
 
    const res = await supertest(app)
        .get(`${BASE_URL}/${productId}`)
          
    expect(res.status).toBe(200)
    expect(res.body.title).toBe("Samsung")
    expect(res.body.category).toBeDefined()
});

test("PUT -> 'URL_BASE/:id' should status code 200 and res.body.title === body.title",async()=>{

    const product = {
        title: "Samsung"
    }
 
    const res = await supertest(app)
        .put(`${BASE_URL}/${productId}`)
        .send(product)
        .set("Authorization", `Bearer ${TOKEN}`)
          
    expect(res.status).toBe(200)
    expect(res.body.title).toBe(product.title)
})

test("DELETE -> 'URL_BASE/:id' should status code 204",async()=>{
     
    const res = await supertest(app)
        .delete(`${BASE_URL}/${productId}`)
        .set("Authorization", `Bearer ${TOKEN}`)
    
    expect(res.status).toBe(204)

    await category.destroy()
})