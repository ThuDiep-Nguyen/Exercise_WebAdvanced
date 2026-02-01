import { Component } from '@angular/core';
import { BitcoinService } from '../myservices/bitcoin-service';

@Component({
  selector: 'app-ex28',
  standalone: false,
  templateUrl: './ex28.html',
  styleUrl: './ex28.css',
})
export class Ex28 {
  bitcoinData: any;
  errMessage: string = '';
  constructor(_service: BitcoinService) {
    _service.getBitcoinData().subscribe({
      next: (data) => {
        this.bitcoinData = data;
      },
      error: (err) => {
        console.error('Bitcoin API Error:', err);
        this.errMessage = err;
      },
    });
  }
}
