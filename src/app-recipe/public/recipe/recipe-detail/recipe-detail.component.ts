import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../shared/recipe';
import { RecipeService } from '../shared/recipe.service';
import { AlertService } from 'shared/popup/alert.service';
import { SeoService } from 'shared/seo/shared/seo.service';
import { ScrollService } from 'shared/scroll/shared/scroll.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  isLoading: boolean;
  scrollPos = 0;
  currentInstruction = 0;
  limitInstructionReached = false;

  constructor(private element: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private recipeService: RecipeService,
              private seoService: SeoService,
              private localizeRouterService: LocalizeRouterService,
              private scrollService: ScrollService) {
    this.isLoading = true;
    this.seoService.setSeo('recipe-detail');
  }

  @HostListener('window:scroll', ['$event.target'])
  onScroll(target: any) {
    this.scrollPos = target ? target.scrollTop || target.body.scrollTop || 0 : 0;
    const componentPosition = this.element.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    console.log(this.scrollPos, componentPosition, scrollPosition);
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.slug) {
        const key = params.slug.substring(0, params.slug.indexOf('-'));
        this.recipeService.getRecipe(key)
          .subscribe((recipe: Recipe) => {
            this.recipe = recipe;
            this.isLoading = false;
          }, () => {
            this.alertService.show('error.api.errors');
            this.isLoading = false;
          });
      }
    });
  }

  onTop() {
    this.currentInstruction = 0;
    this.scrollService.scrollToTop();
    this.limitInstructionReached = false;
  }

  onMore() {
    // @todo on scrollTop Stop the limit reached

    if (this.limitInstructionReached === false) {
      const instructions: NodeList = document.querySelectorAll('.instruction-card');
      instructions.forEach((instruction: HTMLElement, index) => {
        if (this.currentInstruction === index) {
          // this.router.navigate(
          //   [
          //     this.localizeRouterService.translateRoute('recipes'),
          //     `${this.recipe.key}-${this.recipe.slug}`
          //   ],
          //   {fragment: `instruction-${index}`}
          // );
          this.scrollService.scrollTo(instruction, 500).subscribe();
        }
      });
      this.currentInstruction++;
      if (this.currentInstruction === instructions.length) {
        this.limitInstructionReached = true;
      }
    }
  }
}
