'use strict'
module.exports = {
  // 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
  allowCustomScopes: true,
  allowTicketNumber: false,
  isTicketNumberRequired: false,
  // override the messages, defaults are as follows
  messages: {
    body: '长说明，使用"|"换行(可选): \n',
    breaking: '非兼容性说明 (可选):\n',
    confirmCommit: '确定提交说明?',
    customScope: '输入自定义的scope:',
    footer: '关联关闭的issue, 例如: #31, #34(可选):\n',
    scope: '选择一个scope (可选):',
    subject: '短说明 (必选):\n',
    type: '选择一种你的提交类型:',
  },
  scopes: [
    ['components', '组件相关'],
    ['hooks', 'hook 相关'],
    ['utils', 'utils 相关'],
    ['element-plus', '对 element-plus 的调整'],
    ['style', '样式相关'],
    ['frame', '框架相关'],
    ['deps', '项目依赖'],
    ['auth', '对 auth 修改'],
    ['other', '其他修改'],
  ].map(([value, description]) => `${value}: ${description}`),
  // limit subject length
  subjectLimit: 100,
  // 针对每一个 type 去定义对应的 scopes，例如 fix /*
  // scopeOverrides: {
  //   fix: [{ name: 'merge' }, { name: 'style' }, { name: 'e2eTest' }, { name: 'unitTest' }]
  // },
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: 'd{1,5}',
  // 允许打断更改
  // allowBreakingChanges: ['feat', 'fix'],
  // 跳过
  // skipQuestions: ['customScope', 'body', 'breaking', 'footer'],
  types: [
    { name: 'feat: 一个新的特性', value: 'feat' },
    { name: 'fix: 修复一个Bug', value: 'fix' },
    { name: 'docs: 变更的只有文档', value: 'docs' },
    { name: 'style: 代码样式修改', value: 'style' },
    { name: 'refactor: 代码重构，注意和特性、修复区分开', value: 'refactor' },
    { name: 'perf: 改善性能', value: 'perf' },
    { name: 'test: 添加一个测试', value: 'test' },
    { name: 'build: 修改项目构建系统配置', value: 'build' },
    { name: 'ci: 修改项目继续集成流程', value: 'ci' },
    { name: 'chore: 改变构建流程、或者增加依赖库、工具等', value: 'chore' },
    {
      name: 'improvement: 用于对当前实现进行改进而没有添加新功能或修复错误的提交',
      value: 'improvement',
    },
    { name: 'merge: 仅进行分支合并', value: 'merge' },
    { name: 'revert: 回滚到上一个版本', value: 'revert' },
  ],
}
