# 🐛 调试指南 / Debug Guide

## 如何高效调试并分享问题给我

### 步骤 1: 打开开发者工具
1. 按 `F12` 或 `Cmd+Option+I` (Mac) 打开开发者工具
2. 或者右键页面 → 选择"检查" / "Inspect"

### 步骤 2: 查看 Console（控制台）标签页
这是**最重要的**信息源！

1. 点击 **Console** 标签页
2. 清除旧日志：点击 🚫 图标清除
3. **刷新页面** (F5 或 Cmd+R)
4. 复制所有日志：
   - 在 Console 中右键 → "Save as..." 保存
   - 或者直接**全选** (Cmd+A) → **复制** (Cmd+C)

### 步骤 3: 查看 Network（网络）标签页
如果 API 请求失败：

1. 点击 **Network** 标签页
2. 刷新页面
3. 查看是否有红色的请求（失败）
4. 点击失败的请求，查看：
   - **Status**: HTTP 状态码（如 404, 500）
   - **Response**: 服务器返回的错误信息
   - **Preview**: 响应内容预览

### 步骤 4: 查看 Application/Storage（存储）标签页
检查本地存储状态：

1. 点击 **Application** 标签页（Chrome）或 **Storage** 标签页（Firefox）
2. 左侧找到 **Local Storage** → `http://localhost:3000`
3. 查看：
   - `messager-language`: 应该显示 `"en"` 或 `"zh"`
   - `messager-user`: 应该显示 JSON 对象

### 步骤 5: 检查 Elements（元素）标签页
查看 HTML 结构：

1. 点击 **Elements** 标签页
2. 使用左上角的 🔍 工具选择页面元素
3. 查看元素是否有 `hidden` 类名

---

## 📋 应该复制给我的信息

### 优先级 1: Console 日志
```
[INIT] ========================================
[INIT] DOMContentLoaded - Starting initialization
...
（所有以 [INIT] 或 [DEBUG] 开头的日志）
```

### 优先级 2: 错误信息
任何红色的错误，例如：
```
❌ Error: ...
Uncaught TypeError: ...
```

### 优先级 3: Network 错误
如果有失败的 API 请求，告诉我：
- 请求 URL
- 状态码（Status）
- 响应内容（Response）

### 优先级 4: LocalStorage 状态
告诉我这两个值：
```
messager-language: "en" 或 "zh" 或 null
messager-user: {...} 或 null
```

---

## 🎯 快速检查清单

刷新页面后，告诉我：

1. ✅ **Console 中看到了什么？**
   - 有没有 `[INIT]` 开头的日志？
   - 有没有红色的错误？

2. ✅ **页面显示什么？**
   - 语言选择框？
   - 姓名输入框？
   - 还是直接显示了主界面？

3. ✅ **LocalStorage 中有什么？**
   - `messager-language` 的值？
   - `messager-user` 的值？

---

## 💡 最有效的交互方式

**直接复制 Console 的全部内容给我！**

例如：
```
[INIT] ========================================
[INIT] DOMContentLoaded - Starting initialization
[INIT] localStorage check: {language: "en", user: "..."}
[INIT] initLanguageSelection called
[INIT] currentLanguage from localStorage: en
[INIT] ✓ Language already selected: en
[INIT] initNameSection called
...
```

这样我就能立即看到代码运行到哪里了！

