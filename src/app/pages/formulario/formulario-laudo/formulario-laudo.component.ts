import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { LabelValue } from "src/app/shared/classes/LabelValue";
import { pt } from "../../../shared/internalization/CalendarPt";
import { ToastService } from "src/app/shared/components/toast/toast.service";
import { getCountErrors } from "src/app/shared/utils/formUtils";
import { FormularioService } from "../formulario.service";
import { NaturezasProjeto } from "../../../shared/consts/NaturezasProjeto";
import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {FileUploadModule} from 'primeng/fileupload';
import { environment } from 'src/environments/environment';
import { Formulario } from '../formulario';
import { MudaStatus } from '../mudaStatus';




@Component({
  selector: 'app-formulario-laudo',
  templateUrl: './formulario-laudo.component.html',
  styleUrls: ['./formulario-laudo.component.css']
})


export class FormularioLaudoComponent implements OnInit {


  formularioEdit: Formulario;
  equipamentosOption: any[];
  servicosOption: LabelValue[] = [];
  cidadesOption: LabelValue[] = [];
  instituicoesOption: LabelValue[] = [];
  programasEnsinoOption: any[] = [];
  naturezasProjetoOption: LabelValue[] = NaturezasProjeto;
  Editor = ClassicEditor;
  FileUpload: FileUploadModule[];

  activeIndex: number = 0;
  equipamentoId: number;
  confirmado: boolean;
  form: FormGroup;
  mudaStatus: MudaStatus;

    // atributos utilizados para o upload
    uploadedFiles: any[] = [];
    urlApi: string = environment.api;
    today: number = Date.now();
  
  ptCalendar = pt;
  constructor(
    private formularioService: FormularioService,

    private toastService: ToastService,
    private router: Router,
    private route: ActivatedRoute,
    
  ) {
    this.form = new FormBuilder().group({
      laudo: ["", Validators.required],    
      analise: ["", Validators.required],

    });
  }

  

  ngOnInit() {

    this.formularioEdit = new Formulario ();
    const id = Number(this.route.snapshot.params.id);
    if (id) {
      this.formularioService.findOne(id).subscribe(e => {
        this.formularioEdit= e;
      });

      this.mudaStatus = {
        motivoRejeicao: '',
        status: 'FINALIZADO'
      };
    }      
  }

salvar() {
  if (this.form.valid) {
    this.formularioEdit.laudo =  this.form.controls.laudo.value;
    this.formularioEdit.analise =  this.form.controls.analise.value;
    this.formularioEdit.status = 'FINALIZADO';

      this.formularioService.save(this.formularioEdit).subscribe(
          (r) => {
              if (r.id && r.id > 0) {
                  this.toastService.showSuccess(
                      "Tudo certo!",
                      "Formulário lançado com sucesso, acompanhe seu status pela listagem"
                  );
                  this.form.reset();
                  this.activeIndex = 0;
                  this.confirmado = false;
                  this.equipamentoId = undefined;
                  this.voltar();

              } else {
                  this.toastService.showError(
                      "Algo não deu certo!",
                      (r.mensagens && r.mensagens[0]) ||
                          "Não foi possível salvar"
                  );
              }
          },
          () => {
              this.toastService.showError(
                  "Algo não deu certo!",
                  "Não foi possível completar a ação!"
              );
          }
      );
  }
}


algumErro() {
  return getCountErrors(this.form) > 0;
}

voltar() {
  this.router.navigate(["formulario-em-analise"]);
}

  // Método utilizado no upload de arquivos
  onUpload(event) {
    for (const arquivos of event.files) {
      this.uploadedFiles.push(arquivos);
    }

    this.toastService.showSuccess(
      "Tudo certo!",
      "O arquivo foi upado com sucesso!"
  );
    setTimeout(() => {
      this.uploadedFiles = [];
    }, 500);
  }

}




  




