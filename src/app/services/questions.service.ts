import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { QuestionI } from '../models/question.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questionsCollection: AngularFirestoreCollection<QuestionI>;
  private questions: Observable<QuestionI[]>
  _questions : QuestionI[] = [];
  _questionSelected : QuestionI;

  constructor(db: AngularFirestore) { 
    this.questionsCollection = db.collection<QuestionI>('questions');
    this.questions = this.questionsCollection.snapshotChanges()
    .pipe(map (
      actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, ... data};
        })
      }
    ))
  }

  getQuestions() {
    return this.questions;
  }

  getQuestion(_id: string) {
    return this.questionsCollection.doc<QuestionI>(_id).valueChanges();
  }

  updateQuestion(question: QuestionI, _id: string) {
    return this.questionsCollection.doc(_id).update(question);
  }

  addQuestion(question: QuestionI) {
    return this.questionsCollection.add(question);
  }
  
  removeQuestion(_id: string) {
    return this.questionsCollection.doc(_id).delete();
  }
}
