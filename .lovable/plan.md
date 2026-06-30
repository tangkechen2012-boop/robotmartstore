
# RobotMart 升级计划

这是一个非常大的需求（涵盖架构、SEO、UI、内容、十几个新页面）。直接一次性全部交付会导致改动失控、风险高、且部分需求（如 SSR）受当前 Vite SPA 架构限制无法直接实现。建议**分阶段交付**，下面是按优先级排好的方案，请您确认从哪一阶段开始，我再开始执行。

---

## 关于架构的重要说明

- 当前项目是 **Vite + React SPA**，技术栈限制下无法做真正的 SSR。可行替代方案：
  - 使用 `react-helmet-async` 让每个路由动态注入 title/description/canonical/OG/JSON-LD（已部分集成）。社交爬虫（Facebook/LinkedIn）只能看 `index.html` 静态头，**Googlebot 能执行 JS 所以能读取**。
  - 如果您需要"产品页初始 HTML 就带完整 meta"，必须迁移到 Next.js 或加 prerender，这超出 Lovable 当前栈，需要单独讨论。
- 当前**没有真实的博客 CMS**，新增 10+ 篇 buying guide / case study 需要先决定：手写 MDX 进仓库 / 用 Cloud DB / 接 Shopify Blog。
- Lighthouse 95+ / LCP < 2.5s 是目标，但取决于 Shopify API 响应速度和图片，无法 100% 保证，会尽力优化。

---

## 阶段 1 — 紧急修复（建议先做这个）

最影响体验和转化的硬伤：

1. **修横向滚动**：审计 `100vw`、负 margin、图库 overflow，全局加 `overflow-x: hidden` 兜底 + 定位元凶。
2. **修产品页移动端主图裁切**：图库容器改 `aspect-ratio: 1/1` + `object-contain`。
3. **产品页首屏加速**：用骨架占位代替空白；预读 Shopify 缓存；critical 字段优先渲染。
4. **分类页展示真实产品**（如未展示）：核对 `/products/humanoid-robots` 等路由确实渲染 Shopify collection 网格，修复加载逻辑。
5. **去重 meta**：检查 `index.html` 与各页 `Seo.tsx` 是否双写 canonical/OG，留一份。
6. **移动端 sticky CTA**（Add to Cart / Request Quote）。

预计：1 轮交付。

---

## 阶段 2 — 导航与首页改版

1. 导航结构改为 Products / Brands / Solutions / Resources / About / Contact + 右侧搜索/购物车/Request Quote 按钮，移动端按钮 ≥44px。
2. 首页 Hero 改为新 H1 / 副标题 / 双 CTA / 4 个信任卖点。
3. 首页板块顺序：Hero → Why Choose → Categories → Applications → Featured Products → Brands → Testimonials（空状态占位，不造假评论）→ Latest Articles → FAQ → Footer。
4. Featured Products 默认渲染真实产品，无长 Loading。

预计：1 轮交付。

---

## 阶段 3 — 产品页统一模板

按您列的结构重写 `ProductDetail.tsx`：Hero（图库+价格+CTA）/ Overview / Key Features / Applications / Specifications 表 / What's Included / Downloads / Why Buy / FAQ / Related Products / Related Articles。缺数据字段统一 fallback 文案。同时补 Product Schema + FAQ Schema + Breadcrumb Schema 进 Helmet。

预计：1 轮交付。

---

## 阶段 4 — 分类页模板 + 询价页增强

1. 分类页加 SEO Intro（300-600 字，每个分类一份）、筛选器扩展（已有 sidebar，加 Quote Required / 库存 / 新旧）、FAQ × 6、Related Guides。
2. `/request-quote` 增加字段：型号、数量、Buyer Type、国家、预算、时间线、用途、培训/配件/PO、文件上传、WhatsApp。

预计：1 轮交付。

---

## 阶段 5 — SEO 全站

`react-helmet-async` per-route：唯一 title/desc/canonical/OG/Twitter + JSON-LD（Organization / WebSite / Breadcrumb / Product / FAQ / Article）。补图片 alt。`generate-sitemap.ts` 动态读 Shopify 产品/集合输出 sitemap。404 页加热门分类+搜索。

预计：1 轮交付。

---

## 阶段 6 — 性能与图片

`vite-imagetools` 转 WebP/AVIF、LCP 预加载、所有 `<img>` lazy + `width/height` 防 CLS、产品图 hover zoom、YouTube facade。跑 Lighthouse 反复优化。

预计：1-2 轮交付。

---

## 阶段 7 — 内容页与信任体系（最重，需先决策）

**需要您先决定内容来源**：
- 12+ 篇 Buying Guides / Solutions / Glossary：手写 MDX？还是您提供文案？
- About 增加 Company Story / Team / Partners / Certifications：**需要您提供真实照片和文字**，否则我只能放占位（不会编造）。
- Reviews / Case Studies：**不会生成假评论**，只搭空 UI 框架。

新增路由：`/buying-guides/*`、`/solutions/*`、`/resources/robotics-glossary`、`/faq`、`/support`、`/downloads`、`/case-studies`、`/partner-program`、`/become-a-distributor`。

预计：2-3 轮交付。

---

## 我的建议

**先执行阶段 1 + 阶段 2**（紧急修复 + 首页/导航改版），这两个能立刻让网站体感升一个档次，且不依赖您补内容。完成后再推进 3-7。

### 请告诉我：

1. ✅ **是否同意从「阶段 1 + 阶段 2」开始？** 还是想换个起点？
2. **SSR 问题**：接受 SPA + Helmet 方案（Google 能读，社交爬虫读首页默认）？还是要规划迁移 Next.js？
3. **内容来源**：阶段 7 的 buying guides / case studies 由您提供文案，还是允许我生成草稿后您审核？
4. **About / Reviews**：是否有真实公司照片、团队照片、客户评价可以提供？没有的话保留占位（不造假）。
