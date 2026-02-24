# Furniture Materials POS Application Specification

## 1. Project Overview

**Project Name:** KASIR TOKO BAHAN MEBEL
**Type:** Web-based Point of Sale Application
**Core Functionality:** Inventory management and sales transaction system for furniture materials (wood, bamboo, triplex, doors, boards, etc.)
**Target Users:** Furniture material business owners and cashiers

## 2. UI/UX Specification

### Layout Structure

**Main Sections:**
- **Header:** App title, business name, current date/time
- **Sidebar Navigation:** Dashboard, Products, Transactions, Reports
- **Main Content Area:** Dynamic content based on selected menu
- **Modal/Overlay:** For adding products, transaction details, receipt preview

**Responsive Breakpoints:**
- Desktop: 1200px+ (full sidebar)
- Tablet: 768px-1199px (collapsible sidebar)
- Mobile: <768px (hamburger menu)

### Visual Design

**Color Palette:**
- Primary: #2D5016 (Forest Green - represents wood/nature)
- Secondary: #8B4513 (Saddle Brown - wood color)
- Accent: #FFD700 (Gold - premium feel)
- Background: #F5F5DC (Beige - warm, natural)
- Surface: #FFFFFF (White)
- Text Primary: #1A1A1A
- Text Secondary: #666666
- Success: #28A745
- Warning: #FFC107
- Error: #DC3545

**Typography:**
- Headings: "Playfair Display", serif (elegant, classic)
- Body: "Source Sans Pro", sans-serif (readable)
- Monospace (receipts): "Courier Prime", monospace

**Font Sizes:**
- H1: 2.5rem
- H2: 2rem
- H3: 1.5rem
- Body: 1rem
- Small: 0.875rem

**Spacing System:**
- Base unit: 8px
- xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px, xxl: 48px

**Visual Effects:**
- Card shadows: 0 4px 6px rgba(0,0,0,0.1)
- Hover transitions: 0.3s ease
- Button hover: slight scale (1.02) + shadow increase

### Components

**Product Card:**
- Image placeholder (icon based on category)
- Product name
- Category badge
- Price display
- Stock indicator
- Edit/Delete buttons on hover

**Transaction Item:**
- Product name
- Quantity input
- Unit price
- Subtotal
- Remove button

**Receipt (Kwitansi):**
- Business header with logo
- Transaction number & date
- Itemized list with quantities & prices
- Subtotal, tax (optional), total
- Customer & shipping info
- Footer message

**Form Inputs:**
- Rounded corners (8px)
- Focus state: green border glow
- Error state: red border + message

**Buttons:**
- Primary: Green background, white text
- Secondary: Brown outline
- Danger: Red for delete actions
- Icon buttons for quick actions

## 3. Functionality Specification

### Core Features

**1. Product Management**
- Add new products with: name, category, unit, price, stock
- Categories: Kayu, Bambu, Triplex, Pintu, Papan, Besi, Accessories
- Edit existing products
- Delete products (with confirmation)
- Search/filter products by name or category
- Stock adjustment

**2. Transaction System**
- Select products from catalog
- Add multiple items to cart
- Set quantity for each item
- Custom price override (optional)
- Apply discounts (percentage or fixed)
- Customer information input:
  - Customer name
  - Customer phone
  - Shipping address
  - Shipping method (Pickup/Delivery)
  - Delivery notes
- Calculate totals automatically
- Save transaction history

**3. Receipt Generation (Kwitansi)**
- Generate professional receipt
- Include all transaction details
- Include shipping information
- Unique transaction number
- Print-friendly format

**4. Share Functionality**
- **WhatsApp:** Generate WhatsApp message with receipt summary
- **Email:** Generate mailto link with receipt details
- Copy to clipboard option

**5. Dashboard**
- Today's sales summary
- Total transactions
- Total revenue
- Low stock alerts
- Recent transactions list

**6. Reports**
- Sales history by date range
- Product-wise sales
- Category-wise sales

### User Interactions

- Click product → Add to cart
- Click cart icon → View cart
- Click checkout → Enter customer & shipping details
- Click "Buat Kwitansi" → Generate receipt
- Click share icon → Choose WhatsApp/Email

### Data Handling

- All data stored in localStorage
- Export data as JSON (optional)
- Auto-save on changes

### Edge Cases

- Empty cart checkout prevention
- Negative quantity prevention
- Zero price handling
- Long product names truncation
- Missing customer info warning

## 4. Acceptance Criteria

### Visual Checkpoints
- [ ] App loads with forest green/brown color scheme
- [ ] Sidebar navigation is visible and functional
- [ ] Product cards display with proper styling
- [ ] Cart shows items with quantities and prices
- [ ] Receipt preview looks professional
- [ ] Responsive on mobile devices

### Functional Checkpoints
- [ ] Can add new product with all fields
- [ ] Can edit existing product
- [ ] Can delete product with confirmation
- [ ] Can add products to cart
- [ ] Can change quantity in cart
- [ ] Can remove item from cart
- [ ] Total calculates correctly
- [ ] Can enter customer info
- [ ] Can enter shipping info
- [ ] Receipt generates with all details
- [ ] WhatsApp share opens with formatted message
- [ ] Email share opens with formatted message
- [ ] Data persists after page refresh
- [ ] Dashboard shows accurate statistics
