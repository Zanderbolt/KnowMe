import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { QuestionI } from '../../models/question.interface'
import { QuestionsService } from 'src/app/services/questions.service';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-type-question',
  templateUrl: './type-question.component.html',
  styleUrls: ['./type-question.component.scss'],
})
export class TypeQuestionComponent implements OnInit {
  @Input() data: any;
  question: QuestionI = {
    question: '',
    answer: '',
    answered: false,
    liked: false,
    archived: false
  };

  constructor(
    public modalController: ModalController,
    public questionsService: QuestionsService,
    public toastController: ToastController
  ) { }

  async successfullToast() {
    const toast = await this.toastController.create({
      message: 'Your question has been saved Successfully',
      duration: 2000
    });
    toast.present();
  }

  async warningToast() {
    const toast = await this.toastController.create({
      message: 'Question in Blank, type something.',
      color: "alert",
      buttons: [
        {
          side:'start',
          icon: 'alert',
        }
      ],
      duration: 2000
    });
    toast.present();
  }

  async close() {
    await this.modalController.dismiss();
    // await this.modalController.dismiss({
    //   userData: 3
    // });
  }

  addQuestion() {
    if (this.question.question != '') {
      this.questionsService.addQuestion(this.question);
      this.close();
      this.successfullToast();
    }
    else {
      this.warningToast();
    }

  }

  ngOnInit() { }

}
