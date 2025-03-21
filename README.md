# MarpShims

A collection of quick shims I use often in Marp projects:

- Automatic page breaks
- Automatic dark/light theme
- Automatic table of contents
- Automatic hyperlinked headings
- Automatic scrolling to the correct slide on load
- ...

## Usage

```html
<script type="text/javascript" src="https://snotskie.github.io/MarpShims/MarpShims.js"></script>
<script type="text/javascript">
  window.addEventListener("load", () => {
    MarpShims.load({
      // headings_query: "h1",
      // toc_id: "toc"
    });
  });
</script>
```

To create a table of contents, include this in your Marp slides markdown where you want a table of contents:

```md
<!-- _class: toc -->
<div id="toc"></div>
```

## CSS Classes

`MarpShims` does not automatically apply styling, but recommended CSS for the classes it applies is provided below.

### `MarpShims.autoScale`

`MarpShims.autoScale` applies two class names, `fitscale` for devices with pinch-to-zoom capabilities where having the slides fit to the page automatically is preferred, and `fixedscale` for ctrl-plus-to-zoom devices where having a fixed slide size that can be user-scaled is preferred.

Recommended CSS for `fitscale` follows. For `fixedscale`, use any dimensions that have the same aspect ratio as your Marp theme.

```css
svg.fitscale {
    width: 100%;
    max-width: 100%;
    height: unset !important;
    max-height: 100%;
    margin: 0;
}

svg.fixedscale {
    width: 16in;
    height: 9in;
    margin: 0 auto;
}
```

### `MarpShims.withTOC`

`MarpShims.withTOC` applies a number of class names:

- `p.toc_line` for each line of the table of contents
- `a.toc_anchor` for the clickable, main text of the line
- `span.toc_page_no` for the page number
- `p.toc_H1`, `p.toc_H2`, etc. representing what node type the line refers to

At a minimum, I recommend this for styling:

```css
span.page_no {
    float: right;
}
```

If you change `headings_query` to `h1,h2` or so on, this is recommended as well to make the "chapters" (`h1`) more distinct from the "sections" (`h2`).

```css
p.toc_H1 {
    border-bottom: .25em solid var(--color-foreground);
}
```

And if you want a two-column index-style instead of a traditional table of contents, use this as well:

```css
section.toc {
    columns: 2;
}
```

## Other Recommendations

In your Marp theme:

```css
/* Use at least 16pt base font size */
:root {
    font-size: 16pt;
}

/* Remove annoying letter spacing Marp default */
:root, h1, h2, h3, h4, h5, h6 {
    letter-spacing: normal;
}

/* Make slide padding scale with user font size, but don't go too small for printer bleed margins */
section {
    padding: max(2rem, .5in);
}

/* Use top-left alignment unless overridden with .center class name */
section:not(.center) {
    align-content: start !important;
    justify-content: normal !important;
    text-align: left !important;
}
```
