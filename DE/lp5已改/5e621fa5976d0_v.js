/**
 * Firework particle class
 */
class FireworkParticle {

  constructor( context, width, height, total ) {
    this.context = context;
    this.width = width;
    this.height = height;
    this.total = total;
    this.done = 0;
    this.x = 0;
    this.xTo = 0;
    this.y = 0;
    this.yTo = 0;
    this.ease = 20;
    this.size = 300;
    this.hue = 0,
    this.particles = [];
    this.reset();
  }

  between( min, max ) {
    return Math.random() * ( max - min + 1 ) + min;
  }

  complete() {
    return ( this.done >= this.total );
  }

  reset() {
    this.particles = [];
    this.x = this.between( 100, this.width - 100 );
    this.xTo = this.between( this.x + 100, this.x - 100 );
    this.y = this.height + 10;
    this.yTo = this.height / 2 - this.between( 0, 200 );
    this.ease = this.between( 12, 20 );
    this.hue = this.between( 100, 360 );
    this.done = 0;
  }

  explode() {
    this.particles = [];
    this.context.clearRect( 0, 0, this.width, this.height ); // flash

    for ( let i = 0; i < this.total; i++ ) {
      this.particles.push( {
        x     : this.x,
        y     : this.y,
        xTo   : this.between( this.x - this.size, this.x + this.size ),
        yTo   : this.between( this.y - this.size, this.y + this.size ),
        size  : this.between( 1, 3 ),
        ease  : this.between( 8, 28 ),
        hue   : this.between( this.hue - 100, this.hue ),
        alpha : 1
      });
    }
  }

  update( width, height ) {
    this.width = width || this.width;
    this.height = height || this.height;
    this.x += ( this.xTo - this.x ) / this.ease;
    this.y += ( this.yTo - this.y ) / this.ease;
  }

  drawBomb() {
    this.context.beginPath();
    this.context.arc( this.x, this.y, 2, 0, 2 * Math.PI, false );
    this.context.fillStyle = `hsl( ${this.hue}, 100%, 60% )`;
    this.context.fill();
  }

  drawParticles() {
    for ( let i = 0; i < this.particles.length; i++ ) {
      const p = this.particles[ i ];

      if ( p.alpha >= 0 ) {
        this.context.beginPath();
        this.context.arc( p.x, p.y, p.size, 0, 2 * Math.PI, false );
        this.context.fillStyle = `hsla( ${p.hue}, 100%, 60%, ${p.alpha} )`;
        this.context.fill();

        p.x += ( p.xTo - p.x ) / p.ease;
        p.y += ( p.yTo - p.y ) / p.ease;
        p.alpha -= 0.014;
        continue;
      }
      this.particles.splice( i, 1 );
      this.done += 1;
    }
  }

  draw() {
    if ( this.complete() ) return;
    if ( this.y > this.yTo + 20 ) { this.drawBomb(); }
    else if ( !this.particles.length ) { this.explode(); }
    else { this.drawParticles(); }
  }
}

/**
 * Setup
 */
(function() {
  let width = window.innerWidth;
  let height = window.innerHeight;
  let particles = [];

  // particle canvas
  const canvas = document.createElement( 'canvas' );
  const context = canvas.getContext( '2d' );
  canvas.id = 'firework-canvas';
  canvas.width = width;
  canvas.height = height;
  canvas.style.display = 'block';
  canvas.style.pointerEvents = 'none';
  canvas.style.position = 'fixed';
  canvas.style.zIndex = '1';
  canvas.style.left = '0';
  canvas.style.top = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.opacity = '.85';
  document.body.appendChild( canvas );

  // on resize
  window.addEventListener( 'resize', e => {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  });

  // add particles slowly over time
  const create = () => {
    if ( particles.length > 2 ) return;
    particles.push( new FireworkParticle( context, width, height, 100 ) );
    setTimeout( create, 600 );
  };

  // animation loop
  const loop = () => {
    requestAnimationFrame( loop );
    context.fillStyle = 'rgba(0,0,0,0.2)';
    context.fillRect( 0, 0, width, height );

    for ( let p of particles ) {
      if ( p.complete() ) p.reset();
      p.update( width, height );
      p.draw();
    }
  };

  // init
  create();
  loop();
})();

function openOfferPage() {
  // 打开新的页面，URL可以替换为你的offer页面地址
  window.open('https://google.com', '_blank');
  }
