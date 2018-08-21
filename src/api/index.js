import * as api from './api';

export default api;

//   MessageBox(弹窗): 消息提示
//   this.$alert('这是一段内容', '标题名称', {
//     confirmButtonText: '确定',
//     callback: action => {
//     this.$message({
//       type: 'info',
//       message: `action: ${ action }`
//     });
//   }


//   MessageBox(弹窗): 确认消息
//   this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     type: 'warning'
//   }).then(() => {
//     this.$message({
//       type: 'success',
//       message: '删除成功!'
//     });
//   }).catch(() => {
//     this.$message({
//       type: 'info',
//       message: '已取消删除'
//     });          
//   });

//   MessageBox(弹窗): 提交内容
//   this.$prompt('请输入邮箱', '提示', {
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
//     inputErrorMessage: '邮箱格式不正确'
//   }).then(({ value }) => {
//     this.$message({
//       type: 'success',
//       message: '你的邮箱是: ' + value
//     });
//   }).catch(() => {
//     this.$message({
//       type: 'info',
//       message: '取消输入'
//     });       
//   });

//   MessageBox(弹窗): 自定义
//   this.$msgbox({
//     title: '消息',
//     message: h('p', null, [
//       h('span', null, '内容可以是 '),
//       h('i', { style: 'color: teal' }, 'VNode')
//     ]),
//     showCancelButton: true,
//     confirmButtonText: '确定',
//     cancelButtonText: '取消',
//     beforeClose: (action, instance, done) => {
//       if (action === 'confirm') {
//         instance.confirmButtonLoading = true;
//         instance.confirmButtonText = '执行中...';
//         setTimeout(() => {
//           done();
//           setTimeout(() => {
//             instance.confirmButtonLoading = false;
//           }, 300);
//         }, 3000);
//       } else {
//         done();
//       }
//     }
//   }).then(action => {
//     this.$message({
//       type: 'info',
//       message: 'action: ' + action
//     });
//   });


//   MessageBox(弹窗): 使用 HTML 片段
//   this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
//     dangerouslyUseHTMLString: true
//   });
