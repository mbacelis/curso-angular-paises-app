import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-pais-input',
  templateUrl: './pais-input.component.html'
})
export class PaisInputComponent implements OnInit {

  @Input() placeholder: string = "";
  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  debouncer: Subject<string> = new Subject();

  termino: string = "";

  constructor() { }

  ngOnInit(): void {
    this.debouncer
      .pipe(debounceTime(300))
      .subscribe(valor => {
        this.onDebounce.emit(valor);
    })
  }

  buscar() {
    console.log(this.termino);
    this.onEnter.emit(this.termino);
  }

  teclaPresionada(event: any) {
    const valor = event.target.value;
    this.debouncer.next(this.termino);
  }

}
