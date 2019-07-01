import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TypeQuestionComponent } from '../components/type-question/type-question.component';

import { QuestionI } from '../models/question.interface';
import { QuestionsService } from '../services/questions.service';

import { ToastController } from '@ionic/angular';
import { TypeAnswerComponent } from '../components/type-answer/type-answer.component';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  questions: QuestionI[] = [];

  constructor(
    public modalController: ModalController,
    public questionService: QuestionsService,
    public toastController: ToastController
  ) { }

  async likeToast() {
    const toast = await this.toastController.create({
      message: 'You liked this question.',
      color: "love",
      buttons: [
        {
          side: 'start',
          icon: 'heart',
        }
      ],
      duration: 2000
    });
    toast.present();
  }

  async disLikeToast() {
    const toast = await this.toastController.create({
      message: 'You disliked this question.',
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

  async answeredToast() {
    const toast = await this.toastController.create({
      message: 'You question has been Archived',
      color: "secondary",
      buttons: [
        {
          side: 'start',
          icon: 'archive',
        }
      ],
      duration: 2000
    });
    toast.present();
  }

  async presentCreateQuestionModal() {
    const modal = await this.modalController.create({
      component: TypeQuestionComponent,
      componentProps: {
        data: 5
      }
    });
    await modal.present();
    // modal.onDidDismiss()
    // .then( res => alert(JSON.stringify(res)))
  }

  ngOnInit() {
    this.questionService.getQuestions().subscribe(res => this.questionService._questions = res);
  }

  removeQuestion(_id: string) {
    // console.log(_id);
    this.questionService.removeQuestion(_id);
  }

  likeQuestion(like: boolean, question: QuestionI, _id: string) {
    if (like) {
      this.likeToast()
      question.liked = true;
      console.log(question);
      this.questionService.updateQuestion(question, _id);
    }
    else {
      this.disLikeToast()
      question.liked = false;
      this.questionService.updateQuestion(question, _id);
      this.disLikeToast()
    }
  }

  archiveQuestion(question: QuestionI, _id: string) {
    this.answeredToast();
    question.archived = true;
    this.questionService.updateQuestion(question, _id);
  }

  selectQuestion(question: QuestionI, _id: string) {
    this.questionService._questionSelected = question;
    this.presentAnswerQuestionModal();
  }

  async presentAnswerQuestionModal() {
    const modal = await this.modalController.create({
      component: TypeAnswerComponent,
      componentProps: {
        data: 5
      }
    });
    await modal.present();
    // modal.onDidDismiss()
    // .then( res => alert(JSON.stringify(res)))
  }

}
