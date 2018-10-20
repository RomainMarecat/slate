import { Component, Input, OnInit } from '@angular/core';
import { PartnerService } from '../partner.service';
import { Observable } from 'rxjs';
import { Partner } from '../partner';

@Component({
  selector: 'app-partner-name',
  templateUrl: './partner-name.component.html',
  styleUrls: ['./partner-name.component.scss']
})
export class PartnerNameComponent implements OnInit {
  @Input() key: string;
  partner$: Observable < Partner > ;

  constructor(private partnerService: PartnerService) {}

  ngOnInit() {
    if (this.key) {
      this.partner$ = this.partnerService.getPartner(this.key);
    }
  }

}
