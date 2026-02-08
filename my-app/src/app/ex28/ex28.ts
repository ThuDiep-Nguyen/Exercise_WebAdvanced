import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { BitcoinService } from '../myservices/bitcoin-service';

@Component({
  selector: 'app-ex28',
  standalone: false,
  templateUrl: './ex28.html',
  styleUrl: './ex28.css',
})
export class Ex28 implements OnInit {
  bitcoinData: any;
  errMessage: string = '';
  constructor(private _service: BitcoinService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this._service.getBitcoinData().subscribe({
      next: (data) => {
        this.bitcoinData = data;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('Bitcoin API Error:', err);
        this.errMessage = err;
        this.cd.detectChanges();
      },
    });
  }
}
