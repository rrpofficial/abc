import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services/product.service';
import { ModalConfirmService } from '../../services/modal-confirm.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';


// @Component({
//   selector: 'ngbd-modal-confirm-autofocus',
//   template: `
//   <div class="modal-header">
//     <h4 class="modal-title" id="modal-title"> Deletion</h4>
//     <button type="button" class="close" aria-label="Close button" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
//       <span aria-hidden="true">&times;</span>
//     </button>
//   </div>
//   <div class="modal-body">
//     <p><strong>Are you sure you want to delete?</strong></p>
//     <p>All information associated to this will be permanently deleted.
//     <span class="text-danger">This operation can not be undone.</span>
//     </p>
//   </div>
//   <div class="modal-footer">
//     <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
//     <button type="button" ngbAutofocus class="btn btn-danger" (click)="modal.close('Ok click')">Delete</button>
//   </div>
//   `
// })
// export class NgbdModalConfirmAutofocus {
//   closeResult;

//   constructor(public modal: NgbActiveModal, private _modalService : NgbModal) {}
//   open(content) {
//     this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
//       this.closeResult = `Closed with: ${result}`;
//       console.log(result);
//     });
//   }
// }


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  constructor(private _modalService: NgbModal, 
    private _modalConfirmService : ModalConfirmService,
    private _flashMsgService : FlashMessagesService,
    private _router: Router) {}
  closeResult;
  @Input('item') item : Input;
  @Input('itemType') itemType : Input;
  // open() {
  //   this._modalService.open(NgbdModalConfirmAutofocus);
  
  // }
  open(content) {
    this._modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      // console.log(result);
      // console.log('item in model is ', this.item);
      this._modalConfirmService.remove(this.itemType, this.item['_id']).subscribe((res)=> {
        const msg = res;
        console.log(res);
        if(res['response']){
          this._flashMsgService.show('Item has been deleted', {cssClass:'alert-success', timeout : 3000});
          setTimeout(()=>{
            this._router.navigate(['products']);
          }, 3000);
        }else{
          this._flashMsgService.show('Could not delete the item', {cssClass:'alert-danger', timeout : 3000});
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
