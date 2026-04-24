# 🌱 BizGrow — CRM + AI Marketing Engine for Kirana Stores

BizGrow is a hyperlocal CRM and AI-powered marketing platform built for small retail (kirana) store owners. It helps merchants track customers, log transactions, manage a loyalty points system, and run targeted WhatsApp campaigns — all from a simple mobile app. The AI engine lets merchants describe their stock or offer in plain language and instantly generates a ready-to-send WhatsApp message for the right customers.

---

## ✨ Features

### 👤 Customer Management

- Add customers with name, phone number, and tags
- View full customer profile with visit history and points
- Search and filter customers by name, phone, or tag
- Editable tag system (Regular, High Spender, New, custom)

### 🧾 Transaction Tracking

- Log transactions with itemized purchases and amounts
- Auto-assign loyalty points on every transaction
- View full transaction history per customer

### 🎯 Loyalty Points System

- Earn points based on purchase value (e.g. ₹10 = 1 point)
- View current balance and total earned per customer
- Manual point redemption by merchant

### 🤖 AI Campaign Generation

- Merchant describes stock or offer in plain text
- Claude AI generates a targeted WhatsApp-ready message
- Merchant can review and edit before sending

### 📣 Campaign Management

- Filter target audience by customer tags
- See matched customer count before sending
- Send campaigns via WhatsApp deep link (`wa.me`)
- View past campaigns with date, tags, and reach

### 📊 Analytics

- Revenue overview: Today · This Week · This Month
- Bar/line chart for revenue trends
- Stats: Total Transactions, New Customers, Points Redeemed
- Top 5 customers by spend
- Customer distribution by tag (donut chart)

### ⚙️ Settings

- Edit store name
- Configure points rate (₹X = 1 point)
- Set redemption rules
- Logout

---

## 📱 Screens

| Screen           | Description                                                                |
| ---------------- | -------------------------------------------------------------------------- |
| Login / Signup   | Email + password auth, store name on signup                                |
| Home / Dashboard | Revenue card, stats row, quick actions, recent transactions, top customers |
| Customers        | Searchable list with tag filters, add customer FAB                         |
| Customer Profile | Full profile, points card, transaction history, WhatsApp button            |
| Log Transaction  | Customer picker, itemized entry, live points preview                       |
| Campaigns        | AI generator, audience selector, WhatsApp send, past campaigns             |
| Analytics        | Revenue chart, stats cards, top customers, tag breakdown                   |
| Settings         | Store config, points rate, logout                                          |

---

## 🛠️ Tech Stack

### Frontend

| Tech                       | Purpose                               |
| -------------------------- | ------------------------------------- |
| React Native (Expo SDK 54) | Cross-platform mobile app             |
| Expo Router                | File-based navigation                 |
| NativeWind (v4)            | Tailwind CSS styling for React Native |
| TypeScript                 | Type safety                           |

### Backend

| Tech       | Purpose                      |
| ---------- | ---------------------------- |
| Node.js    | Runtime                      |
| Express.js | REST API framework           |
| Supabase   | Database (PostgreSQL) + Auth |

### Integrations

| Tech                   | Purpose                         |
| ---------------------- | ------------------------------- |
| Claude API (Anthropic) | AI campaign message generation  |
| WhatsApp `wa.me`       | Deep link for sending campaigns |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI
- Android/iOS device or emulator

### Installation

```bash
# Clone the repo
git clone https://github.com/Aryansinha2811/BizGrow.git
cd BizGrow

# Install dependencies
npm install

# Start the dev server
npx expo start
```

## 👨‍💻 Author

**Aryan Sinha**

- GitHub: [@Aryansinha2811](https://github.com/Aryansinha2811)
- LinkedIn: [aryan-sinha-7157a2271](https://linkedin.com/in/aryan-sinha-7157a2271)

---

## 📄 License

MIT License — feel free to use and modify.
