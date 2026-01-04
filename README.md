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
      footerRight: "Made with ❤️ by Romik",  // Custom HTML content to display in the footer right side
      footerLeft: "<p><strong>Contact Me :</strong><br>dev.romikmakavana@gmail.com</p>",         // Custom HTML content to display in the footer left side
      headerRight: "Page {page}",        // Custom HTML content to display in the header right side
      headerLeft: "<h1>Tiptap Pagination Plus</h1><p>by Romik Makavana</p>",         // Custom HTML content to display in the header left side
      marginTop: 20,          // Top margin for pages
      marginBottom: 20,       // Bottom margin for pages
      marginLeft: 50,         // Left margin for pages
      marginRight: 50,        // Right margin for pages
      contentMarginTop: 10,   // Top margin for content within pages
      contentMarginBottom: 10, // Bottom margin for content within pages
      // Optional: Per-page header/footer customization
      customHeader: {
        2: { headerLeft: "Page 2 Header", headerRight: "Page {page}" }
      },
      customFooter: {
        3: { footerLeft: "Page 3 Footer", footerRight: "Page {page}" }
      },
      // Optional: Click callbacks
      onHeaderClick: ({ event, pageNumber }) => {
        console.log(`Header clicked on page ${pageNumber}`)
      },
      onFooterClick: ({ event, pageNumber }) => {
        console.log(`Footer clicked on page ${pageNumber}`)
      },
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

### Per-Page Header/Footer Customization

You can define different headers and footers for specific pages:

```typescript
PaginationPlus.configure({
  // Default header/footer for all pages
  headerLeft: "Default Header",
  headerRight: "Page {page}",
  footerLeft: "Default Footer",
  footerRight: "Page {page}",
  
  // Custom header for page 2
  customHeader: {
    2: {
      headerLeft: "Chapter 2",
      headerRight: "Page {page}"
    }
  },
  
  // Custom footer for page 3
  customFooter: {
    3: {
      footerLeft: "Special Footer",
      footerRight: "Page {page}"
    }
  },
  
  // Handle header/footer clicks
  onHeaderClick: ({ event, pageNumber }) => {
    console.log(`Header clicked on page ${pageNumber}`)
    // Your custom logic here
  },
  onFooterClick: ({ event, pageNumber }) => {
    console.log(`Footer clicked on page ${pageNumber}`)
    // Your custom logic here
  }
})
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
| `footerRight` | string | "{page}" | Custom HTML content to display in the footer right side (supports multiline and rich text) |
| `footerLeft` | string | "" | Custom HTML content to display in the footer left side (supports multiline and rich text) |
| `headerRight` | string | "" | Custom HTML content to display in the header right side (supports multiline and rich text) |
| `headerLeft` | string | "" | Custom HTML content to display in the header left side (supports multiline and rich text) |
| `marginTop` | number | 20 | Top margin for pages |
| `marginBottom` | number | 20 | Bottom margin for pages |
| `marginLeft` | number | 50 | Left margin for pages |
| `marginRight` | number | 50 | Right margin for pages |
| `contentMarginTop` | number | 10 | Top margin for content within pages |
| `contentMarginBottom` | number | 10 | Bottom margin for content within pages |
| `customHeader` | `Record<number, { headerLeft: string, headerRight: string }>` | `{}` | Custom headers for specific pages (page number as key) |
| `customFooter` | `Record<number, { footerLeft: string, footerRight: string }>` | `{}` | Custom footers for specific pages (page number as key) |
| `onHeaderClick` | `(params: { event: MouseEvent, pageNumber: number }) => void` | `undefined` | Callback function when header is clicked |
| `onFooterClick` | `(params: { event: MouseEvent, pageNumber: number }) => void` | `undefined` | Callback function when footer is clicked |

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
| `updateHeaderContent` | `left: string, right: string, pageNumber?: number` | Update header HTML content for left and right sides. If `pageNumber` is provided, updates header for that specific page only |
| `updateFooterContent` | `left: string, right: string, pageNumber?: number` | Update footer HTML content for left and right sides. If `pageNumber` is provided, updates footer for that specific page only |

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

// Update header and footer content (supports HTML, multiline, and rich text)
editor.chain().focus().updateHeaderContent('Document Title', 'Page {page}').run()
editor.chain().focus().updateFooterContent('Confidential', 'Page {page} of {total}').run()

// Update header/footer for specific page
editor.chain().focus().updateHeaderContent('Page 2 Title', 'Page {page}', 2).run()
editor.chain().focus().updateFooterContent('Page 3 Footer', 'Page {page}', 3).run()

// Example with HTML content in headers/footers
editor.chain().focus()
  .updateHeaderContent(
    '<strong>Company Name</strong><br><small>Department</small>', 
    '<span style="color: blue;">Page {page}</span>'
  )
  .updateFooterContent(
    '<em>Confidential</em>', 
    'Page {page}'
  )
  .run()
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
- Custom header/footer HTML content support with multiline and rich text
- **Per-page header/footer customization** - Define different headers and footers for specific pages
- **Header/footer click callbacks** - Handle user interactions with headers and footers
- Use `{page}` variable to display current page number in header/footer text
- Header and footer heights are automatically calculated based on content
- Table pagination with header preservation
- Responsive design
- Automatic page height calculation
- Support for nested content

## License

MIT
