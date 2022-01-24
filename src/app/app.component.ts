import { Component, OnInit } from '@angular/core';
import { DataServiceService } from './services/data-service.service';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  members: Member[] = [];
  allMembers: Member[] = [];
  masterSelected: boolean;
  searchVal: string;
  startIndex: number;
  endIndex: number;
  editsate:Member;
  
  pageSize:number = 10;
  page:number =1;
  enableEdit:string = '';

  constructor(private dataService: DataServiceService) {
    this.masterSelected = false;
    this.searchVal = '';
    this.startIndex = 0;
    this.endIndex = 9;
    this.editsate = this.members[0];
  }

  pencilIcon = faEdit;
  deleteIcon = faTrash;
  saveIcon = faSave;
  calcelIcon = faTimes;
  ngOnInit() {
    this.dataService.getMembers().subscribe((data: any) => {
      this.members = data.map((d: any) => ({ ...d, isSelected: false }));
    })
  }

  // The master checkbox will check/ uncheck all items
  checkUncheckAll() {
    for (let i = 0; i < this.members.length; i++) {
      this.members[i].isSelected = this.masterSelected;
    }
  }

  // Check All Checkbox Checked
  isAllSelected(member: Member) {
    const idx = (this.members || []).findIndex((item: any) => item.id === member.id);
    this.members[idx].isSelected = member.isSelected;
  }

  deleteSelected(){
    this.members = this.members.filter((data:Member) => data.isSelected == false);
  }

  deleteRow(item: Member){
    this.members = this.members.filter((data:Member) => data.id != item.id);
  }

  editRow(item: Member){
    this.editsate = {...item};
    this.enableEdit = item.id;
  }
  cancelEdit(){
    const idx = (this.members || []).findIndex((item: any) => item.id === this.editsate.id);
    this.members[idx] = this.editsate;
    this.enableEdit = '';
  }
}

export interface Member {
  id: string,
  name: string,
  email: string,
  role: string,
  isSelected: boolean
}
