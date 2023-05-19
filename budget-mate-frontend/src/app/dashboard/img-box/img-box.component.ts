import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-img-box',
  templateUrl: './img-box.component.html',
  styleUrls: ['./img-box.component.css']
})
export class ImgBoxComponent implements OnInit, OnChanges {
  @Input() src: string = "";

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.src = changes['src'].currentValue;
    }
  }


}
