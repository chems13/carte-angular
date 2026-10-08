
import { Component, input, output, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  imports: [FormsModule],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {

  search  = input("initial");
  searchChange =output<string>();
  searchButtonClicked: OutputEmitterRef<void> = output<void>();

  searchClicked() {
    this.searchButtonClicked.emit();
  }

  updateSearch(searchText: string) {
    this.searchChange.emit(searchText);
  }
}
