(function () {
  "use strict";

  /* ---------- i18n ---------- */
  var LANG_KEY = "sab.lang";
  var SITE_DEFAULT = "化工园区"; // internal value, never translated in state

  /** Boolean inputs, in display order. Each id is also its i18n key (label) and md key (summary). */
  var BOOL_FIELDS = [
    "scopeFire", "scopePPE", "scopeFence",
    "singleFrameTriggersAlarm", "hasThermalRecheck", "hasHotWork", "hasHotWorkMask",
    "ppeBoundToPose",
    "fenceUsesGroundPoint", "hasShadowRemoval", "hasSceneAnchor",
    "hasVideoQualityProbe", "publicMetricAsPromise",
    "fpRateDefinedInWriting", "missLiabilityAgreed", "alarmLinksPhysicalAction", "hasHumanConfirmForLinkage", "clientWantsZeroMiss",
  ];

  var I18N = {
    zh: {
      docTitle: "安监告警边界 · Safety Alert Boundary",
      docDesc: "一线踩出来的安监视觉告警边界清单。报价／承诺前先自查技术与工程边界，再写进方案与合同。",
      title: "安监告警边界",
      tagline: "一线踩出来的经验：对外报价、承诺烟火／穿戴／电子围栏告警效果前，先把技术与工程边界、误报漏报责任过一遍。",
      audience: "面向甲方安全科／厂长，以及谈落地的交付／销售",
      rulesLoading: "加载规则中…",
      loading: "正在加载规则…",
      inputTitle: "场景输入",
      site: "场景／园区",
      sitePh: "默认：化工园区",
      siteDefault: "化工园区",
      grpScope: "本单告警范围",
      grpFire: "烟火检测",
      grpPPE: "反光衣／安全帽",
      grpFence: "电子围栏",
      grpCommon: "通用",
      grpLiability: "责任兜底（结构演示）",
      scopeFire: "烟火检测",
      scopePPE: "反光衣／安全帽",
      scopeFence: "电子围栏",
      singleFrameTriggersAlarm: "告警是否单帧直触（单帧检出即触发高阶告警）",
      hasThermalRecheck: "是否有红外／热成像测温差复核",
      hasHotWork: "现场有无动火作业（电焊等）",
      hasHotWorkMask: "动火报备期是否支持电焊区时间-空间动态掩模",
      ppeBoundToPose: "穿戴识别是否绑定骨骼关键点／头肩-躯干关联",
      fenceUsesGroundPoint: "围栏判定是否用接地点（脚底关键点／车轮着地点）",
      hasShadowRemoval: "是否有阴影剔除",
      hasSceneAnchor: "有无场景锚点防漂移（开机／预置位后比对基准图，超差冻结围栏）",
      hasVideoQualityProbe: "有无视频质量自检（盲拍、遮挡、偏色、过曝、脏污、卡死）",
      publicMetricAsPromise: "公开数据集指标是否被当作现场承诺",
      fpRateDefinedInWriting: "是否已书面约定误报率口径和统计周期",
      missLiabilityAgreed: "是否已约定漏报责任归属（AI 是辅助，不替代人工巡检／法定安全设施）",
      alarmLinksPhysicalAction: "告警是否联动声光／喷淋／停机等物理动作",
      hasHumanConfirmForLinkage: "联动前是否有人工确认环节",
      clientWantsZeroMiss: "客户是否要求「零漏报」承诺",
      claimedMetricText: "拟写进方案的指标话术（可选）",
      claimedMetricTextPh: "例：误报率低于 X%",
      claimedMetricTextHint: "没有书面口径却填写此处 → 将触发拒单",
      btnEval: "重新评估",
      btnDangerous: "危险承诺预设",
      btnReset: "重置",
      outputTitle: "边界输出",
      nextTitle: "先补哪项证据",
      allowTitle: "可承诺",
      deferTitle: "暂缓",
      rejectTitle: "明确拒单",
      btnCopy: "复制 Markdown",
      footerNote: "<strong>说明：</strong>本页把安监视觉交付里踩过的坑固化成可编辑规则，供报价／承诺前自查。规则见 <code>rules.json</code>。结构演示，非法律意见；不替代安全评价、法定安全设施或人工巡检。",
      openSource: "開源",
      siblingPrefix: "姊妹工具：",
      siblingName: "质检承诺边界",
      siblingHref: "https://bianwuwei.github.io/vision-promise-boundary/",
      langToggleAria: "切换语言 / Switch language",
      emptyNext: "没有缺的证据。",
      emptyAllow: "当前无「可承诺」项——先补齐边界条件。",
      emptyDefer: "无暂缓项。",
      emptyReject: "无拒单项。",
      unblockReject: function (n) { return "解除拒单 " + n + " 条"; },
      unblockDefer: function (n) { return "解除暂缓 " + n + " 条"; },
      partsSep: "，",
      parenOpen: "（",
      parenClose: "）",
      gapPrefix: "缺：",
      gapSep: "、",
      liabilityCount: function (ok, n) { return ok + "/" + n; },
      rulesMeta: function (n, v) { return "规则 " + n + " 条 · v" + v; },
      loadFailed: "加载规则失败：",
      toastCopied: "已复制 Markdown",
      toastCopyFailed: "复制失败，请手动选择",
      toastEval: "已重新评估",
      toastDangerous: function (n) { return "危险承诺预设 → 触发拒单 " + n + " 条"; },
      toastPreset: "预设已填入",
      toastReset: "已重置",
      presetMetricText: "公开数据集准确率 99.8%，零漏报",
      md: {
        title: "# 安监告警边界清单",
        source: "> 生成自 [safety-alert-boundary](https://bianwuwei.github.io/safety-alert-boundary/) · 结构演示，非法律意见",
        summary: "## 场景摘要",
        colon: "：",
        yes: "是",
        no: "否",
        none: "_无_",
        site: "场景／园区",
        scope: "告警范围",
        notSelected: "未选",
        claimedMetricText: "指标话术",
        liability: "## 责任兜底（结构演示）",
        footer: "_规则可编辑：见仓库 `docs/rules.json`_",
      },
    },
    en: {
      docTitle: "Safety Alert Boundary",
      docDesc: "A field-tested boundary checklist for industrial safety vision alarms. Check technical and engineering boundaries before quoting or promising, then put them into proposals and contracts.",
      title: "Safety Alert Boundary",
      tagline: "Lessons from the field: before quoting or promising fire/smoke, PPE or electronic-fence alarm performance, walk through the technical and engineering boundaries and who owns false and missed alarms.",
      audience: "For plant safety departments / plant managers, and delivery / sales teams negotiating deployments",
      rulesLoading: "Loading rules…",
      loading: "Loading rules…",
      inputTitle: "Scenario input",
      site: "Site / park",
      sitePh: "Default: Chemical park",
      siteDefault: "Chemical park",
      grpScope: "Alarm types in this deal",
      grpFire: "Fire / smoke detection",
      grpPPE: "Vest / helmet (PPE)",
      grpFence: "Electronic fence",
      grpCommon: "General",
      grpLiability: "Liability fallback (structure demo)",
      scopeFire: "Fire / smoke",
      scopePPE: "Vest / helmet",
      scopeFence: "Electronic fence",
      singleFrameTriggersAlarm: "A single-frame detection fires a high-level alarm directly",
      hasThermalRecheck: "Infrared / thermal temperature-difference recheck in place",
      hasHotWork: "Hot work on site (welding etc.)",
      hasHotWorkMask: "Welding zones can be masked by time and area during the hot-work permit window",
      ppeBoundToPose: "PPE recognition tied to body keypoints / head-shoulder-torso association",
      fenceUsesGroundPoint: "Fence triggers on ground-contact points (foot keypoints / wheel contact)",
      hasShadowRemoval: "Shadow removal in place",
      hasSceneAnchor: "Scene-anchor drift guard (compare to reference image at power-up / preset; freeze fence beyond tolerance)",
      hasVideoQualityProbe: "Video quality probe (blank, blocked, colour cast, overexposed, dirty lens, frozen)",
      publicMetricAsPromise: "A public-dataset metric is being offered as an on-site promise",
      fpRateDefinedInWriting: "False-alarm definition and counting period agreed in writing",
      missLiabilityAgreed: "Missed-alarm liability agreed (AI assists; does not replace manual patrols / statutory safety systems)",
      alarmLinksPhysicalAction: "Alarms drive physical actions (beacons / sprinklers / shutdown)",
      hasHumanConfirmForLinkage: "Human confirmation step before linkage",
      clientWantsZeroMiss: "Customer demands a \"zero missed alarms\" promise",
      claimedMetricText: "Metric claim to put in the proposal (optional)",
      claimedMetricTextPh: "e.g. false-alarm rate below X%",
      claimedMetricTextHint: "Filling this in without a written definition → triggers a reject",
      btnEval: "Re-evaluate",
      btnDangerous: "Dangerous-promise preset",
      btnReset: "Reset",
      outputTitle: "Boundary output",
      nextTitle: "Evidence to collect first",
      allowTitle: "OK to promise",
      deferTitle: "Hold",
      rejectTitle: "Reject",
      btnCopy: "Copy Markdown",
      footerNote: "<strong>Note:</strong> This page turns lessons from safety-vision deliveries into editable rules for self-checking before quotes or promises. Rules live in <code>rules.json</code>. Structure demo, not legal advice; does not replace safety assessments, statutory safety systems or manual patrols.",
      openSource: "Open source",
      siblingPrefix: "Sibling tool: ",
      siblingName: "Vision Promise Boundary",
      siblingHref: "https://bianwuwei.github.io/vision-promise-boundary/?lang=en",
      langToggleAria: "Switch language",
      emptyNext: "No missing evidence.",
      emptyAllow: "Nothing is OK to promise yet — close the boundary gaps first.",
      emptyDefer: "No items on hold.",
      emptyReject: "No rejects.",
      unblockReject: function (n) { return "clears " + n + " reject" + (n === 1 ? "" : "s"); },
      unblockDefer: function (n) { return "clears " + n + " hold" + (n === 1 ? "" : "s"); },
      partsSep: ", ",
      parenOpen: " (",
      parenClose: ")",
      gapPrefix: "Missing: ",
      gapSep: ", ",
      liabilityCount: function (ok, n) { return ok + "/" + n; },
      rulesMeta: function (n, v) { return n + " rules · v" + v; },
      loadFailed: "Failed to load rules: ",
      toastCopied: "Markdown copied",
      toastCopyFailed: "Copy failed — please select and copy manually",
      toastEval: "Re-evaluated",
      toastDangerous: function (n) { return "Dangerous-promise preset → " + n + " reject" + (n === 1 ? "" : "s") + " triggered"; },
      toastPreset: "Preset filled in",
      toastReset: "Reset done",
      presetMetricText: "99.8% accuracy on public datasets, zero missed alarms",
      md: {
        title: "# Safety Alert Boundary Checklist",
        source: "> Generated by [safety-alert-boundary](https://bianwuwei.github.io/safety-alert-boundary/?lang=en) · structure demo, not legal advice",
        summary: "## Scenario summary",
        colon: ": ",
        yes: "Yes",
        no: "No",
        none: "_None_",
        site: "Site / park",
        scope: "Alarm types",
        notSelected: "Not selected",
        claimedMetricText: "Metric claim",
        liability: "## Liability fallback (structure demo)",
        footer: "_Rules are editable: see `docs/rules.json` in the repo_",
      },
    },
  };

  function detectLang() {
    var q = null;
    try {
      q = new URLSearchParams(window.location.search).get("lang");
    } catch (e) {}
    if (q === "en" || q === "zh") return q;
    try {
      var saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "zh") return saved;
    } catch (e) {}
    return "zh";
  }

  var lang = detectLang();

  function t(key) {
    var d = I18N[lang] || I18N.zh;
    return Object.prototype.hasOwnProperty.call(d, key) ? d[key] : I18N.zh[key];
  }

  /** Localized text of a rule / gap / liability field, falling back to Chinese. */
  function loc(obj, field) {
    if (!obj) return "";
    if (lang === "en" && obj[field + "_en"]) return obj[field + "_en"];
    return obj[field] || "";
  }

  var DEFAULT_STATE = { site: SITE_DEFAULT, claimedMetricText: "" };
  BOOL_FIELDS.forEach(function (k) { DEFAULT_STATE[k] = false; });

  /** Dangerous preset: the typical over-promising pitch — every alarm type, no rechecks, public-dataset numbers, zero-miss. */
  var DANGEROUS_PRESET = Object.assign({}, DEFAULT_STATE, {
    scopeFire: true,
    scopePPE: true,
    scopeFence: true,
    singleFrameTriggersAlarm: true,
    hasHotWork: true,
    publicMetricAsPromise: true,
    alarmLinksPhysicalAction: true,
    clientWantsZeroMiss: true,
    claimedMetricText: "公开数据集准确率 99.8%，零漏报", // replaced by current-language text in presetForLang()
  });

  function presetForLang() {
    return Object.assign({}, DANGEROUS_PRESET, { claimedMetricText: t("presetMetricText") });
  }

  function isSiteDefault(v) {
    return v === I18N.zh.siteDefault || v === I18N.en.siteDefault;
  }
  function displaySite(v) {
    return !v || isSiteDefault(v) ? t("siteDefault") : v;
  }

  var rules = [];
  var gaps = {};
  var liability = null;
  var rulesVersion = "?";
  var rulesLoaded = false;
  var WEIGHT = { reject: 3, defer: 1 };

  function $(id) {
    return document.getElementById(id);
  }

  function readState() {
    var s = {};
    var site = ($("site").value || "").trim();
    s.site = !site || isSiteDefault(site) ? SITE_DEFAULT : site;
    BOOL_FIELDS.forEach(function (k) { s[k] = $(k).checked; });
    s.claimedMetricText = ($("claimedMetricText").value || "").trim();
    return s;
  }

  function writeState(state) {
    $("site").value = displaySite(state.site);
    BOOL_FIELDS.forEach(function (k) { $(k).checked = !!state[k]; });
    $("claimedMetricText").value = state.claimedMetricText || "";
  }

  function matchCond(cond, state) {
    if (cond.all) {
      return cond.all.every(function (c) { return matchCond(c, state); });
    }
    if (cond.any) {
      return cond.any.some(function (c) { return matchCond(c, state); });
    }
    var val = state[cond.field];
    if (Object.prototype.hasOwnProperty.call(cond, "eq")) return val === cond.eq;
    if (Object.prototype.hasOwnProperty.call(cond, "neq")) return val !== cond.neq;
    return false;
  }

  function evaluate(state, ruleList) {
    var allow = [];
    var defer = [];
    var reject = [];
    ruleList.forEach(function (rule) {
      if (!matchCond(rule.when, state)) return;
      var item = { id: rule.id, message: loc(rule, "message"), outcome: rule.outcome, gaps: rule.gaps || [] };
      if (rule.outcome === "allow") allow.push(item);
      else if (rule.outcome === "defer") defer.push(item);
      else if (rule.outcome === "reject") reject.push(item);
    });
    var next = rankGaps(defer.concat(reject));
    var order = {};
    next.forEach(function (g, i) { order[g.key] = i; });
    function rank(it) {
      var best = 999;
      it.gaps.forEach(function (k) { if (order[k] !== undefined && order[k] < best) best = order[k]; });
      return best;
    }
    function byGap(a, b) { return rank(a) - rank(b); }
    defer.sort(byGap);
    reject.sort(byGap);
    return { allow: allow, defer: defer, reject: reject, next: next, liability: evalLiability(state) };
  }

  /** Liability checklist from rules.json → liability.items; each item has its own okWhen condition. */
  function evalLiability(state) {
    if (!liability || !liability.items) return [];
    return liability.items.map(function (it) {
      return { key: it.key, label: loc(it, "label"), ok: matchCond(it.okWhen, state), text: matchCond(it.okWhen, state) ? loc(it, "ok") : loc(it, "missing") };
    });
  }

  /** Group triggered rules by the missing evidence behind them; rank by how much each one unblocks. */
  function rankGaps(items) {
    var map = {};
    items.forEach(function (it) {
      it.gaps.forEach(function (k) {
        if (!map[k]) map[k] = { key: k, score: 0, reject: 0, defer: 0, ids: [] };
        map[k].score += WEIGHT[it.outcome] || 0;
        map[k][it.outcome] += 1;
        map[k].ids.push(it.id);
      });
    });
    return Object.keys(map)
      .map(function (k) { return map[k]; })
      .sort(function (a, b) { return b.score - a.score || b.reject - a.reject; });
  }

  function gapLabel(k) {
    return loc(gaps[k], "label") || k;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderNext(el, next) {
    el.querySelector(".count").textContent = String(next.length);
    var body = el.querySelector(".body");
    if (!next.length) {
      body.innerHTML = '<p class="empty">' + escapeHtml(t("emptyNext")) + "</p>";
      return;
    }
    var html = "<ol>";
    next.forEach(function (g) {
      var parts = [];
      if (g.reject) parts.push(t("unblockReject")(g.reject));
      if (g.defer) parts.push(t("unblockDefer")(g.defer));
      html +=
        "<li><strong>" + escapeHtml(gapLabel(g.key)) + "</strong>" + escapeHtml(t("parenOpen") + parts.join(t("partsSep")) + t("parenClose")) + "<br>" +
        escapeHtml(loc(gaps[g.key], "action")) + "</li>";
    });
    html += "</ol>";
    body.innerHTML = html;
  }

  function renderLiability(el, items) {
    $("liability-title").textContent = loc(liability, "title");
    var okN = items.filter(function (i) { return i.ok; }).length;
    el.querySelector(".count").textContent = t("liabilityCount")(okN, items.length);
    var html = "<ul>";
    items.forEach(function (i) {
      html += '<li><span class="st ' + (i.ok ? "ok" : "bad") + '">' + (i.ok ? "✓" : "✗") + "</span><strong>" +
        escapeHtml(i.label) + "</strong>" + escapeHtml(t("md").colon + i.text) + "</li>";
    });
    html += "</ul>";
    html += '<p class="disclaimer">' + escapeHtml(loc(liability, "disclaimer")) + "</p>";
    el.querySelector(".body").innerHTML = html;
  }

  function renderList(el, items, emptyText) {
    var countEl = el.querySelector(".count");
    var body = el.querySelector(".body");
    countEl.textContent = String(items.length);
    if (!items.length) {
      body.innerHTML = '<p class="empty">' + emptyText + "</p>";
      return;
    }
    var html = "<ul>";
    items.forEach(function (it) {
      html +=
        '<li><span class="rule-id">' + escapeHtml(it.id) + "</span>" +
        (it.gaps && it.gaps.length
          ? '<span class="gap-tag">' + escapeHtml(t("gapPrefix")) + it.gaps.map(gapLabel).map(escapeHtml).join(escapeHtml(t("gapSep"))) + "</span>"
          : "") +
        escapeHtml(it.message) +
        "</li>";
    });
    html += "</ul>";
    body.innerHTML = html;
  }

  function run() {
    var state = readState();
    var result = evaluate(state, rules);
    renderNext($("list-next"), result.next);
    renderLiability($("list-liability"), result.liability);
    renderList($("list-allow"), result.allow, escapeHtml(t("emptyAllow")));
    renderList($("list-defer"), result.defer, escapeHtml(t("emptyDefer")));
    renderList($("list-reject"), result.reject, escapeHtml(t("emptyReject")));
    window.__lastResult = { state: state, result: result };
    return result;
  }

  function buildMarkdown(state, result) {
    var m = t("md");
    var lines = [];
    function yn(b) { return b ? m.yes : m.no; }
    lines.push(m.title, "", m.source, "", m.summary, "");
    lines.push("- " + m.site + m.colon + displaySite(state.site));
    var scopes = ["scopeFire", "scopePPE", "scopeFence"].filter(function (k) { return state[k]; }).map(t);
    lines.push("- " + m.scope + m.colon + (scopes.length ? scopes.join(t("gapSep")) : m.notSelected));
    BOOL_FIELDS.slice(3).forEach(function (k) {
      lines.push("- " + t(k) + m.colon + yn(state[k]));
    });
    if (state.claimedMetricText) lines.push("- " + m.claimedMetricText + m.colon + state.claimedMetricText);
    lines.push("");

    function heading(title, n) {
      return "## " + title + t("parenOpen") + n + t("parenClose");
    }
    function section(title, items) {
      lines.push(heading(title, items.length), "");
      if (!items.length) {
        lines.push(m.none, "");
        return;
      }
      items.forEach(function (it) {
        lines.push("- **`" + it.id + "`** " + it.message);
      });
      lines.push("");
    }

    lines.push(heading(t("nextTitle"), result.next.length), "");
    if (!result.next.length) lines.push(m.none);
    result.next.forEach(function (g, i) {
      var parts = [];
      if (g.reject) parts.push(t("unblockReject")(g.reject));
      if (g.defer) parts.push(t("unblockDefer")(g.defer));
      lines.push((i + 1) + ". **" + gapLabel(g.key) + "**" + t("parenOpen") + parts.join(t("partsSep")) + t("parenClose") + m.colon + loc(gaps[g.key], "action"));
    });
    lines.push("");

    lines.push(m.liability, "");
    result.liability.forEach(function (i) {
      lines.push("- " + (i.ok ? "✓" : "✗") + " **" + i.label + "**" + m.colon + i.text);
    });
    lines.push("", "> " + loc(liability, "disclaimer"), "");

    section(t("allowTitle"), result.allow);
    section(t("deferTitle"), result.defer);
    section(t("rejectTitle"), result.reject);

    lines.push("---", "", m.footer);
    return lines.join("\n");
  }

  function showToast(msg) {
    var el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(showToast._timer);
    showToast._timer = setTimeout(function () {
      el.classList.remove("show");
    }, 2200);
  }

  function copyMarkdown() {
    var pack = window.__lastResult;
    if (!pack) {
      run();
      pack = window.__lastResult;
    }
    var md = buildMarkdown(pack.state, pack.result);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).then(
        function () { showToast(t("toastCopied")); },
        function () { fallbackCopy(md); }
      );
    } else {
      fallbackCopy(md);
    }
  }

  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.left = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
      showToast(t("toastCopied"));
    } catch (e) {
      showToast(t("toastCopyFailed"));
    }
    document.body.removeChild(ta);
  }

  function bind() {
    var form = $("scenario-form");
    form.addEventListener("change", run);
    form.addEventListener("input", run);
    $("btn-eval").addEventListener("click", function (e) {
      e.preventDefault();
      run();
      showToast(t("toastEval"));
    });
    $("btn-copy").addEventListener("click", function (e) {
      e.preventDefault();
      copyMarkdown();
    });
    $("btn-dangerous").addEventListener("click", function (e) {
      e.preventDefault();
      writeState(presetForLang());
      var result = run();
      showToast(result.reject.length > 0 ? t("toastDangerous")(result.reject.length) : t("toastPreset"));
    });
    $("lang-toggle").addEventListener("click", function (e) {
      e.preventDefault();
      setLang(lang === "en" ? "zh" : "en");
    });
    $("btn-reset").addEventListener("click", function (e) {
      e.preventDefault();
      writeState(DEFAULT_STATE);
      run();
      showToast(t("toastReset"));
    });
  }

  function renderRulesMeta() {
    $("rules-meta").textContent = rulesLoaded ? t("rulesMeta")(rules.length, rulesVersion) : t("rulesLoading");
  }

  function swapPresetField(id, key) {
    var el = $(id);
    var v = el.value;
    if (v && (v === I18N.zh[key] || v === I18N.en[key])) el.value = t(key);
  }

  function applyLang() {
    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.title = t("docTitle");
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("docDesc"));
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-placeholder")));
    });
    document.querySelectorAll("[data-i18n-aria-label]").forEach(function (el) {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria-label")));
    });
    $("sibling-link").setAttribute("href", t("siblingHref"));
    var toggle = $("lang-toggle");
    toggle.setAttribute("aria-label", t("langToggleAria"));
    toggle.querySelectorAll("[data-lang]").forEach(function (s) {
      s.classList.toggle("active", s.getAttribute("data-lang") === lang);
    });
    var site = $("site");
    if (!site.value || isSiteDefault(site.value)) site.value = t("siteDefault");
    swapPresetField("claimedMetricText", "presetMetricText");
    if (liability) $("liability-title").textContent = loc(liability, "title");
    renderRulesMeta();
  }

  function setLang(next) {
    lang = next === "en" ? "en" : "zh";
    try {
      window.localStorage.setItem(LANG_KEY, lang);
    } catch (e) {}
    applyLang();
    if (rulesLoaded) run();
  }

  function loadRules() {
    return fetch("rules.json", { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("rules.json HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        rules = data.rules || [];
        gaps = data.gaps || {};
        liability = data.liability || { items: [] };
        rulesVersion = data.version || "?";
        rulesLoaded = true;
        renderRulesMeta();
      });
  }

  // Expose for smoke tests
  window.SafetyAlertBoundary = {
    evaluate: evaluate,
    rankGaps: rankGaps,
    matchCond: matchCond,
    buildMarkdown: buildMarkdown,
    DANGEROUS_PRESET: DANGEROUS_PRESET,
    DEFAULT_STATE: DEFAULT_STATE,
    setLang: setLang,
    getLang: function () { return lang; },
    getRules: function () { return rules; },
    run: run,
  };

  document.addEventListener("DOMContentLoaded", function () {
    bind();
    writeState(DEFAULT_STATE);
    applyLang();
    loadRules()
      .then(function () {
        $("loading").hidden = true;
        $("app-main").hidden = false;
        run();
      })
      .catch(function (err) {
        $("loading").textContent = t("loadFailed") + err.message;
      });
  });
})();
