import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentPage: string = 'account';

  constructor(private userService: UserService,
              private router: Router, private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(value => {
      this.currentPage = value.get('tab');
    });
  }

  public openMenuTab(tabName: string) {
    this.currentPage = tabName;
    const urlTree = this.router.createUrlTree(['/profile'], {
      relativeTo: this.activatedRoute,
      queryParams: {
        tab: this.currentPage
      },
      queryParamsHandling: 'merge',
    });
    this.location.go(urlTree.toString());
  }
}
