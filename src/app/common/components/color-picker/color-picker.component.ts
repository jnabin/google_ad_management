import { Component, EventEmitter, forwardRef, Input, Output, signal, WritableSignal } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  imports: [],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent {
  @Input() label: string = 'Select Color'; // Label for the color picker
  @Input() set defaultColor(value: string) {
    this.color.set(this.ensureHexA(value)); // ✅ Convert RGB/RGBA to HEXA
  }

  color: WritableSignal<string> = signal('#000000FF'); // ✅ Signal for two-way binding

  @Output() colorChange = new EventEmitter<string>(); // Emits color change

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  // ✅ Writes the form control value into the component
  writeValue(value: string): void {
    this.color.set(this.ensureHexA(value || '#000000FF')); // Default to black with full opacity
  }

  // ✅ Registers change events for Reactive Forms
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // ✅ Registers touch event (for UI interaction)
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  // ✅ Updates color from picker or manual text input
  updateColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input && input.value) {
      const hexColor = this.ensureHexA(input.value); // ✅ Convert if needed
      this.color.set(hexColor);
      this.onChange(hexColor); // ✅ Notify form control
      this.colorChange.emit(hexColor); // ✅ Notify parent component (for Template-Driven Forms)
    }
  }

  // ✅ Convert RGB/RGBA to HEXA (If needed)
  private ensureHexA(color: string): string {
    if (color.startsWith('#')) {
      return color.length === 7 ? color + 'FF' : color; // Ensure alpha if missing
    }

    const rgbaMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]*)?\)$/);
    if (rgbaMatch) {
      // Extract RGB(A) values
      const r = parseInt(rgbaMatch[1], 10);
      const g = parseInt(rgbaMatch[2], 10);
      const b = parseInt(rgbaMatch[3], 10);
      const a = rgbaMatch[4] !== undefined ? Math.round(parseFloat(rgbaMatch[4]) * 255) : 255;

      return this.rgbToHexA(r, g, b, a);
    }
    return '#000000FF'; // Fallback color
  }

  // ✅ Converts RGB + Alpha to HEXA (`#RRGGBBAA`)
  private rgbToHexA(r: number, g: number, b: number, a: number): string {
    return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}${a.toString(16).padStart(2, '0').toUpperCase()}`;
  }
}
