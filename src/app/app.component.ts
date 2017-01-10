import { 
  Component,
  Input,
  ViewEncapsulation
} from '@angular/core';

import { Article } from './article';

/**
 * COMPONENT
 * AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',   
  styleUrls: ['./app.component.css']
  , encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {}
