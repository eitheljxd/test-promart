import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MyValidators } from './../../../../utils/validators';
import { ProductsService } from './../../../../core/services/products/products.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Label } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form: FormGroup;
  formGraph: FormGroup;
  fechaActual = moment(new Date()).format("DD/MM/YYYY");
  id: string;
  fechaDef: string;
  restante : string;
  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;
  clientes : any;
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{
      ticks: {
        beginAtZero: true,
        min: 0,
        max: 100,
        suggestedMin: 0
      }
    }], 
  xAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  widthAl : number = 0;
  barChartLabels: Label[] = ['Edad según Promedio'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [pluginDataLabels];

  barChartData: ChartDataSets[] = [
    { data: [0], label: 'Promedio' },
    { data: [0], label: 'Edad' }
  ];
  constructor(
    private formBuilder: FormBuilder,
    private productsService: ProductsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private db: AngularFireDatabase
  ) {
    this.buildForm();
    this.buildFormGraph();

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params.id;
      this.getMessages();

    });
    this.cargarUsuarios();

  }

   getMessages() {
    this.itemsRef = this.db.list(`usuarios/${this.id}`);
    this.items = this.itemsRef.valueChanges();
    this.items.subscribe(res=> {
      var usuario = {
        nombres : res[3],
        apellidos : res[0] ,
        edad : res[1],
        fecha_nacimiento: res[2] ,
      }
      let format = moment(usuario.fecha_nacimiento, 'DD/MM/YYYY');
      this.fechaDef = format.add(80, 'years').calendar();
      const aniosDefuncion = format.year();
      let b = moment([moment(this.fechaActual,"DD/MM/YYYY").year()]);
      let a = moment([aniosDefuncion]);
      this.restante =  a.diff(b, 'years').toString() + " año(s)";
      this.form.patchValue(usuario);
      this.widthAl = (a.diff(b, 'years')*80/100) < 0 ? 100 :  (a.diff(b, 'years')*80/100);
    });
  }
  cargarUsuarios() {
    const itemsRef = this.db.list(`usuarios`);
    const items = itemsRef.valueChanges();
    items.subscribe((res : any)=> {
      const average = res.filter(x => x.edad).reduce((acc, x) => acc + x.edad, 0) / res.length;
      const data =  {
        promedio :  Math.floor(average)
      }
   
      this.formGraph.patchValue(data);
      setTimeout(() => {
        this.barChartData[0].data = [Math.round(data.promedio)];
        this.barChartData[1].data = [this.form.value.edad];
      }, 100);
   

    });
  }

  saveProduct(event: Event) {
    event.preventDefault();
    if (this.form.valid) {
      const product = this.form.value;
      this.productsService.updateProduct(this.id, product)
        .subscribe((newProduct) => {
          this.router.navigate(['./admin/clientes']);
        });
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      id: ['', [Validators.required]],
      nombres: ['', [Validators.required], ],
      apellidos: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      fecha_nacimiento: ['', [Validators.required]],
      image: [''],
    });
  }
  private buildFormGraph() {
    this.formGraph = this.formBuilder.group({
      promedio: ['', [Validators.required]]
    });
  }
  


}
