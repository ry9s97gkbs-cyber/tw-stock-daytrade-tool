const stocks = {
  "2317": {
    name: "鴻海",
    price: 238,
    change: 4.62,
    volumeRank: 3,
    group: "AI伺服器 / 電子權值",
    scores: {
      trend: 76,
      volume: 74,
      chip: 66,
      fundamental: 78,
      catalyst: 72,
      risk: 63,
    },
    positives: [
      "成交金額大，零股流動性較佳，適合小資部位進出。",
      "權值股短線走勢穩，隔日衝滑價風險低於高價飆股。",
      "AI伺服器題材仍在主流清單內，族群延續性可追蹤。",
    ],
    risks: [
      "若大盤開低，權值股容易被拿來調節指數。",
      "漲幅偏穩，隔日衝爆發力不一定比記憶體族群強。",
    ],
  },
  "2408": {
    name: "南亞科",
    price: 256.5,
    change: 8.23,
    volumeRank: 1,
    group: "記憶體",
    scores: {
      trend: 88,
      volume: 92,
      chip: 71,
      fundamental: 62,
      catalyst: 86,
      risk: 48,
    },
    positives: [
      "記憶體為今日主線，成交金額居前，短線人氣集中。",
      "量價同步轉強，若尾盤維持高檔，隔日買盤容易延續。",
      "同族群若旺宏、華邦電同步走強，題材可信度提高。",
    ],
    risks: [
      "短線漲幅大，明天若跳空過高容易出現獲利了結。",
      "爆量後若收不過高點，可能變成短線換手或出貨訊號。",
    ],
  },
  "2337": {
    name: "旺宏",
    price: 161,
    change: 4.21,
    volumeRank: 6,
    group: "記憶體",
    scores: {
      trend: 73,
      volume: 81,
      chip: 64,
      fundamental: 58,
      catalyst: 77,
      risk: 57,
    },
    positives: [
      "單價低於南亞科，零股資金壓力較小。",
      "跟隨記憶體主流，若龍頭續強，輪動機會較明顯。",
      "成交量充足，短線進出條件比冷門股好。",
    ],
    risks: [
      "跟漲屬性較強，若南亞科轉弱，旺宏容易同步降溫。",
      "基本面分數普通，不適合把隔日衝失敗單改成長抱。",
    ],
  },
  "2344": {
    name: "華邦電",
    price: 97.6,
    change: 3.94,
    volumeRank: 14,
    group: "記憶體",
    scores: {
      trend: 69,
      volume: 76,
      chip: 62,
      fundamental: 56,
      catalyst: 75,
      risk: 60,
    },
    positives: [
      "價位親民，適合零股小額測試部位。",
      "記憶體題材熱度仍在，容易受族群帶動。",
      "若尾盤收在高檔，隔天早盤有短線承接機會。",
    ],
    risks: [
      "強度略低於南亞科與旺宏，需確認族群同步性。",
      "若開盤量縮，容易只剩題材但沒有追價力。",
    ],
  },
  "2303": {
    name: "聯電",
    price: 81.2,
    change: 1.4,
    volumeRank: 18,
    group: "晶圓代工",
    scores: {
      trend: 61,
      volume: 69,
      chip: 59,
      fundamental: 66,
      catalyst: 55,
      risk: 70,
    },
    positives: [
      "股價較低且流動性佳，零股容易切小部位。",
      "波動相對可控，適合偏保守的短線觀察。",
    ],
    risks: [
      "題材強度不如記憶體與 AI 伺服器主線。",
      "若只是補漲，隔日衝空間可能有限。",
    ],
  },
  "2449": {
    name: "京元電子",
    price: 238,
    change: 3.7,
    volumeRank: 9,
    group: "半導體測試 / AI",
    scores: {
      trend: 74,
      volume: 78,
      chip: 65,
      fundamental: 70,
      catalyst: 76,
      risk: 58,
    },
    positives: [
      "AI 與半導體測試題材延續，容易受到資金關注。",
      "成交活絡度夠，零股進出不會像冷門股容易卡住。",
      "若尾盤守高且族群同步，隔日衝有續航機會。",
    ],
    risks: [
      "高價股零股單股成本較高，部位要比低價股更克制。",
      "若開高後量縮，容易出現短線獲利了結。",
    ],
  },
};

const watchlistMeta = [
  { symbol: "2317", rank: "首選", note: "穩健零股" },
  { symbol: "2408", rank: "攻擊", note: "記憶體主線" },
  { symbol: "2337", rank: "跟強", note: "資金壓力小" },
  { symbol: "2344", rank: "小資", note: "低價記憶體" },
  { symbol: "2449", rank: "題材", note: "AI 測試" },
  { symbol: "2303", rank: "保守", note: "流動性佳" },
];

const labels = {
  trend: "趨勢動能",
  volume: "價量結構",
  chip: "籌碼",
  fundamental: "基本面",
  catalyst: "題材事件",
  risk: "風險控制",
};

const weights = {
  overnight: {
    trend: 0.24,
    volume: 0.26,
    chip: 0.18,
    fundamental: 0.08,
    catalyst: 0.16,
    risk: 0.08,
  },
  swing: {
    trend: 0.2,
    volume: 0.16,
    chip: 0.15,
    fundamental: 0.24,
    catalyst: 0.1,
    risk: 0.15,
  },
};

const form = document.querySelector("#analysisForm");
const symbolInput = document.querySelector("#symbolInput");
const tickerList = document.querySelector("#tickerList");
const riskSlider = document.querySelector("#riskSlider");
const profitSlider = document.querySelector("#profitSlider");
const globalMood = document.querySelector("#globalMood");
const taiwanNewsMood = document.querySelector("#taiwanNewsMood");
const nightFuturesInput = document.querySelector("#nightFuturesInput");
const refreshMarketButton = document.querySelector("#refreshMarketButton");
const marketContextStatus = document.querySelector("#marketContextStatus");
const stockCache = new Map();
const rankingCache = new Map();
let currentSymbol = "2317";
let currentStock = null;
let marketContext = {
  usScore: 0,
  usLabel: "美股尚未更新",
  updatedAt: null,
};

function weightedScore(stock, mode) {
  return Math.round(
    Object.entries(weights[mode]).reduce((sum, [key, weight]) => sum + stock.scores[key] * weight, 0)
  );
}

function getMarketContextScore() {
  const globalScore = Number(globalMood.value);
  const taiwanScore = Number(taiwanNewsMood.value);
  const nightPct = parseNumber(nightFuturesInput.value);
  const nightScore = clamp(nightPct * 3, -8, 8);
  const raw = globalScore + taiwanScore + marketContext.usScore + nightScore;

  return {
    total: clamp(raw, -20, 20),
    globalScore,
    taiwanScore,
    usScore: marketContext.usScore,
    nightScore,
    nightPct,
  };
}

function getSectorSensitivity(stock) {
  const group = stock.group || "";
  if (group.includes("記憶體")) return 1.2;
  if (group.includes("AI") || group.includes("半導體")) return 1.1;
  if (group.includes("電子權值") || group.includes("晶圓")) return 1;
  return 0.85;
}

function adjustedScore(stock, mode) {
  const base = weightedScore(stock, mode);
  const context = getMarketContextScore();
  const sensitivity = getSectorSensitivity(stock);
  const weakRiskPenalty = context.total < 0 && stock.scores.risk < 55 ? 3 : 0;
  const adjustment = clamp(context.total * sensitivity - weakRiskPenalty, -15, 15);
  return {
    base,
    total: clamp(base + adjustment),
    adjustment,
    context,
  };
}

function getMarketLabel(context) {
  if (context.total >= 10) return "偏多，短線可提高追蹤";
  if (context.total >= 4) return "小偏多，強勢股加分";
  if (context.total <= -10) return "偏空，隔日衝需降槓桿";
  if (context.total <= -4) return "小偏空，追高扣分";
  return "中性，不加不減";
}

function getVerdict(total, stock, mode) {
  if (stock.scores.risk < 52 && stock.change > 7) {
    return { text: "觀望偏多", className: "watch", label: "強勢但過熱，等尾盤確認" };
  }
  if (total >= 80) return { text: "可買", className: "buy", label: "符合條件再進場" };
  if (total >= 65) return { text: "觀望偏多", className: "watch", label: "可追蹤，等尾盤確認" };
  if (total >= 50) return { text: "觀望", className: "watch", label: "訊號不足，不追高" };
  return { text: mode === "overnight" ? "不適合" : "偏賣", className: "sell", label: "風險大於報酬" };
}

function getFit(stock, total) {
  if (stock.scores.volume >= 75 && total >= 65 && stock.scores.risk >= 52) {
    return ["適合", "量能與分數達標，尾盤需站穩"];
  }
  if (stock.scores.volume >= 80 && stock.change > 7) {
    return ["可觀察", "人氣強，但追高風險偏大"];
  }
  return ["不優先", "缺少隔日衝所需的量價優勢"];
}

function renderWatchlist(activeSymbol) {
  const mode = new FormData(form).get("mode");
  const ranked = watchlistMeta
    .map((item) => {
      const stock = rankingCache.get(item.symbol) || stocks[item.symbol];
      const score = adjustedScore(stock, mode);
      return { ...item, stock, score };
    })
    .sort((a, b) => b.score.total - a.score.total);

  const groups = [
    { title: "80 以上", range: "強勢候選", items: ranked.filter((item) => item.score.total >= 80) },
    { title: "70-80", range: "可追蹤", items: ranked.filter((item) => item.score.total >= 70 && item.score.total < 80) },
    { title: "60-70", range: "觀察", items: ranked.filter((item) => item.score.total >= 60 && item.score.total < 70) },
  ];

  tickerList.innerHTML = groups
    .map((group) => {
      const buttons = group.items.length
        ? group.items
            .map(({ symbol, rank, note, stock, score }) => {
              const current = symbol === activeSymbol ? ' aria-current="true"' : "";
              const adjustment = score.adjustment > 0 ? `+${score.adjustment}` : score.adjustment;
              return `
                <button type="button" data-symbol="${symbol}"${current}>
                  <span>${rank} ${symbol} ${stock.name}<small>${note}｜${stock.group}</small></span>
                  <b class="rank-score">${score.total}<em>${adjustment}</em></b>
                </button>
              `;
            })
            .join("")
        : `<p class="context-status">目前沒有股票落在此區間</p>`;

      return `
        <div class="rank-group">
          <div class="rank-title"><span>${group.title}</span><span>${group.range}</span></div>
          ${buttons}
        </div>
      `;
    })
    .join("");
}

function renderScores(stock) {
  document.querySelector("#scoreRows").innerHTML = Object.entries(labels)
    .map(([key, label]) => {
      const value = stock.scores[key];
      return `
        <div class="score-row">
          <div class="score-meta"><span>${label}</span><strong>${value}</strong></div>
          <div class="bar" aria-hidden="true"><i style="width:${value}%"></i></div>
        </div>
      `;
    })
    .join("");
}

function renderPlan(stock, mode) {
  const risk = Number(riskSlider.value);
  const profit = Number(profitSlider.value);
  const buyWindow = mode === "overnight" ? "13:15-13:25" : "9:05-9:30";
  const sellWindow = mode === "overnight" ? "隔天 9:00-9:30" : "達標或轉弱";
  const maxOpenGap = stock.change > 7 ? "開高超過 4% 不追" : "開高超過 3% 不追";
  const steps = [
    ["買進", `${buyWindow}，限價買；${maxOpenGap}，尾盤需收在當日高檔。`],
    ["停損", `跌破買進價 ${risk}% 或紅翻黑，直接出場，不改成長抱。`],
    ["停利", `${sellWindow}，獲利 ${profit}% 附近先賣一半或全出。`],
    ["撤退", "量縮、爆量不漲、族群轉弱、大盤急殺，取消交易。"],
  ];

  document.querySelector("#tradePlan").innerHTML = steps
    .map(([time, text]) => `
      <div class="step">
        <span>${time}</span>
        <p><strong>${text.split("，")[0]}</strong>${text.includes("，") ? text.slice(text.indexOf("，") + 1) : ""}</p>
      </div>
    `)
    .join("");
}

function renderReasons(stock) {
  document.querySelector("#buyReasons").innerHTML = stock.positives.map((item) => `<li>${item}</li>`).join("");
  document.querySelector("#riskFlags").innerHTML = stock.risks.map((item) => `<li>${item}</li>`).join("");
}

function parseNumber(value) {
  if (typeof value === "number") return value;
  const cleaned = String(value || "").replace(/[,+]/g, "").trim();
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : 0;
}

function average(values) {
  if (!values.length) return 0;
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

function formatMonthDate(date) {
  return `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}01`;
}

function recentMonthDates(count = 8) {
  const dates = [];
  const today = new Date();
  for (let index = 0; index < count; index += 1) {
    dates.push(new Date(today.getFullYear(), today.getMonth() - index, 1));
  }
  return dates;
}

function parseRocDate(value) {
  const [rocYear, month, day] = value.split("/").map(Number);
  return new Date(rocYear + 1911, month - 1, day);
}

function ema(values, period) {
  if (!values.length) return [];
  const multiplier = 2 / (period + 1);
  const result = [values[0]];
  for (let index = 1; index < values.length; index += 1) {
    result.push(values[index] * multiplier + result[index - 1] * (1 - multiplier));
  }
  return result;
}

function rsi(closes, period = 14) {
  if (closes.length <= period) return 50;
  let gains = 0;
  let losses = 0;
  for (let index = closes.length - period; index < closes.length; index += 1) {
    const diff = closes[index] - closes[index - 1];
    if (diff >= 0) gains += diff;
    else losses += Math.abs(diff);
  }
  if (losses === 0) return 100;
  const relativeStrength = gains / period / (losses / period);
  return 100 - 100 / (1 + relativeStrength);
}

function macdHistogram(closes) {
  if (closes.length < 35) return 0;
  const ema12 = ema(closes, 12);
  const ema26 = ema(closes, 26);
  const macdLine = ema12.map((value, index) => value - ema26[index]);
  const signal = ema(macdLine, 9);
  return macdLine.at(-1) - signal.at(-1);
}

async function fetchTwseMonth(symbol, date) {
  const url = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${formatMonthDate(date)}&stockNo=${symbol}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`TWSE ${response.status}`);
  return response.json();
}

async function fetchTwseStock(symbol) {
  if (stockCache.has(symbol)) return stockCache.get(symbol);

  const months = recentMonthDates();
  const payloads = await Promise.all(
    months.map((date) => fetchTwseMonth(symbol, date).catch(() => null))
  );
  const okPayloads = payloads.filter((payload) => payload?.stat === "OK" && Array.isArray(payload.data));
  const rows = okPayloads.flatMap((payload) => payload.data);

  if (!rows.length) {
    throw new Error("找不到上市股票日成交資料，可能是代號錯誤、櫃買股票，或 TWSE 暫時無回應。");
  }

  const records = rows
    .map((row) => ({
      date: parseRocDate(row[0]),
      volume: parseNumber(row[1]),
      amount: parseNumber(row[2]),
      open: parseNumber(row[3]),
      high: parseNumber(row[4]),
      low: parseNumber(row[5]),
      close: parseNumber(row[6]),
      change: parseNumber(row[7]),
      trades: parseNumber(row[8]),
    }))
    .filter((record) => record.close > 0)
    .sort((a, b) => a.date - b.date);

  if (records.length < 2) {
    throw new Error("成交資料太少，暫時無法計算短線分析。");
  }

  const title = okPayloads.find((payload) => payload.title)?.title || "";
  const name = title.replace(/^\S+\s+/, "").replace(symbol, "").replace("各日成交資訊", "").trim() || symbol;
  const stock = buildStockFromRecords(symbol, name, records);
  stockCache.set(symbol, stock);
  return stock;
}

async function refreshWatchlistRankings() {
  await Promise.all(
    watchlistMeta.map(async ({ symbol }) => {
      try {
        const stock = await fetchTwseStock(symbol);
        rankingCache.set(symbol, stock);
      } catch {
        rankingCache.set(symbol, stocks[symbol]);
      }
    })
  );
  renderWatchlist(currentSymbol);
}

async function fetchUsIndexSnapshot() {
  const symbols = ["^GSPC", "^IXIC", "^SOX"];
  const results = await Promise.all(
    symbols.map(async (symbol) => {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(symbol)}?range=5d&interval=1d`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("美股指數 API 暫時無回應");
      const payload = await response.json();
      const result = payload.chart?.result?.[0];
      const closes = result?.indicators?.quote?.[0]?.close?.filter((value) => Number.isFinite(value)) || [];
      if (closes.length < 2) throw new Error("美股資料不足");
      const latest = closes.at(-1);
      const previous = closes.at(-2);
      return ((latest - previous) / previous) * 100;
    })
  );

  const averageChange = average(results);
  return {
    averageChange,
    score: clamp(averageChange * 5, -8, 8),
    label: `S&P/Nasdaq/SOX 平均 ${averageChange.toFixed(2)}%`,
  };
}

async function refreshMarketContext() {
  refreshMarketButton.disabled = true;
  marketContextStatus.textContent = "正在抓美股 S&P 500 / Nasdaq / SOX...";
  try {
    const snapshot = await fetchUsIndexSnapshot();
    marketContext = {
      usScore: snapshot.score,
      usLabel: snapshot.label,
      updatedAt: new Date(),
    };
  } catch (error) {
    marketContext = {
      ...marketContext,
      usLabel: `${error.message}，保留手動情勢判斷`,
    };
  } finally {
    refreshMarketButton.disabled = false;
    renderMarketStatus();
    rerenderCurrentView();
  }
}

function renderMarketStatus() {
  const context = getMarketContextScore();
  const updatedText = marketContext.updatedAt ? `｜${formatDate(marketContext.updatedAt)}` : "";
  marketContextStatus.textContent = `${getMarketLabel(context)}｜美股 ${marketContext.usLabel}｜夜盤 ${context.nightPct.toFixed(1)}%${updatedText}`;
}

function rerenderCurrentView() {
  renderWatchlist(currentSymbol);
  if (currentStock) {
    renderStock(currentStock, currentSymbol, new FormData(form).get("mode"));
  }
}

function buildStockFromRecords(symbol, name, records) {
  const latest = records.at(-1);
  const previous = records.at(-2);
  const closes = records.map((record) => record.close);
  const volumes = records.map((record) => record.volume);
  const amounts = records.map((record) => record.amount);
  const returns = records.slice(1).map((record, index) => Math.abs((record.close - records[index].close) / records[index].close));

  const ma5 = average(closes.slice(-5));
  const ma20 = average(closes.slice(-20));
  const ma60 = average(closes.slice(-60));
  const avgVol20 = average(volumes.slice(-20, -1));
  const avgAmount20 = average(amounts.slice(-20, -1));
  const volumeRatio = avgVol20 ? latest.volume / avgVol20 : 1;
  const intradayRange = latest.high - latest.low || 1;
  const closePosition = (latest.close - latest.low) / intradayRange;
  const dayChangePct = previous.close ? ((latest.close - previous.close) / previous.close) * 100 : 0;
  const momentum20 = closes.length > 20 ? ((latest.close - closes.at(-21)) / closes.at(-21)) * 100 : dayChangePct;
  const volatility = average(returns.slice(-20)) * 100;
  const rsi14 = rsi(closes);
  const macd = macdHistogram(closes);

  const trend = clamp(
    42 +
      (latest.close > ma5 ? 10 : -6) +
      (latest.close > ma20 ? 14 : -8) +
      (ma20 > ma60 ? 10 : -4) +
      Math.min(18, momentum20 * 1.8) +
      (macd > 0 ? 8 : -4)
  );
  const volume = clamp(
    42 +
      Math.min(24, volumeRatio * 10) +
      closePosition * 18 +
      Math.min(16, avgAmount20 / 1_000_000_000)
  );
  const chip = clamp(54 + (volumeRatio > 1.3 && closePosition > 0.65 ? 10 : 0) + (dayChangePct > 0 ? 4 : -4));
  const fundamental = stocks[symbol]?.scores.fundamental ?? 50;
  const catalyst = clamp(48 + Math.min(22, Math.max(0, momentum20) * 1.2) + Math.min(18, volumeRatio * 6));
  const risk = clamp(84 - Math.max(0, dayChangePct - 3) * 7 - Math.max(0, rsi14 - 72) * 1.1 - volatility * 4);

  return {
    name,
    price: latest.close,
    change: dayChangePct,
    volumeRank: null,
    group: stocks[symbol]?.group ?? "TWSE 上市股票",
    dataDate: latest.date,
    apiSource: "TWSE STOCK_DAY",
    metrics: {
      ma5,
      ma20,
      ma60,
      rsi14,
      volumeRatio,
      closePosition,
      momentum20,
      volatility,
    },
    scores: { trend, volume, chip, fundamental, catalyst, risk },
    positives: [
      `最新收盤 ${latest.close.toFixed(2)}，日漲跌 ${dayChangePct.toFixed(2)}%。`,
      `量比約 ${volumeRatio.toFixed(2)} 倍，收盤位置在當日區間 ${(closePosition * 100).toFixed(0)}%。`,
      `MA5 ${ma5.toFixed(2)}、MA20 ${ma20.toFixed(2)}，RSI14 約 ${rsi14.toFixed(1)}。`,
    ],
    risks: [
      risk < 55 ? "短線風險分數偏低，可能有過熱、震盪或追高問題。" : "仍需確認尾盤沒有爆量轉弱。",
      volumeRatio < 1 ? "量能低於近 20 日均量，隔日衝追價力可能不足。" : "量能放大時也要防爆量不漲。",
      "目前第一版尚未接法人、融資融券與新聞 API，籌碼與題材分數屬技術推估。",
    ],
  };
}

function formatDate(date) {
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")}`;
}

function renderLoadingStock(symbol) {
  const context = getMarketContextScore();
  document.querySelector("#stockTitle").textContent = `${symbol} 讀取中`;
  document.querySelector("#marketState").textContent = "正在連線 TWSE 官方資料...";
  document.querySelector("#totalScore").textContent = "...";
  document.querySelector("#scoreLabel").textContent = "抓取最近日成交資料並計算指標";
  document.querySelector("#overnightFit").textContent = "分析中";
  document.querySelector("#overnightReason").textContent = "請稍等";
  document.querySelector("#riskLevel").textContent = "...";
  document.querySelector("#riskReason").textContent = "計算中";
  document.querySelector("#marketScoreValue").textContent = context.total;
  document.querySelector("#marketScoreReason").textContent = getMarketLabel(context);
  document.querySelector("#scoreRows").innerHTML = "";
  document.querySelector("#tradePlan").innerHTML = "";
  document.querySelector("#buyReasons").innerHTML = "<li>正在讀取價格、成交量與技術指標。</li>";
  document.querySelector("#riskFlags").innerHTML = "<li>若 TWSE 或網路暫時無回應，會顯示錯誤原因。</li>";
}

function renderUnknownStock(symbol, message = "此代號尚未取得資料") {
  const mode = new FormData(form).get("mode");
  const risk = Number(riskSlider.value);
  const profit = Number(profitSlider.value);
  const context = getMarketContextScore();

  symbolInput.value = symbol;
  document.querySelector("#stockTitle").textContent = `${symbol || "未輸入"} 尚未有資料`;
  document.querySelector("#marketState").textContent = message;
  document.querySelector("#totalScore").textContent = "--";
  document.querySelector("#scoreLabel").textContent = "沒有價格、成交量、籌碼與財報資料，不能產生買賣建議";
  document.querySelector("#overnightFit").textContent = "無法判斷";
  document.querySelector("#overnightReason").textContent = "沒有足夠資料可評分";
  document.querySelector("#riskLevel").textContent = "--";
  document.querySelector("#riskReason").textContent = "資料不足";
  document.querySelector("#marketScoreValue").textContent = context.total;
  document.querySelector("#marketScoreReason").textContent = getMarketLabel(context);
  document.querySelector("#modeLabel").textContent = mode === "overnight" ? "隔日衝權重" : "短波段權重";
  document.querySelector("#planStatus").textContent = "等待資料";

  const badge = document.querySelector("#verdictBadge");
  badge.textContent = "無資料";
  badge.className = "verdict sell";

  document.querySelector("#scoreRows").innerHTML = Object.values(labels)
    .map((label) => `
      <div class="score-row">
        <div class="score-meta"><span>${label}</span><strong>--</strong></div>
        <div class="bar" aria-hidden="true"><i style="width:0%"></i></div>
      </div>
    `)
    .join("");

  document.querySelector("#tradePlan").innerHTML = `
    <div class="step">
      <span>買進</span>
      <p><strong>不要買</strong>沒有資料時不做隔日衝，先避免盲單。</p>
    </div>
    <div class="step">
      <span>下一步</span>
      <p><strong>接資料源</strong>需要價格、量、法人、融資融券與新聞題材後才評分。</p>
    </div>
    <div class="step">
      <span>風控</span>
      <p><strong>預設規則</strong>接資料後仍使用 ${risk}% 停損、${profit}% 停利作為短線基準。</p>
    </div>
  `;

  document.querySelector("#buyReasons").innerHTML = `
    <li>你輸入的代號會被保留下來，不會自動跳回 2317。</li>
    <li>目前已接 TWSE 上市股票日成交 API；櫃買股票需下一步接 TPEx。</li>
  `;
  document.querySelector("#riskFlags").innerHTML = `
    <li>${message}</li>
    <li>沒有完整資料時，任何買賣建議都會失真。</li>
  `;
  renderWatchlist(symbol);
}

function renderStock(stock, symbol, mode) {
  currentSymbol = symbol;
  currentStock = stock;
  const score = adjustedScore(stock, mode);
  const total = score.total;
  const verdict = getVerdict(total, stock, mode);
  const [fit, fitReason] = getFit(stock, total);
  const riskLevel = stock.scores.risk >= 68 ? "低" : stock.scores.risk >= 55 ? "中" : "高";

  symbolInput.value = symbol;
  document.querySelector("#stockTitle").textContent = `${symbol} ${stock.name}`;
  document.querySelector("#marketState").textContent = `${stock.apiSource || "示範資料"}｜${stock.group}｜資料日 ${stock.dataDate ? formatDate(stock.dataDate) : "示範"}｜參考價 ${stock.price}`;
  document.querySelector("#totalScore").textContent = total;
  document.querySelector("#scoreLabel").textContent = `${verdict.label}｜個股 ${score.base}，情勢 ${score.adjustment >= 0 ? "+" : ""}${score.adjustment}`;
  document.querySelector("#overnightFit").textContent = fit;
  document.querySelector("#overnightReason").textContent = fitReason;
  document.querySelector("#riskLevel").textContent = riskLevel;
  document.querySelector("#riskReason").textContent =
    riskLevel === "高" ? "短線過熱或波動偏大" : riskLevel === "中" ? "需嚴格停損" : "波動相對可控";
  document.querySelector("#marketScoreValue").textContent = score.context.total;
  document.querySelector("#marketScoreReason").textContent = getMarketLabel(score.context);
  document.querySelector("#modeLabel").textContent = mode === "overnight" ? "隔日衝權重" : "短波段權重";
  document.querySelector("#planStatus").textContent = mode === "overnight" ? "尾盤決策" : "分批決策";

  const badge = document.querySelector("#verdictBadge");
  badge.textContent = verdict.text;
  badge.className = `verdict ${verdict.className}`;

  renderWatchlist(symbol);
  renderScores(stock);
  renderPlan(stock, mode);
  renderReasons(stock);
}

async function analyze(symbol = symbolInput.value) {
  const normalized = symbol.trim();
  const mode = new FormData(form).get("mode");

  if (!normalized) {
    renderUnknownStock("", "請輸入股票代號。");
    return;
  }

  renderLoadingStock(normalized);
  try {
    const stock = await fetchTwseStock(normalized);
    renderStock(stock, normalized, mode);
  } catch (error) {
    const fallback = stocks[normalized];
    if (fallback) {
      fallback.apiSource = "示範資料";
      renderStock(fallback, normalized, mode);
      return;
    }
    renderUnknownStock(normalized, error.message);
  }
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  analyze();
});

tickerList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-symbol]");
  if (!button) return;
  symbolInput.value = button.dataset.symbol;
  analyze(button.dataset.symbol);
});

[riskSlider, profitSlider].forEach((slider) => {
  slider.addEventListener("input", () => {
    document.querySelector("#riskValue").textContent = `${riskSlider.value}%`;
    document.querySelector("#profitValue").textContent = `${profitSlider.value}%`;
    if (currentStock) {
      renderStock(currentStock, currentSymbol, new FormData(form).get("mode"));
    } else {
      analyze();
    }
  });
});

[
  globalMood,
  taiwanNewsMood,
  nightFuturesInput,
  ...document.querySelectorAll('input[name="mode"]'),
].forEach((control) => {
  control.addEventListener("input", () => {
    renderMarketStatus();
    rerenderCurrentView();
  });
  control.addEventListener("change", () => {
    renderMarketStatus();
    rerenderCurrentView();
  });
});

refreshMarketButton.addEventListener("click", refreshMarketContext);

renderMarketStatus();
analyze("2317");
refreshWatchlistRankings();
refreshMarketContext();
