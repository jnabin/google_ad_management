import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) {}

  // Generic method for showing toaster messages
  showMessage(type: 'success' | 'error' | 'info' | 'warning', message: string, title?: string, options?: any) {
    switch (type) {
      case 'success':
        this.toastr.success(message, title, options);
        break;
      case 'error':
        this.toastr.error(message, title, options);
        break;
      case 'info':
        this.toastr.info(message, title, options);
        break;
      case 'warning':
        this.toastr.warning(message, title, options);
        break;
      default:
        console.error('Invalid message type');
    }
  }
}
