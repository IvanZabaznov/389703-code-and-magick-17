'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 10;
var GAP = 10;
var LINE_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_INTERVAL = 50;
var barY = CLOUD_Y + GAP * 9;
var BAR_HEIGHT = 150;



var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) maxElement = arr[i];
  }

  return maxElement;
};

var getRandomValue = function(min, max, step) {
  var res = (Math.floor(Math.random() * (max - min + step) / step)) * step + min;

  return Number(res.toFixed(10));
}



window.renderStatistics = function(ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'rgba(255, 255, 255, 1)');

  ctx.fillStyle = 'rgba(0, 0, 0, 1)';

  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3);
  ctx.fillText('Список результатов:', CLOUD_X + GAP * 2, CLOUD_Y + GAP * 3 + LINE_HEIGHT);


  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_INTERVAL + (BAR_INTERVAL + BAR_WIDTH) * i, barY + (BAR_HEIGHT - (times[i] / maxTime * BAR_HEIGHT)) - GAP);
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      ctx.fillRect(CLOUD_X + BAR_INTERVAL + (BAR_INTERVAL + BAR_WIDTH) * i, barY + (BAR_HEIGHT - (times[i] / maxTime * BAR_HEIGHT)), BAR_WIDTH, times[i] / maxTime * BAR_HEIGHT);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(names[i], CLOUD_X + BAR_INTERVAL + (BAR_INTERVAL + BAR_WIDTH) * i, barY + (BAR_HEIGHT - (times[i] / maxTime * BAR_HEIGHT)) + (BAR_WIDTH, times[i] / maxTime * BAR_HEIGHT) + LINE_HEIGHT);
    } else {
      ctx.fillText(Math.round(times[i]), CLOUD_X + BAR_INTERVAL + (BAR_INTERVAL + BAR_WIDTH) * i, barY + (BAR_HEIGHT - (times[i] / maxTime * BAR_HEIGHT)) - GAP);
      ctx.fillStyle = 'hsl(240,' + getRandomValue(0, 100, 1) + '%, 50%)';
      ctx.fillRect(CLOUD_X + BAR_INTERVAL + (BAR_INTERVAL + BAR_WIDTH) * i, barY + (BAR_HEIGHT - (times[i] / maxTime * BAR_HEIGHT)), BAR_WIDTH, times[i] / maxTime * BAR_HEIGHT);
      ctx.fillStyle = 'rgba(0, 0, 0, 1)';
      ctx.fillText(names[i], CLOUD_X + BAR_INTERVAL + (BAR_INTERVAL + BAR_WIDTH) * i, barY + (BAR_HEIGHT - (times[i] / maxTime * BAR_HEIGHT)) + (BAR_WIDTH, times[i] / maxTime * BAR_HEIGHT) + LINE_HEIGHT);
    }

  }
};
