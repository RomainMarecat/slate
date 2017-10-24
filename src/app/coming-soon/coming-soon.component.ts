import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.addTags([
      { name: 'title', content: 'Mon pull Moche' },
      { property: 'keywords', content: 'pull moche noël pas beau ugly sweat' },
      {
        name: 'description',
        content: 'Mon pull moche propose les pulls les plus moches.' +
          ' Ajoute ton pull et découvre la note que les internautes lui ont attribué.'
      },
    ]);
  }
}
