import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalizeRouterService } from 'localize-router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Filter } from '../../facet/filter/shared/filter';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {

  documents: any[] = [];
  filteredDocuments: any[] = [];

  form: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  url: string;

  mqAlias: string;

  @Output() queryChange: EventEmitter<{limit?: number, filters?: Filter[]}> = new EventEmitter<{limit?: number, filters?: Filter[]}>();

  constructor(public dialogRef: MatDialogRef<SearchDialogComponent>,
              private router: Router,
              private localizeService: LocalizeRouterService,
              private mediaObserver: MediaObserver,
              @Inject(MAT_DIALOG_DATA) public data: {documents: any[], url: string}) {
    this.setDocuments(this.data.documents);
    this.setUrl(this.data.url);
  }

  ngOnInit() {
    this.mediaObserver.asObservable().subscribe((mediaChanges: MediaChange[]) => {
      if (mediaChanges.length) {
        this.mqAlias = mediaChanges[0].mqAlias;
      }
    });
  }

  onQuery(query: {limit?: number, filters?: Filter[]}) {
    if (query) {
      this.queryChange.emit(query);
    }
  }

  /**
   * filtre les produits récupérés en fonction de l'entrée utilisateur
   * val l'entrée utilisateur
   */
  filter(val: string): any[] {
    return this.documents.filter((document: any) => {
      return document.name.toLowerCase().includes(val.toLowerCase());
    });
  }

  /**
   * Update url from menu component when user click on search-dialog button
   */
  setUrl(url: string) {
    this.url = url;
  }

  /**
   * récupère les produits de l'API et envoie les entrées utilisateurs
   * dans la barre de recherche vers le filtre
   */
  setDocuments(documents: any[]) {
    if (documents) {
      this.documents = documents;

      const valueChanges$: Subscription = this.observeDocumentsChange();

      return;
    }
  }

  observeDocumentsChange(): Subscription {
    return this.form.controls.search.valueChanges
      .pipe(
        map((value: string) => {
          return this.filter(value);
        }),
        // tap(this.onQuery({
        //   limit: 100,
        //   // filters: [
        //   //   {
        //   //     column: 'name',
        //   //     operator: '==', // @todo problems with equal, really needs LIKE %%
        //   //     value: value
        //   //   }
        //   // ]
        // })),
      )
      .subscribe((value) => {
        this.filteredDocuments = value;
      });
  }

  /**
   * envoie les produits filtrés à la page de résultats et navigue vers elle
   */
  getResults() {
    this.router.navigate(
      [this.localizeService.translateRoute(this.url)],
      {queryParams: {r: this.form.get('search').value}});
    this.dialogRef.close();
  }

  /**
   * permet de naviguer vers la page detail
   * du produit choisi par l'utilisateur
   * et de fermer la modale
   * id id du produit à voir
   */
  seeDocument(document: {key: string}) {
    this.router.navigate([this.localizeService.translateRoute(`/${this.url}/${document.key}`)]).then((b) => {
      if (b) {
        this.dialogRef.close();
      }
    });
  }
}
