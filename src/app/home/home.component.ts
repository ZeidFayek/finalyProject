import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, Validators,FormControl, FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule,CarouselModule,NgIf],
  
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private readonly _NgxSpinnerervice = inject(NgxSpinnerService);

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    autoplay: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    navText: [
      '<i class="fa-solid fa-chevron-left"></i>',
      '<i class="fa-solid fa-chevron-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      450: {
        items: 2,
      },
      740: {
        items: 2,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    AOS.init({
      duration: 1000, 
      easing: 'ease-in-out', 
      once: true,
    });

    this._NgxSpinnerervice.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this._NgxSpinnerervice.hide();
    }, 1000);    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    AOS.refresh(); 
  }
  contactForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    message: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });
  onSubmit() {
    alert('Hello');
    if (this.contactForm.valid) {
      console.log('Form Data:', this.contactForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
