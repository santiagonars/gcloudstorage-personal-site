(function () {
  const nameEl = document.querySelector('.hero h1');
  if (!nameEl) return;

  // Wrap each character in a span so we can animate individually
  nameEl.innerHTML = nameEl.textContent
    .split('')
    .map(ch =>
      `<span class="name-ch" style="display:inline-block">${ch === ' ' ? '&nbsp;' : ch}</span>`
    )
    .join('');

  nameEl.style.cursor = 'crosshair';
  nameEl.addEventListener('click', shoot);

  function shoot() {
    nameEl.removeEventListener('click', shoot);

    const chars = [...nameEl.querySelectorAll('.name-ch')];
    const nameRect = nameEl.getBoundingClientRect();
    const startX = nameRect.left - 70;
    const endX   = nameRect.right + 100;
    const midY   = nameRect.top + nameRect.height / 2;

    // Pre-compute the center-x of each character
    const charData = chars.map(ch => {
      const r = ch.getBoundingClientRect();
      return { el: ch, cx: r.left + r.width / 2, hit: false };
    });

    // Build the spaceship  ▶▶
    const ship = document.createElement('div');
    ship.textContent = '▶▶';
    Object.assign(ship.style, {
      position:     'fixed',
      top:          midY + 'px',
      left:         startX + 'px',
      transform:    'translateY(-50%)',
      fontSize:     '1.6rem',
      letterSpacing:'-5px',
      color:        '#64ffda',
      textShadow:   '0 0 10px #64ffda, 0 0 24px rgba(100,255,218,0.5)',
      zIndex:       '1000',
      pointerEvents:'none',
    });
    document.body.appendChild(ship);

    const speed    = (endX - startX) / 900; // px/ms
    const startTime = performance.now();

    function frame(now) {
      const x = startX + (now - startTime) * speed;
      ship.style.left = x + 'px';

      charData.forEach(cd => {
        if (!cd.hit && x >= cd.cx - 8) {
          cd.hit = true;
          fireLaser(x, midY);
          blastChar(cd.el);
        }
      });

      if (x < endX) {
        requestAnimationFrame(frame);
      } else {
        ship.remove();
        setTimeout(() => restore(chars), 700);
      }
    }
    requestAnimationFrame(frame);
  }

  function fireLaser(x, y) {
    const beam = document.createElement('div');
    Object.assign(beam.style, {
      position:     'fixed',
      top:          y + 'px',
      left:         (x - 36) + 'px',
      width:        '44px',
      height:       '3px',
      background:   'linear-gradient(to right, transparent, #64ffda, #fff)',
      boxShadow:    '0 0 10px #64ffda, 0 0 20px rgba(100,255,218,0.6)',
      transform:    'translateY(-50%)',
      borderRadius: '2px',
      zIndex:       '999',
      pointerEvents:'none',
    });
    document.body.appendChild(beam);
    setTimeout(() => beam.remove(), 160);
  }

  function blastChar(el) {
    const dx = (Math.random() - 0.5) * 50;
    const dy = -(Math.random() * 35 + 12);
    const rot = (Math.random() - 0.5) * 60;
    el.style.transition = 'none';
    el.style.color      = '#64ffda';
    el.style.textShadow = '0 0 10px #64ffda';
    // Force reflow so the color flash registers before fading
    void el.offsetWidth;
    el.style.transition = 'all 0.4s ease-out';
    el.style.opacity    = '0';
    el.style.transform  = `translate(${dx}px, ${dy}px) scale(0.4) rotate(${rot}deg)`;
  }

  function restore(chars) {
    chars.forEach((ch, i) => {
      setTimeout(() => {
        ch.style.transition  = 'all 0.35s ease-out';
        ch.style.opacity     = '1';
        ch.style.transform   = 'none';
        ch.style.color       = '';
        ch.style.textShadow  = '';
      }, i * 35);
    });
    // Re-arm click after letters finish restoring
    setTimeout(() => nameEl.addEventListener('click', shoot), chars.length * 35 + 600);
  }
})();
