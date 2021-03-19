/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/empty';
import { Subject } from 'rxjs';

// Provide a dummy router class imlementation and light weight implementation
class RouterStub {
  navigate(params) {
  }
}

class ActivatedRouteStub {
  private subject = new Subject();

  push(value) {
    this.subject.next(value);
  }

  // It is a property but looks as function
  get params() {
    return this.subject.asObservable();
  }
}

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        { provide: Router, useClass: RouterStub },
        { provide: ActivatedRoute, useClass: ActivatedRouteStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect the user to the user page after saving', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    component.save();

    expect(spy).toHaveBeenCalledWith(['Users']);
  });

  it('should navigate the user to the not found page when an invalid user id is passed', () => {
    let router = TestBed.get(Router);
    let spy = spyOn(router, 'navigate');

    let route: ActivatedRouteStub = TestBed.get(ActivatedRoute);
    route.push({ id: 0 });

    expect(spy).toHaveBeenCalledWith(['not-found']);
  });
});
