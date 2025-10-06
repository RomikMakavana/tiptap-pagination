# TipTap Pagination Plus
[![NPM](https://img.shields.io/npm/v/tiptap-pagination-plus.svg)](https://www.npmjs.com/package/tiptap-pagination-plus)

`tiptap-pagination-plus` extension that adds pagination support to your editor with table handling capabilities.


# Demo
https://romikmakavana.me/tiptap-pagination/

## Documentation
https://romikmakavana.me/tiptap

## Installation

```bash
npm install tiptap-pagination-plus
```  

## Usage

### Basic Setup

```typescript
import { Editor } from '@tiptap/core'
import StarterKit from '@tiptap/starter-kit'
import { 
  PaginationPlus,
  PAGE_SIZES
} from 'tiptap-pagination-plus'

const editor = new Editor({
  extensions: [
    StarterKit,
    PaginationPlus.configure({
      pageHeight: 800,        // Height of each page in pixels
      pageWidth: 789,         // Width of each page in pixels
      pageGap: 50,            // Gap between pages in pixels
      pageGapBorderSize: 1,   // Border size for page gaps
      pageGapBorderColor: "#e5e5e5", // Border color for page gaps
      pageBreakBackground: "#ffffff",  // Background color for page gaps
      pageHeaderHeight: 30,   // Height of page header in pixels
      pageFooterHeight: 30,   // Height of page footer in pixels
      footerRight: "{page}",  // Custom text to display in the footer right side
      footerLeft: "",         // Custom text to display in the footer left side
      headerRight: "",        // Custom text to display in the header right side
      headerLeft: "",         // Custom text to display in the header left side
      marginTop: 20,          // Top margin for pages
      marginBottom: 20,       // Bottom margin for pages
      marginLeft: 50,         // Left margin for pages
      marginRight: 50,        // Right margin for pages
      contentMarginTop: 10,   // Top margin for content within pages
      contentMarginBottom: 10, // Bottom margin for content within pages
    }),
  ],
})

// Example: Using predefined page sizes
editor.chain().focus().updatePageSize(PAGE_SIZES.A4).run()

// Example: Dynamic updates
editor.chain().focus()
  .updatePageHeight(1000)
  .updatePageWidth(600)
  .updateMargins({ top: 30, bottom: 30, left: 60, right: 60 })
  .updateHeaderContent('Document Title', 'Page {page}')
  .updateFooterContent('Confidential', 'Page {page} of {total}')
  .run()
```

### Table Pagination

Key points for table pagination:
- Tables will automatically split across pages when they exceed the page height
- To split table across pages, you have to use these extensions
- List : TablePlus, TableRowPlus, TableCellPlus, TableHeaderPlus

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `pageHeight` | number | 800 | Height of each page in pixels |
| `pageWidth` | number | 789 | Width of each page in pixels |
| `pageGap` | number | 50 | Gap between pages in pixels |
| `pageGapBorderSize` | number | 1 | Border size for page gaps |
| `pageGapBorderColor` | string | "#e5e5e5" | Border color for page gaps |
| `pageBreakBackground` | string | "#ffffff" | Background color for page gaps |
| `pageHeaderHeight` | number | 30 | Height of page header in pixels |
| `pageFooterHeight` | number | 30 | Height of page footer in pixels |
| `footerRight` | string | "{page}" | Custom text to display in the footer right side |
| `footerLeft` | string | "" | Custom text to display in the footer left side |
| `headerRight` | string | "" | Custom text to display in the header right side |
| `headerLeft` | string | "" | Custom text to display in the header left side |
| `marginTop` | number | 20 | Top margin for pages |
| `marginBottom` | number | 20 | Bottom margin for pages |
| `marginLeft` | number | 50 | Left margin for pages |
| `marginRight` | number | 50 | Right margin for pages |
| `contentMarginTop` | number | 10 | Top margin for content within pages |
| `contentMarginBottom` | number | 10 | Bottom margin for content within pages |

### Commands

The PaginationPlus extension provides several commands to dynamically update pagination settings:

| Command | Parameters | Description |
|---------|------------|-------------|
| `updatePageBreakBackground` | `color: string` | Update the background color of page gaps |
| `updatePageSize` | `size: PageSize` | Update page dimensions and margins using predefined page sizes |
| `updatePageHeight` | `height: number` | Update the height of pages in pixels |
| `updatePageWidth` | `width: number` | Update the width of pages in pixels |
| `updatePageGap` | `gap: number` | Update the gap between pages in pixels |
| `updateMargins` | `margins: { top: number, bottom: number, left: number, right: number }` | Update page margins |
| `updateContentMargins` | `margins: { top: number, bottom: number }` | Update content margins within pages |
| `updateHeaderHeight` | `height: number` | Update the height of page headers |
| `updateFooterHeight` | `height: number` | Update the height of page footers |
| `updateHeaderContent` | `left: string, right: string` | Update header content for left and right sides |
| `updateFooterContent` | `left: string, right: string` | Update footer content for left and right sides |

#### Using Commands

```typescript
// Update page background color
editor.chain().focus().updatePageBreakBackground('#f0f0f0').run()

// Update page size using predefined sizes
import { PAGE_SIZES } from 'tiptap-pagination-plus'
editor.chain().focus().updatePageSize(PAGE_SIZES.A4).run()

// Update individual page dimensions
editor.chain().focus().updatePageHeight(1000).run()
editor.chain().focus().updatePageWidth(600).run()

// Update margins
editor.chain().focus().updateMargins({ 
  top: 30, 
  bottom: 30, 
  left: 60, 
  right: 60 
}).run()

// Update header and footer content
editor.chain().focus().updateHeaderContent('Document Title', 'Page {page}').run()
editor.chain().focus().updateFooterContent('Confidential', 'Page {page} of {total}').run()
```

### Predefined Page Sizes

The extension includes predefined page sizes that can be used with the `updatePageSize` command:

```typescript
import { PAGE_SIZES } from 'tiptap-pagination-plus'

// Available page sizes:
PAGE_SIZES.A4      // A4 size (794x1123px)
PAGE_SIZES.A3      // A3 size (1123x1591px) 
PAGE_SIZES.A5      // A5 size (419x794px)
PAGE_SIZES.LETTER  // Letter size (818x1060px)
PAGE_SIZES.LEGAL   // Legal size (818x1404px)
PAGE_SIZES.TABLOID // Tabloid size (1060x1635px)
```

### Features

- Automatic page breaks based on content height
- Page numbers in the footer
- Custom header/footer text support
- use `{page}` variable to display current page number in header/footer text
- Table pagination with header preservation
- Responsive design
- Automatic page height calculation
- Support for nested content

## License

MIT
