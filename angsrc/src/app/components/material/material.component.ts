import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materials: any;
  constructor(private _materialService: MaterialService) { }

  ngOnInit() {
    this._materialService.getAllMaterials().subscribe(data => this.materials = data);
  }

}
