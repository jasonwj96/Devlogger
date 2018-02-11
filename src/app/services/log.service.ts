import {Injectable, OnInit} from '@angular/core';
import {Log} from '../models/Log';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

@Injectable()
export class LogService implements OnInit {

  logs: Log[];
  //BehaviorSubject requires an  initial value that matches the type of data it holds(Log.ts interface)
  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  selectedLog = this.logSource.asObservable(); //convert to Observable

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable(); //convert to Observable


  constructor() {
    this.logs = [];
    /* this.logs = [
       {
         id: '1',
         text: 'Generated components',
         date: new Date('12/26/2017 12:54:23')
       },
       {
         id: '2',
         text: 'Added Bootstrap',
         date: new Date('12/27/2017 9:33:13')
       },
       {
         id: '3',
         text: 'Added logs component',
         date: new Date('12/26/2017 12:00:33')
       },
     ];*/
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    //Add to local storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.deleteLog(log);
    //adds the updated log
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs')); //JSON.parse() to convert from string to array
    }

    //sort the logs by date
    return of(this.logs.sort((a, b) => {return b.date - a.date;}));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  deleteLog(log: Log) {
    //delete the old log
    this.logs.forEach(
      //cur is each looped element in the array
      (cur, index) => {
        if (log.id === cur.id) {
          this.logs.splice(index, 1);
          /*index determines at what index to start deleting and
          deleteCount how much elements after index to  delete */
        }
      }
    );
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }

  ngOnInit() {
  }
}
