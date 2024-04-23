import { ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('body') body!:ElementRef;
public darkImage = '';
public LightImage = '';
constructor(private _render2: Renderer2,private _cdr: ChangeDetectorRef)
{

}

  capture() {
    // use opposite theme
    this._render2.setStyle(this.body.nativeElement,'background' ,'#9c9ca0' );
    this.canvasRender(this.body.nativeElement).then( (result) => {
      this.LightImage = result;
      this.canvasRender(this.body.nativeElement).then((resultNew) => {
        this.darkImage = resultNew;
        this._cdr.detectChanges();
      })
    }
    )
      // use current  theme
  this._render2.removeStyle(this.body.nativeElement,'background' );

  }
  canvasRender(element: HTMLElement) {
   return new Promise((resolve:(value: string) => void, reject) => {
    html2canvas(element).then(canvas => {
      resolve(canvas.toDataURL("image/png"));
  });
    });

  }
}
