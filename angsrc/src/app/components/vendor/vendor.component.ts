import { VendorService } from './../../services/vendor.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  vendors;
  constructor(private _vendorService: VendorService) { }

  ngOnInit() {
    this._vendorService.getAllVendors().subscribe((data) => {
      this.vendors = data;
    });
  }

}
