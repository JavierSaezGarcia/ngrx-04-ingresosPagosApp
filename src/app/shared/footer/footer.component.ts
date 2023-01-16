import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [
  ]
})
export class FooterComponent {






    getYear(){
      const year = new Date();    
      return year.getFullYear();
    }

  

}
