import { Component, OnInit } from '@angular/core';

import { MessageService } from 'primeng/api';
import { ToastService } from './toast.service';


@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


}
