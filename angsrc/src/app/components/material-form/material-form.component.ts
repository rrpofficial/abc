import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MaterialService } from '../../services/material.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrls: ['./material-form.component.css']
})
export class MaterialFormComponent implements OnInit {
  material = {};
  materialForm : FormGroup = new FormGroup({
    name : new FormControl('', Validators.required),
    rate : new FormControl('', Validators.required),
    unit : new FormControl('', Validators.required)
  });

  constructor(
    private _materialService : MaterialService,
    private _router : Router,
    private _route : ActivatedRoute,
    private _notifierService : NotifierService
    ) {}

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    if (id) {
      this._materialService.getMaterialById(id).subscribe((res) => {
        this.material = res['data'];
        const name = res['data'].name;
        const rate = res['data'].rate;
        const unit = res['data'].unit;
        this.materialForm.get('name').setValue(name);
        this.materialForm.get('rate').setValue(rate);
        this.materialForm.get('unit').setValue(unit);
        console.log(name, rate, unit);
      });
    }
  }
  submitMaterialForm(){
    const id = this._route.snapshot.paramMap.get('id');
    if(id){
      // this._materialService.getMaterialById(id).subscribe((res)=>this.material=res);
      const name = this.materialForm.value.name;
      const rate = this.materialForm.value.rate;
      const unit = this.materialForm.value.unit;
 
      this._materialService.updateMaterial(id, name, rate, unit).subscribe((data)=>{
        console.log(data);
        if(data['success']){
          // this._flashMsgService.show('Material has been updated', { cssClass : 'alert-success', timeout : 3000 });
          this._notifierService.notify('success','Material has been updated');
          this._router.navigate(['/materials/']);
          // setTimeout(()=>{
          //   this._router.navigate(['/materials/']);
          // }, 3000)
        }
      });
    }else{
      //create material
      const name = this.materialForm.value.name;
      const rate = this.materialForm.value.rate;
      const unit = this.materialForm.value.unit;
      this._materialService.createMaterial(name, rate, unit).subscribe((data)=>{
        console.log(data);
        if(data['success']){
          this._notifierService.notify('success','Material has been created');
          this._router.navigate(['/materials/']);
          // setTimeout(()=>{
          //   this._router.navigate(['/materials/']);
          // }, 3000)
        }
      });
    }
  }
}