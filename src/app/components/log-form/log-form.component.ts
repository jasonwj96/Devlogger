import {Component, OnInit} from '@angular/core';
import {LogService} from '../../services/log.service';
import {Log} from '../../models/Log';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew: boolean = true;

  constructor(private logService: LogService) {
  }

  ngOnInit() {
    // Subscribe to the selectedLog observable
    this.logService.selectedLog.subscribe(
      log => {
        if (log.id !== null) {
          this.isNew = false;
          this.id = log.id;
          this.text = log.text;
          this.date = log.date;
        }
      }
    );
  }

  //onSubmit checks if the current log is a new one
  onSubmit() {
    if (this.isNew) {
      //create a new log if it's new
      const newLog: Log = {
        id: this.generateId(), //generated id
        text: this.text, //the text in the form
        date: new Date()
      };
      this.logService.addLog(newLog);

    } else {
      //create log to be updated
      const updLog: Log = {
        id: this.id,
        text: this.text,
        date: new Date()
      };
      //update log
      this.logService.updateLog(updLog);
    }
    this.clearState();
  }

  //clear state
  clearState() {
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.logService.clearState();
  }

  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
