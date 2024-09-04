import { Component } from '@angular/core';
import { Location } from '@angular/common';
export interface Blog {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  date: string; // Date field added
}
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent {
  blogs: Blog[] = [
    {
      id: 1,
      title: 'Methods of Recruitment',
      imageUrl: 'assets/images/events/image_01.jpg',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam justo neque...',
      date: 'By Admin | August 10 2018',
    },
    {
      id: 2,
      title: 'Healthcare Support in Asia',
      imageUrl: 'assets/images/events/image_02.jpg',
      description:
        'Full description about the event in Asia and how it supports healthcare...',
      date: 'By Admin | August 15 2016',
    },
    // More blog entries...
  ];

  selectedBlog: Blog | null = null;

  selectBlog(blog: Blog) {
    this.selectedBlog = blog;
    window.scrollTo(0, 0);
    history.pushState(null, '', location.href);
  }

  deselectBlog() {
    this.selectedBlog = null;
  }
  ngOnInit() {
    window.onpopstate = () => {
      if (this.selectBlog) {
        this.deselectBlog();
      }
    };
  }
}
