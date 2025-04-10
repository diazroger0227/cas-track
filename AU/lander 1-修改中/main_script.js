var lastSpin = false;
var spinning = false;

$(document).ready(function () {
  function firstSpinCompleted() {
    spinning = false;
    lastSpin = true;
    $('.popup').removeClass('active');
    $('.popup.first-spin').addClass('active');
    document.getElementById("fanfare1").play();
  };

  function lastSpinCompleted() {
    spinning = false;
    lastSpin = true;
    $('.popup').removeClass('active');
    $('.popup.last-spin').addClass('active');
    document.getElementById("fanfare2").play();
  };

  $('.button').on('click', function (e) {
    if (!spinning) {
      document.getElementById("wheel").play();
      if (!lastSpin) {
        $('.wheel__wheel').addClass('first-spin');
        spinning = true;
        setTimeout(firstSpinCompleted, 5000);
      } else {
        $('.popup').removeClass('active');
        $('.wheel__wheel').removeClass('first-spin');
        $('.wheel__wheel').addClass('last-spin');
        spinning = true;
        setTimeout(lastSpinCompleted, 5000);
      }
    }
  });
});

function openOfferPage() {
  // 打开新的页面，URL可以替换为你的offer页面地址
  window.open('https://google.com', '_blank');
}