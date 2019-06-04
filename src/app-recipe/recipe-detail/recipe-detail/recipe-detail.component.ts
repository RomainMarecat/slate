import { ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertService } from '../../../shared/popup/alert.service';
import { SeoService } from '../../../shared/seo/shared/seo.service';
import { ScrollService } from '../../../shared/scroll/shared/scroll.service';
import { LocalizeRouterService } from 'localize-router';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/overlay';
import { take, timeout } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { TranslateService } from '@ngx-translate/core';
import { Recipe } from '../../recipe/shared/recipe';
import { Constraint } from '../../recipe/shared/constraint';
import { RecipeService } from '../../recipe/shared/recipe.service';
import { MenuService } from '../../../shared/menu/menu.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  isLoading: boolean;
  currentInstruction = 0;
  limitInstructionReached = false;
  constraints: Array<Constraint> = [];
  previousPosition: number;
  top: number;
  schema: Object = {};
  total = 0;
  mqAlias: string;

  scrollSubscriber: Subscription;

  constructor(private element: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private alertService: AlertService,
              private recipeService: RecipeService,
              private seoService: SeoService,
              private localizeRouterService: LocalizeRouterService,
              private scrollService: ScrollService,
              private scrollDispatcher: ScrollDispatcher,
              private mediaObserver: MediaObserver,
              private menuService: MenuService,
              private cd: ChangeDetectorRef,
              private translateService: TranslateService) {
    this.isLoading = true;
    this.seoService.setSeo('recipe-detail');
    this.getRecipe();
    this.menuService.nextTitle('');
  }

  ngOnInit() {
    this.seoService.disableZoom();
    this.mediaObserver.asObservable().subscribe((mediaChange: MediaChange[]) => {
      if (mediaChange.length) {
        this.mqAlias = mediaChange[0].mqAlias;
      }
    });
  }

  ngOnDestroy() {
    this.seoService.reactiveZoom();
  }

  /**
   * On display recipe title, set constraint of instructions with offset height title
   */
  onRecipeTitleOffsetChange(height: number, reset?: boolean) {
    // 0 means that block was display none;
    if (height > 0) {

      if (reset) {
        this.total = 0;
      }
      this.setConstraints(height);
    }
  }

  /**
   * Get schema.org recipe schema
   */
  getSchemaDetail(recipe: Recipe) {
    if (recipe) {
      this.schema = this.recipeService.getDetailSchema(recipe);
    }
  }

  /**
   * Get Recipe data id
   */
  getRecipe() {
    this.route.params.subscribe((params: Params) => {
      if (params.slug) {
        const key = params.slug.substring(0, params.slug.indexOf('-') !== -1 ? params.slug.indexOf('-') : params.slug.length);
        this.recipeService.getRecipe(key)
          .pipe(take(1), timeout(20000))
          .subscribe((recipe: Recipe) => {
            this.recipe = recipe;
            this.isLoading = false;
            this.getSchemaDetail(recipe);
            this.seoService.setSeo('recipe-detail', {name: recipe.name});
          }, () => {
            this.alertService.show('error.api.errors');
            this.isLoading = false;
          });
      }
    });
  }

  /**
   * Set Default instructions
   */
  setConstraints(offsetHeight: number) {
    this.constraints = [];
    this.constraints.push({index: 0, min: this.total, max: this.total + offsetHeight});
    this.total += offsetHeight;

    const instructionsElements = document.querySelectorAll('.instruction-card');
    this.recipe.instructions.forEach((ins, index) => {
      if (instructionsElements.length) {
        const htmlElement = (instructionsElements[index] as HTMLElement);
        let itemSize: number = this.total + htmlElement.offsetHeight;
        if (index === this.recipe.instructions.length - 1) {
          itemSize = 99999;
        }
        this.constraints.push({index: index + 1, min: (this.total) + 1, max: itemSize});
        this.total += htmlElement.offsetHeight + 32;
      }
    });
    this.subscribeToScroll();
  }

  /**
   * detect all scroll movement and animate movements
   */
  subscribeToScroll() {
    if (this.scrollSubscriber) {
      this.total = 0;
      this.scrollSubscriber.unsubscribe();
    }

    this.scrollSubscriber = this.scrollDispatcher.scrolled(200)
      .subscribe((cdkScrollable: CdkScrollable) => {
        const bottom: number = cdkScrollable.measureScrollOffset('bottom');
        this.top = cdkScrollable.measureScrollOffset('top');

        let offsetActive = 0;
        if (this.currentInstruction > 1 && this.mqAlias !== 'xs') {
          offsetActive = 0;
        }

        const filteredInstructions = this.constraints.filter((constraint) => {
          return constraint.min <= (this.top - offsetActive) && constraint.max >= (this.top - offsetActive);
        });

        this.scrollOnInstructions(filteredInstructions, bottom);
      });
  }

  scrollOnInstructions(filteredInstructions: Constraint[], bottom: number) {
    this.limitInstructionReached = false;
    if (filteredInstructions.length > 0) {
      this.currentInstruction = filteredInstructions[0].index;
      // If scroll bottom
      if ((this.currentInstruction > 0 && this.previousPosition < this.top)) {
        this.cd.detectChanges();
      }

      // Scroll top refresh pointer and banner
      if (this.previousPosition > this.top) {
        setTimeout(() => {
          this.cd.detectChanges();
        }, 200);
      }

      if (this.currentInstruction === this.recipe.instructions.length || bottom === 0) {
        this.currentInstruction = this.recipe.instructions.length;
        this.limitInstructionReached = true;
        this.cd.detectChanges();
      }
      this.previousPosition = this.top;
    }
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
          this.scrollService.scrollTo(instruction, 500).subscribe();
        }
      });

      this.nextStep();

      if (this.currentInstruction === instructions.length) {
        this.limitInstructionReached = true;
        this.cd.detectChanges();
      }
    }
  }

  nextStep() {
    this.currentInstruction++;
  }
}
