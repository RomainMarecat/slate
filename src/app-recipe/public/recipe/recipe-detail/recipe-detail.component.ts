import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../shared/recipe';
import { RecipeService } from '../shared/recipe.service';
import { AlertService } from 'shared/popup/alert.service';
import { SeoService } from 'shared/seo/shared/seo.service';
import { ScrollService } from 'shared/scroll/shared/scroll.service';
import { LocalizeRouterService } from '@gilsdav/ngx-translate-router';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, AfterViewInit {
  recipe: Recipe;
  isLoading: boolean;
  currentInstruction = 0;
  limitInstructionReached = false;
  constraints: Array<{index: number, min: number, max: number}> = [];
  previousPosition: number;

  constructor(private element: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private recipeService: RecipeService,
              private seoService: SeoService,
              private localizeRouterService: LocalizeRouterService,
              private scrollService: ScrollService,
              private scrollDispatcher: ScrollDispatcher,
              private cd: ChangeDetectorRef) {
    this.isLoading = true;
    this.seoService.setSeo('recipe-detail');
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params.slug) {
        const key = params.slug.substring(0, params.slug.indexOf('-'));
        this.recipeService.getRecipe(key)
          .subscribe((recipe: Recipe) => {
            this.recipe = recipe;
            this.isLoading = false;
            this.setConstraints();
          }, () => {
            this.alertService.show('error.api.errors');
            this.isLoading = false;
          });
      }
    });
    this.subscribeToScroll();
  }

  ngAfterViewInit() {
  }

  setConstraints() {
    let total = 0;
    this.constraints.push({index: 0, min: total, max: total + 800});
    total += 800;
    const instructionsElements = document.querySelectorAll('.instruction-card');
    this.recipe.instructions.forEach((ins, index) => {
      if (instructionsElements.length) {
        const htmlElement = (instructionsElements[index] as HTMLElement);
        let itemSize: number = total + htmlElement.offsetHeight;
        if (index === this.recipe.instructions.length - 1) {
          itemSize = 99999;
        }
        this.constraints.push({index: index + 1, min: (total) + 1, max: itemSize});
        total += htmlElement.offsetHeight + 32;
      }
    });
  }

  subscribeToScroll() {
    this.scrollDispatcher.scrolled(200)
      .subscribe((cdkScrollable: CdkScrollable) => {
        const bottom: number = cdkScrollable.measureScrollOffset('bottom');
        const top: number = cdkScrollable.measureScrollOffset('top');
        const filteredInstructions = this.constraints.filter((constraint) => {
          return constraint.min < top && constraint.max > top;
        });

        this.limitInstructionReached = false;
        if (filteredInstructions.length > 0) {
          this.currentInstruction = filteredInstructions[0].index;
          // If scroll bottom
          if ((this.currentInstruction > 0 && this.previousPosition < top)) {
            this.cd.detectChanges();
          }
          // If scroll top before instruction
          if (this.currentInstruction === 0) {
            setTimeout(() => {
              this.cd.detectChanges();
            });
          }

          if (this.currentInstruction === this.recipe.instructions.length || bottom === 0) {
            this.currentInstruction = this.recipe.instructions.length;
            this.limitInstructionReached = true;
            this.cd.detectChanges();
          }
          this.previousPosition = top;
        }
      });
  }

  onTop() {
    const instructions = document.querySelectorAll('.instruction-card');
    this.scrollService.scrollTo(instructions[0] as HTMLElement, 500)
      .subscribe(() => {
          this.currentInstruction = 0;
          this.limitInstructionReached = false;
          this.cd.detectChanges();
        }
      );
  }

  onMore() {
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
        this.cd.detectChanges();
      }
    }
  }
}
