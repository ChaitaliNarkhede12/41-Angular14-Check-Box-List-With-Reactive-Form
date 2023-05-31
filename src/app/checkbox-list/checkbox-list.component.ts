import { Component } from '@angular/core';
import { FormArray, FormBuilder,FormControl,FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss']
})
export class CheckboxListComponent {

  selectedOrderIds: any;

  form: FormGroup;

  ordersData = [
    { id: 1, name: 'order1', isChecked: false },
    { id: 2, name: 'order2', isChecked: false },
    { id: 3, name: 'order3', isChecked: false },
    { id: 4, name: 'order4', isChecked: false },
  ];

  get getOrderControl() {
    return this.form.controls["orders"] as FormArray;
  }

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      orders: new FormArray([]),
      selectAll: new FormControl(false)
    });
    this.addCheckboxes();
  }

  ngOnInit() {
    this.form.controls["selectAll"].valueChanges.subscribe((res: any) => {
      if (res) {
        this.form.controls["orders"] = new FormArray([]);

        this.ordersData.forEach((res: any) => {
          this.getOrderControl.push(new FormControl(true));
        });

      }
      else {
        this.form.controls["orders"] = new FormArray([]);

        this.ordersData.forEach((res: any) => {
          this.getOrderControl.push(new FormControl(false));
        });
      }
    })
  }

  addCheckboxes() {
    this.ordersData.forEach((res: any) => {
      this.getOrderControl.push(new FormControl(res.isChecked));
    });
  }

  submit() {
    let selected = this.form.value.orders.map((checked: any, i: number) => {
      checked ? this.ordersData.filter(x => x.id === this.ordersData[i].id)[0].isChecked = true
        : this.ordersData.filter(x => x.id === this.ordersData[i].id)[0].isChecked = false;

      return { id: this.ordersData[i].id, name: this.ordersData[i].name, isChecked: this.ordersData[i].isChecked };
    });

    this.selectedOrderIds = JSON.stringify(selected);
  }
}
