import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './constraints.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConstraintsComponent {

}
