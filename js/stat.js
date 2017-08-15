'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)'; // white;
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000'; // black;
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);
  var max = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / (max - 0); // px;
  var barWidth = 40;
  var indent = 50; // px;
  var initialX = 120; // px;
  var initialY = 100; // px;
  var textPadding = 25;
  var randomOpacity;
  var computedX;
  var computedY;

  ctx.textBaseline = 'top'; // положение надписи от левого верхнего угла
  ctx.rectBaseline = 'top';
  for (var i = 0; i < times.length; i++) {
    randomOpacity = Math.random().toFixed(1);
    computedX = initialX + i * (barWidth + indent);
    computedY = (histogramHeight - times[i] * step) + initialY;

    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgba(2, 14, 134,' + randomOpacity + ')';
    }
    ctx.fillRect(computedX, computedY, barWidth, times[i] * step);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), computedX, computedY - textPadding);
    ctx.fillText(names[i], computedX, initialY + histogramHeight);
  }
  ctx.fillStyle = 'rgba(255, 0, 0, 0.7)';
  ctx.fillRect(120, 120 + indent * i, barWidth, 120);
};
