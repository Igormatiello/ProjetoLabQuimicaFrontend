import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {LoginService} from "../login/login.service";
import {Indicadores} from "./indicadoresModel/indicadores";
import {HomeService} from "./home.service";
import {removeDays} from "../../shared/utils/dateUtils";
import {pt} from "../../shared/internalization/CalendarPt";
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';

import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

    indicadores: Indicadores;
    dialodFiltroData = false;
    dtIniFiltro: string;
    dtFimFiltro: string;
    localePt: any;
    displayedColumns = ['nome', 'tipoPessoa', 'actions'];

    constructor(private loginService: LoginService,
                private homeService: HomeService) {
        this.indicadores = new Indicadores();
        this.localePt = pt;
    }

    ngOnInit() {
        this.clearDatesLocalStorage();
        this.loginService.getUserInfo()
            .then(value => {
                const admin = value.authorities
                    .filter(x => x.nome === 'ROLE_ADMIN');
                if (admin.length == 1) {
                    document.getElementById('container-image').style.display = 'none';
                    document.getElementById('container-dashboard').style.display = 'block';
                    this.buildDashboards();
                } else {
                    document.getElementById('container-dashboard').style.display = 'none';
                    document.getElementById('container-image').style.display = 'block';
                }
            });
    }

    buildDashboards() {
        this.homeService.findDadosIndicadores(this.getDateIni(), this.getDateFim())
            .subscribe(e => {
                this.indicadores = e;
                this.createPieChart('chartPieSolicitacao', this.indicadores.indicadorSolicitacaoCadastroList, "categoria", "qtdeSolicitacao");
                this.createXYChartLine('chartFormularioByDay', this.indicadores.indicadorFormularioByDayList, "dataSolic", "qtde")
            });
    }

    getDateIni() {
        let dtIni = localStorage.getItem('dash_dt_ini');
        if (!dtIni) {
            let date = new Date();
            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            return firstDay.toLocaleDateString();
        }
        return dtIni;
    }

    getDateFim() {
        let dtFim = localStorage.getItem('dash_dt_fim');
        if (!dtFim) {
            let date = new Date();
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
            return lastDay.toLocaleDateString();
        }
        return dtFim;
    }

    clearDatesLocalStorage() {
        localStorage.removeItem('dash_dt_ini');
        localStorage.removeItem('dash_dt_fim');
    }

    filtrar() {
        this.dialodFiltroData = false;
        localStorage.setItem('dash_dt_ini', this.dtIniFiltro);
        localStorage.setItem('dash_dt_fim', this.dtFimFiltro);
        this.dtIniFiltro = null;
        this.dtFimFiltro = null;
        this.buildDashboards();
    }

    disableBtnFiltrar() {
        return this.dtIniFiltro == null || this.dtIniFiltro === ''
            || this.dtFimFiltro == null || this.dtFimFiltro === '';
    }

    createPieChart(elementAppend, dados, nameField, nameValue) {
        const pieChart3D = am4core.create(elementAppend, am4charts.PieChart3D);
        pieChart3D.hiddenState.properties.opacity = 0;
        pieChart3D.legend = new am4charts.Legend();
        pieChart3D.legend.useDefaultMarker = false;
        pieChart3D.legend.position = 'right';
        pieChart3D.legend.labels.template.maxWidth = 100;
        pieChart3D.data = dados;

        const series = pieChart3D.series.push(new am4charts.PieSeries3D());
        series.dataFields.value = nameValue;
        series.dataFields.category = nameField;
        series.labels.template.maxWidth = 100;
        series.labels.template.truncate = true;
    }

    createXYChartLine(elementAppend, dados, dateX, valueY) {
        const chartLine = am4core.create(elementAppend, am4charts.XYChart);
        chartLine.data = dados;
        //chartLine.dateFormatter.inputDateFormat = 'dd-MM-yyyy';

        const dateAxis = chartLine.xAxes.push(new am4charts.DateAxis());
        const valueAxis = chartLine.yAxes.push(new am4charts.ValueAxis());

        const series = chartLine.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = valueY;
        series.dataFields.dateX = dateX;
        series.tooltipText = '{value}';
        series.strokeWidth = 2;
        series.minBulletDistance = 15;
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = 'vertical';
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = 'middle';
        series.tooltip.label.textValign = 'middle';

        const bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color('#fff');

        const bullethover = bullet.states.create('hover');
        bullethover.properties.scale = 1.3;

        chartLine.cursor = new am4charts.XYCursor();
        chartLine.cursor.behavior = 'panXY';
        chartLine.cursor.xAxis = dateAxis;
        chartLine.cursor.snapToSeries = series;
        chartLine.scrollbarY = new am4core.Scrollbar();
        chartLine.scrollbarY.parent = chartLine.leftAxesContainer;
        chartLine.scrollbarY.toBack();
        chartLine.scrollbarX = new am4charts.XYChartScrollbar();
        (chartLine.scrollbarX as am4charts.XYChartScrollbar).series.push(series);
        chartLine.scrollbarX.parent = chartLine.bottomAxesContainer;
    }

}
