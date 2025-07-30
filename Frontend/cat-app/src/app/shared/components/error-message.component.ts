import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="alert alert-danger alert-dismissible fade show" role="alert" *ngIf="message">
      <i class="bi bi-exclamation-triangle-fill me-2"></i>
      <strong>{{ title }}</strong> {{ message }}
      <button 
        type="button" 
        class="btn-close" 
        (click)="onDismiss()"
        *ngIf="dismissible">
      </button>
    </div>
  `,
  styles: [`
    .alert {
      margin: 1rem 0;
    }
    
    .bi {
      font-size: 1.1rem;
    }
  `]
})
export class ErrorMessageComponent {
  @Input() message: string = '';
  @Input() title: string = 'Error:';
  @Input() dismissible: boolean = true;
  @Output() dismissed = new EventEmitter<void>();

  onDismiss(): void {
    this.message = '';
    this.dismissed.emit();
  }
}
