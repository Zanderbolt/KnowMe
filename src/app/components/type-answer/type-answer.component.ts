import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular'
import { QuestionI } from '../../models/question.interface'
import { QuestionsService } from 'src/app/services/questions.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-type-answer',
  templateUrl: './type-answer.component.html',
  styleUrls: ['./type-answer.component.scss'],
})
export class TypeAnswerComponent implements OnInit {
  @Input() data: any;
  question: QuestionI = {
    question: '',
    answer: '',
    answered: false,
    liked: false,
    archived: false,
  };

  constructor(public modalController: ModalController,
    public questionsService: QuestionsService,
    public toastController: ToastController) { }

  async successfullToast() {
    const toast = await this.toastController.create({
      message: 'Your Answer has been saved Successfully',
      duration: 2000      
    });
    toast.present();
    
  }

  async warningToast() {
    const toast = await this.toastController.create({
      message: 'Answer in Blank, type something.',
      color: "alert",
      buttons: [
        {
          side: 'start',
          icon: 'alert',
        }
      ],
      duration: 2000
    });
    toast.present();
  }

  async close() {
    await this.modalController.dismiss();
  }

  addAnswer(question: QuestionI) {
    question.answered = true;
    this.questionsService.updateQuestion(question, question.id);      
    this.successfullToast();
    this.close();
  }


  ngOnInit() { }

}
