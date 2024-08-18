import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { SvgIconComponent } from 'angular-svg-icon';

import { DiagnosisHistory } from '@shared/store/models/patient.model';

@Component({
  selector: 'app-diagnosis-history',
  standalone: true,
  imports: [NgFor, SvgIconComponent, BaseChartDirective],
  templateUrl: './diagnosis-history.component.html',
})
export class DiagnosisHistoryComponent {
  lineChartData: any;
  lineChartOptions: any;
  plugins: any[] = [];
  last_six_month: DiagnosisHistory[] = [];
  readings: {
    title: string;
    levels: string;
    icon: string;
    value: string;
    bgColor: string;
  }[] = [];

  @Input() diagnosis_history: DiagnosisHistory[] = [];

  ngOnChanges() {
    this.last_six_month = this.diagnosis_history.slice(0, 6).reverse();

    const last_item = this.last_six_month[this.last_six_month.length - 1];

    this.readings = [
      {
        title: 'Respiratory Rate',
        bgColor: '#E0F3FA',
        levels: last_item.respiratory_rate.levels,
        icon: '/assets/icons/respiratory-rate.svg',
        value: last_item.respiratory_rate.value + ' bpm',
      },
      {
        title: 'Temperature',
        bgColor: '#FFE6E9',
        levels: last_item.temperature.levels,
        icon: '/assets/icons/temperature.svg',
        value: last_item.temperature.value + '°F',
      },
      {
        title: 'Heart Rate',
        bgColor: '#FFE6F1',
        levels: last_item.heart_rate.levels,
        icon: '/assets/icons/heart-rate.svg',
        value: last_item.heart_rate.value + ' bpm',
      },
    ];

    this.lineChartData = {
      datasets: [
        {
          label: 'Systolic',
          data: this.last_six_month.map((item) => ({
            key: `${item.month.substring(0, 3)}, ${item.year}`,
            ...item.blood_pressure.systolic,
          })),
          fill: false,
          borderColor: 'rgb(230, 111, 210)',
          backgroundColor: 'rgb(230, 111, 210)',
          pointRadius: 8,
          tension: 0.5,
        },
        {
          label: 'Diastolic',
          data: this.last_six_month.map((item) => ({
            key: `${item.month.substring(0, 3)}, ${item.year}`,
            ...item.blood_pressure.diastolic,
          })),
          fill: false,
          borderColor: 'rgb(140, 111, 230)',
          backgroundColor: 'rgb(140, 111, 230)',
          pointRadius: 8,
          tension: 0.5,
        },
      ],
    };

    this.lineChartOptions = {
      plugins: {
        htmlLegend: {
          containerID: 'legend-container',
        },
        legend: {
          display: false,
        },
      },
      parsing: {
        xAxisKey: 'key',
        yAxisKey: 'value',
      },
    };

    const getOrCreateLegendList = (chart: any, id: string) => {
      const legendContainer = document.getElementById(id);
      let listContainer = legendContainer?.querySelector('ul');

      if (!listContainer) {
        listContainer = document.createElement('ul');
        listContainer.className = 'flex flex-col';

        legendContainer?.appendChild(listContainer);
      }

      return listContainer;
    };

    const htmlLegendPlugin = {
      id: 'htmlLegend',
      afterUpdate(chart: any, args: any, options: any) {
        const ul = getOrCreateLegendList(chart, options.containerID);

        // Remove old legend items
        while (ul.firstChild) {
          ul.firstChild.remove();
        }

        ul.className = 'flex flex-col';

        // Reuse the built-in legendItems generator
        const items = chart.options.plugins.legend.labels.generateLabels(chart);

        items.forEach((item: any) => {
          const li = document.createElement('li');
          li.className = 'flex flex-col cursor-pointer space-y-2';

          li.onclick = () => {
            chart.setDatasetVisibility(
              item.datasetIndex,
              !chart.isDatasetVisible(item.datasetIndex)
            );
            chart.update();
          };

          // Title box
          const boxTitle = document.createElement('div');
          boxTitle.className = 'flex item-center';

          // Color box
          const boxSpan = document.createElement('span');
          boxSpan.className =
            'flex shrink-0 h-4 mr-2.5 w-4 rounded-full border border-white';
          boxSpan.style.backgroundColor = item.fillStyle;
          // boxSpan.style.borderColor = item.strokeStyle;

          // Text
          const textContainer = document.createElement('span');
          textContainer.className =
            'inherit text-sm font-bold' + (item.hidden ? ' line-through' : '');

          const text = document.createTextNode(item.text);
          textContainer.appendChild(text);

          boxTitle.appendChild(boxSpan);
          boxTitle.appendChild(textContainer);

          // get the last data
          const lastValue = chart.data.datasets
            .find(({ label }: any) => label === item.text)
            .data.slice(-1)[0];

          // Text Value
          const textValueContainer = document.createElement('h5');
          textValueContainer.className =
            'font-bold inherit text-[22px]' +
            (item.hidden ? ' line-through' : '');

          const textValue = document.createTextNode(lastValue.value);
          textValueContainer.appendChild(textValue);

          // Comparision box
          const boxComparision = document.createElement('div');
          boxComparision.className = 'flex item-center gap-1.5';

          // Arrow img icon
          if (!lastValue.levels.includes('Normal')) {
            const imageArrowIcon = document.createElement('img');
            if (lastValue.levels.includes('Higher')) {
              imageArrowIcon.src = 'assets/icons/arrow-up.svg';
            }
            if (lastValue.levels.includes('Lower')) {
              imageArrowIcon.src = 'assets/icons/arrow-down.svg';
            }
            boxComparision.appendChild(imageArrowIcon);
          }

          // High/Low Comparision Text
          const textComparisionContainer = document.createElement('span');
          textComparisionContainer.className =
            'inherit text-sm' + (item.hidden ? ' line-through' : '');

          const textComparision = document.createTextNode(lastValue.levels);
          textComparisionContainer.appendChild(textComparision);

          boxComparision.appendChild(textComparisionContainer);

          li.appendChild(boxTitle);
          li.appendChild(textValueContainer);
          li.appendChild(boxComparision);
          ul.appendChild(li);
        });
      },
    };

    this.plugins = [htmlLegendPlugin];
  }
}
