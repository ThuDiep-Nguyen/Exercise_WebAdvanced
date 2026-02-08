export interface IBook{ 
    BookId:string, 
    BookName:string, 
    Price:number, 
    Image:string,
    Description:string,
    UpdateDate:string,
    Quantity:number,
    CDId:string,
    PublisherId:string
} 
export class Book{ 
    constructor( 
        public BookId:string="", 
        public BookName:string="", 
        public Price:number=0, 
        public Image:string="",
        public Description:string="",
        public UpdateDate:string="",
        public Quantity:number=0,
        public CDId:string="",
        public PublisherId:string=""
        ) 
    {} 
} 