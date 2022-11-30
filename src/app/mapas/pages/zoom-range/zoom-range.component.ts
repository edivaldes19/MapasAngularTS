import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
@Component({
  selector: 'app-zoom-range',
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('mapa') public divMapa!: ElementRef
  public mapa!: mapboxgl.Map
  public zoomLevel: number = 10
  public center: [number, number] = [-102.05644, 19.41116]
  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.center,
      zoom: this.zoomLevel,
      maxZoom: 18
    });
    this.mapa.on('zoom', () => this.zoomLevel = this.mapa.getZoom())
    this.mapa.on('move', (event) => {
      const { lng, lat } = event.target.getCenter()
      this.center = [lng, lat]
    })
  }
  ngOnDestroy(): void {
    this.mapa.off('zoom', () => { })
    this.mapa.off('move', () => { })
  }
  zoomIn(): void {
    this.mapa.zoomIn()
  }
  zoomOut(): void {
    this.mapa.zoomOut()
  }
  zoomCambio(value: string): void {
    this.mapa.zoomTo(Number(value))
  }
}