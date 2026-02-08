import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { finalize } from 'rxjs/internal/operators/finalize';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css',
})
export class FileUpload {
  @Input() 
  requiredFileType:any; 
  fileName = ''; 
  uploadProgress:number=0; 
  uploadSub: Subscription=new Subscription(); 

  constructor(private http: HttpClient) {} 

  onFileSelected(event:any) { 
  const file:File = event.target.files[0];     
    if (file) { 
      this.fileName = file.name; 
      const formData = new FormData(); 
      formData.append("image", file); 

      const upload$ = this.http.post("/upload", formData, { 
        reportProgress: true, 
        observe: 'events' 
      }) 
      .pipe( 
        finalize(() => this.reset()) 
      );         
      this.uploadSub = upload$.subscribe(event => { 
        if (event.type == HttpEventType.UploadProgress) { 
          this.uploadProgress = Math.round(100 * (event.loaded / 
          event.total!)); 
        } 
      }) 
    } 
  } 
cancelUpload() { 
  this.uploadSub.unsubscribe(); 
  this.reset(); 
} 
reset() { 
  this.uploadProgress = 0; 
  this.uploadSub = new Subscription(); 
  } 
} 