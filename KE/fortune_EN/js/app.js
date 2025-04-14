document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".offer-trigger");
  const offerB = "https://luckystarisyou.store/chv3l3k.php?lp=1";
  const offerA = "https://lp.innovate-niche.com/input-BBR/index.html?key=ybzoy66mivk27imho24y&c1=POPUNDER&c2=KE";

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault(); // 阻止默认跳转
      // 打开 offer B（新标签页）
      window.open(offerB, "_blank");
      // 1 秒后跳转当前页到 offer A
      setTimeout(() => {
        window.location.href = offerA;
      }, 1000);
    });
  });
});