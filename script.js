const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

var timeout;

function firstPageAnim() {
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1,
    ease: Expo.easeInOut,
  })
    .to(".boundingelem", {
      y: 0,
      duration: 1.5,
      ease: Expo.easeInOut,
      stagger: 0.2,
    })
    .from(".herofooter", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    })
    .from("#iconset", {
      y: -10,
      opacity: 0,
      duration: 1.5,
      delay: -1,
      ease: Expo.easeInOut,
    });
}

//jab mouse move ho to hum log cursor wale circle ko thoda chapta kar paaye or jab mouse chalna bnd ho jaye to vps shi circle ban jaye

function circleChaptaKaro() {
  //define default scale value
  var xscale = 1;
  var yscale = 1;

  var xprev = 0;
  var yprev = 0;
  window.addEventListener("mousemove", function (dets) {
    clearTimeout(timeout);

    xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprev);
    yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprev);

    xprev = dets.clientX;
    yprev = dets.clientY;
    circleMouseFollower(xscale, yscale);

    timeout = setTimeout(function () {
      document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
    }, 100);
  });
}

function circleMouseFollower(xscale, yscale) {
  window.addEventListener("mousemove", function (dets) {
    document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
  });
}

circleChaptaKaro();
circleMouseFollower();
firstPageAnim();


//teeno element ko ko select karo, uske bad teeno par ek mousemove lagao, jab mousemove ho to ye pata karo ki mouse kaha par hai, jiska matalab hai ki x and y position pata karo, ab mouse ab mouse ki x y position k bdle us image ko show karo and us image ko move karo, move karte waqt rotate karo, and jaise hi mouse tez chale waise hi rotation bhi tez ho jaye

// document.querySelectorAll(".elem").forEach(function(elem) {
//     var img = elem.querySelector("img");
//     var imgWidth = img.offsetWidth;
//     var imgHeight = img.offsetHeight;
//     var rotate = 0;
//     var diffrot = 0;
//     var imageAnimation;
   
//     elem.addEventListener("mousemove", function(dets) {
//         var diffX = dets.clientX - elem.getBoundingClientRect().left - imgWidth / 2;
//         var diffY = dets.clientY - elem.getBoundingClientRect().top - imgHeight / 2;
//         diffrot = dets.clientX - rotate;
//         rotate = dets.clientX;

//         if (imageAnimation) {
//             imageAnimation.kill();
//         }

//         imageAnimation = gsap.to(img, {
//             opacity: 1,
//             ease: Power3,
//             x: diffX,
//             y: diffY,
//             rotate: gsap.utils.clamp(-20, 20, diffrot * .5)
//         });
//     });
//     elem.addEventListener("mouseleave", function(dets) {
//         if (imageAnimation) {
//             imageAnimation.kill();
//         }

//         gsap.to(img, {
//             opacity: 0,
//             ease: "power1.easeInOut",
//         });
//     });
// });
document.querySelectorAll(".elem").forEach(function(elem) {
    var img = elem.querySelector("img");
    var imgWidth = img.offsetWidth;
    var imgHeight = img.offsetHeight;
    var rotate = 0;
    var diffrot = 0;
    var imageAnimation;

    elem.addEventListener("mousemove", function(dets) {
        var diffX = dets.clientX - elem.getBoundingClientRect().left - imgWidth / 2;
        var diffY = dets.clientY - elem.getBoundingClientRect().top - imgHeight / 2;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;

        // Clear any ongoing animations
        if (imageAnimation) {
            imageAnimation.kill();
        }

        // Apply new animation
        imageAnimation = gsap.to(img, {
            opacity: 1,
            ease: "Sine.easeOut",
            x: diffX,
            y: diffY,
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5)
        });
    });

    elem.addEventListener("mouseleave", function(dets) {
        // Clear any ongoing animations and hide the image
        gsap.to(img, {
            opacity: 0,
        });

        
        if (imageAnimation) {
            imageAnimation.kill();
        }
        
    });
});
