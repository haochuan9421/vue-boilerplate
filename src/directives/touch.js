/**
 * 方便处理各种触摸动作
 * v-touch:touchType="touchHandler"
 * touchType可选类型
 * 1. tap  触摸
 * 2. hold  长按
 * 3. swipeRight 右划
 * 4. swipeLeft 左划
 * 5. swipeTop 上划
 * 6. swipeDown  下划
 * 如 v-touch:hold="holdHandler"
 */
export default {
  bind: function(el, binding, vnode) {
    vnode = vnode || {};
    // 传给指令的参数。例如 v-touch:swipeRight, arg 的值是 "swipeRight"
    let touchType = binding.arg.toLowerCase();
    let timeOutEvent = 0;
    let direction = '';
    // 滑动处理
    let startX = null;
    let startY = null;

    // 返回角度
    function GetSlideAngle(dx, dy) {
      return Math.atan2(dy, dx) * 180 / Math.PI;
    }

    // 根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
    function GetSlideDirection(startX, startY, endX, endY) {
      let dy = startY - endY;
      let dx = endX - startX;
      let result = 0;

      // 如果滑动距离太短
      if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
        return result;
      }

      // 滑动角度
      let angle = GetSlideAngle(dx, dy);

      if (angle >= -45 && angle < 45) {
        result = 'swiperight';
      } else if (angle >= 45 && angle < 135) {
        result = 'swipeup';
      } else if (angle >= -135 && angle < -45) {
        result = 'swipedown';
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 'swipeleft';
      }
      return result;
    }

    el.addEventListener('touchstart', function(ev) {
      startX = ev.touches[0].pageX;
      startY = ev.touches[0].pageY;
      // 判断长按
      timeOutEvent = setTimeout(() => {
        timeOutEvent = 0;
        if (touchType === 'hold') {
          binding.value(vnode); // v-touch:hold="holdHandler",执行holdHandler方法
        }
      }, 800);
    }, false);

    el.addEventListener('touchmove', function() {
      if (timeOutEvent) {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
      }
    });

    el.addEventListener('touchend', function(ev) {
      if (timeOutEvent) {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
      }
      let endX = ev.changedTouches[0].pageX;
      let endY = ev.changedTouches[0].pageY;
      direction = GetSlideDirection(startX, startY, endX, endY);
      switch (direction) {
        case 0:
          if (touchType === 'tap') {
            binding.value(vnode);
          }
          break;
        case 'swipeup':
          if (touchType === 'swipeup') {
            binding.value(vnode);
          }
          break;
        case 'swipedown':
          if (touchType === 'swipedown') {
            binding.value(vnode);
          }
          break;
        case 'swipeleft':
          if (touchType === 'swipeleft') {
            binding.value(vnode);
          }
          break;
        case 'swiperight':
          if (touchType === 'swiperight') {
            binding.value(vnode);
          }
          break;
        default:
          break;
      }
    }, false);
  }
};
