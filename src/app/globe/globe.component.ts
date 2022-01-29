import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from "three";
import { OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import * as Globe from "./globe";

import {GlobalComponent} from "../global/global.component";

@Component({
  selector: 'app-globe',
  templateUrl: './globe.component.html',
  styleUrls: ['./globe.component.css']
})
export class GlobeComponent implements OnInit, AfterViewInit {

  @ViewChild("canvas")
  private canvasRef!: ElementRef;

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private controls!: OrbitControls;
  private planet!: THREE.Object3D;

  constructor() { }

  ngOnInit(): void {
  }

  private initialize(){
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x303030);

    this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.controls= new OrbitControls(this.camera, this.renderer.domElement);

    this.planet = GlobeComponent.getPlanet();
    Globe.drawThreeGeo(10, {
      color: 0x80FF80
    }, this.planet )
    this.scene.add(this.planet);
    console.log(this.scene);
    this.camera.position.z = 20;

  }

  public get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private startRenderingLoop(){
    let component: GlobeComponent = this;
    (function render() {
      requestAnimationFrame(render);
      component.planet.rotation.y += 0.001;
      component.renderer.render(component.scene, component.camera);
    }());
  }

  ngAfterViewInit(): void {
    this.initialize();
    this.startRenderingLoop();
  }

  private static getPlanet(): THREE.Object3D {
    let planet = new THREE.Object3D();
    let geometry = new THREE.SphereGeometry(10,32,32);
    let material = new THREE.MeshBasicMaterial({color:0x0000ff, wireframe: true});
    let sphere = new THREE.Mesh(geometry, material);
    planet.add(sphere);
    return planet;
  }
}
