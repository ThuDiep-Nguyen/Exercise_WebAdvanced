import { Component } from '@angular/core';

@Component({
  selector: 'app-learnbinding',
  standalone: false,
  templateUrl: './learnbinding.html',
  styleUrl: './learnbinding.css',
})
export class Learnbinding {
  student_id: string="K234111387"
  student_name: string="Nguyễn Thị Thu Diệp"
  student_address: string="Tam Kỳ - Đà Nẵng"
  red_text_style= {color:"red"}
}
