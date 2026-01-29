import { Component } from '@angular/core';

@Component({
  selector: 'app-ptb1',
  standalone: false,
  templateUrl: './ptb1.html',
  styleUrl: './ptb1.css',
})
export class Ptb1 {
 get_solution(hsa:HTMLInputElement,hsb:HTMLInputElement,result:HTMLElement)
  {
    let a=parseFloat(hsa.value)
    let b=parseFloat(hsb.value)
    if(a==0 && b==0)
    {
      result.innerHTML="Tùm lum nghiệm"   
    }    
    else if(a==0 && b!=0)
    {
      result.innerHTML="Nẩu có nghiệm"   
    }
    else
    {
      let x=-b/a
      result.innerHTML="x="+x
    }
  }
  clear_data(hsa:HTMLInputElement,hsb:HTMLInputElement,result:HTMLElement)
  {
    hsa.value=""
    hsb.value=""
    result.innerHTML=""
    hsa.focus()
  }
}
