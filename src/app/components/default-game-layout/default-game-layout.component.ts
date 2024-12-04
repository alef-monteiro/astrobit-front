import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-default-game-layout',
  standalone: true,
  imports: [],
  templateUrl: './default-game-layout.component.html',
  styleUrls: ['./default-game-layout.component.scss'] // Corrigido para 'styleUrls'
})
export class DefaultGameLayoutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private animationId: number | null = null;

  constructor( private router: Router) {
  }

  // Propriedades do Pac-Man
  private x: number = 0;
  private y: number = 0;
  private radius: number = 30;
  private speed: number = 4;

  // Propriedades da boca
  private mouthAngle: number = 0.3; // Ângulo inicial da boca
  private mouthDirection: number = -0.02; // Velocidade de abertura/fechamento da boca
  private maxMouthAngle: number = 0.3;
  private minMouthAngle: number = 0.05;
  gameName = 'GameName';
  autorName = 'AutorName';

  ngAfterViewInit(): void {
    this.setupCanvas();
    this.startGame();
  }

  ngOnDestroy(): void {
    this.stopGame();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setupCanvas();
  }

  private setupCanvas(): void {
    const canvas = this.gameCanvas.nativeElement;
    canvas.width = window.innerWidth * 0.8; // 80% da largura da janela
    canvas.height = window.innerHeight * 0.6; // 60% da altura da janela
    this.ctx = canvas.getContext('2d')!;
    this.y = canvas.height / 2; // Centraliza verticalmente o Pac-Man
  }

  private startGame(): void {
    const draw = () => {
      this.clearCanvas();
      this.drawPacman();
      this.updatePacmanPosition();
      this.updateMouth();
      this.animationId = requestAnimationFrame(draw);
    };
    draw();
  }

  private stopGame(): void {
    if (this.animationId !== null) {
      cancelAnimationFrame(this.animationId);
    }
  }

  private clearCanvas(): void {
    const canvas = this.gameCanvas.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  private drawPacman(): void {
    this.ctx.beginPath();

    // Calcula os ângulos da boca para uma animação suave
    const startAngle = this.mouthAngle;
    const endAngle = 2 * Math.PI - this.mouthAngle;

    this.ctx.arc(this.x, this.y, this.radius, startAngle, endAngle, false);
    this.ctx.lineTo(this.x, this.y);

    this.ctx.fillStyle = 'yellow';
    this.ctx.fill();
    this.ctx.closePath();
  }

  private updatePacmanPosition(): void {
    this.x += this.speed;
    const canvasWidth = this.gameCanvas.nativeElement.width;

    // Reseta a posição quando sai da tela
    if (this.x - this.radius > canvasWidth) {
      this.x = -this.radius;
    }
  }

  private updateMouth(): void {
    // Atualiza o ângulo da boca
    this.mouthAngle += this.mouthDirection;

    // Inverte a direção quando atingir os limites
    if (this.mouthAngle <= this.minMouthAngle || this.mouthAngle >= this.maxMouthAngle) {
      this.mouthDirection *= -1;
    }
  }

  onNavigate() {
    this.router.navigate(['homepage'])
  }
}
