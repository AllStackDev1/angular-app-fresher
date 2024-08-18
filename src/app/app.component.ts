import { Component } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import {
  Router,
  RouterOutlet,
  NavigationEnd,
  ActivatedRoute,
} from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.firstChild;
          while (route?.firstChild) {
            route = route.firstChild;
          }
          return route ? 'Tech Care | ' + route.snapshot.data['title'] : 'Tech Care';
        })
      )
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }
}
