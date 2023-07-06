import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { StaffService } from '../../services/staff.service';
import { AttHistoService } from '../../services/att-histo.service';
import { formatDate } from '../../config/formatDate';
@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.scss']
})
export class StaffListComponent {

    constructor(private staffService: StaffService, private AttHService: AttHistoService, private router: Router) {
    }
    displayedColumns: string[] = ["image","name", "email", "phone", "adress", "position", "color", "presence", "status", "actions"];
    dataSource = new MatTableDataSource();
    checkboxes: any;
    attStatus = false;
    presence = false;
    filterValue = '';

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        // this.dataSource = new MatTableDataSource(this.dataSource.filteredData);
    }

    delete(id: String): void {
        this.staffService.delete(id).subscribe(
            (response) => {
                window.location.reload();
            },
            (error) => {
                console.error(error);
            }
        );
    }
    staffSheet(id: any) {

    }
    checkBoxChange(id: any) {
        this.checkboxes = [];
        var inputElems = document.getElementsByTagName("input");
        for (var i = 0; i < inputElems.length; i++) {
            if (inputElems[i].type === "checkbox") {
                this.checkboxes.push(inputElems[i].checked)
            }
        }
        for (var i = 0; i <= this.checkboxes.length - 1; i++) {
            if (this.checkboxes[i] == true) {
                var today = new Date();
                var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                var CurrentDateTime = date + ' ' + time;
                this.addAttHisto(id, CurrentDateTime);
            }
        }
    }

    addAttHisto(id: any, date: any) {
        const objectToSubmit = { attTime: date, staffId: id };
        console.log(id)
        this.AttHService.add(objectToSubmit).subscribe(
            (response) => {
                window.location.reload();
            },
            (error) => {
                console.error(error);
            }
        );
    }
    ngOnInit() {
        const d: Date = new Date();
        let month: string | number = d.getMonth() + 1;
        let day: string | number = d.getDate();

        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        const date: string = `${d.getFullYear()}-${month}-${day}`;
        this.staffService.getAll().subscribe((res: any) => {
            for (var i = 0; i < Object.keys(res).length; i++) {
                res[i]['presence'] = this.presence;
                if(res[i]['file'])
                    res[i]['file'] = 'http://localhost:3000/' + res[i].file.replace(/\\/g, '/');
                  
                this.dataSource = res;
            }
            this.AttHService.getAll().subscribe((result: any[]) => {
                for (var i = 0; i < Object.keys(result).length; i++) {
                    const index = res.findIndex((x: any) => x.id === Number(result[i].staffId));
                    var att = result[i].attTime.split("T", 1);
                    var test = att.includes(date);
                    if (test == true) {
                        this.attStatus = true;
                        this.presence = true;
                    }
                    if (index != -1) {
                        res[index]['attStatus'] = this.attStatus;
                        res[index]['presence'] = this.presence;
                    }
                    this.dataSource = res;

                }
                console.log(this.dataSource)
            },
                error => console.error(error)
            );
        },
            error => console.error(error)
        );
    }
}
