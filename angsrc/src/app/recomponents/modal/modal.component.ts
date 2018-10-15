import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { ModalConfirmService } from '../../services/modal-confirm.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(private _modalService: NgbModal, 
    private _modalConfirmService : ModalConfirmService,
    private _notifierService : NotifierService,
    private _router: Router) {}
  closeResult;
  @Input('item') item : Input;
  @Input('itemType') itemType : Input;

  open(content) {
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // console.log(result);
      // console.log('item in model is ', this.item);
      const type = this.itemType;
      const navUrl = type + 's';

      console.log('type is '+type+' and nav URL is '+navUrl);
      this._modalConfirmService.remove(type, this.item['_id']).subscribe((res)=> {
        const msg = res;
        console.log(res);
        if(res['response']){
          this._notifierService.notify('warning', type+' has been deleted');
          setTimeout(()=>{
            this._router.navigate([navUrl]);
          }, 3000);
        }else{
          this._notifierService.notify('error', 'Could not delete the '+type);
        }
        
      });
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
  ngOnInit() {
  }

}
