Vue.component('card', {
  template: `
                <div class="card-wrap"
                  @mousemove="handleMouseMove"
                  @mouseenter="handleMouseEnter"
                  @mouseleave="handleMouseLeave"
                  ref="card">
                  <div class="card"
                    :style="cardStyle">
                    <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
                    <div class="card-info">
                      <slot name="header11"></slot>
                      <slot name="content11"></slot>
                    </div>
                  </div>
                </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: {
    dataImage: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      width: 0,
      height: 0,
      mouseX: 0,
      mouseY: 0,
      mouseLeaveDelay: null
    };
  },
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = Math.min(Math.max(this.mousePX * 25, -25), 25);
      const rY = Math.min(Math.max(this.mousePY * -25, -25), 25);
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -20; // Kurangi nilai agar gambar tidak keluar
      const tY = this.mousePY * -20;
      return {
          transform: `translateX(${tX}px) translateY(${tY}px)`
      };
  },
  
  cardBgImage() {
    return {
        backgroundImage: `url(${this.dataImage})`,
        backgroundSize: 'cover', // Pastikan gambar memenuhi layar
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    };
}

  },
  methods: {
    handleMouseMove(e) {
      const bounds = this.$refs.card.getBoundingClientRect();
      this.mouseX = e.clientX - bounds.left - bounds.width / 2;
      this.mouseY = e.clientY - bounds.top - bounds.height / 2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(() => {
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});

const app = new Vue({
  el: '#app'
});