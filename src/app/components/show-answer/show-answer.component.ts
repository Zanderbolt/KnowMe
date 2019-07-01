import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular'

@Component({
  selector: 'app-show-answer',
  templateUrl: './show-answer.component.html',
  styleUrls: ['./show-answer.component.scss'],
})
export class ShowAnswerComponent implements OnInit {
  @Input() data: any;
  constructor(public modalController: ModalController) { }

  async close() {
    await this.modalController.dismiss({
      userData: 3
    });
  }
  
  ngOnInit() {}

}
