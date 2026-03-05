const express = require('express'); 
const app = express(); 
const port = 3002; 

const morgan=require("morgan") 
app.use(morgan("combined")) 

const bodyParser=require("body-parser") 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));

const cors=require("cors"); 
const corsCredentials = cors({ credentials: true, origin: 'http://localhost:4200' });
app.use(corsCredentials);
app.listen(port,()=>{ 
    console.log(`My Server listening on port ${port}`) 
}) 
app.get("/",(req,res)=>{ 
    res.send("This Web server is processed for MongoDB") 
}) 

const { MongoClient, ObjectId } = require('mongodb'); 
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
client = new MongoClient("mongodb://127.0.0.1:27017"); 
client.connect(); 
database = client.db("FashionData");       
fashionCollection = database.collection("Fashion"); 
userCollection = database.collection("User"); 

// POST /register - Đăng ký user mới
app.post("/register", cors(), async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "Thiếu user hoặc pwd" });
  }
  const existing = await userCollection.findOne({ user: user });
  if (existing) {
    return res.status(409).json({ message: "User đã tồn tại" });
  }
  const hashedPwd = await bcrypt.hash(pwd, SALT_ROUNDS);
  await userCollection.insertOne({ user: user, pwd: hashedPwd });
  res.status(201).json({ message: "Đăng ký thành công" });
});

// POST /login - Đăng nhập
app.post("/login", cors(), async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) {
    return res.status(400).json({ message: "Thiếu user hoặc pwd" });
  }
  const found = await userCollection.findOne({ user: user });
  if (!found) {
    return res.status(401).json({ message: "Sai user hoặc mật khẩu" });
  }
  const isMatch = await bcrypt.compare(pwd, found.pwd);
  if (!isMatch) {
    return res.status(401).json({ message: "Sai user hoặc mật khẩu" });
  }
  res.status(200).json({ message: "Đăng nhập thành công", user: found.user });
});

app.get("/fashions",cors(),async (req,res)=>{    
    const result = await fashionCollection.find({}).toArray(); 
    res.send(result) 
})
app.get("/fashions/:id",cors(),async (req,res)=>{ 
var o_id = new ObjectId(req.params["id"]); 
const result = await fashionCollection.find({_id:o_id}).toArray();     
res.send(result[0]) 
} 
) 

var cookieParser = require('cookie-parser'); 
app.use(cookieParser()); 
app.get("/create-cookie",cors(),(req,res)=>{
    res.cookie("username","aidethuong")
    res.cookie("password","Thu Diệp")
    account={"username":"aidethuong",
            "password":"Thu Diệp"}
    res.cookie("account",account)
    //Expires after 360000 ms from the time it is set.
    res.cookie("infor_limit1", 'I am limited Cookie - way 1', {expire: 360000 + Date.now()});
    res.cookie("infor_limit2", 'I am limited Cookie - way 2', {maxAge: 360000});
    res.send("cookies are created")
})
app.get("/read-cookie",cors(),(req,res)=>{ 
//cookie is stored in client, so we use req 
username=req.cookies.username 
password=req.cookies.password 
account=req.cookies.account 
infor="username = "+username+"<br/>" 
infor+="password = "+password+"<br/>" 
if(account!=null) 
{ 
infor+="account.username = "+account.username+"<br/>" 
infor+="account.password = "+account.password+"<br/>" 
}     
res.send(infor)     
})
app.get("/clear-cookie",cors(),(req,res)=>{ 
res.clearCookie("account") 
res.send("[account] Cookie is removed")     
}) 
var session = require('express-session'); 
app.use(session({
  secret: "Shh, its a secret!",
  resave: false,
  saveUninitialized: true,
  cookie: { sameSite: 'lax', secure: false }
})); 

// ============================================================
// SHOPPING DATA - Product collection (ShoppingData database)
// ============================================================
const shoppingDB = client.db("ShoppingData");
const productCollection = shoppingDB.collection("Product");

// GET /ex63products - Lấy toàn bộ sản phẩm
app.get("/ex63products", async (req, res) => {
  try {
    const result = await productCollection.find({}).toArray();
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "Lỗi lấy sản phẩm", error: e.message });
  }
});

// POST /ex63products/seed - Đã bị vô hiệu hóa, dùng script seed-products.js
app.post("/ex63products/seed", (req, res) => {
  res.status(410).json({ message: "Endpoint này đã bị vô hiệu hóa. Chạy: node seed-products.js" });
});

// GET /ex63cart - Lấy giỏ hàng từ session
app.get("/ex63cart", (req, res) => {
  const cart = req.session.cart || [];
  res.json(cart);
});

// POST /ex63cart/add - Thêm sản phẩm vào session cart
app.post("/ex63cart/add", (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  const product = req.body;
  const existingIndex = req.session.cart.findIndex(item => String(item._id) === String(product._id));
  if (existingIndex >= 0) {
    req.session.cart[existingIndex].qty = (req.session.cart[existingIndex].qty || 1) + 1;
  } else {
    product.qty = 1;
    req.session.cart.push(product);
  }
  res.json({ message: "Đã thêm vào giỏ hàng", cart: req.session.cart });
});

// PUT /ex63cart/update - Cập nhật giỏ hàng (số lượng + xóa item được chọn)
app.put("/ex63cart/update", (req, res) => {
  const { updatedCart } = req.body;
  req.session.cart = updatedCart;
  res.json({ message: "Giỏ hàng đã được cập nhật", cart: req.session.cart });
});

// DELETE /ex63cart/clear - Xóa toàn bộ giỏ hàng
app.delete("/ex63cart/clear", (req, res) => {
  req.session.cart = [];
  res.json({ message: "Giỏ hàng đã được xóa" });
});
// ============================================================

app.get("/contact",cors(),(req,res)=>{ 
    if(req.session.visited!=null) 
    { 
        req.session.visited++ 
        res.send("You visited this page "+req.session.visited +" times") 
    } 
    else 
    { 
        req.session.visited=1 
        res.send("Welcome to this page for the first time!") 
    } 
}) 