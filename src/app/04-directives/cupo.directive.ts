import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appCupo]'
})
export class CupoDirective {

  @Input() appCupo:number;

  constructor(private el: ElementRef) { 
  }

  ngOnInit(): void {
    this.el.nativeElement.style.backgroundColor = this.getBackgroundColor();
  }

  private getBackgroundColor(){
    let color:string = "#6c757d"; //secondary

    if(this.appCupo){
      if(this.appCupo > 10 && this.appCupo <= 20){
        color = "brown";
      }
      else if(this.appCupo > 20){
        color = "blueviolet";
      }
    }
        
    return color;
  }
}
