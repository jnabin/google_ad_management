import { NgIf } from '@angular/common';
import { Component, ElementRef, EventEmitter, forwardRef, HostListener, Input, Output, signal, ViewChild, WritableSignal } from '@angular/core';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload-input',
  imports: [FormsModule, NgIf],
  templateUrl: './file-upload-input.component.html',
  styleUrl: './file-upload-input.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileUploadInputComponent),
      multi: true
    }
  ]
})
export class FileUploadInputComponent {
  @Input() label: string = 'Upload File';
  @Input() accept: string = '*';

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>; // ✅ Reference to file input

  file: WritableSignal<File | null> = signal(null);
  dragOver = signal(false);

  @Output() fileChange = new EventEmitter<File | null>();

  onChange: (file: File | null) => void = () => {};
  onTouched: () => void = () => {};

  // ✅ Opens file input manually
  openFileDialog(): void {
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.click();
    }
  }

  // ✅ Handles manual file selection
  handleFileInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.updateFile(input.files[0]);
    }
  }

  // ✅ Handles drag & drop file selection
  handleDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(false);
    if (event.dataTransfer?.files.length) {
      this.updateFile(event.dataTransfer.files[0]);
    }
  }

  // ✅ Updates the file and notifies Angular forms
  updateFile(file: File | null): void {
    this.file.set(file);
    this.onChange(file);
    this.fileChange.emit(file);
  }

  // ✅ Clears the selected file without opening file picker
  clearFile(event: Event): void {
    event.stopPropagation(); // ✅ Prevents file selection dialog
    this.updateFile(null);

    // ✅ Reset the file input value to allow re-selection of the same file
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  // ✅ Reactive Forms Integration
  writeValue(file: File | null): void {
    this.file.set(file);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ✅ Drag & Drop Events
  @HostListener('dragover', ['$event'])
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(true);
  }

  @HostListener('dragleave', ['$event'])
  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.dragOver.set(false);
  }
}
