import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  student_id: string = "K234111387";
  student_name: string = "Nguyen Thi Thu Diep";
  student_uni:string ="University of Economic and Laws"
  student_email: string = "diepntt234111e@st.uel.edu.vn";
  my_img = "assets/thudiep.jpg";
}
