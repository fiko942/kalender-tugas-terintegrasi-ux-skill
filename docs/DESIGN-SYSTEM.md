# DESIGN SYSTEM

## Project: Kalender Tugas Terintegrasi

Version: 1.0Status: DraftReference: PRD.md v1.0, UX-SPEC.md v1.0

# 1. Design Direction

## 1.1 Design Concept

Modern Minimalist Academic Productivity.

Karakteristik desain:
- Clean and minimal interface.
- Clear visual hierarchy.
- Consistent spacing.
- Soft neutral background.
- Professional appearance.
- Simple and recognizable interactions.
- Responsive across desktop, tablet, and mobile.

## 1.2 Design Principles
- Clarity: Informasi tugas harus mudah dibaca.
- Consistency: Semua halaman menggunakan aturan visual yang sama.
- Simplicity: Hindari elemen dekoratif yang tidak diperlukan.
- Accessibility: Pastikan kontras warna dan keterbacaan memadai.
- Scalability: Komponen harus dapat digunakan kembali.

# 2. Color System

## 2.1 Primary Colors
| Token | Hex | Usage |
| --- | --- | --- |
| Primary | #2563EB | Tombol utama, link, active navigation |
| Primary Hover | #1D4ED8 | Hover button |
| Primary Light | #EFF6FF | Highlight dan selected background |
| Primary Dark | #1E40AF | Active emphasis |

## 2.2 Neutral Colors
| Token | Hex | Usage |
| --- | --- | --- |
| Background | #F8FAFC | Main background |
| Surface | #FFFFFF | Card dan panel |
| Surface Secondary | #F1F5F9 | Secondary surface |
| Border | #E2E8F0 | Divider dan border |
| Text Primary | #0F172A | Heading dan teks utama |
| Text Secondary | #64748B | Supporting text |
| Text Muted | #94A3B8 | Placeholder dan disabled text |

## 2.3 Semantic Colors
| Token | Hex | Usage |
| --- | --- | --- |
| Success | #16A34A | Tugas selesai |
| Success Light | #DCFCE7 | Background success |
| Warning | #D97706 | Tenggat mendekat |
| Warning Light | #FEF3C7 | Warning background |
| Danger | #DC2626 | Tugas terlambat dan error |
| Danger Light | #FEE2E2 | Error background |
| Info | #0284C7 | Informasi dan pengingat |

## 2.4 Task Status Colors
| Status | Color | Background |
| --- | --- | --- |
| Belum Dikerjakan | #64748B | #F1F5F9 |
| Sedang Dikerjakan | #2563EB | #EFF6FF |
| Selesai | #16A34A | #DCFCE7 |
| Terlambat | #DC2626 | #FEE2E2 |

Warna status tidak boleh menjadi satu-satunya penanda. Setiap status harus disertai teks atau ikon.

# 3. Typography System

## 3.1 Font Family

Primary Font: Inter

Fallback:
- system-ui
- sans-serif

## 3.2 Typography Scale
| Token | Size | Weight | Usage |
| --- | --- | --- | --- |
| Display | 32px | 700 | Dashboard highlight |
| H1 | 28px | 700 | Page title |
| H2 | 22px | 600 | Section heading |
| H3 | 18px | 600 | Card heading |
| Body Large | 16px | 400 | Main content |
| Body | 14px | 400 | Default text |
| Body Small | 13px | 400 | Supporting text |
| Caption | 12px | 400 | Metadata |

Line height:
- Heading: 1.2–1.4
- Body: 1.5
- Caption: 1.4

# 4. Spacing System

Gunakan kelipatan 4px.
| Token | Value | Usage |
| --- | --- | --- |
| space-1 | 4px | Small inline gap |
| space-2 | 8px | Compact spacing |
| space-3 | 12px | Component spacing |
| space-4 | 16px | Standard padding |
| space-5 | 20px | Section spacing |
| space-6 | 24px | Card spacing |
| space-8 | 32px | Large section spacing |
| space-10 | 40px | Page separation |
| space-12 | 48px | Major layout spacing |

# 5. Layout System

## 5.1 Main Layout

Desktop:
- Sidebar: 240px.
- Main content: flexible width.
- Page padding: 32px.
- Content maximum width: 1440px.

Tablet:
- Collapsible sidebar.
- Page padding: 24px.

Mobile:
- Single-column layout.
- Page padding: 16px.
- Mobile navigation.
- Full-width primary actions.

## 5.2 Responsive Breakpoints
| Breakpoint | Width | Layout |
| --- | --- | --- |
| Mobile | < 640px | Single column |
| Tablet | 640–1023px | Adaptive layout |
| Desktop | ≥ 1024px | Sidebar layout |
| Wide Desktop | ≥ 1440px | Maximum content width |

# 6. Component Design Specifications

## 6.1 Buttons

Types:
- Primary Button
- Secondary Button
- Outline Button
- Ghost Button
- Danger Button
- Icon Button

Specifications:
- Default height: 40px.
- Horizontal padding: 16px.
- Border radius: 8px.
- Font size: 14px.
- Font weight: 600.
- Transition: 150ms.

Sizes:
- Small: 32px.
- Medium: 40px.
- Large: 48px.

## 6.2 Input Fields

Types:
- Text Input
- Textarea
- Date Picker
- Time Picker
- Select
- Search Input

Specifications:
- Height: 40px for standard inputs.
- Border: 1px solid #E2E8F0.
- Border radius: 8px.
- Padding: 12px.
- Font size: 14px.

## 6.3 Cards

Specifications:
- Background: #FFFFFF.
- Border: 1px solid #E2E8F0.
- Border radius: 12px.
- Padding: 20px.
- Shadow: subtle.
- Card spacing: 16px.

Types:
- Summary Card.
- Task Card.
- Calendar Card.
- Notification Card.

## 6.4 Status Badge

Specifications:
- Border radius: 999px.
- Padding: 4px 10px.
- Font size: 12px.
- Font weight: 500.

Variants:
- Pending.
- In Progress.
- Completed.
- Overdue.

## 6.5 Navigation

Desktop:
- Sidebar navigation.
- Icon and text labels.
- Active item uses primary background light.

Mobile:
- Mobile navigation pattern.
- Menu labels remain visible.
- Primary navigation remains accessible.

## 6.6 Modal

Specifications:
- Background: white.
- Border radius: 12px.
- Maximum width: 480px.
- Padding: 24px.
- Overlay: dark translucent background.

Usage:
- Delete confirmation.
- Important confirmation.
- Short contextual actions.

## 6.7 Toast Notification

Types:
- Success.
- Error.
- Warning.
- Information.

Specifications:
- Position: top-right on desktop.
- Position: top on mobile.
- Duration: 3–5 seconds.
- Important error messages must remain accessible until dismissed or resolved.

# 7. Calendar Component

## 7.1 Monthly Calendar

Elements:
- Month and year heading.
- Previous and next navigation.
- Day-of-week labels.
- Calendar grid.
- Task indicators.
- Selected date.
- Today indicator.

## 7.2 Weekly Calendar

Elements:
- Seven-day view.
- Date heading.
- Task indicators.
- Task list for selected day.

## 7.3 Task Indicators
- Blue: Sedang Dikerjakan.
- Gray: Belum Dikerjakan.
- Green: Selesai.
- Red: Terlambat.

The calendar must remain readable on mobile devices.

# 8. Iconography

Use Lucide Icons.

Rules:
- Consistent icon family.
- Standard size: 20px.
- Small size: 16px.
- Large size: 24px.
- Use recognizable icons.
- Icons accompanying actions should have accessible labels.

Recommended icons:
- Dashboard: Layout Dashboard.
- Calendar: Calendar Days.
- Tasks: Clipboard List.
- Add Task: Plus.
- Edit: Pencil.
- Delete: Trash 2.
- Notification: Bell.
- Completed: Circle Check.
- Overdue: Circle Alert.

# 9. Design Tokens

All design values should be maintained as reusable tokens.

Example:

{

"color": {

"primary": "#2563EB",

"background": "#F8FAFC",

"surface": "#FFFFFF",

"textPrimary": "#0F172A",

"textSecondary": "#64748B",

"success": "#16A34A",

"warning": "#D97706",

"danger": "#DC2626"

},

"radius": {

"sm": "6px",

"md": "8px",

"lg": "12px",

"full": "999px"

},

"spacing": {

"xs": "4px",

"sm": "8px",

"md": "16px",

"lg": "24px",

"xl": "32px"

}

}

Design tokens must be reused throughout the application instead of introducing arbitrary values.

# 10. Accessibility Guidelines
- Maintain sufficient text and background contrast.
- Do not communicate task status through color alone.
- Provide labels for form inputs.
- Ensure keyboard accessibility.
- Provide visible focus indicators.
- Use descriptive accessible labels for icon-only buttons.
- Maintain readable typography on mobile.

# 11. Design Consistency Rules
- Reuse existing components before creating new ones.
- Do not introduce new colors without design system approval.
- Maintain consistent spacing.
- Maintain consistent typography hierarchy.
- Use the same button variants across pages.
- Use consistent status indicators.
- Avoid unnecessary decorative elements.
- All responsive layouts must follow the defined breakpoints.
- New components must follow existing design conventions.

End of DESIGN-SYSTEM v1.0
