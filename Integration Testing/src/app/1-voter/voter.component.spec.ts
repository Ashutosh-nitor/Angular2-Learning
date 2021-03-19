import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { TodoService } from 'app/2-todos/todo.service';
import { VoterComponent } from './voter.component';

describe('VoterComponent', () => {
  let component: VoterComponent;
  let fixture: ComponentFixture<VoterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ], 
      declarations: [VoterComponent],
      providers: [ TodoService ]
    });

    component = fixture.componentInstance;
    fixture = TestBed.createComponent(VoterComponent);
    fixture.detectChanges();
  });

  it('should render total votes', () => {
    component.othersVote = 20;
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.vote-count'));
    let el: HTMLElement = de.nativeElement;

    expect(el.innerText).toContain(21);
  });

  it('should highlight the upvote button if I have upvoted', () => {
    component.myVote = 1;
    fixture.detectChanges();

    let de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    // de.classes 
    // de.attributes
    // de.styles
    expect(de.classes['highlighted']).toBeTruthy();
  });

  it('should increase the votes when I click on upvote button', () => {
    component.myVote = 1;
    fixture.detectChanges();

    let button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
    button.triggerEventHandler('click', null);
    expect(component.totalVotes).toBe(1);
  });
});
