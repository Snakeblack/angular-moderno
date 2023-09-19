import { Component, Injector, OnInit, Signal, WritableSignal, computed, effect, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from '../services/users.service';
import { Users } from '../common/interfaces/users';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  // public users$!: Observable<Users[]>;
  public users!: Signal<Users[]>;

  public age: WritableSignal<number> = signal(0);
  public otherSignal: WritableSignal<any> = signal(0);
  public totalAge: Signal<number> = computed(() => this.age() * 2);

  constructor(private userService: UsersService, private injector: Injector) {
    // console.log(this.age());
  }

  ngOnInit() {
    this.users = this.userService.getUsers();

    effect(() => {
      console.log(`Age: ${this.age()}`);
      // console.log(untracked(this.otherSignal()));
      console.log(`TotalAge: ${this.totalAge()}`);
    }, {injector: this.injector})

    // this.age.set(1);
    // console.log(this.age());
    // this.age.update(value => value*2);
    // console.log(this.age());
    // this.age.mutate(obj => obj.age = 20);
  }

  public updateAge(){
    this.age.update(value => value+2);
  }
}
