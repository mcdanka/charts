import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    declarations: [
        GraphComponent
    ],
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        NgxChartsModule
    ],
    exports: [
        GraphComponent
    ]
})

export class ComponentsModule { }
