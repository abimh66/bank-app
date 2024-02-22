<script setup>
import { defineProps } from 'vue';

// define props from parent component
const props = defineProps(['chartData']);

// data series digunakan chart sebagai data input
const series = [
  {
    name: 'cashfloww',
    data: props.chartData.map((d) => Number(d.amount)),
  },
];

// data chart option untuk menentukan
// tipe chart, warna, label
const chartOptions = {
  chart: {
    type: 'bar',
  },
  plotOptions: {
    bar: {
      colors: {
        ranges: [
          {
            from: -100,
            to: -1,
            color: '#ff4d52',
          },
          {
            from: 1,
            to: 100,
            color: '#2563eb',
          },
        ],
      },
      columnWidth: '80%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  yaxis: {
    title: {
      text: 'Cashflow',
    },
    labels: {
      formatter: function (y) {
        return '$' + y.toFixed(0);
      },
    },
  },
  xaxis: {
    type: 'datetime',
    categories: props.chartData.map(
      (d) => new Date(d.date).toISOString().split('T')[0]
    ),
    labels: {
      rotate: -90,
    },
  },
};
</script>

<template>
  <apexchart :options="chartOptions" :series="series"></apexchart>
</template>
