const express=require("express") 
const fileUpload = require('express-fileupload');
const path = require("path");
const app=express() 
const port=3000 
const morgan=require("morgan") 
app.use(morgan("combined")) 
//create default API 
app.get("/",(req,res)=>{ 
    res.send("Welcome to <font color='red'>Thu Diep area </font> API ")
}) 
app.get("/about",(req,res)=>{
  tbl="<table border='1'>"
  tbl+="<tr>"
  tbl+="<td>STUDENT ID:</td><td>SV007</td>"
  tbl+="</tr>"
  tbl+="<tr>"
  tbl+="<td>STUDENT Name:</td><td>TÈO</td>"
  tbl+="</tr>"
  tbl+="<tr>"
  tbl+="<td colspan='2'><img src='images/avatar.jpg' width='500' height='250'/></td>"
  tbl+="</tr>"   
  tbl+="</table>"
  res.send(tbl)
})
app.listen(port,()=>{ 
    console.log(`Thu Diep Server listening on port ${port}`) 
}) 

const cors=require("cors") 
app.use(cors()) 
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload());

app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    let sampleFile = req.files.image;
    let uploadPath = path.join(__dirname, 'public/images', sampleFile.name);
  
    sampleFile.mv(uploadPath, function(err) {
      if (err) return res.status(500).send(err);
      res.send({ fileName: sampleFile.name, message: 'File uploaded!' });
    });
});

let  database=[ 
    {"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản","Price":70000,"Image":"b1.png","Description":"Cuốn sách cung cấp kiến thức nền tảng vững chắc về kỹ thuật lập trình C++, từ các cú pháp cơ bản như biến, kiểu dữ liệu, vòng lặp đến các khái niệm quan trọng như mảng, con trỏ và hàm. Đây là tài liệu không thể thiếu cho sinh viên năm nhất chuyên ngành CNTT đang bắt đầu hành trình chinh phục thế giới code.","UpdateDate":"2023-11-20","Quantity":100,"CDId":"1","PublisherId":"1"}, 
    {"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao","Price":100000,"Image":"b2.png","Description":"Tiếp nối phần cơ bản, cuốn sách này đi sâu vào các cấu trúc dữ liệu và giải thuật phức tạp, lập trình hướng đối tượng (OOP), và các kỹ thuật tối ưu hóa mã nguồn. Người đọc sẽ được trang bị tư duy logic sắc bén để giải quyết các bài toán khó trong thực tế phát triển phần mềm.","UpdateDate":"2023-11-20","Quantity":50,"CDId":"2","PublisherId":"1"}, 
    {"BookId":"b3","BookName":"Máy học cơ bản","Price":200000,"Image":"b3.png","Description":"Khám phá thế giới trí tuệ nhân tạo với cuốn sách nhập môn Machine Learning. Sách trình bày dễ hiểu về các thuật toán học có giám sát và không giám sát, hồi quy tuyến tính, phân lớp dữ liệu. Kèm theo nhiều ví dụ thực hành bằng Python giúp bạn nhanh chóng nắm bắt công nghệ thời thượng này.","UpdateDate":"2023-11-20","Quantity":80,"CDId":"3","PublisherId":"2"}, 
    {"BookId":"b4","BookName":"Máy học nâng cao","Price":300000,"Image":"b4.png","Description":"Dành cho những ai muốn trở thành chuyên gia về AI, cuốn sách đi sâu vào Deep Learning, Neural Networks, và xử lý ngôn ngữ tự nhiên (NLP). Bạn sẽ học cách xây dựng các mô hình huấn luyện phức tạp, ứng dụng vào nhận diện hình ảnh và dự đoán xu hướng thị trường với độ chính xác cao.","UpdateDate":"2023-11-20","Quantity":30,"CDId":"4","PublisherId":"2"}, 
    {"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250000,"Image":"b5.png","Description":"Hướng dẫn chi tiết cách thiết kế và lập trình robot từ con số 0. Sách bao gồm kiến thức về vi điều khiển Arduino, cảm biến, động cơ và giải thuật điều khiển. Thích hợp cho những người đam mê IoT và tự động hóa, mong muốn tự tay chế tạo những chú robot thông minh đầu tiên.","UpdateDate":"2023-11-20","Quantity":60,"CDId":"5","PublisherId":"3"}, 
] 
app.get("/books",cors(),(req,res)=>{ 
    res.send(database) 
}) 
app.get("/books/:id",cors(),(req,res)=>{ 
    id=req.params["id"] 
    let p=database.find(x=>x.BookId==id) 
    res.send(p)     
})
app.post("/books",cors(),(req,res)=>{    
    database.push(req.body); 
    res.send(database) 
}) 
app.put("/books",cors(),(req,res)=>{    
    let book=database.find(x=>x.BookId==req.body.BookId) 
    if(book!=null){
        book.BookName=req.body.BookName
        book.Price=req.body.Price
        book.Image=req.body.Image
        book.Description=req.body.Description
        book.UpdateDate=req.body.UpdateDate
        book.Quantity=req.body.Quantity
        book.CDId=req.body.CDId
        book.PublisherId=req.body.PublisherId
    }
    res.send(database) 
}) 
app.delete("/books/:id",cors(),(req,res)=>{    
    id=req.params["id"] 
    database=database.filter(x=>x.BookId!==id) 
    res.send(database) 
})