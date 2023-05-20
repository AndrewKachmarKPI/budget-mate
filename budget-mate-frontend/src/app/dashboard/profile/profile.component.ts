import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {FileService} from "../../_services/file.service";
import {FileDto} from "../../models/file-dto";
import {UserDto} from "../../auth/models/user-dto";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public currentPage: string = 'account';
  public files: FileDto[] = [];
  public userDto: UserDto;

  constructor(private userService: UserService, private fileService: FileService,
              private router: Router, private location: Location,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe(value => {
      this.currentPage = value.get('tab');
    });
    this.getAvatars();
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

  public getAvatars() {
    this.fileService.getAllDefaultAvatars().subscribe({
      next: (files) => {
        this.files = files;
      }
    });
  }
}
