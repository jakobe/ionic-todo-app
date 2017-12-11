import { NgModule } from '@angular/core';
import { NotDonePipe } from './not-done/not-done.pipe';
import { OverduePipe } from './overdue/overdue.pipe';
@NgModule({
	declarations: [NotDonePipe,
    OverduePipe],
	imports: [],
	exports: [NotDonePipe,
    OverduePipe]
})
export class PipesModule {}
