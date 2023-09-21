import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-Empresa',
  templateUrl: './home-Empresa.component.html',
  styleUrls: ['./home-Empresa.component.css']
})
export class HomeBarbeiroComponent implements OnInit {

  campoExemplo: string = '';

  constructor(private route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
        this.campoExemplo = params['campoExemplo'];
      });
    }
}
