import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BarGraphComponent } from './bar-graph/bar-graph.component';
import { LineGraphComponent } from './line-graph/line-graph.component';

@NgModule({
    declarations: [
        BarGraphComponent, LineGraphComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        BarGraphComponent, LineGraphComponent
    ]
})

export class ComponentsModule { }
