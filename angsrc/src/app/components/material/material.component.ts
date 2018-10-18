import { Component, OnInit } from '@angular/core';
import { MaterialService } from '../../services/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})

export class MaterialComponent implements OnInit {
  materials;
  searchedMaterials;
  constructor(private _materialService: MaterialService) { }

  ngOnInit() {
    this._materialService.getAllMaterials().subscribe((data) => {
      this.materials = data;
      this.searchedMaterials = data;
    });
  }
  search(query){
    if(query.length >= 3) {
      this.searchedMaterials = this.materials.filter(
        (material) => {
          return material.name.toLowerCase().includes(query.toLowerCase());
          console.log('material name',material.name);
        });
      // console.log(this.searchedMaterials);
      // console.log(query.toLowerCase());
     }else{
       this.searchedMaterials = this.materials;
     }
  }

}
