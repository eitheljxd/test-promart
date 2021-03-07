import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

import { ProductsService } from './../../../../core/services/products/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  clients = [];
  data = [];
  promedioEdades: number;
  desvEstandar: any;

  displayedColumns: string[] = ['nombres', 'apellidos', 'edad', 'fecha_nacimiento','fecha_probable','actions'];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productsService.getAllProducts()
      .subscribe(clientes => {
        this.formatData(clientes);
        this.clients = this.data;
        this.calcularFechaMuerte();
        this.promedioEdades = this.getPromedio();
        this.desvEstandar = this.calcularDesvEstandar();

      });
  }
  formatData(clientes) {
    for (let cliente in clientes) {
      this.data.push({
        _id: cliente,
        apellidos: clientes[cliente].apellidos,
        edad: clientes[cliente].edad,
        fecha_nacimiento: clientes[cliente].fecha_nacimiento,
        nombres: clientes[cliente].nombres,
        fecha_probable : ''
      })
    }
  }
  calcularFechaMuerte() {
    this.data.forEach(cliente =>{
      let format = moment(cliente.fecha_nacimiento, 'DD/MM/YYYY');

      cliente.fecha_probable =  format.add(80, 'years').calendar();   
    })
    
  }
  calcularDesvEstandar() {
    const obj = this.clients;
    const values = Object.keys(obj).map(function (key) { return obj[key].edad; });
    const n = values.length;
    const mean = values.reduce((a, b) => a + b) / n;
    const total = Math.sqrt(values.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    return Math.round(total * 100) / 100;
  }
  getPromedio() {
    const average = this.clients.filter(x => x.edad).reduce((acc, x) => acc + x.edad, 0) / this.clients.length;
    return Math.floor(average);


  }

  deleteProduct(id: string) {
    this.productsService.deleteProduct(id)
      .subscribe(rta => {
        this.fetchProducts();
      });
  }

}
