# 全局消息提示框

### 在 Vue 组件中使用

```js
this.$message({
  show: true, // 是否显示提示框，布尔，默认值 true
  type: 'success', // 消息类型，可选值 success/warning/danger/info，默认值 success
  message: '', // 消息提示语
  showClose: true, // 是否显示右侧关闭小按钮
  duration: 3000, // 多长时间自动消失，单位 ms，填 0 表示一直显示
}).then(()=>{
  // 提示框消失时触发
});
```

### 在普通的 JS 文件中使用
```js
import Message from 'base/message';
Message(options) // options 参数同上
```

### 简写
```js
this.$message('直接显示提示语，其余参数默认')
```
