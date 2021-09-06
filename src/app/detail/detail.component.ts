import { BookDto } from './../dtos/books.dto';
import { BookService } from './../services/book.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  form!: FormGroup;
  id!: string;

  constructor(
    private bookService : BookService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ["",[Validators.required, Validators.maxLength(30)]],
      author: ["",[Validators.required, Validators.maxLength(30)]],
      description: ["",[Validators.required]],
    })

    this.id = this.route.snapshot.params.id;

    this.bookService.getById(this.id).subscribe(
      res => this.form.patchValue({
        title: res.title,
        author: res.author,
        description : res.description
      })
    )
  }


}
