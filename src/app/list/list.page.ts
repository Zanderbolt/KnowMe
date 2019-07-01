import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ShowAnswerComponent } from '../components/show-answer/show-answer.component'

import { TypeQuestionComponent } from '../components/type-question/type-question.component';

import { QuestionI } from '../models/question.interface';
import { QuestionsService } from '../services/questions.service';

import { ToastController } from '@ionic/angular';
import { TypeAnswerComponent } from '../components/type-answer/type-answer.component';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  constructor(public modalController: ModalController,
    public questionService: QuestionsService,
    public toastController: ToastController) {

  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ShowAnswerComponent,
      componentProps: {
        data: 5
      }
    });
    await modal.present();
    modal.onDidDismiss()
      .then(res => alert(JSON.stringify(res)))
  }


  ngOnInit() {
    this.questionService.getQuestions().subscribe(res => this.questionService._questions = res);
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

  removeQuestion(_id: string) {
    // console.log(_id);
    this.questionService.removeQuestion(_id);
  }

}
