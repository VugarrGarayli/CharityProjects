import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
export interface Event {
  id: number;
  title: string;
  image: string;
  description: string;
  raised: number;
  goal: number;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  events: Event[] = [

      {
        id: 1,
        title: 'Child Education in Africa',
        image: 'assets/images/events/image_08.jpg',
        description: '',
        raised: 34425,
        goal: 500000,
      },
      {
        id: 2,
        title: 'Healthcare Support in Asia',
        image: 'assets/images/events/image_06.jpg',
        description:
          'Full description about the event in Asia and how it supports healthcare...',
        raised: 25000,
        goal: 400000,
      },
      {
        id: 3,
        title: 'Clean Water Initiative in South America',
        image: 'assets/images/events/image_09.jpg',
        description: 'Providing clean water solutions to remote villages in South America...',
        raised: 15000,
        goal: 300000,
      },
      {
        id: 4,
        title: 'Education for Girls in Middle East',
        image: 'assets/images/events/image_10.jpg',
        description: 'Empowering young girls through education in rural areas of the Middle East...',
        raised: 8000,
        goal: 200000,
      },
      {
        id: 5,
        title: 'Disaster Relief in the Caribbean',
        image: 'assets/images/events/image_11.jpg',
        description: 'Supporting communities affected by hurricanes in the Caribbean...',
        raised: 12000,
        goal: 250000,
      },
      {
        id: 6,
        title: 'Wildlife Conservation in Africa',
        image: 'assets/images/events/image_12.jpg',
        description: '',
        raised: 22000,
        goal: 350000,
      },
      {
        id: 7,
        title: 'Food Security in Southeast Asia',
        image: 'assets/images/events/image_13.jpg',
        description: 'Ensuring food security for vulnerable populations in Southeast Asia...',
        raised: 18000,
        goal: 150000,
      },
      {
        id: 8,
        title: 'Refugee Support in Europe',
        image: 'assets/images/events/image_14.jpg',
        description: 'Providing essential services and support to refugees in Europe...',
        raised: 9000,
        goal: 100000,
      },
      {
        id: 9,
        title: 'Mental Health Awareness in North America',
        image: 'assets/images/events/image_15.jpg',
        description: '',
        raised: 6000,
        goal: 50000,
      },
      {
        id: 10,
        title: 'Housing for the Homeless in Australia',
        image: 'assets/images/events/image_16.jpg',
        description: 'Building shelters and providing resources for homeless individuals in Australia...',
        raised: 35000,
        goal: 400000,
      },

    
    // Add more events as needed
  ];

  constructor(private location: Location) {}

  selectedEvent: Event | null = null;

  // Method to select an event and view its details
  selectEvent(event: Event) {
    this.selectedEvent = event;
    window.scrollTo(0, 0);
    history.pushState(null, '', location.href); // Scroll to the top when the new page is loaded
  }

  // Method to deselect the event and return to the event list
  deselectEvent() {
    this.selectedEvent = null;
  }

  ngOnInit() {
    window.onpopstate = () => {
      if (this.selectedEvent) {
        this.deselectEvent();
      }
    };
  }
}
