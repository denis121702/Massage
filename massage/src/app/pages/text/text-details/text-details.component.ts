import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {MailerService} from '../../../services/text.service';

@Component({
  selector: 'app-text-details',
  templateUrl: './text-details.component.html',
  styleUrls: ['./text-details.component.css']
})

export class TextDetailsComponent implements OnInit {

  id: string;

  constructor(private route: ActivatedRoute,
              public mailerService: MailerService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
  }
}
